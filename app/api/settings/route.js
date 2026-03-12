import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getSettings, updateSettings } from "@/lib/services/settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings || {});
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { downloadCount, _id, __v, ...updateData } = body;
    const settings = await updateSettings(updateData);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
