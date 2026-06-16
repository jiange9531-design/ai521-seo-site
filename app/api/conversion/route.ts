import { NextResponse } from "next/server";
import { storeEvent } from "@/lib/db/events";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const event = {
    type: "conversion" as const,
    page: body.page ?? "/unknown",
    sessionId: body.sessionId ?? "server-conversion",
    tier: typeof body.tier === "number" ? body.tier : 0,
    viralScore: typeof body.viralScore === "number" ? body.viralScore : 0,
    timestamp: body.timestamp ?? Date.now(),
    userAgent: request.headers.get("user-agent") ?? body.userAgent
  };

  console.log("CONVERSION RECEIVED:", event);
  const stats = storeEvent(event);

  return NextResponse.json({
    success: true,
    received: event,
    stats: stats.find((item) => item.page === event.page)
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    endpoint: "/api/conversion",
    method: "POST"
  });
}
