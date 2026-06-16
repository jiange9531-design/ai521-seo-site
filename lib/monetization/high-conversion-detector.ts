export function detectHighConversionSignals({
  viralScore,
  dwellTime,
  bounceRate
}: {
  viralScore: number;
  dwellTime: number;
  bounceRate: number;
}) {
  return {
    enhanceCTA: viralScore > 0.8,
    forceWechatEntry: dwellTime > 60,
    addSolutionBlock: bounceRate > 0.6,
    level: viralScore > 0.8 || dwellTime > 60 ? "high" : bounceRate > 0.6 ? "medium" : "low"
  };
}
