import { NextResponse } from "next/server";
import { getSettings } from "@/lib/services/settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings || {});
}
