import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET(request) {
  try {
    await dbConnect();

    const settings = await Settings.findOneAndUpdate(
      {},
      { $inc: { downloadCount: 1 } },
      {
        upsert: true,
        returnDocument: "after",
      },
    ).lean();

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
