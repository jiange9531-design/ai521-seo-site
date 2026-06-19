import type { Metadata } from "next";
import Image from "next/image";
import { getAllAssessments, getAllProducts, getSiteConfig } from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  return {
    title: site.defaultTitle,
    description: "完成体态自测，查看对应问题，再进入7天体态修复训练计划。",
    alternates: { canonical: site.canonical }
  };
}

export default function HomePage() {
  const site = getSiteConfig();
  const assessments = getAllAssessments().slice(0, 3);
  const product = getAllProducts()[0];

  return (
    <main className="min-h-[72vh] bg-[linear-gradient(135deg,#eef5ff_0%,#ffffff_55%,#fff7d7_100%)]">
      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black text-jade">{site.brandName}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-6xl">
            自测问题
            <br />
            选择7天改善方案
          </h1>
          <p className="mt-5 text-lg leading-8 text-body">
            内容 → 体态评估 → 7天计划 → 微信交付
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-md">
            <Image
              src="/images/entry/entry-analysis.png"
              alt="体态自测与姿势分析"
              width={900}
              height={620}
              priority
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-black text-jade">入口 1</p>
              <h2 className="mt-2 text-2xl font-black text-ink">1分钟体态自测</h2>
              <p className="mt-3 flex-1 leading-7 text-body">
                用10道问题识别主要体态方向，自测结果会进入对应 assessment 页面。
              </p>
              <a href="/self-test/" className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-jade px-5 py-3 text-sm font-black text-white">
                开始体态自测
              </a>
            </div>
          </article>

          <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-md">
            <Image
              src="/images/entry/entry-problems.png"
              alt="常见体态问题评估"
              width={900}
              height={620}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-black text-jade">入口 2</p>
              <h2 className="mt-2 text-2xl font-black text-ink">常见体态问题</h2>
              <div className="mt-4 grid flex-1 gap-3">
                {assessments.map((assessment) => (
                  <a
                    key={assessment.slug}
                    href={assessment.canonical}
                    className="rounded-xl border border-line bg-panel px-4 py-3 font-black text-ink transition hover:border-jade hover:text-jade"
                  >
                    {assessment.shortTitle}：查看诊断与风险
                  </a>
                ))}
              </div>
            </div>
          </article>

          <article className="flex flex-col overflow-hidden rounded-3xl border border-accent bg-[#fff7d7] shadow-md">
            <Image
              src="/images/entry/entry-training.png"
              alt="7天体态修复训练计划"
              width={900}
              height={620}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-black text-jade">入口 3 · 唯一付费入口</p>
              <h2 className="mt-2 text-2xl font-black text-ink">{product.title}</h2>
              <p className="mt-3 flex-1 leading-7 text-body">{product.summary}</p>
              <strong className="mt-4 text-4xl font-black text-ink">{product.price}元</strong>
              <a href="/assessment/" className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-black text-ink">
                领取专属修复方案（9.9）
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
