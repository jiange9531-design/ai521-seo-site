"use client";

import { useEffect, useMemo } from "react";
import WechatButton from "@/app/components/wechat-button";
import { debugLog, sendTrackEvent } from "@/lib/analytics/track-client";
import type { PageStats } from "@/lib/analytics/store";

type SmartCTAProps = {
  page: string;
  pageSlug: string;
  tier: number;
  viralScore: number;
  pageStats?: PageStats;
  bounceRate?: number;
};

export default function SmartCTA({ page, pageSlug, tier, viralScore, pageStats, bounceRate = 0 }: SmartCTAProps) {
  const cta = useMemo(() => {
    if (tier === 1 && viralScore > 0.8) {
      return "领取完整康复方案（限时免费）";
    }

    if ((pageStats?.page_view ?? 0) > 1000 && (pageStats?.conversion ?? 0) === 0) {
      return "获取专业评估（微信一对一）";
    }

    if (bounceRate > 0.7) {
      return "查看3分钟改善方法";
    }

    return tier === 2 ? "获取基础改善训练包" : "查看完整方法";
  }, [bounceRate, pageStats?.conversion, pageStats?.page_view, tier, viralScore]);

  useEffect(() => {
    window.__TIER__ = tier;
    window.__VIRAL_SCORE__ = viralScore;
    debugLog("SmartCTA mounted", { tier, viralScore });

    sendTrackEvent({
      type: "page_view",
      tier,
      viralScore
    }).catch(() => undefined);
  }, [tier, viralScore]);

  async function handleCtaClick() {
    debugLog("CTA click detected");
    await sendTrackEvent({ type: "cta_click", tier, viralScore });
    await sendTrackEvent({ type: "wechat_click", tier, viralScore });

    window.location.href = `https://wechat/Wi985211DX?from=seo_${pageSlug}`;
  }

  return (
    <section className="rounded-lg border border-jade/30 bg-mint p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-jade">真实转化追踪 CTA</p>
      <h2 className="mt-2 text-2xl font-bold text-ink">{cta}</h2>
      <p className="mt-3 leading-7 text-ink/70">
        点击会记录真实 CTA 与微信行为，用于判断这个页面是否真正赚钱。
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleCtaClick}
          className="inline-flex items-center justify-center rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss"
        >
          {cta}
        </button>
        <WechatButton pageSlug={pageSlug} tier={tier} viralScore={viralScore} />
      </div>
    </section>
  );
}
