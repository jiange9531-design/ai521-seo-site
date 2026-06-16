import { appendEvent, type AnalyticsEvent } from "@/lib/analytics/store";

export function storeEvent(event: AnalyticsEvent) {
  return appendEvent(event);
}
