import fs from "node:fs";
import path from "node:path";
import type { EventType } from "./event-tracker";

export type AnalyticsEvent = {
  type: EventType;
  page: string;
  sessionId: string;
  tier: number;
  viralScore: number;
  timestamp: number;
  userAgent?: string;
  referrer?: string;
  trafficSource?: {
    google: boolean;
    direct: boolean;
    bot: boolean;
    referral: string;
  };
};

export type PageStats = {
  page: string;
  tier: number;
  viralScore: number;
  page_view: number;
  cta_click: number;
  wechat_click: number;
  lead_submit: number;
  conversion: number;
  uniqueSessions: number;
};

type MutablePageStats = Omit<PageStats, "uniqueSessions"> & {
  sessions: Set<string>;
};

const analyticsDir = path.join(process.cwd(), "content", "analytics");
const eventsFile = path.join(analyticsDir, "events.json");

export function readEvents() {
  if (!fs.existsSync(eventsFile)) {
    return [] as AnalyticsEvent[];
  }

  try {
    const events = JSON.parse(fs.readFileSync(eventsFile, "utf8")) as Array<Partial<AnalyticsEvent>>;

    return events.map((event) => ({
      type: event.type!,
      page: event.page!,
      sessionId: event.sessionId ?? "legacy",
      tier: event.tier ?? 0,
      viralScore: event.viralScore ?? 0,
      timestamp: event.timestamp ?? Date.now(),
      userAgent: event.userAgent,
      referrer: event.referrer,
      trafficSource: event.trafficSource
    }));
  } catch {
    return [] as AnalyticsEvent[];
  }
}

export function appendEvent(event: AnalyticsEvent) {
  fs.mkdirSync(analyticsDir, { recursive: true });
  const events = readEvents();
  events.push(event);
  fs.writeFileSync(eventsFile, `${JSON.stringify(events, null, 2)}\n`, "utf8");
  return aggregateStats(events);
}

export function aggregateStats(events = readEvents()) {
  const stats = new Map<string, MutablePageStats>();

  for (const event of events) {
    const current =
      stats.get(event.page) ??
      {
        page: event.page,
        tier: event.tier,
        viralScore: event.viralScore,
        page_view: 0,
        cta_click: 0,
        wechat_click: 0,
        lead_submit: 0,
        conversion: 0,
        sessions: new Set<string>()
      };

    current[event.type] += 1;
    current.sessions.add(event.sessionId ?? "unknown");
    current.tier = event.tier;
    current.viralScore = event.viralScore;
    stats.set(event.page, current);
  }

  return Array.from(stats.values()).map(({ sessions, ...item }) => ({
    ...item,
    uniqueSessions: sessions.size
  }));
}

export function getPageStats(page: string) {
  return aggregateStats().find((item) => item.page === page);
}
