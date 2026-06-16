"use client";

import { trackEvent } from "@/lib/analytics/event-tracker";

type CTAWeChatProps = {
  source?: string;
  conversionScore?: 1 | 0.5;
};

export default function CTAWeChat({ source = "体态评估页面", conversionScore = 0.5 }: CTAWeChatProps) {
  const isHighConversion = conversionScore === 1;
  const offer = isHighConversion ? "免费领取《完整体态矫正训练方案》" : "获取基础改善方案";
  const subOffer = isHighConversion ? "含自测表、7天训练计划和办公室拉伸清单" : "含基础动作建议和常见错误提醒";

  function track(action: "cta_click" | "wechat_click" | "lead_submit") {
    console.log("wechat_cta_click", {
      source,
      action,
      wechat: "Wi985211DX",
      offer,
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-jade">免费体态评估</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-ink">{offer}</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-jade">微信转化</span>
      </div>

      <p className="mt-4 text-base leading-7 text-ink/75">
        添加微信后发送“体态评估”，领取资料包。你可以把站姿、侧面照和当前不适位置发来，我们会根据“{source}”给你一份初步建议。
      </p>

      <div className="mt-4 rounded-md border border-jade/20 bg-white/75 p-4">
        <p className="text-sm font-bold text-ink">领取内容</p>
        <p className="mt-2 text-sm leading-6 text-ink/70">{subOffer}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr]">
        <div className="rounded-md border border-jade/25 bg-white px-4 py-3">
          <span className="block text-xs text-ink/55">微信号</span>
          <strong className="mt-1 block text-xl text-jade">Wi985211DX</strong>
        </div>
        <a
          href="/contact/"
          onClick={() => track("cta_click")}
          className="inline-flex min-h-16 items-center justify-center rounded-md bg-jade px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-moss"
        >
          领取7天训练方案
        </a>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <a
          href="/assessment/"
          onClick={() => track("lead_submit")}
          className="inline-flex items-center justify-center rounded-md border border-jade bg-white px-5 py-3 text-sm font-bold text-jade transition hover:bg-white/70"
        >
          开始免费测试
        </a>
        <a
          href="/contact/"
          onClick={() => track("wechat_click")}
          className="inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-jade hover:text-jade"
        >
          添加微信领取
        </a>
      </div>

      <p className="mt-4 text-xs leading-5 text-ink/55">
        转化路径：免费测试 → 领取资料 → 发送照片 → 获取7天训练建议 → 根据反馈继续调整。
      </p>
    </section>
  );
}
