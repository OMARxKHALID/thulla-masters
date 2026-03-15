"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
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

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    await dbConnect();
    const userId = extractUserId(payload.userId);
    if (!userId) return null;
    const user = await User.findById(userId).select("-password").lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
}

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { error: "Invalid credentials" };
    }

    const token = await new SignJWT({ userId: user._id.toString(), email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function logoutAction() {
  (await cookies()).delete("token");
}

export async function updateProfileAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const newPassword = formData.get("newPassword");
  const currentPassword = formData.get("currentPassword");

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return { error: "Not authenticated" };

    const { payload } = await jwtVerify(token, secret);
    await dbConnect();
    const userId = extractUserId(payload.userId);
    if (!userId) return { error: "Invalid user session" };
    
    const user = await User.findById(userId);
    if (!user) return { error: "User not found" };

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return { error: "Current password incorrect" };

    if (name) user.name = name;
    if (email) user.email = email;
    if (newPassword) {
      if (newPassword.length < 6) return { error: "New password too short" };
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
