import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { invalidateSettingsCache } from "@/lib/services/settings";

export async function GET(request) {
  try {
    await dbConnect();
    
    // First, ensure the document exists and has the required fields
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({
        downloadCount: 0,
        downloadHistory: []
      });
    }

    // Now update with the new download
    settings = await Settings.findOneAndUpdate(
      { _id: settings._id },
      { 
        $inc: { downloadCount: 1 },
        $push: { downloadHistory: { timestamp: new Date() } }
      },
      { new: true }
    ).lean();

    invalidateSettingsCache();

    const fileUrl = settings.apkDownloadUrl || "/thulla-masters.apk";
    const redirectUrl = new URL(fileUrl, request.url);

    return NextResponse.redirect(redirectUrl, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Critical Download Error:", error);
    return NextResponse.redirect(new URL("/thulla-masters.apk", request.url));
  }
}
