import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getResourceBySlug, getResourceSlugs, getSiteConfig } from "@/lib/assessment";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getResourceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const resource = getResourceBySlug(params.slug);
  if (!resource) {
    const site = getSiteConfig();
    return { title: site.defaultTitle, description: site.defaultDescription, robots: { index: false, follow: false } };
  }
  return {
    title: resource.seoTitle,
    description: resource.seoDescription,
    alternates: { canonical: resource.canonical },
    openGraph: { title: resource.seoTitle, description: resource.seoDescription, images: [resource.image] }
  };
}

export default function ResourcePage({ params }: PageProps) {
  const resource = getResourceBySlug(params.slug);
  if (!resource) notFound();
  const product = getAllProducts()[0];

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_300px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-jade">免费领取</p>
            <h1 className="mt-3 text-4xl font-black text-ink lg:text-5xl">{resource.title}</h1>
            <p className="mt-5 text-lg leading-8 text-body">{resource.summary}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {resource.includes.map((item) => <div key={item} className="rounded-xl border border-line bg-white px-4 py-3 font-bold text-ink">✓ {item}</div>)}
            </div>
          </div>
          <Image src={resource.image} alt={resource.title} width={1100} height={760} priority className="aspect-[4/3] w-full rounded-3xl border border-line object-cover shadow-sm" />
        </div>

        <div className="mt-10 rounded-3xl border border-jade/30 bg-white p-6 shadow-sm lg:p-9">
          <h2 className="text-3xl font-black text-ink">{resource.ctaTitle}</h2>
          <p className="mt-3 leading-7 text-body">先进入体态评估，确认问题方向后再选择对应训练方案。</p>
          <a href="/assessment/" className="mt-6 inline-flex rounded-xl bg-jade px-7 py-3 text-sm font-black text-white">领取专属修复方案（9.9）</a>
        </div>

        <div className="mt-6 rounded-3xl bg-ink p-6 text-white shadow-sm lg:p-9">
          <p className="text-sm font-black text-accent">{product.price}元执行方案</p>
          <h2 className="mt-2 text-3xl font-black">{product.title}</h2>
          <p className="mt-3 leading-7 text-white/75">{product.summary}</p>
          <p className="mt-4 font-black text-accent">唯一付费入口 · {product.price}元</p>
          <a href="/assessment/" className="mt-6 inline-flex rounded-xl bg-accent px-7 py-3 text-sm font-black text-ink">
            领取专属修复方案（9.9）
          </a>
        </div>
      </section>
    </main>
  );
}
