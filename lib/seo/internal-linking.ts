import { generateSEOKeywords, keywordToSlug } from "./keyword-expander";
import { getTier } from "./tier-system";

export type InternalLink = {
  title: string;
  href: string;
  tier: 1 | 2 | 3;
};

function toTitle(keyword: string) {
  return keyword.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function scoreRelated(currentSlug: string, candidateSlug: string) {
  const currentTokens = new Set(currentSlug.split("-"));

  return candidateSlug
    .split("-")
    .reduce((score, token) => score + (currentTokens.has(token) ? 1 : 0), 0);
}

export function getInternalLinks(slug: string): InternalLink[] {
  const pages = generateSEOKeywords()
    .map((keyword) => {
      const pageSlug = keywordToSlug(keyword);

      return {
        title: toTitle(keyword),
        href: `/seo/${pageSlug}/`,
        slug: pageSlug,
        tier: getTier(pageSlug),
        score: scoreRelated(slug, pageSlug)
      };
    })
    .filter((page) => page.slug !== slug);

  const tier1 = pages.find((page) => page.tier === 1);
  const tier2 = pages.filter((page) => page.tier === 2).slice(0, 2);
  const used = new Set([tier1?.slug, ...tier2.map((page) => page.slug)].filter(Boolean));
  const related = pages
    .filter((page) => !used.has(page.slug))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 3);

  return [tier1, ...tier2, ...related]
    .filter((page): page is NonNullable<typeof page> => Boolean(page))
    .map(({ title, href, tier }) => ({ title, href, tier }));
}
