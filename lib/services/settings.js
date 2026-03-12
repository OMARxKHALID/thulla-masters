import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function getSettings() {
  await dbConnect();
  try {
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
    return JSON.parse(JSON.stringify(data));
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
  return JSON.parse(JSON.stringify(updated));
}
