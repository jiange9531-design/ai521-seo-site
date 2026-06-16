import { NextResponse } from "next/server";
import { getMoneyBlocks } from "@/lib/monetization/insert-money-block";
import { conversionLayer } from "@/lib/monetization/traffic-to-cash";
import { getInternalLinks } from "@/lib/seo/internal-linking";
import { generateSEOKeywords, keywordToSlug } from "@/lib/seo/keyword-expander";
import { getTier } from "@/lib/seo/tier-system";
import { getEstimatedTraffic } from "@/lib/seo/traffic-router";
import { getViralScore } from "@/lib/seo/viral-score";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = generateSEOKeywords().slice(0, 20).map((keyword) => {
    const slug = keywordToSlug(keyword);
    const tier = getTier(slug);
    const viralScore = getViralScore(slug, getEstimatedTraffic(slug));
    const moneyBlocks = getMoneyBlocks(keyword, getInternalLinks(slug));

    return {
      keyword,
      slug,
      url: `/seo/${slug}/`,
      revenueStructure: {
        painPoint: moneyBlocks.afterH2.body,
        wrongBelief: "只靠拉伸或照着动作练，通常不能解决真正的体态代偿。",
        correctMethod: moneyBlocks.middle.body,
        trainingActions: ["mobility drill", "strength drill", "daily posture correction"],
        freeClaim: conversionLayer(tier, viralScore).cta,
        wechatConversion: "Wi985211DX"
      }
    };
  });

  return NextResponse.json({
    ok: true,
    enhancedCount: pages.length,
    pages
  });
}
