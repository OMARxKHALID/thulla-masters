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
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
