export type SEOTier = 1 | 2 | 3;

export function getTier(slug: string): SEOTier {
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
    "home-treatment",
    "correction-at-home",
    "correction",
    "treatment",
    "exercise",
    "workout"
  ];
  const hasConversionIntent = conversionIntent.some((intent) => slug.includes(intent));

  if (tier1.includes(slug)) return 1;
  if (tier2.includes(slug)) return 2;
  if (hasConversionIntent && tier1.some((keyword) => slug.includes(keyword))) return 1;
  if (hasConversionIntent && tier2.some((keyword) => slug.includes(keyword))) return 2;
  return 3;
}
