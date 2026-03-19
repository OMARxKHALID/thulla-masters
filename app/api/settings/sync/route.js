import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { getCurrentUser } from "@/app/actions/auth";

const SSE_RETRY_MS = 5000;
const PING_INTERVAL_MS = 20000;
const HISTORY_TAIL = 1000;

function trimHistory(doc) {
  return {
    ...doc,
    ...(Array.isArray(doc.visitorHistory) && {
      visitorHistory: doc.visitorHistory.slice(-HISTORY_TAIL),
    }),
    ...(Array.isArray(doc.downloadHistory) && {
      downloadHistory: doc.downloadHistory.slice(-HISTORY_TAIL),
    }),
  };
}

export async function GET(req) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let changeStream = null;
      let pingInterval = null;
      let isClosed = false;

      const enqueue = (chunk) => {
        if (isClosed) return false;
        try {
          controller.enqueue(encoder.encode(chunk));
          return true;
        } catch (err) {
          console.error("[SSE] Enqueue failed:", err.message);
          cleanup();
          return false;
        }
      };

      const onAbort = () => {
        console.info("[SSE] Client disconnected");
        cleanup();
      };

      const cleanup = () => {
        if (isClosed) return;
        isClosed = true;

        req.signal.removeEventListener("abort", onAbort);

        if (pingInterval) {
          clearInterval(pingInterval);
          pingInterval = null;
        }

        if (changeStream) {
          changeStream.close().catch((err) => {
            console.error("[SSE] Change stream close error:", err.message);
          });
          changeStream = null;
        }

        try {
          controller.close();
        } catch {}
      };

      const sendDocument = (doc) => {
        if (!doc) {
          console.warn("[SSE] sendDocument received null — skipping");
          return;
        }
        enqueue(`data: ${JSON.stringify(trimHistory(doc))}\n\n`);
      };

      try {
        await dbConnect();

        changeStream = Settings.watch([], { fullDocument: "updateLookup" });

        changeStream.on("change", (change) => {
          if (["insert", "update", "replace"].includes(change.operationType)) {
            sendDocument(change.fullDocument);
          }
        });

        changeStream.on("error", (err) => {
          console.error("[SSE] Change stream error:", err.message);
          cleanup();
        });

        enqueue(`retry: ${SSE_RETRY_MS}\n\n`);

        const settings = await Settings.findOne({}).lean();
        if (settings) {
          sendDocument(settings);
        } else {
          console.warn("[SSE] No settings document found");
        }

        console.info("[SSE] Stream opened for admin:", user._id);

        pingInterval = setInterval(() => {
          enqueue(": ping\n\n");
        }, PING_INTERVAL_MS);

        req.signal.addEventListener("abort", onAbort);
      } catch (err) {
        console.error("[SSE] Stream setup failed:", err.message);
        cleanup();
      }
    },

    cancel() {},
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
