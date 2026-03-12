import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(uploadPath, buffer);
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
