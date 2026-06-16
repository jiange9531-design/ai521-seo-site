"use client";

import { trackEvent } from "@/lib/analytics/event-tracker";

type CTAWeChatProps = {
  source?: string;
  conversionScore?: 1 | 0.5;
};

export default function CTAWeChat({ source = "体态评估页面", conversionScore = 0.5 }: CTAWeChatProps) {
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
    <section className="rounded-lg border border-jade/25 bg-mint p-5 shadow-sm">
      <div>
        <p className="text-sm font-bold text-jade">免费体态评估</p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-ink">免费领取：7天体态改善训练表</h2>
      </div>

      <p className="mt-4 text-sm leading-6 text-ink/75">
        添加微信后发送关键词「体态评估」，领取体态自测表、基础动作清单和7天改善训练方案。
      </p>

      <div className="mt-4 rounded-md border border-jade/20 bg-white/75 p-4">
        <p className="text-sm font-bold text-ink">领取内容</p>
        <ul className="mt-2 grid gap-1 text-sm leading-6 text-ink/70 sm:grid-cols-2">
          <li>体态自测表</li>
          <li>7天改善训练表</li>
          <li>基础拉伸激活动作</li>
          <li>常见错误提醒</li>
        </ul>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr]">
        <div className="rounded-md border border-jade/25 bg-white px-4 py-3">
          <span className="block text-xs text-ink/55">微信号</span>
          <strong className="mt-1 block text-xl text-jade">Wi985211DX</strong>
        </div>
        <a
          href="/contact/"
          onClick={() => track("cta_click")}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-jade px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-moss"
        >
          领取7天训练方案
        </a>
      </div>

      <a
        href="/assessment/"
        onClick={() => track("lead_submit")}
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-jade bg-white px-5 py-3 text-sm font-bold text-jade transition hover:bg-white/70"
      >
        开始免费测试
      </a>
    </section>
  );
}
