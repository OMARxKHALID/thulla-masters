import { NextResponse, userAgent, connection } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { revalidateTag } from "next/cache";

export async function GET(request) {
  await connection();
  try {
    await dbConnect();
    const referer = request.headers.get("referer") || "Direct";
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown";
    const country = request.headers.get("x-vercel-ip-country") || "Local";
    const city = request.headers.get("x-vercel-ip-city") || "Local";
    
    const { browser, os, device } = userAgent(request);
    
    const trackingData = {
      timestamp: new Date(),
      ip: ip.split(',')[0].trim(),
      country,
      city: decodeURIComponent(city),
      browser: browser.name || "Unknown",
      os: os.name || "Unknown",
      device: device.type || "Desktop",
      referer: referer
    };

    const settings = await Settings.findOneAndUpdate(
      {},
      {
        $inc: { downloadCount: 1 },
        $push: {
          downloadHistory: {
            $each: [trackingData],
            $slice: -2000,
          },
        },
        $setOnInsert: { apkDownloadUrl: "/thulla-masters.apk" },
      },
      { upsert: true, returnDocument: "after" }
    ).lean();

    revalidateTag("settings", "max");
    const fileUrl = settings.apkDownloadUrl || "/thulla-masters.apk";
    const redirectUrl = new URL(fileUrl, request.url);

    return NextResponse.redirect(redirectUrl, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.redirect(new URL("/thulla-masters.apk", request.url));
  }
}
