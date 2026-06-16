import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const sitemapUrl = `${getSiteUrl()}/sitemap.xml`;
  const endpoint = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      cache: "no-store"
    });

    return NextResponse.json({
      ok: response.ok,
      sitemap: sitemapUrl,
      endpoint,
      status: response.status,
      log: `Submitted sitemap ping request to Google for ${sitemapUrl}`
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      sitemap: sitemapUrl,
      endpoint,
      error: error instanceof Error ? error.message : "Unknown error",
      log: "Google sitemap ping request failed. Submit sitemap manually in Google Search Console if needed."
    }, { status: 500 });
  }
}
