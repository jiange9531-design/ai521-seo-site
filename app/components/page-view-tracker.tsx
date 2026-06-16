"use client";

import { useEffect } from "react";
import { debugLog, sendTrackEvent } from "@/lib/analytics/track-client";

declare global {
  interface Window {
    __TIER__?: number;
    __VIRAL_SCORE__?: number;
  }
}

export default function PageViewTracker() {
  useEffect(() => {
    window.__TRACK_DEBUG__ = window.__TRACK_DEBUG__ ?? false;
    debugLog("page_view useEffect executed");

    sendTrackEvent({
      type: "page_view"
    }).catch(() => undefined);
  }, []);

  return null;
}
