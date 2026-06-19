import type { Metadata } from "next";
import { getAllProducts } from "@/lib/assessment";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export function generateMetadata(): Metadata {
  const product = getAllProducts()[0];
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: product.canonical }
  };
}

export default function NineNinePlanPage() {
  const product = getAllProducts()[0];
  const riskLevel: RiskLevel = "HIGH";

  return (
    <main className="flex min-h-screen items-center bg-[linear-gradient(180deg,#fff0ed_0%,#ffffff_520px)] px-5 py-12">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-red-200 bg-white p-6 shadow-xl sm:p-9">
        <p className="text-sm font-black text-red-700">风险诊断锁</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">
          你的体态风险等级：{riskLevel}
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {(["LOW", "MEDIUM", "HIGH"] as RiskLevel[]).map((level) => (
            <div
              key={level}
              className={`rounded-xl border px-3 py-4 text-center text-sm font-black ${
                level === riskLevel
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-line bg-panel text-body"
              }`}
            >
              {level}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-red-50 p-5">
          <p className="text-sm font-black text-red-700">HIGH 风险提示</p>
          <h2 className="mt-2 text-2xl font-black text-red-950">
            检测到高风险体态问题，必须修复
          </h2>
          <p className="mt-3 leading-8 text-red-900">
            系统检测到高风险结构问题，继续放任可能导致长期损伤
          </p>
          <p className="mt-3 font-black text-red-950">
            该问题若持续，将影响长期身体结构稳定性
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-ink p-6 text-white">
          <p className="text-sm font-black text-accent">9.9元训练方案</p>
          <h2 className="mt-2 text-3xl font-black">{product.title}</h2>
          <p className="mt-4 text-5xl font-black text-accent">¥{product.price}</p>
          <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
            <p className="text-xs font-black text-white/60">当前方案保留时间</p>
            <div className="mt-2 flex items-center justify-center gap-2 font-mono text-3xl font-black text-accent">
              <span>00</span><span>:</span><span>09</span><span>:</span><span>59</span>
            </div>
          </div>
          <a
            href="/wechat/"
            aria-label="立即领取修复方案（9.9）"
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-xl bg-accent px-6 py-4 text-center text-base font-black text-ink"
          >
            领取专属修复方案（9.9）
          </a>
        </div>
      </section>
    </main>
  );
}
