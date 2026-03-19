import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { headers } from "next/headers";

export async function getSettings() {
  await headers();
  try {
    await dbConnect();
    const settings = await Settings.findOne({}).lean();
    
    const defaults = {
      apkDownloadUrl: "/thulla-masters.apk",
      buySellUrl: "https://www.youtube.com/",
      redirectUrl: "",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://www.whatsapp.com/",
        tiktok: "https://www.tiktok.com/",
        instagram: "https://www.instagram.com/",
      },
      downloadCount: 0,
      visitorCount: 0,
      downloadHistory: [],
      visitorHistory: [],
    };

    if (!settings) return JSON.parse(JSON.stringify(defaults));

    const merged = {
      ...defaults,
      ...settings,
      socialLinks: {
         ...defaults.socialLinks,
         ...(settings.socialLinks || {})
      }
    };

    return JSON.parse(JSON.stringify(merged));
  } catch {
    return {
      apkDownloadUrl: "/thulla-masters.apk",
      buySellUrl: "https://www.youtube.com/",
      redirectUrl: "",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://www.whatsapp.com/",
        tiktok: "https://www.tiktok.com/",
        instagram: "https://www.instagram.com/",
      },
      downloadCount: 0,
      visitorCount: 0,
      downloadHistory: [],
      visitorHistory: [],
    };
  }
}

export async function updateSettings(data) {
  await dbConnect();
  
  const updatePayload = {
    apkDownloadUrl: data.apkDownloadUrl,
    buySellUrl: data.buySellUrl,
    redirectUrl: data.redirectUrl,
    socialLinks: data.socialLinks,
  };

  if (data.downloadCount !== undefined) updatePayload.downloadCount = data.downloadCount;
  if (data.downloadHistory !== undefined) updatePayload.downloadHistory = data.downloadHistory;
  if (data.visitorCount !== undefined) updatePayload.visitorCount = data.visitorCount;
  if (data.visitorHistory !== undefined) updatePayload.visitorHistory = data.visitorHistory;

  const updated = await Settings.findOneAndUpdate(
    {},
    updatePayload,
    { upsert: true, returnDocument: "after" }
  ).lean();

  return JSON.parse(JSON.stringify(updated));
}
