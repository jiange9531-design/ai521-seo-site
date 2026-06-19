import type { Metadata } from "next";
import Image from "next/image";
import { getStaticGuides, resolveAssessmentImage } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "体态改善指南｜症状、原因与训练动作",
  description: "基于体态评估内容在构建阶段生成的症状自查、原因分析和改善动作指南。",
  alternates: { canonical: "/guides/" }
};

export default function GuidesPage() {
  const guides = getStaticGuides();
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">静态内容指南</p>
        <h1 className="mt-3 text-4xl font-black text-ink">体态改善指南</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <a key={guide.slug} href={guide.canonical} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <Image src={resolveAssessmentImage(guide.assessment, "hero")} alt={guide.title} width={800} height={520} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <span className="text-xs font-black text-jade">{guide.assessment.shortTitle}</span>
                <h2 className="mt-2 text-lg font-black leading-7 text-ink">{guide.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{guide.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
