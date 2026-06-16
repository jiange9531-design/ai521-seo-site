import type { AnalyticsEvent } from "./store";

export function checkTrackingHealth(events: AnalyticsEvent[]) {
  if (events.length === 0) {
    return {
      status: "BROKEN",
      reason: "No events received from frontend"
    };
  }

  return {
    status: "OK"
  };
}
