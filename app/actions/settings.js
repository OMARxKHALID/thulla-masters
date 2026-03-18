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

    const userId = payload.userId?.toString();
    if (!userId) return { error: "Invalid session" };

    const user = await User.findById(userId);
    if (!user) return { error: "User not found" };

    const socialLinks = {
      facebook: formData.get("facebook"),
      whatsapp: formData.get("whatsapp"),
      tiktok: formData.get("tiktok"),
      instagram: formData.get("instagram"),
    };

    const data = {
      apkDownloadUrl: formData.get("apkDownloadUrl"),
      buySellUrl: formData.get("buySellUrl"),
      socialLinks,
    };

    await updateSettings(data);


    revalidateTag("settings");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { error: error.message };
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

    await updateSettings({ downloadCount: 0, downloadHistory: [] });

    revalidateTag("settings");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
