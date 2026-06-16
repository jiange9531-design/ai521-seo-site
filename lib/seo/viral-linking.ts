import { generateSEOKeywords, keywordToSlug } from "./keyword-expander";
import { getEstimatedTraffic } from "./traffic-router";
import { getTier } from "./tier-system";
import { getViralScore } from "./viral-score";

export type ViralLink = {
  title: string;
  href: string;
  slug: string;
  tier: 1 | 2 | 3;
  viralScore: number;
  boosted: boolean;
};

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getViralPages() {
  return generateSEOKeywords()
    .map((keyword) => {
      const slug = keywordToSlug(keyword);
      const viralScore = getViralScore(slug, getEstimatedTraffic(slug));

      return {
        keyword,
        slug,
        href: `/seo/${slug}/`,
        tier: getTier(slug),
        viralScore
      };
    })
    .sort((a, b) => b.viralScore - a.viralScore);
}

export function getTopViralPages(percent = 0.1) {
  const pages = getViralPages();
  const count = Math.max(1, Math.ceil(pages.length * percent));

  return pages.slice(0, count);
}

export function getViralInternalLinks(currentSlug: string): ViralLink[] {
  const pages = getViralPages().filter((page) => page.slug !== currentSlug);
  const topViral = pages.slice(0, 3).flatMap((page) => [page, page, page]);
  const lowQualityRoute = pages.filter((page) => page.tier === 1).slice(0, 3);
  const related = pages
    .filter((page) => page.slug.includes(currentSlug.split("-")[0]) || currentSlug.includes(page.slug.split("-")[0]))
    .slice(0, 3);

  return [...topViral, ...lowQualityRoute, ...related].slice(0, 12).map((page, index) => ({
    title: titleCase(page.keyword),
    href: page.href,
    slug: page.slug,
    tier: page.tier,
    viralScore: page.viralScore,
    boosted: index < 9
  }));
}
