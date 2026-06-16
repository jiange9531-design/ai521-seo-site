import { NextResponse } from "next/server";
import { isBot } from "@/lib/analytics/bot-filter";
import { aggregateStats, readEvents, type AnalyticsEvent } from "@/lib/analytics/store";
import { storeEvent } from "@/lib/db/events";
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
  const key = `${sessionId}-${body.type}-${body.page}`;
  const duplicate = readEvents().some((event) => `${event.sessionId}-${event.type}-${event.page}` === key);

  if (duplicate) {
    console.log("EVENT DUPLICATE:", { key, body });
    return NextResponse.json({
      success: true,
      duplicate: true,
      received: body
    });
  }

  const stats = storeEvent({
    type: body.type,
    page: body.page,
    sessionId,
    tier: typeof body.tier === "number" ? body.tier : 0,
    viralScore: typeof body.viralScore === "number" ? body.viralScore : 0,
    timestamp: body.timestamp ?? Date.now(),
    userAgent,
    referrer,
    trafficSource
  });
  console.log("EVENT STORED:", {
    type: body.type,
    page: body.page,
    sessionId,
    pipeline: `${body.type} -> json_store`
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
  const stats = aggregateStats();

  return NextResponse.json({
    ok: true,
    stats
  });
}
