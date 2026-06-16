export type TrafficIntelligence = {
  dwellTime: number;
  bounceRate: number;
  ctr: number;
  ctaLevel: "strong" | "medium" | "weak";
  actions: string[];
};

export function getTrafficIntelligence(slug: string): TrafficIntelligence {
  const intentScore =
    slug.includes("how-to-fix") || slug.includes("best-exercises") || slug.includes("treatment") ? 0.82 :
    slug.includes("what-is") || slug.includes("causes") ? 0.58 :
    0.38;
  const dwellTime =
    slug.includes("forward") ? 42 :
    slug.includes("rounded") ? 36 :
    slug.includes("pelvic") ? 31 :
    24;
  const bounceRate =
    slug.includes("what-is") ? 0.68 :
    slug.includes("causes") ? 0.62 :
    0.44;
  const ctr = Number(intentScore.toFixed(2));
  const actions: string[] = [];

  if (ctr >= 0.7) actions.push("增强CTA");
  if (bounceRate >= 0.6) actions.push("增加内链");
  if (dwellTime >= 35) actions.push("强化微信引导");

  return {
    dwellTime,
    bounceRate,
    ctr,
    ctaLevel: ctr >= 0.7 || dwellTime >= 35 ? "strong" : bounceRate >= 0.6 ? "medium" : "weak",
    actions
  };
}
