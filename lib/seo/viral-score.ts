export function getViralScore(slug: string, traffic: number) {
  const baseScore =
    slug.includes("forward") ? 1 :
    slug.includes("rounded") ? 0.8 :
    slug.includes("pelvic") ? 0.7 :
    0.4;

  return baseScore * Math.log(traffic + 1);
}
