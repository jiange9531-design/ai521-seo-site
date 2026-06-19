import store from "@/content/content-store.json";

export type ContentStore = typeof store;
export type AssessmentContent = ContentStore["assessments"][number];
export type ProductContent = ContentStore["products"][number];
export type ResourceContent = ContentStore["resources"][number];
export type FAQContent = ContentStore["faqs"][number];
export type PageSEOKey = keyof ContentStore["pageSeo"];

export function getContentStore(): ContentStore {
  return store;
}

export function getSiteConfig() {
  return store.site;
}

export function getGlobalCTA() {
  return store.cta;
}

export function getPageSEO(key: PageSEOKey) {
  return store.pageSeo[key];
}

export function getAssessmentSlugs() {
  return store.assessments.map((assessment) => assessment.slug);
}

export function getAssessmentBySlug(slug: string): AssessmentContent | null {
  return store.assessments.find((assessment) => assessment.slug === slug) ?? null;
}

export function getAllAssessments(): AssessmentContent[] {
  return store.assessments;
}

export function getFeaturedAssessments(): AssessmentContent[] {
  return store.assessments.filter((assessment) => assessment.featured);
}

export function getRelatedAssessments(relatedSlugs: string[]): AssessmentContent[] {
  return relatedSlugs
    .map((slug) => getAssessmentBySlug(slug))
    .filter((assessment): assessment is AssessmentContent => Boolean(assessment));
}

export function getProductSlugs() {
  return store.products.map((product) => product.slug);
}

export function getProductBySlug(slug: string): ProductContent | null {
  return store.products.find((product) => product.slug === slug) ?? null;
}

export function getAllProducts(): ProductContent[] {
  return store.products;
}

export function getResourceSlugs() {
  return store.resources.map((resource) => resource.slug);
}

export function getResourceBySlug(slug: string): ResourceContent | null {
  return store.resources.find((resource) => resource.slug === slug) ?? null;
}

export function getAllResources(): ResourceContent[] {
  return store.resources;
}

export function getAllFAQs(): FAQContent[] {
  return store.faqs;
}

const staticGuideTypes = [
  { suffix: "symptoms", label: "症状自查" },
  { suffix: "causes", label: "原因分析" },
  { suffix: "exercises", label: "改善动作" }
] as const;

export type StaticGuide = ReturnType<typeof createStaticGuide>;

function createStaticGuide(
  assessment: AssessmentContent,
  type: (typeof staticGuideTypes)[number]
) {
  return {
    slug: `${assessment.slug}-${type.suffix}`,
    title: `${assessment.shortTitle}${type.label}｜自测与7天改善建议`,
    description: `${assessment.summary} 查看常见表现、原因、自测方法和基础改善动作。`,
    canonical: `/guides/${assessment.slug}-${type.suffix}/`,
    type: type.suffix,
    assessment
  };
}

export function getStaticGuides() {
  return getAllAssessments().flatMap((assessment) =>
    staticGuideTypes.map((type) => createStaticGuide(assessment, type))
  );
}

export function getStaticGuideBySlug(slug: string) {
  return getStaticGuides().find((guide) => guide.slug === slug) ?? null;
}

export function resolveAssessmentImage(
  assessment: AssessmentContent,
  role: "hero" | "compare" | "step",
  stepIndex = 0
) {
  if (role === "hero") return assessment.image;
  if (role === "compare") return assessment.compareImage;
  return assessment.improvements[stepIndex]?.image ?? assessment.image;
}
