export type TrafficTier = "TIER_1" | "TIER_2" | "TIER_3";

export function getTrafficTier(slug: string): TrafficTier {
  const tier1 = [
    "forward-head-posture",
    "rounded-shoulders",
    "pelvic-tilt"
  ];

  const tier2 = [
    "knee-valgus",
    "scapular-winging"
  ];

  const conversionIntent = [
    "how-to-fix",
    "best-exercises-for",
    "treatment-for",
    "home-remedy-for",
    "exercise-plan",
    "correction-routine",
    "rehab-exercises"
  ];

  const hasConversionIntent = conversionIntent.some((intent) => slug.includes(intent));

  if (tier1.includes(slug)) return "TIER_1";
  if (tier2.includes(slug)) return "TIER_2";
  if (hasConversionIntent && tier1.some((keyword) => slug.includes(keyword))) return "TIER_1";
  if (hasConversionIntent && tier2.some((keyword) => slug.includes(keyword))) return "TIER_2";
  return "TIER_3";
}
