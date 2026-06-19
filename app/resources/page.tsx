import type { Metadata } from "next";
import Image from "next/image";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllProducts, getAllResources, getPageSEO } from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const seo = getPageSEO("resourcesIndex");
  return { title: seo.title, description: seo.description, alternates: { canonical: seo.canonical } };
}

export default function ResourcesPage() {
  const resources = getAllResources();
  const product = getAllProducts()[0];
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">免费资料</p>
        <h1 className="mt-3 text-4xl font-black text-ink">体态改善资料包</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-body">先完成自测，再选择对应的入门动作，避免盲目跟练。</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {resources.map((resource) => (
            <a key={resource.slug} href={`/resources/${resource.slug}/`} className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <Image src={resource.image} alt={resource.title} width={1000} height={650} className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-black text-ink group-hover:text-jade">{resource.title}</h2>
                <p className="mt-3 leading-7 text-body">{resource.summary}</p>
                <span className="mt-5 inline-flex rounded-xl bg-jade px-5 py-3 text-sm font-black text-white">{resource.ctaText}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10"><CTAWeChat source="资料列表页" conversionScore={1} /></div>
        <div className="mt-6 rounded-3xl bg-ink p-6 text-white">
          <p className="text-sm font-black text-accent">{product.price}元训练计划</p>
          <h2 className="mt-2 text-3xl font-black">{product.title}</h2>
          <p className="mt-3 text-white/75">完成 assessment 后，通过唯一付费入口查看计划详情。</p>
          <a href="/assessment/" className="mt-5 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-black text-ink">
            领取专属修复方案（9.9）
          </a>
        </div>
      </section>
    </main>
  );
}
