"use client";

import { debugLog, sendTrackEvent } from "@/lib/analytics/track-client";

type WechatButtonProps = {
  pageSlug?: string;
  tier?: number;
  viralScore?: number;
  children?: React.ReactNode;
};

export default function WechatButton({ pageSlug, tier = 0, viralScore = 0, children = "微信：Wi985211DX" }: WechatButtonProps) {
  function trackWechatClick() {
    debugLog("WeChat click detected");
    sendTrackEvent({ type: "wechat_click", tier, viralScore }).catch(() => undefined);
  }

  return (
    <a
      href={`https://wechat/Wi985211DX?from=seo_${pageSlug ?? "unknown"}`}
      onClick={trackWechatClick}
      className="inline-flex items-center justify-center rounded-md border border-jade bg-white px-5 py-3 text-sm font-semibold text-jade transition hover:bg-mint"
    >
      {children}
    </a>
  );
}
