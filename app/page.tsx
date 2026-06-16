import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments } from "@/lib/assessment";

export default function HomePage() {
  const assessments = getAllAssessments();

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-jade">SEO体态知识站 + 微信引流系统</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
              头前伸、圆肩、骨盆前倾等体态问题在线评估
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              通过问题解析、改善动作和免费资料包，帮助用户先了解体态问题，再完成评估并添加微信领取个性化建议。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/assessment/" className="rounded-md bg-jade px-5 py-3 text-sm font-semibold text-white">
                开始体态评估
              </a>
              <a href="/resources/" className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink">
                领取资料包
              </a>
            </div>
          </div>
          <CTAWeChat source="首页入口" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-2xl font-bold text-ink">热门体态问题解析</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((item) => (
            <a key={item.slug} href={`/assessment/${item.slug}/`} className="rounded-lg border border-line bg-white p-5 shadow-sm transition hover:border-jade">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
