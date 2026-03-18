import { cacheTag, cacheLife } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

const SETTINGS_CACHE_TAG = "settings";

export async function getSettings() {
  "use cache";
  cacheLife("hours");
  cacheTag(SETTINGS_CACHE_TAG);

  try {
    await dbConnect();
    const settings = await Settings.findOne({}).lean();
    const data = settings || {
      apkDownloadUrl: "/thulla-masters.apk",
      buySellUrl: "https://www.youtube.com/",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://www.whatsapp.com/",
        tiktok: "https://www.tiktok.com/",
        instagram: "https://www.instagram.com/",
      },
      downloadCount: 0,
      downloadHistory: [],
    };

    if (!data.downloadHistory) data.downloadHistory = [];

    return JSON.parse(JSON.stringify(data));
  } catch {
    return {
      apkDownloadUrl: "/thulla-masters.apk",
      buySellUrl: "https://www.youtube.com/",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://www.whatsapp.com/",
        tiktok: "https://www.tiktok.com/",
        instagram: "https://www.instagram.com/",
      },
      downloadCount: 0,
      downloadHistory: [],
    };
  }
}

export async function updateSettings(data) {
  await dbConnect();
  const updated = await Settings.findOneAndUpdate(
    {},
    {
      apkDownloadUrl: data.apkDownloadUrl,
      buySellUrl: data.buySellUrl,
      socialLinks: data.socialLinks,
      ...(data.downloadCount !== undefined
        ? { downloadCount: data.downloadCount }
        : {}),
      ...(data.downloadHistory !== undefined
        ? { downloadHistory: data.downloadHistory }
        : {}),
    },
    { upsert: true, returnDocument: "after" }
  ).lean();

  return JSON.parse(JSON.stringify(updated));
}
