import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import {
  getAllAssessments,
  getAllProducts,
  getAllResources,
  getGlobalCTA,
  getPageSEO
} from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const seo = getPageSEO("contact");
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical }
  };
}

export default function ContactPage() {
  const seo = getPageSEO("contact");
  const cta = getGlobalCTA();
  const resource = getAllResources()[0];
  const product = getAllProducts()[0];
  const assessment = getAllAssessments()[0];

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-black text-jade">微信咨询</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-ink lg:text-5xl">{seo.title}</h1>
          <p className="mt-5 text-lg leading-8 text-body">{seo.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {resource.includes.map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-white p-4 font-bold text-body">
                <span className="mr-2 text-jade">●</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <SiteImage
            src={resource.image}
            alt={resource.title}
            width={1000}
            height={620}
            priority
            className="w-full rounded-3xl border border-line object-cover shadow-sm"
          />
          <SiteImage
            src={assessment.image}
            alt={assessment.title}
            width={1000}
            height={620}
            className="w-full rounded-3xl border border-line object-cover shadow-sm"
          />
          <div className="rounded-2xl bg-ink p-6 text-white">
            <p className="text-sm font-black text-accent">唯一微信交付入口</p>
            <h2 className="mt-2 text-2xl font-black">{product.title}</h2>
            <p className="mt-3 text-white/75">{product.summary}</p>
            <p className="mt-5 text-sm text-white/70">价格：{product.price}元 · 回复“{product.wechatKeyword}”</p>
            <strong className="mt-2 block text-3xl text-accent">微信 {cta.wechatId}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
