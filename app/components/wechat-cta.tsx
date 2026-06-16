"use client";

type WechatCTAProps = {
  conversionScore?: 1 | 0.5;
  tier?: 1 | 2 | 3;
  viralScore?: number;
  intelligenceLevel?: "strong" | "medium" | "weak";
  keyword?: string;
  dwellTime?: number;
  source?: string;
};

export default function WechatCTA({
  conversionScore = 0.5,
  tier = 3,
  viralScore = 0,
  intelligenceLevel = "weak",
  keyword,
  dwellTime = 0,
  source = "SEO页面"
}: WechatCTAProps) {
  const keywordText = keyword ?? source;
  const dwellBoost = dwellTime > 60;
  const viralConfig =
    viralScore > 0.8 || dwellBoost
      ? {
          label: "🔥 限时领取（强引导）",
          title: "免费领取《完整体态矫正方案》",
          body: `仅限今日推荐页面：${keywordText} 这个问题90%人都会错。当前页面属于高热度高转化内容，建议立即添加微信领取完整训练方案（免费）。`,
          button: "立即领取完整方案",
          action: "claim_viral_full_plan",
          buttonClass: "bg-jade text-white hover:bg-moss"
        }
      : viralScore >= 0.5
        ? {
            label: "中强CTA",
            title: "领取重点改善训练方案",
            body: `很多人练错了 ${keywordText} 的关键位置。当前页面有较强搜索意图，适合领取重点训练建议，并通过微信补充照片做初步判断。`,
            button: "领取重点方案",
            action: "claim_mid_viral_plan",
            buttonClass: "bg-jade text-white hover:bg-moss"
          }
        : null;
  const tierConfig = {
    1: {
      label: "强转化微信入口",
      title: "免费领取《完整体态矫正训练方案（高级版）》",
      body: "你这个问题90%人都会错。建议直接添加微信领取完整训练方案（免费），并发送站姿照片获取初步判断。",
      button: "立即领取高级版方案",
      action: "claim_advanced_full_plan",
      buttonClass: "bg-jade text-white hover:bg-moss"
    },
    2: {
      label: "中等转化入口",
      title: "领取基础改善方案",
      body: "很多人练错了这里。适合先领取基础修复方案，再根据动作视频或站姿照片判断是否进入完整方案。",
      button: "领取基础改善方案",
      action: "claim_basic_plan",
      buttonClass: "bg-jade text-white hover:bg-moss"
    },
    3: {
      label: "SEO培育入口",
      title: "查看基础知识",
      body: "了解正确方法。建议先阅读内容和内链页面，再添加微信领取每日姿势科普与自测表。",
      button: "查看并关注科普",
      action: "follow_posture_education",
      buttonClass: "border border-jade bg-white text-jade hover:bg-mint"
    }
  }[tier];
  const config = viralConfig ?? (intelligenceLevel === "strong" && tier !== 3 ? { ...tierConfig, label: `${tierConfig.label} · 智能增强` } : tierConfig);

  function trackClick() {
    console.log("wechat_monetization_cta_click", {
      source,
      conversionScore,
      tier,
      viralScore,
      intelligenceLevel,
      keyword: keywordText,
      dwellTime,
      action: config.action,
      wechat: "Wi985211DX"
    });
  }

  return (
    <section className="rounded-lg border border-jade/30 bg-mint p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-jade">
        {config.label}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-ink">{config.title}</h2>
      <p className="mt-3 leading-7 text-ink/70">
        {config.body}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="rounded-md border border-jade/30 bg-white px-4 py-3">
          <span className="text-sm text-ink/60">微信：</span>
          <strong className="text-lg text-jade">Wi985211DX</strong>
        </div>
        <a
          href={`https://wechat/Wi985211DX?from=seo_${source.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
          onClick={trackClick}
          className={`inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${config.buttonClass}`}
        >
          {config.button}
        </a>
      </div>
    </section>
  );
}
