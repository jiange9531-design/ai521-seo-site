"use client";

import { useEffect, useState } from "react";
import { sendTrackEvent } from "@/lib/analytics/track-client";

const page = "/traffic-check";
const tier = 1;
const viralScore = 1;

export default function TrafficCheckClient() {
  const [logs, setLogs] = useState<string[]>([]);

  function addLog(message: string) {
    setLogs((current) => [`${new Date().toLocaleTimeString()} ${message}`, ...current].slice(0, 20));
  }

  async function send(type: "page_view" | "cta_click" | "wechat_click" | "lead_submit" | "conversion") {
    const result = await sendTrackEvent({ type, page, tier, viralScore });
    addLog(`${type} -> ${result?.success ? "stored" : result?.duplicate ? "duplicate" : "sent"}`);
  }

  async function runFullFunnel() {
    await send("page_view");
    await send("cta_click");
    await send("wechat_click");
    await send("lead_submit");
    await send("conversion");
  }

  useEffect(() => {
    window.__TRACK_DEBUG__ = true;
    window.__TIER__ = tier;
    window.__VIRAL_SCORE__ = viralScore;
    send("page_view").catch(() => undefined);
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-4xl font-bold text-ink">Traffic Input Check</h1>
      <p className="mt-4 leading-7 text-ink/70">
        This page verifies that real users can trigger page_view, CTA click, WeChat click, lead submit, and conversion events.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <button className="rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white" onClick={() => send("page_view")}>
          Send page_view
        </button>
        <button className="rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white" onClick={() => send("cta_click")}>
          CTA test button
        </button>
        <button className="rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white" onClick={() => send("wechat_click")}>
          WeChat click test
        </button>
        <button className="rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white" onClick={() => send("lead_submit")}>
          Lead submit test
        </button>
        <button className="rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white" onClick={() => send("conversion")}>
          Conversion test trigger
        </button>
        <button className="rounded-md border border-jade bg-white px-5 py-3 text-sm font-semibold text-jade" onClick={runFullFunnel}>
          Run full funnel
        </button>
      </div>

      <section className="mt-8 rounded-lg border border-line bg-white p-5">
        <h2 className="text-xl font-bold text-ink">Debug logs</h2>
        <pre className="mt-4 whitespace-pre-wrap rounded-md bg-mint p-4 text-xs">{logs.join("\n")}</pre>
      </section>
    </main>
  );
}
