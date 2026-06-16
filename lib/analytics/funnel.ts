import type { PageStats } from "./store";

export function calculateFunnel(stats: PageStats[]) {
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

  const rate = (next: number, prev: number) => Number((next / Math.max(prev, 1)).toFixed(4));
  const dropOffPages = stats
    .map((item) => ({
      page: item.page,
      ctaClickRate: rate(item.cta_click, item.page_view),
      wechatClickRate: rate(item.wechat_click, item.cta_click),
      conversionRate: rate(item.conversion, item.page_view)
    }))
    .sort((a, b) => a.conversionRate - b.conversionRate)
    .slice(0, 10);
  const highValueKeywords = stats
    .filter((item) => item.page_view > 500 && rate(item.cta_click, item.page_view) > 0.05 && item.wechat_click > 10)
    .map((item) => item.page);

  return {
    steps: {
      seoVisitToCta: rate(totals.cta_click, totals.page_view),
      ctaToWechat: rate(totals.wechat_click, totals.cta_click),
      wechatToLead: rate(totals.lead_submit, totals.wechat_click),
      leadToConversion: rate(totals.conversion, totals.lead_submit)
    },
    totals,
    dropOffPages,
    highValueKeywords
  };
}

export function markAsMoneyPages(stats: PageStats[]) {
  return stats.filter((item) => {
    const ctaClickRate = item.cta_click / Math.max(item.page_view, 1);
    return item.page_view > 500 && ctaClickRate > 0.05 && item.wechat_click > 10;
  });
}
