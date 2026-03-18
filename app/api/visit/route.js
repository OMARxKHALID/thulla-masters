import { NextResponse, connection } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function POST(request) {
  await connection();
  try {
    await dbConnect();
    console.log(">>> [LOG] Visitor API hit registered.");
    await Settings.findOneAndUpdate(
      {},
      {
        $inc: { visitorCount: 1 },
        $push: {
          visitorHistory: {
            $each: [{ timestamp: new Date() }],
            $slice: -15000,
          },
        },
      },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
