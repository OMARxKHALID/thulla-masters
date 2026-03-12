"use server";

import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function incrementDownloadCount() {
  try {
    console.log("Incrementing download count...");
    await dbConnect();
    const updated = await Settings.findOneAndUpdate(
      {},
      { $inc: { downloadCount: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("New count:", updated.downloadCount);
    return { success: true, count: updated.downloadCount, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error incrementing download count:", error);
    return { success: false };
  }
}
