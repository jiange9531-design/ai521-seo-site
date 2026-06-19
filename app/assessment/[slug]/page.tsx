import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssessmentScorePanel from "@/components/AssessmentScorePanel";
import {
  getAllProducts,
  getAssessmentBySlug,
  getAssessmentSlugs,
  getSiteConfig
} from "@/lib/assessment";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAssessmentSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getAssessmentBySlug(params.slug);
  if (!page) {
    const site = getSiteConfig();
    return {
      title: site.defaultTitle,
      description: site.defaultDescription,
      robots: { index: false, follow: false }
    };
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: page.canonical }
  };
}

export default function AssessmentDetailPage({ params }: PageProps) {
  const page = getAssessmentBySlug(params.slug);
  if (!page) notFound();
  const product = getAllProducts()[0];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_300px)]">
      <section className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-sm font-black text-jade">{page.problemName}</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">{page.title}</h1>
        <p className="mt-4 text-lg leading-8 text-body">{page.summary}</p>
        <div className="mt-8">
          <AssessmentScorePanel
            items={[...page.symptoms, ...page.selfTest]}
            productHref={product.canonical}
          />
        </div>
      </section>
    </main>
  );
}
