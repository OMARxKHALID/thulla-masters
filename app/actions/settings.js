"use server";

import { revalidateTag } from "next/cache";
import { updateSettings } from "@/lib/services/settings";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is not set.");
const secret = new TextEncoder().encode(JWT_SECRET);

async function verifyAdmin() {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Not authenticated");
  const { payload } = await jwtVerify(token, secret);
  if (payload.role !== "admin") throw new Error("Unauthorized");
  return payload;
}

export async function saveSettingsAction(formData) {
  try {
    const payload = await verifyAdmin();
    await dbConnect();

    const apkDownloadUrl = formData.get("apkDownloadUrl")?.toString().trim();
    const buySellUrl = formData.get("buySellUrl")?.toString().trim();
    const redirectUrl = formData.get("redirectUrl")?.toString().trim() || "";
    
    if (redirectUrl && !redirectUrl.startsWith('http') && !redirectUrl.startsWith('/')) {
      return { error: "Invalid redirect URL format." };
    }

    if (!apkDownloadUrl || !apkDownloadUrl.startsWith('http') && !apkDownloadUrl.startsWith('/')) {
      return { error: "Invalid APK URL format." };
    }

    const socialLinks = {
      facebook: formData.get("facebook")?.toString().trim() || "",
      whatsapp: formData.get("whatsapp")?.toString().trim() || "",
      tiktok: formData.get("tiktok")?.toString().trim() || "",
      instagram: formData.get("instagram")?.toString().trim() || "",
    };

    const userId = payload.userId?.toString();
    const user = await User.findById(userId);
    if (!user) return { error: "User session expired." };

    const data = {
      apkDownloadUrl,
      buySellUrl,
      redirectUrl,
      socialLinks,
    };

    await updateSettings(data);
    revalidateTag("settings", "max");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return { error: "Failed to sync settings. Please check your inputs." };
  }
}

export async function resetDownloadsAction(password) {
  try {
    const payload = await verifyAdmin();
    await dbConnect();

    const userId = payload.userId?.toString();
    if (!userId) return { error: "Invalid session" };

    const user = await User.findById(userId);
    if (!user) return { error: "User not found" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "Incorrect password" };

    await updateSettings({ 
      downloadCount: 0, 
      downloadHistory: [],
      visitorCount: 0,
      visitorHistory: [] 
    });

    revalidateTag("settings", "max");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
