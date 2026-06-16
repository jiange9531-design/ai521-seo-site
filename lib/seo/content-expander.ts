export function getAutoExpandKeywords() {
  const seedKeywords = [
    "forward head posture correction",
    "rounded shoulders fix at home",
    "pelvic tilt exercises daily",
    "knee valgus correction workout",
    "scapular winging treatment"
  ];

  const growthModifiers = [
    "for beginners",
    "without equipment",
    "for office workers",
    "daily routine",
    "pain relief guide"
  ];

  return Array.from(new Set([
    ...seedKeywords,
    ...seedKeywords.flatMap((keyword) => growthModifiers.map((modifier) => `${keyword} ${modifier}`))
  ]));
}
