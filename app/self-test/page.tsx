import type { Metadata } from "next";
import Image from "next/image";
import { getAllAssessments, getPageSEO } from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const seo = getPageSEO("selfTest");
  return { title: seo.title, description: seo.description, alternates: { canonical: seo.canonical } };
}

export default function SelfTestPage() {
  const assessments = getAllAssessments();

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <section className="mx-auto max-w-5xl px-5 py-12">
        <p className="text-sm font-black text-jade">静态问题索引</p>
        <h1 className="mt-3 text-4xl font-black text-ink">选择需要查看的体态问题</h1>
        <p className="mt-4 leading-8 text-body">当前稳定版不进行答题评分，请直接阅读对应的静态评估页面。</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((assessment) => (
            <a key={assessment.slug} href={assessment.canonical} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <Image
                src={assessment.image}
                alt={`${assessment.shortTitle}体态问题`}
                width={900}
                height={620}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-black text-ink group-hover:text-jade">{assessment.shortTitle}</h2>
                <p className="mt-3 line-clamp-4 text-sm leading-7 text-body">{assessment.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
