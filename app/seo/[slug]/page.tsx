import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmartCTA from "@/app/components/smart-cta";
import WechatCTA from "@/app/components/wechat-cta";
import { getPageStats } from "@/lib/analytics/store";
import { detectHighConversionSignals } from "@/lib/monetization/high-conversion-detector";
import { getMoneyBlocks } from "@/lib/monetization/insert-money-block";
import { getPaywallPath } from "@/lib/monetization/paywall-light";
import { conversionLayer } from "@/lib/monetization/traffic-to-cash";
import { getConversionScore } from "@/lib/seo/conversion-score";
import { getInternalLinks } from "@/lib/seo/internal-linking";
import { generateSEOKeywords, getSEOPageBySlug, keywordToSlug, slugToKeyword } from "@/lib/seo/keyword-expander";
import { getTier } from "@/lib/seo/tier-system";
import { getTrafficRoute } from "@/lib/seo/traffic-router";
import { getTrafficIntelligence } from "@/lib/seo/traffic-intelligence";
import { getTrafficTier } from "@/lib/seo/traffic-tier";
import { getViralInternalLinks } from "@/lib/seo/viral-linking";
import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return generateSEOKeywords().map((keyword) => ({
    slug: keywordToSlug(keyword)
  }));
}

function getRelatedSEOPages(currentKeyword: string) {
  const currentTokens = new Set(currentKeyword.split(" "));

  return generateSEOKeywords()
    .filter((keyword) => keyword !== currentKeyword)
    .map((keyword) => {
      const score = keyword.split(" ").reduce((total, token) => total + (currentTokens.has(token) ? 1 : 0), 0);
      return { keyword, score };
    })
    .sort((a, b) => b.score - a.score || a.keyword.localeCompare(b.keyword))
    .slice(0, 6);
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getSEOPageBySlug(params.slug);
  const keyword = page?.keyword ?? slugToKeyword(params.slug);
  const title = `${keyword} | Posture Correction Exercises and Assessment`;
  const description = `Learn ${keyword}, including causes, posture correction exercises, daily fixes, FAQ, and free WeChat body assessment guidance.`;

  return {
    title,
    description,
    keywords: [
      keyword,
      `${keyword} exercises`,
      `${keyword} treatment`,
      `${keyword} posture correction`,
      `${keyword} assessment`,
      "posture correction",
      "body assessment",
      "WeChat posture assessment"
    ],
    alternates: {
      canonical: `/seo/${params.slug}/`
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${getSiteUrl()}/seo/${params.slug}/`,
      siteName: "Posture Assessment Center"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function Page({ params }: PageProps) {
  const page = getSEOPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const tier = getTrafficTier(params.slug);
  const seoTier = getTier(params.slug);
  const conversionScore = getConversionScore(params.slug);
  const keyword = page.keyword;
  const related = getRelatedSEOPages(keyword);
  const internalLinks = getInternalLinks(params.slug);
  const trafficRoute = getTrafficRoute(params.slug);
  const trafficIntelligence = getTrafficIntelligence(params.slug);
  const pageStats = getPageStats(`/seo/${params.slug}/`);
  const conversion = conversionLayer(seoTier, trafficRoute.viralScore);
  const conversionSignals = detectHighConversionSignals({
    viralScore: trafficRoute.viralScore,
    dwellTime: trafficIntelligence.dwellTime,
    bounceRate: trafficIntelligence.bounceRate
  });
  const paywallPath = getPaywallPath(seoTier);
  const viralLinks = getViralInternalLinks(params.slug);
  const moneyBlocks = getMoneyBlocks(keyword, internalLinks);
  const pageUrl = `${getSiteUrl()}/seo/${params.slug}/`;
  const faqItems = [
    {
      question: `What is ${keyword}?`,
      answer: `${keyword} refers to a posture or movement issue that is usually related to muscle imbalance, poor daily posture habits, limited mobility, and weak control muscles.`
    },
    {
      question: `How do you fix ${keyword} at home?`,
      answer: `Start with gentle mobility work, then add strengthening exercises and daily posture correction. If pain, numbness, or weakness gets worse, seek an in-person medical assessment.`
    },
    {
      question: `How long does it take to improve ${keyword}?`,
      answer: `Most people need several weeks of consistent practice. A 7-day plan can help you build awareness, but lasting changes usually require 4 to 8 weeks of progressive training.`
    }
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: titleCase(keyword),
        description: `Practical guide for ${keyword}, including causes, fixes, exercises, FAQ, and WeChat body assessment CTA.`,
        url: pageUrl,
        inLanguage: "en",
        keywords: keyword,
        articleSection: ["Causes", "Fix", "Exercises", "FAQ"],
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ReadAction",
          userInteractionCount: trafficRoute.traffic
        },
        publisher: {
          "@type": "Organization",
          name: "Posture Assessment Center"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__TIER__=${JSON.stringify(seoTier)};window.__VIRAL_SCORE__=${JSON.stringify(trafficRoute.viralScore)};`
        }}
      />

      <article className="prose prose-slate max-w-none">
        <p className="text-sm font-semibold uppercase tracking-wide text-jade">Auto SEO posture page</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink">{titleCase(keyword)}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          This page explains {keyword} with practical exercises, posture correction steps, self-assessment signals, and a WeChat conversion path for users who want a free body assessment.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">Causes</h2>
          <div className="mb-5 rounded-lg border border-jade/20 bg-mint p-5">
            <h3 className="text-lg font-bold text-ink">{moneyBlocks.afterH2.title}</h3>
            <p className="mt-2 leading-7 text-ink/70">{moneyBlocks.afterH2.body}</p>
          </div>
          <p className="mt-3 leading-7 text-ink/75">
            The most common causes of {keyword} are muscle imbalance, weak stabilizers, poor desk posture, repeated phone use, limited mobility, and training habits that reinforce compensation. For office workers, the issue often becomes more obvious after long sitting because the neck, shoulders, pelvis, and knees adapt to the same position for many hours.
          </p>
          <p className="mt-3 leading-7 text-ink/75">
            A useful SEO page should not only describe the problem, but also help the visitor understand whether they need mobility, strength, or posture habit changes. That is why this page combines causes, fixes, exercises, FAQ, and internal links to related posture correction pages.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">Fix</h2>
          {conversionSignals.addSolutionBlock ? (
            <div className="mb-5 rounded-lg border border-line bg-white p-5">
              <h3 className="text-lg font-bold text-ink">{moneyBlocks.middle.title}</h3>
              <p className="mt-2 leading-7 text-ink/70">{moneyBlocks.middle.body}</p>
            </div>
          ) : null}
          <ul className="mt-4 space-y-3">
            <li className="rounded-md border border-line bg-white p-4">Mobility training to restore comfortable range of motion.</li>
            <li className="rounded-md border border-line bg-white p-4">Strength training for weak stabilizing muscles.</li>
            <li className="rounded-md border border-line bg-white p-4">Daily posture correction during sitting, standing, walking, and exercise.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">Exercises</h2>
          <ul className="mt-4 space-y-3">
            <li className="rounded-md border border-line bg-white p-4">Breathing reset: slow nasal inhale, long exhale, ribs down, spine relaxed.</li>
            <li className="rounded-md border border-line bg-white p-4">Mobility drill: gentle controlled movement around the restricted area for 8 to 12 reps.</li>
            <li className="rounded-md border border-line bg-white p-4">Strength drill: low-load activation with clean alignment and no pain compensation.</li>
          </ul>
        </section>

        <section className="mt-10 rounded-lg border border-jade/30 bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">Free to Paid Path</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-md bg-mint p-4">
              <h3 className="font-bold text-ink">免费内容</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{paywallPath.free}</p>
            </div>
            <div className="rounded-md bg-mint p-4">
              <h3 className="font-bold text-ink">半付费内容</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{paywallPath.semiPaid}</p>
            </div>
            <div className="rounded-md bg-mint p-4">
              <h3 className="font-bold text-ink">高价值内容</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{paywallPath.premium}</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqItems.map((faq) => (
              <section key={faq.question} className="rounded-lg border border-line bg-white p-5">
                <h3 className="text-lg font-bold text-ink">{faq.question}</h3>
                <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">Related Posture Pages</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {related.slice(0, 3).map(({ keyword: item }) => (
              <a key={item} href={`/seo/${keywordToSlug(item)}/`} className="rounded-lg border border-line bg-white p-5 no-underline transition hover:border-jade">
                <h3 className="text-base font-bold text-ink">{titleCase(item)}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">Read the related correction guide and compare symptoms, exercises, and daily posture changes.</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">Traffic Loop Links</h2>
          <p className="mt-3 leading-7 text-ink/70">
            The system routes lower-intent SEO visitors toward higher-conversion posture pages, creating a closed loop from search traffic to WeChat conversion.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {internalLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg border border-line bg-white p-5 no-underline transition hover:border-jade">
                <span className="text-xs font-semibold uppercase tracking-wide text-jade">Tier {link.tier}</span>
                <h3 className="mt-2 text-base font-bold text-ink">{link.title}</h3>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">Viral Boost Links</h2>
          <p className="mt-3 leading-7 text-ink/70">
            High viralScore pages receive amplified internal links, while low-value pages route visitors toward higher-conversion posture correction pages.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {viralLinks.slice(0, 6).map((link, index) => (
              <a key={`${link.href}-${index}`} href={link.href} className="rounded-lg border border-line bg-white p-5 no-underline transition hover:border-jade">
                <span className="text-xs font-semibold uppercase tracking-wide text-jade">
                  {link.boosted ? "Boosted Viral Link" : `Tier ${link.tier}`}
                </span>
                <h3 className="mt-2 text-base font-bold text-ink">{link.title}</h3>
              </a>
            ))}
          </div>
        </section>

        {trafficRoute.shouldShowTier1Popup ? (
          <section className="mt-10 rounded-lg border border-jade/30 bg-mint p-6">
            <h2 className="text-2xl font-bold text-ink">Recommended High-Conversion Pages</h2>
            <p className="mt-3 leading-7 text-ink/70">
              This lower-value traffic page automatically redirects attention toward Tier 1 correction pages before the user leaves.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {trafficRoute.recommendedTargets.map((target) => (
                <a key={target.href} href={target.href} className="rounded-lg border border-jade/20 bg-white p-5 no-underline transition hover:border-jade">
                  <h3 className="text-base font-bold text-ink">{titleCase(target.keyword)}</h3>
                  <p className="mt-2 text-sm text-ink/65">Go to stronger conversion page</p>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 rounded-lg border border-jade/30 bg-mint p-6">
          <h2 className="text-2xl font-bold text-ink">{moneyBlocks.ending.title}</h2>
          <p className="mt-3 leading-7 text-ink/70">{moneyBlocks.ending.body}</p>
          <a href="/contact/" className="mt-5 inline-flex rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-moss">
            {conversion.cta}
          </a>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {moneyBlocks.ending.links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-md border border-jade/20 bg-white p-4 text-sm font-semibold text-ink no-underline hover:border-jade">
                {link.title}
              </a>
            ))}
          </div>
        </section>
      </article>

      <div className="mt-10">
        <SmartCTA
          page={`/seo/${params.slug}/`}
          pageSlug={params.slug}
          tier={seoTier}
          viralScore={trafficRoute.viralScore}
          pageStats={pageStats}
          bounceRate={trafficIntelligence.bounceRate}
        />
      </div>

      <div className="mt-10">
        <WechatCTA
          source={keyword}
          conversionScore={conversionScore}
          tier={seoTier}
          viralScore={trafficRoute.viralScore}
          intelligenceLevel={trafficIntelligence.ctaLevel}
          keyword={keyword}
          dwellTime={trafficIntelligence.dwellTime}
        />
      </div>
      <MonetizationBlock tier={tier} keyword={keyword} />
    </main>
  );
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function MonetizationBlock({ tier, keyword }: { tier: ReturnType<typeof getTrafficTier>; keyword: string }) {
  const content = {
    TIER_1: {
      label: "高转化入口",
      title: "免费体态评估",
      description: `你正在查看 ${keyword}，这类页面通常代表明确的体态改善需求。添加微信后发送站姿照片，可获得初步体态判断和7天训练建议。`
    },
    TIER_2: {
      label: "资料包入口",
      title: "训练资料包领取",
      description: `你正在查看 ${keyword}，适合先领取动作资料包，再根据膝盖、肩胛或动作视频反馈做进一步评估。`
    },
    TIER_3: {
      label: "关注培育入口",
      title: "每日姿势科普关注引导",
      description: `你正在查看 ${keyword}，可以先添加微信领取每日姿势科普、办公室拉伸清单和基础体态自测表。`
    }
  }[tier];

  return (
    <section className="mt-10 rounded-lg border border-jade/30 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-jade">{content.label}</p>
      <h2 className="mt-2 text-2xl font-bold text-ink">{content.title}</h2>
      <p className="mt-3 leading-7 text-ink/70">{content.description}</p>
      <div className="mt-5 rounded-md bg-mint p-4">
        <span className="text-sm text-ink/60">微信：</span>
        <strong className="text-lg text-jade">Wi985211DX</strong>
      </div>
    </section>
  );
}
