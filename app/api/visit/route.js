import { NextResponse, userAgent, connection } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function POST(request) {
  await connection();
  try {
    await dbConnect();
    const body = await request.json();
    const referrer = body.referrer || "Direct";

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
      referer: referrer
    };

    await Settings.findOneAndUpdate(
      {},
      {
        $inc: { visitorCount: 1 },
        $push: {
          visitorHistory: {
            $each: [trackingData],
            $slice: -5000,
          },
        },
      },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
