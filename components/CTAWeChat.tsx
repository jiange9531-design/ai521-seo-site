"use client";

import { trackEvent } from "@/lib/analytics/event-tracker";

type CTAWeChatProps = {
  source?: string;
  conversionScore?: 1 | 0.5;
  compact?: boolean;
};

export default function CTAWeChat({ source = "体态评估页面", conversionScore = 0.5, compact = false }: CTAWeChatProps) {
  const isHighConversion = conversionScore === 1;

  function track(action: "cta_click" | "lead_submit") {
    console.log("wechat_cta_click", {
      source,
      action,
      wechat: "Wi985211DX",
      conversionScore
    });

    void trackEvent({
      type: action,
      page: window.location.pathname,
      tier: isHighConversion ? 1 : 2,
      viralScore: isHighConversion ? 0.9 : 0.5,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  }

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="rounded-xl bg-panel p-5">
        <p className="text-sm font-black text-jade">免费领取</p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-ink">7天体态改善训练表</h2>
        <p className="mt-3 text-sm leading-6 text-body">
          添加微信后发送关键词「体态评估」，领取体态自测表、基础动作清单和7天改善训练方案。
        </p>
      </div>

      {!compact && (
        <ul className="mt-4 grid gap-2 text-sm text-body sm:grid-cols-2">
          {["体态自测表", "7天改善训练表", "基础拉伸激活动作", "常见错误提醒"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-line bg-white px-4 py-3">
          <span className="block text-xs text-body">微信号</span>
          <strong className="mt-1 block text-xl text-jade">Wi985211DX</strong>
        </div>
        <a
          href="/contact/"
          onClick={() => track("cta_click")}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-jade px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-moss"
        >
          领取7天训练方案
        </a>
      </div>

      <a
        href="/assessment/"
        onClick={() => track("lead_submit")}
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-jade bg-white px-5 py-3 text-sm font-black text-jade transition hover:bg-mint"
      >
        开始免费测试
      </a>
    </section>
  );
}
