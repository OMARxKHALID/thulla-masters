import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getSettings } from "@/lib/services/settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings || {});
}
