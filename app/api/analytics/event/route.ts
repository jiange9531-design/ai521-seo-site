import { NextResponse } from "next/server";
import { isBot } from "@/lib/analytics/bot-filter";
import type { AnalyticsEvent } from "@/lib/analytics/store";
import { aggregateStoredStats, hasDuplicateEvent, storeEvent } from "@/lib/db/events";
import { detectTrafficSource } from "@/lib/traffic-detector";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<AnalyticsEvent>;
  console.log("EVENT RECEIVED:", body);

  if (!body.type || !body.page) {
    return NextResponse.json({ ok: false, error: "Invalid analytics event" }, { status: 400 });
  }

  const userAgent = body.userAgent ?? request.headers.get("user-agent") ?? "";
  const referrer = body.referrer ?? request.headers.get("referer") ?? "";
  const trafficSource = detectTrafficSource({ referrer, userAgent });

  if (isBot(userAgent)) {
    return NextResponse.json({
      success: true,
      ignored: true,
      reason: "bot traffic",
      received: body
    });
  }

  const sessionId = body.sessionId ?? "anonymous";
  const event: AnalyticsEvent = {
    type: body.type,
    page: body.page,
    sessionId,
    tier: typeof body.tier === "number" ? body.tier : 0,
    viralScore: typeof body.viralScore === "number" ? body.viralScore : 0,
    timestamp: body.timestamp ?? Date.now(),
    userAgent,
    referrer,
    trafficSource
  };
  const duplicate = await hasDuplicateEvent(event);

  if (duplicate) {
    console.log("EVENT DUPLICATE:", { event });
    return NextResponse.json({
      success: true,
      duplicate: true,
      received: body
    });
  }

  const stats = await storeEvent(event);
  console.log("EVENT STORED:", {
    type: body.type,
    page: body.page,
    sessionId,
    pipeline: `${body.type} -> persistent_store`
  });

  return NextResponse.json({
    success: true,
    received: body,
    ok: true,
    page: body.page,
    stats: stats.find((item) => item.page === body.page),
    trafficSource,
    aggregatedPages: stats.length
  });
}

export async function GET() {
  const stats = await aggregateStoredStats();

  return NextResponse.json({
    ok: true,
    stats
  });
}
