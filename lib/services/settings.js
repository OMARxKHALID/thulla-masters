import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

// Simple in-memory cache to speed up public fetches
let cachedSettings = null;
let lastFetchTime = 0;
const CACHE_TTL = 30000; // 30 seconds

export async function getSettings() {
  // Return cached data if available and fresh
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
      downloadCount: 0
    };
    
    const result = JSON.parse(JSON.stringify(data));
    
    // Update cache
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
      downloadCount: 0
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
      ...(data.downloadCount !== undefined ? { downloadCount: data.downloadCount } : {})
    },
    { upsert: true, returnDocument: 'after' }
  ).lean();

  // Invalidate cache
  cachedSettings = null;
  lastFetchTime = 0;

  return JSON.parse(JSON.stringify(updated));
}
