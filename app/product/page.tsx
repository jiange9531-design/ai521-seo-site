import type { Metadata } from "next";
import Image from "next/image";
import { getAllProducts } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "体态改善产品",
  description: "查看固定发布的体态改善训练产品与交付说明。",
  alternates: { canonical: "/product/" }
};

export default function ProductIndexPage() {
  const products = getAllProducts();

  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_280px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">产品目录</p>
        <h1 className="mt-3 text-4xl font-black text-ink">体态改善训练产品</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <a key={product.slug} href="/assessment/" className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <Image src={product.image} alt={product.title} width={900} height={620} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-black text-ink">{product.title}</h2>
                <p className="mt-3 text-sm leading-7 text-body">{product.summary}</p>
                <span className="mt-4 inline-flex rounded-xl bg-jade px-5 py-3 text-sm font-black text-white">
                  领取专属修复方案（9.9）
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
