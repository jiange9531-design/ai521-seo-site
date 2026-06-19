import type { Metadata } from "next";
import { getPageSEO } from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const seo = getPageSEO("selfTestResult");
  return { title: seo.title, description: seo.description, alternates: { canonical: seo.canonical } };
}

export default function SelfTestResultPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <section className="mx-auto max-w-4xl px-5 py-12">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-sm">
          <p className="text-sm font-black text-jade">静态页面</p>
          <h1 className="mt-3 text-4xl font-black text-ink">自动评分已关闭</h1>
          <p className="mt-5 leading-8 text-body">稳定版不读取查询参数，也不生成用户评分结果。请前往体态评估索引查看固定内容。</p>
          <a href="/assessment/" className="mt-6 inline-flex rounded-xl bg-jade px-6 py-3 text-sm font-black text-white">
            查看体态评估
          </a>
        </div>
      </section>
    </main>
  );
}
