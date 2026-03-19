import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { getSettings } from "@/lib/services/settings";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  const settingsData = await getSettings();

  const initialSettings = {
    apkDownloadUrl: settingsData.apkDownloadUrl || "",
    buySellUrl: settingsData.buySellUrl || "",
    redirectUrl: settingsData.redirectUrl || "",
    socialLinks: {
      facebook: settingsData.socialLinks?.facebook || "",
      whatsapp: settingsData.socialLinks?.whatsapp || "",
      tiktok: settingsData.socialLinks?.tiktok || "",
      instagram: settingsData.socialLinks?.instagram || "",
    },
    downloadCount: settingsData.downloadCount || 0,
    visitorCount: settingsData.visitorCount || 0,
    downloadHistory: settingsData.downloadHistory || [],
    visitorHistory: settingsData.visitorHistory || [],
  };

  return <AdminClient initialSettings={initialSettings} user={user} />;
}
