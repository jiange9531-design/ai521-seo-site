import { NextResponse } from "next/server";
import { stableModeMessage } from "@/lib/system/production-stable";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({
    ok: true,
    stable: true,
    createdCount: 0,
    message: stableModeMessage
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    stable: true,
    createdCount: 0,
    note: stableModeMessage
  });
}
