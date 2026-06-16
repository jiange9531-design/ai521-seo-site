export const defaultSiteUrl = "https://ai521.net";

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_URL?.trim();
  const rawUrl = explicitUrl || (vercelUrl ? `https://${vercelUrl}` : defaultSiteUrl);

  return rawUrl.replace(/\/+$/, "");
}
