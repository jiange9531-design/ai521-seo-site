import { NextResponse } from "next/server";
import { getTopViralPages } from "@/lib/seo/viral-linking";
import { stableModeMessage } from "@/lib/system/production-stable";

export const dynamic = "force-dynamic";

export async function GET() {
  const boostedPages = getTopViralPages(0.1);

  return NextResponse.json({
    ok: true,
    stable: true,
    scannedPages: boostedPages.length * 10,
    boostedCount: boostedPages.length,
    writesDisabled: true,
    message: stableModeMessage,
    strategy: {
      faq: "Add more FAQ blocks to top viral pages.",
      internalLinks: "Boost top viral page references by 3x across SEO pages.",
      cta: "Use strong WeChat CTA when viralScore > 0.8.",
      schema: "Add Article + FAQPage + traffic-loop metadata on boosted pages."
    },
    top10: boostedPages.slice(0, 10).map((page) => ({
      keyword: page.keyword,
      slug: page.slug,
      tier: page.tier,
      viralScore: Number(page.viralScore.toFixed(3)),
      url: page.href
    }))
  });
}
