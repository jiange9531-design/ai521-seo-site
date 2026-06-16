export function getConversionScore(slug: string) {
  const high = ["forward-head-posture", "rounded-shoulders"];

  if (high.some((keyword) => slug.includes(keyword))) return 1;
  return 0.5;
}
