"use server";

import { updateSettings } from "@/lib/services/settings";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "thulla-masters-secret-key-123";
const secret = new TextEncoder().encode(JWT_SECRET);

const extractUserId = (userId) => {
  if (!userId) return null;
  if (typeof userId === 'string') return userId;
  if (userId.buffer) return Buffer.from(Object.values(userId.buffer)).toString('hex');
  if (typeof userId === 'object') {
    return userId.toString() === "[object Object]" ? null : userId.toString();
  }
  return userId.toString();
};

export async function saveSettingsAction(formData) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return { error: "Not authenticated" };

    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin') return { error: "Unauthorized" };
    
    await dbConnect();
    
    const userId = extractUserId(payload.userId);
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
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function resetDownloadsAction(password) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return { error: "Not authenticated" };

    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'admin') return { error: "Unauthorized" };
    
    await dbConnect();
    
    const userId = extractUserId(payload.userId);
    if (!userId) return { error: "Invalid session" };

    const user = await User.findById(userId);
    if (!user) return { error: "User not found" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "Incorrect password" };

    await updateSettings({ downloadCount: 0 });
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
