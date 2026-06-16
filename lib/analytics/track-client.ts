"use client";

import { getSessionId } from "./session";
import type { EventType } from "./event-tracker";

declare global {
  interface Window {
    __TRACK_DEBUG__?: boolean;
    __TIER__?: number;
    __VIRAL_SCORE__?: number;
  }
}

export type ClientTrackPayload = {
  type: EventType;
  page?: string;
  tier?: number;
  viralScore?: number;
};

export function debugLog(message: string, payload?: unknown) {
  if (typeof window !== "undefined" && window.__TRACK_DEBUG__) {
    console.log(`[TRACK DEBUG] ${message}`, payload ?? "");
  }
}

export async function sendTrackEvent(payload: ClientTrackPayload) {
  const event = {
    type: payload.type,
    page: payload.page ?? window.location.pathname,
    sessionId: getSessionId(),
    tier: payload.tier ?? window.__TIER__ ?? 0,
    viralScore: payload.viralScore ?? window.__VIRAL_SCORE__ ?? 0,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    referrer: document.referrer
  };

  debugLog("event payload", event);

  try {
    const response = await fetch("/api/analytics/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
    const result = await response.json().catch(() => null);
    debugLog(`${payload.type} server response`, result);
    return result;
  } catch (error) {
    debugLog(`${payload.type} failed`, error);
    return null;
  }
}
