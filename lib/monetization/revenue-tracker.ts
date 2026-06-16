import type { PageStats } from "@/lib/analytics/store";

export function calculateRealRevenue(stats: PageStats[]) {
  const avgOrderValue = 399;
  const totals = stats.reduce(
    (acc, item) => ({
      page_view: acc.page_view + item.page_view,
      cta_click: acc.cta_click + item.cta_click,
      wechat_click: acc.wechat_click + item.wechat_click,
      lead_submit: acc.lead_submit + item.lead_submit,
      conversion: acc.conversion + item.conversion
    }),
    { page_view: 0, cta_click: 0, wechat_click: 0, lead_submit: 0, conversion: 0 }
  );
  const topPagesByConversion = [...stats]
    .sort((a, b) => b.conversion - a.conversion || b.wechat_click - a.wechat_click)
    .slice(0, 10)
    .map((item) => ({
      ...item,
      revenue: item.conversion * avgOrderValue,
      ctaClickRate: item.cta_click / Math.max(item.page_view, 1),
      wechatClickRate: item.wechat_click / Math.max(item.cta_click, 1),
      conversionRate: item.conversion / Math.max(item.page_view, 1)
    }));
  const realConversionRate = totals.conversion / Math.max(totals.page_view, 1);

  return {
    revenue: totals.conversion * avgOrderValue,
    conversionRate: realConversionRate,
    ctaClickRate: totals.cta_click / Math.max(totals.page_view, 1),
    wechatClickRate: totals.wechat_click / Math.max(totals.cta_click, 1),
    realLeadsPerDay: totals.lead_submit,
    topPages: topPagesByConversion,
    totals
  };
}
