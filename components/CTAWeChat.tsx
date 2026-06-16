"use client";

type CTAWeChatProps = {
  source?: string;
  conversionScore?: 1 | 0.5;
};

export default function CTAWeChat({ source = "体态评估页面", conversionScore = 0.5 }: CTAWeChatProps) {
  const isHighConversion = conversionScore === 1;
  const offer = isHighConversion ? "免费领取《体态矫正方案（完整版）》" : "获取基础改善方案";

  function trackWeChatClick(action: string) {
    console.log("wechat_cta_click", {
      source,
      wechat: "Wi985211DX",
      offer,
      conversionScore,
      action
    });
  }

  return (
    <section className="rounded-lg border border-jade/25 bg-mint p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-jade">免费体态评估</p>
      <h2 className="mt-2 text-2xl font-bold text-ink">{offer}</h2>
      <p className="mt-3 text-base leading-7 text-ink/75">
        添加微信领取体态改善资料包，发送你的站姿、侧面照和当前不适表现，我们会根据「{source}」给你一份初步体态判断和训练建议。
      </p>
      <p className="mt-2 text-sm leading-6 text-ink/65">
        二次引导：如果你暂时不确定问题类型，直接发送「体态评估」，先领取自测表，再按步骤拍照反馈。
      </p>
      <div className="mt-4 rounded-md border border-jade/20 bg-white/70 p-4 text-sm leading-6 text-ink/70">
        <strong className="text-ink">转化路径：</strong>
        先做免费测试 → 领取限时资料 → 发送站姿照片 → 获取7天训练建议 → 根据反馈进入针对性改善。
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="rounded-md border border-jade/30 bg-white px-4 py-3">
          <span className="text-sm text-ink/60">微信号</span>
          <strong className="ml-3 text-lg text-jade">Wi985211DX</strong>
        </div>
        <a
          href="/contact/"
          onClick={() => trackWeChatClick("claim_7_day_plan")}
          className="inline-flex items-center justify-center rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss"
        >
          领取7天训练方案
        </a>
        <a
          href="/assessment/"
          onClick={() => trackWeChatClick("start_free_test")}
          className="inline-flex items-center justify-center rounded-md border border-jade bg-white px-5 py-3 text-sm font-semibold text-jade transition hover:bg-mint"
        >
          开始免费测试
        </a>
      </div>
      <p className="mt-4 text-xs leading-5 text-ink/55">
        限时资料领取：添加微信发送「7天体态训练」，领取体态自测表、办公室拉伸清单和基础训练安排。
      </p>
    </section>
  );
}
