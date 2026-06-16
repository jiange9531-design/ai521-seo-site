import { calculateFunnel, markAsMoneyPages } from "@/lib/analytics/funnel";
import { checkTrackingHealth } from "@/lib/analytics/debug-check";
import { calculateMetrics } from "@/lib/analytics/realtime-metrics";
import { realRevenue } from "@/lib/analytics/revenue-real";
import { aggregateStoredStats, readStoredEvents } from "@/lib/db/events";
import { calculateRealRevenue } from "@/lib/monetization/revenue-tracker";
import { classifyUserAgent } from "@/lib/traffic-detector";

export default async function RevenueDashboard() {
  const events = await readStoredEvents();
  const stats = await aggregateStoredStats();
  const health = checkTrackingHealth(events);
  const metrics = calculateMetrics(events);
  const revenue = calculateRealRevenue(stats);
  const funnel = calculateFunnel(stats);
  const moneyPages = markAsMoneyPages(stats);
  const firstTouch = events[0];
  const referrers = Array.from(new Set(events.map((event) => event.referrer ?? "direct"))).slice(0, 10);
  const userAgentClasses = events.reduce((acc, event) => {
    const key = classifyUserAgent(event.userAgent);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold text-ink">真实收入 Dashboard</h1>
      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-line bg-white p-5">
        <div>
          <p className="text-sm text-ink/60">Tracking Health</p>
          <strong className="text-lg text-ink">{health.status}</strong>
          {"reason" in health ? <p className="text-sm text-ink/60">{health.reason}</p> : null}
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Metric label="Last 24h Revenue" value={`￥${realRevenue(metrics.conversions)}`} />
        <Metric label="Unique Sessions" value={String(metrics.uniqueSessions)} />
        <Metric label="Real CTR" value={`${(metrics.ctr * 100).toFixed(2)}%`} />
        <Metric label="WeChat Conversion" value={`${(metrics.wechatRate * 100).toFixed(2)}%`} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Metric label="Last 24h PV" value={String(metrics.pv)} />
        <Metric label="Unique Users" value={String(metrics.uniqueUsers)} />
        <Metric label="Conversion Rate" value={`${(metrics.conversionRate * 100).toFixed(2)}%`} />
        <Metric label="All-time Revenue" value={`￥${revenue.revenue}`} />
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Top 10 Money Pages</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-mint text-ink">
              <tr>
                <th className="p-3">Page</th>
                <th className="p-3">PV</th>
                <th className="p-3">CTA</th>
                <th className="p-3">WeChat</th>
                <th className="p-3">Conversion</th>
                <th className="p-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {revenue.topPages.map((page) => (
                <tr key={page.page} className="border-t border-line">
                  <td className="p-3">{page.page}</td>
                  <td className="p-3">{page.page_view}</td>
                  <td className="p-3">{page.cta_click}</td>
                  <td className="p-3">{page.wechat_click}</td>
                  <td className="p-3">{page.conversion}</td>
                  <td className="p-3">￥{page.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">Funnel Drop-off</h2>
          <pre className="mt-4 overflow-auto rounded-md bg-mint p-4 text-xs">{JSON.stringify(funnel, null, 2)}</pre>
        </div>
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">Money Pages</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {moneyPages.map((page) => (
              <li key={page.page}>{page.page}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">First-touch Source</h2>
          <pre className="mt-4 overflow-auto rounded-md bg-mint p-4 text-xs">{JSON.stringify(firstTouch?.trafficSource ?? null, null, 2)}</pre>
        </div>
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">Referrers</h2>
          <pre className="mt-4 overflow-auto rounded-md bg-mint p-4 text-xs">{JSON.stringify(referrers, null, 2)}</pre>
        </div>
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-bold text-ink">User-agent Classification</h2>
          <pre className="mt-4 overflow-auto rounded-md bg-mint p-4 text-xs">{JSON.stringify(userAgentClasses, null, 2)}</pre>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <p className="text-sm text-ink/60">{label}</p>
      <strong className="mt-2 block text-2xl text-ink">{value}</strong>
    </div>
  );
}
