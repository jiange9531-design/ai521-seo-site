import type { AnalyticsEvent } from "./store";

function count(events: AnalyticsEvent[], type: AnalyticsEvent["type"]) {
  return events.filter((event) => event.type === type).length;
}

function unique(events: AnalyticsEvent[], key: keyof AnalyticsEvent) {
  return new Set(events.map((event) => event[key]).filter(Boolean)).size;
}

export function calculateMetrics(events: AnalyticsEvent[]) {
  const last24h = events.filter((event) => Date.now() - event.timestamp < 86400000);
  const ratio = (next: AnalyticsEvent["type"], prev: AnalyticsEvent["type"]) =>
    Number((count(last24h, next) / Math.max(count(last24h, prev), 1)).toFixed(4));

  return {
    pv: count(last24h, "page_view"),
    ctr: ratio("cta_click", "page_view"),
    wechatRate: ratio("wechat_click", "cta_click"),
    conversionRate: ratio("conversion", "wechat_click"),
    conversions: count(last24h, "conversion"),
    uniqueSessions: unique(last24h, "sessionId"),
    uniqueUsers: unique(last24h, "sessionId"),
    last24h
  };
}
