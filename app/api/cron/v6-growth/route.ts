import { NextResponse } from "next/server";
import { stableModeMessage } from "@/lib/system/production-stable";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    stable: true,
    createdToday: 0,
    build: { triggered: false, reason: "Stable mode disables automatic builds" },
    message: stableModeMessage
  });
}
