import type { MetadataRoute } from "next";
import { getAssessmentSlugs } from "@/lib/assessment";
import { getConversionScore } from "@/lib/seo/conversion-score";
import { generateSEOKeywords, keywordToSlug } from "@/lib/seo/keyword-expander";
import { getTier } from "@/lib/seo/tier-system";
import { getEstimatedTraffic } from "@/lib/seo/traffic-router";
import { getViralBoostPlan } from "@/lib/seo/viral-booster";
import { getViralScore } from "@/lib/seo/viral-score";
import { getSiteUrl } from "@/lib/site";

const boostedSlugs = new Set(getViralBoostPlan().topPages.map((page) => page.slug));

function getPriority(path: string) {
  if (path === "") return 1;
  if (path.includes("/seo/")) {
    const slug = path.split("/seo/")[1] ?? "";
    const score = getConversionScore(slug);
    const tier = getTier(slug);
    const viralScore = getViralScore(slug, getEstimatedTraffic(slug));

    if (boostedSlugs.has(slug)) return 0.95;
    if (viralScore > 0.8) return 0.95;
    if (score === 1) return 0.95;
    if (tier === 2) return 0.75;
    return 0.55;
  }
  if (path.includes("/assessment/")) return 0.9;
  return 0.7;
}

function getChangeFrequency(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.includes("/seo/")) {
    const slug = path.split("/seo/")[1] ?? "";
    const tier = getTier(slug);
    const viralScore = getViralScore(slug, getEstimatedTraffic(slug));

    if (boostedSlugs.has(slug)) return "daily";
    if (viralScore > 0.8) return "daily";
    if (tier === 1) return "daily";
    if (tier === 2) return "weekly";
    return "monthly";
  }

  if (path.includes("/assessment/")) return "weekly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticPages = ["", "/assessment", "/resources", "/faq", "/contact"];
  const assessmentPages = getAssessmentSlugs().map((slug) => `/assessment/${slug}`);
  const seoPages = generateSEOKeywords().map((keyword) => `/seo/${keywordToSlug(keyword)}`);

  return [...staticPages, ...assessmentPages, ...seoPages].map((path) => ({
    url: `${baseUrl}${path}/`.replace(/([^:]\/)\/+/g, "$1"),
    lastModified: path.includes("/seo/") && getViralScore(path, getEstimatedTraffic(path)) > 0.8 ? new Date() : new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path)
  }));
}
