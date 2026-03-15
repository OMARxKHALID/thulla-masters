import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

// Simple in-memory cache to speed up public fetches
let cachedSettings = null;
let lastFetchTime = 0;
const CACHE_TTL = 30000; // 30 seconds

export function invalidateSettingsCache() {
  cachedSettings = null;
  lastFetchTime = 0;
}

export async function getSettings() {
  const now = Date.now();
  if (cachedSettings && (now - lastFetchTime < CACHE_TTL)) {
    return cachedSettings;
  }

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
      downloadHistory: []
    };
    
    // Ensure downloadHistory is an array if the document exists but lacks the field
    if (!data.downloadHistory) data.downloadHistory = [];
    
    const result = JSON.parse(JSON.stringify(data));
    
    cachedSettings = result;
    lastFetchTime = Date.now();
    
    return result;
  } catch (error) {
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
      downloadHistory: []
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
      ...(data.downloadCount !== undefined ? { downloadCount: data.downloadCount } : {}),
      ...(data.downloadHistory !== undefined ? { downloadHistory: data.downloadHistory } : {})
    },
    { upsert: true, returnDocument: 'after' }
  ).lean();

  invalidateSettingsCache();

  return JSON.parse(JSON.stringify(updated));
}
