import { generateSEOKeywords, keywordToSlug } from "./keyword-expander";
import { getTier } from "./tier-system";
import { getViralScore } from "./viral-score";

export function getEstimatedTraffic(slug: string) {
  const intentBoost =
    slug.includes("how-to-fix") || slug.includes("best-exercises") || slug.includes("treatment") ? 1.4 :
    slug.includes("what-is") || slug.includes("causes") ? 0.7 :
    0.25;
  const topicBoost =
    slug.includes("forward") ? 1.8 :
    slug.includes("rounded") ? 1.3 :
    slug.includes("pelvic") ? 1 :
    slug.includes("knee") ? 0.6 :
    0.35;

  return intentBoost + topicBoost;
}

export function getHighConversionTargets(limit = 3) {
  return generateSEOKeywords()
    .map((keyword) => {
      const slug = keywordToSlug(keyword);
      const traffic = getEstimatedTraffic(slug);

      return {
        keyword,
        slug,
        href: `/seo/${slug}/`,
        tier: getTier(slug),
        viralScore: getViralScore(slug, traffic)
      };
    })
    .filter((page) => page.tier === 1)
    .sort((a, b) => b.viralScore - a.viralScore)
    .slice(0, limit);
}

export function getTrafficRoute(slug: string) {
  const traffic = getEstimatedTraffic(slug);
  const viralScore = getViralScore(slug, traffic);
  const tier = getTier(slug);

  return {
    tier,
    traffic,
    viralScore,
    shouldShowTier1Popup: tier === 3 || viralScore < 0.8,
    recommendedTargets: getHighConversionTargets(3)
  };
}
