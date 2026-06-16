import { getSessionId } from "./session";

export type EventType =
  | "page_view"
  | "cta_click"
  | "wechat_click"
  | "lead_submit"
  | "conversion";

export function trackEvent(event: {
  type: EventType;
  page: string;
  tier: number;
  viralScore: number;
  timestamp: number;
  sessionId?: string;
  userAgent?: string;
}) {
  return fetch("/api/analytics/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...event,
      sessionId: event.sessionId ?? getSessionId()
    })
  });
}
