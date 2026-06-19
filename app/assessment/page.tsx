import type { Metadata } from "next";
import Image from "next/image";
import { getAllAssessments, getPageSEO } from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const seo = getPageSEO("assessmentIndex");
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical }
  };
}

export default function AssessmentIndexPage() {
  const assessments = getAllAssessments();
  const topics = Array.from(new Set(assessments.flatMap((item) => item.tags)));

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">体态评估</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">常见体态问题静态评估指南</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-body">选择最接近你的问题，查看常见表现、形成原因、自查方法和基础改善建议。</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["01", "看表现", "了解常见姿势与动作表现", "/images/entry/entry-problems.png"],
            ["02", "看原因", "阅读可能的形成原因与注意事项", "/images/entry/entry-analysis.png"],
            ["03", "看方法", "查看固定自查与改善内容", "/images/entry/entry-training.png"]
          ].map(([number, title, text, image]) => (
            <div key={number} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <Image
                src={image}
                alt={`${title}体态评估`}
                width={900}
                height={620}
                className="aspect-[16/8] w-full object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-black text-jade">{number}</span>
                <strong className="mt-1 block text-lg text-ink">{title}</strong>
                <p className="mt-1 text-sm leading-6 text-body">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {topics.map((topic) => <span key={topic} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-jade">{topic}</span>)}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((item) => (
            <a key={item.slug} href={`/assessment/${item.slug}/`} className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <Image src={item.image} alt={`${item.title}体态评估`} width={900} height={620} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => <span key={tag} className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-jade">{tag}</span>)}
                </div>
                <h2 className="mt-3 text-xl font-black text-ink group-hover:text-jade">{item.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-body">{item.summary}</p>
                <span className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-black text-ink">查看静态评估指南</span>
              </div>
            </a>
          ))}
        </div>

      </section>
    </main>
  );
}
