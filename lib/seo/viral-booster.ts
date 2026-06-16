import { getViralPages } from "./viral-linking";

export function getViralBoostPlan() {
  const pages = getViralPages();
  const topCount = Math.max(1, Math.ceil(pages.length * 0.1));
  const topPages = pages.slice(0, topCount);

  return {
    totalPages: pages.length,
    boostedCount: topPages.length,
    topPages,
    rules: {
      priority: "Top 10% pages get sitemap priority 0.95",
      internalLinks: "Top viral pages receive 3x internal link exposure",
      cta: "Top viral pages use strong WeChat CTA",
      schema: "Top viral pages receive Article + FAQPage + interaction metadata"
    }
  };
}
