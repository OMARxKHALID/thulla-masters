import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    apkDownloadUrl: {
      type: String,
      default: "/thulla-masters.apk",
    },
    buySellUrl: {
      type: String,
      default: "https://www.youtube.com/",
    },
    socialLinks: {
      facebook: { type: String, default: "https://www.facebook.com/" },
      whatsapp: { type: String, default: "https://www.whatsapp.com/" },
      tiktok: { type: String, default: "https://www.tiktok.com/" },
      instagram: { type: String, default: "https://www.instagram.com/" },
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    downloadHistory: [
      {
        timestamp: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Settings;
}

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
