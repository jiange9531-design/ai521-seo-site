import { getSiteConfig } from "@/lib/assessment";

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_URL?.trim();
  const rawUrl = explicitUrl || (vercelUrl ? `https://${vercelUrl}` : getSiteConfig().domain);

  return rawUrl.replace(/\/+$/, "");
}
