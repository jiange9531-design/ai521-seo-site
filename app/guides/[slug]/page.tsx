import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getStaticGuideBySlug,
  getStaticGuides,
  resolveAssessmentImage
} from "@/lib/assessment";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticGuides().map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getStaticGuideBySlug(params.slug);
  if (!guide) return { robots: { index: false, follow: false } };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: guide.canonical },
    openGraph: { title: guide.title, description: guide.description, images: [guide.assessment.image] }
  };
}

export default function StaticGuidePage({ params }: PageProps) {
  const guide = getStaticGuideBySlug(params.slug);
  if (!guide) notFound();
  const assessment = guide.assessment;
  const product = getAllProducts()[0];

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <article className="mx-auto max-w-5xl px-5 py-10">
        <a href={assessment.canonical} className="text-sm font-black text-jade">返回{assessment.shortTitle}评估</a>
        <h1 className="mt-5 text-4xl font-black leading-tight text-ink">{guide.title}</h1>
        <p className="mt-5 text-lg leading-8 text-body">{guide.description}</p>
        <Image
          src={resolveAssessmentImage(assessment, guide.type === "exercises" ? "step" : "compare")}
          alt={guide.title}
          width={1200}
          height={800}
          priority
          className="mt-7 aspect-[16/10] w-full rounded-3xl border border-line object-cover"
        />
        <div className="mt-8 grid gap-6">
          <ListBlock title="常见表现" items={assessment.symptoms} />
          <ListBlock title="形成原因" items={assessment.causes} />
          <ListBlock title="简单自查" items={assessment.selfTest} />
          <section className="rounded-3xl bg-ink p-6 text-white">
            <p className="text-sm font-black text-accent">V5 单路径</p>
            <h2 className="mt-2 text-3xl font-black">{product.title}</h2>
            <p className="mt-3 text-white/75">{product.summary}</p>
            <a href={assessment.canonical} className="mt-5 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-black text-ink">
              领取专属修复方案（9.9）
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => <p key={item} className="rounded-xl bg-panel px-4 py-3 leading-7 text-body">{item}</p>)}
      </div>
    </section>
  );
}
