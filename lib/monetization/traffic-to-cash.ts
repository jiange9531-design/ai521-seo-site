export function conversionLayer(tier: number, viralScore: number) {
  if (tier === 1) {
    return {
      cta: viralScore > 0.8 ? "领取完整康复方案（免费）" : "领取完整康复方案",
      type: "high_intent_lead",
      conversion: "wechat"
    };
  }

  if (tier === 2) {
    return {
      cta: "获取基础改善训练包",
      type: "mid_intent_lead",
      conversion: "wechat"
    };
  }

  return {
    cta: "查看完整方法",
    type: "low_intent_lead",
    conversion: "soft_click"
  };
}
