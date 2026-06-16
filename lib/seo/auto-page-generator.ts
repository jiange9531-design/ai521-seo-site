import fs from "node:fs";
import path from "node:path";
import { generateSEOArticle } from "../ai/content-generator";
import { getAutoExpandKeywords } from "./content-expander";
import { expandKeywords, keywordToSlug } from "./keyword-expander";
import { getInternalLinks } from "./internal-linking";
import { getTier } from "./tier-system";

export type AutoSEOPage = {
  keyword: string;
  slug: string;
  content: string;
  faq: {
    question: string;
    answer: string;
  }[];
  schema: Record<string, unknown>;
  article?: ReturnType<typeof generateSEOArticle>;
  tier?: 1 | 2 | 3;
  cta?: string;
  internalLinks?: string[];
  createdAt: string;
};

const generatedDir = path.join(process.cwd(), "content", "seo");
const generatedFile = path.join(generatedDir, "auto-generated.json");

export function buildAutoSEOPage(keyword: string): AutoSEOPage {
  const slug = keywordToSlug(keyword);
  const faq = [
    {
      question: `What is ${keyword}?`,
      answer: `${keyword} is a posture correction topic related to alignment, muscle control, mobility, and daily habits.`
    },
    {
      question: `How can I improve ${keyword}?`,
      answer: "Start with a simple assessment, then combine mobility drills, strength training, and daily posture correction."
    },
    {
      question: `When should I get help for ${keyword}?`,
      answer: "If pain, numbness, weakness, or symptoms keep getting worse, get an in-person professional assessment."
    }
  ];
  const content = [
    `${keyword} is a common search topic for people who want a practical posture correction plan. The first step is to understand whether the issue is mainly caused by tight muscles, weak stabilizers, poor desk posture, or repeated movement compensation.`,
    "A useful plan should include mobility work, strength training, breathing control, and daily habit correction. Most people should begin with low intensity exercises and focus on clean alignment instead of chasing fatigue.",
    "For monetization, this page guides visitors to a WeChat assessment path. Users can send posture photos, describe symptoms, and receive a basic plan or a full correction guide depending on conversion score."
  ].join("\n\n");

  return {
    keyword,
    slug,
    content,
    faq,
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    },
    article: generateSEOArticle(keyword),
    tier: getTier(slug),
    cta: getTier(slug) === 1 ? "strong" : getTier(slug) === 2 ? "medium" : "weak",
    internalLinks: getInternalLinks(slug).map((link) => link.href),
    createdAt: new Date().toISOString()
  };
}

export function readGeneratedSEOPages() {
  if (!fs.existsSync(generatedFile)) {
    return [] as AutoSEOPage[];
  }

  return JSON.parse(fs.readFileSync(generatedFile, "utf8")) as AutoSEOPage[];
}

export function writeGeneratedSEOPages(pages: AutoSEOPage[]) {
  fs.mkdirSync(generatedDir, { recursive: true });
  fs.writeFileSync(generatedFile, `${JSON.stringify(pages, null, 2)}\n`, "utf8");
}

export function generateAutoSEOPages(limit = getAutoExpandKeywords().length) {
  const existing = readGeneratedSEOPages();
  const existingSlugs = new Set(existing.map((page) => page.slug));
  const candidates = getAutoExpandKeywords()
    .map(buildAutoSEOPage)
    .filter((page) => !existingSlugs.has(page.slug))
    .slice(0, limit);
  const pages = [...existing, ...candidates];

  writeGeneratedSEOPages(pages);

  return {
    created: candidates,
    total: pages.length
  };
}

export function generateV6GrowthPages(limit = 50) {
  const base = getAutoExpandKeywords();
  const expanded = expandKeywords(base);
  const existing = readGeneratedSEOPages();
  const existingSlugs = new Set(existing.map((page) => page.slug));
  const candidates = expanded
    .map(buildAutoSEOPage)
    .filter((page) => !existingSlugs.has(page.slug))
    .slice(0, limit);
  const pages = [...existing, ...candidates];

  writeGeneratedSEOPages(pages);

  return {
    created: candidates.map((page) => ({
      ...page,
      tier: getTier(page.slug)
    })),
    total: pages.length
  };
}

export function publishV8Articles(limit = 10) {
  const base = getAutoExpandKeywords();
  const expanded = expandKeywords(base);
  const existing = readGeneratedSEOPages();
  const existingSlugs = new Set(existing.map((page) => page.slug));
  const created = expanded
    .map(buildAutoSEOPage)
    .filter((page) => !existingSlugs.has(page.slug))
    .slice(0, limit);
  const pages = [...existing, ...created];

  writeGeneratedSEOPages(pages);

  return {
    created,
    total: pages.length
  };
}

export function growV8Articles(min = 30, max = 80) {
  const limit = Math.max(min, Math.min(max, 50));

  return publishV8Articles(limit);
}
