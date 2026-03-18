import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { revalidateTag } from "next/cache";

export async function GET(request) {
  try {
    await dbConnect();

    // Single atomic upsert — no double round-trip
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        $inc: { downloadCount: 1 },
        $push: {
          downloadHistory: {
            $each: [{ timestamp: new Date() }],
            $slice: -500, // cap array at last 500 entries
          },
        },
        $setOnInsert: { apkDownloadUrl: "/thulla-masters.apk" },
      },
      { upsert: true, returnDocument: "after" }
    ).lean();

    // Bust settings cache so admin dashboard shows fresh count
    revalidateTag("settings");

    const fileUrl = settings.apkDownloadUrl || "/thulla-masters.apk";
    const redirectUrl = new URL(fileUrl, request.url);

    return NextResponse.redirect(redirectUrl, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Download Error:", error);
    return NextResponse.redirect(new URL("/thulla-masters.apk", request.url));
  }
}
