import fs from "node:fs";
import path from "node:path";
import { getAutoExpandKeywords } from "./content-expander";

const baseKeywords = [
  "forward head posture",
  "rounded shoulders",
  "pelvic tilt",
  "knee valgus",
  "scapular winging"
];

const intents = [
  "what is",
  "how to fix",
  "best exercises for",
  "causes of",
  "treatment for",
  "how serious is",
  "home remedy for"
];

const audiences = [
  "office workers",
  "beginners",
  "women",
  "men",
  "students",
  "desk workers",
  "remote workers",
  "people with neck pain",
  "people with back pain",
  "fitness beginners"
];

const contexts = [
  "at home",
  "without equipment",
  "with resistance band",
  "after sitting all day",
  "from desk posture",
  "for daily routine",
  "in 7 days",
  "before workout",
  "after workout",
  "for posture assessment"
];

const modifiers = [
  "guide",
  "symptoms",
  "self test",
  "exercise plan",
  "correction routine",
  "mobility routine",
  "strengthening routine",
  "pain relief",
  "posture correction",
  "rehab exercises",
  "common mistakes",
  "step by step",
  "daily exercises",
  "beginner routine",
  "assessment checklist"
];

function uniqueKeywords(keywords: string[]) {
  return Array.from(new Set(keywords.map((keyword) => keyword.trim().toLowerCase()).filter(Boolean)));
}

export function expandKeywords(base: string[]) {
  const symptomModifiers = [
    "neck pain",
    "shoulder pain",
    "back pain",
    "stiff neck",
    "poor posture"
  ];
  const problemModifiers = [
    "from desk work",
    "after sitting all day",
    "for office workers",
    "without equipment",
    "at home"
  ];
  const questionModifiers = [
    "why",
    "how fast can you fix",
    "what exercises help",
    "how long does it take to fix",
    "what happens if you ignore"
  ];

  return uniqueKeywords(base.flatMap((keyword) => [
    `how to fix ${keyword}`,
    `what is ${keyword}`,
    `best exercises for ${keyword}`,
    `home treatment ${keyword}`,
    `${keyword} correction at home`
  ].concat(
    symptomModifiers.map((modifier) => `${keyword} with ${modifier}`),
    problemModifiers.map((modifier) => `${keyword} ${modifier}`),
    questionModifiers.map((modifier) => `${modifier} ${keyword}`)
  )));
}

export function keywordToSlug(keyword: string) {
  return keyword
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function slugToKeyword(slug: string) {
  return slug.replaceAll("-", " ");
}

export function generateSEOKeywords() {
  const result: string[] = [];

  for (const keyword of baseKeywords) {
    for (const intent of intents) {
      result.push(`${intent} ${keyword}`);
    }
  }

  for (const keyword of baseKeywords) {
    for (const intent of intents) {
      for (const audience of audiences) {
        for (const context of contexts) {
          result.push(`${intent} ${keyword} for ${audience} ${context}`);
        }
      }
    }
  }

  for (const keyword of baseKeywords) {
    for (const modifier of modifiers) {
      for (const audience of audiences) {
        result.push(`${keyword} ${modifier} for ${audience}`);
      }
    }
  }

  result.push(...getAutoExpandKeywords());
  result.push(...expandKeywords(getAutoExpandKeywords()));
  result.push(...readPublishedSEOKeywords());

  return uniqueKeywords(result);
}

export function getSEOPageBySlug(slug: string) {
  const keywords = generateSEOKeywords();
  const keyword = keywords.find((item) => keywordToSlug(item) === slug);

  return keyword ? { slug, keyword } : null;
}

function readPublishedSEOKeywords() {
  const filePath = path.join(process.cwd(), "content", "seo", "auto-generated.json");

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const pages = JSON.parse(fs.readFileSync(filePath, "utf8")) as Array<{ keyword?: string }>;
    return pages.map((page) => page.keyword).filter((keyword): keyword is string => Boolean(keyword));
  } catch {
    return [];
  }
}
