import type { Metadata } from "next";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllFAQs, getPageSEO } from "@/lib/assessment";

export function generateMetadata(): Metadata {
  const seo = getPageSEO("faq");
  return { title: seo.title, description: seo.description, alternates: { canonical: seo.canonical } };
}

export default function FAQPage() {
  const faqs = getAllFAQs();
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto max-w-5xl px-5 py-12">
        <p className="text-sm font-black text-jade">FAQ</p>
        <h1 className="mt-3 text-4xl font-black text-ink">体态评估常见问题</h1>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq, index) => (
            <section key={faq.question} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-black text-ink">Q{index + 1}</span>
                <div><h2 className="text-xl font-black text-moss">{faq.question}</h2><p className="mt-3 leading-7 text-body">{faq.answer}</p></div>
              </div>
            </section>
          ))}
        </div>
        <div className="mt-10"><CTAWeChat source="FAQ页" conversionScore={1} /></div>
      </section>
    </main>
  );
}
