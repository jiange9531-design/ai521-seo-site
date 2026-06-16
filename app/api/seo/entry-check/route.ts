import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const entries = ["/seo/what-is-forward-head-posture/", "/assessment/forward-head/", "/blog/", "/home/"];

export async function GET() {
  const baseUrl = getSiteUrl();
  const started = Date.now();
  const results = await Promise.all(entries.map(async (path) => {
    const start = Date.now();
    const url = `${baseUrl}${path}`;

    try {
      const response = await fetch(url, { cache: "no-store" });
      const html = await response.text().catch(() => "");

      return {
        path,
        indexed: response.ok && !html.toLowerCase().includes("noindex"),
        crawlStatus: response.status,
        responseTime: Date.now() - start
      };
    } catch (error) {
      return {
        path,
        indexed: false,
        crawlStatus: "fetch_failed",
        responseTime: Date.now() - start,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }));

  return NextResponse.json({
    ok: true,
    checkedAt: new Date().toISOString(),
    totalResponseTime: Date.now() - started,
    results
  });
}
