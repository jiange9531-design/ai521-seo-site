import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments } from "@/lib/assessment";

export default function HomePage() {
  const assessments = getAllAssessments();
  const featured = assessments.slice(0, 9);

  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#f6fbf8_0%,#ffffff_44%,#e7f4ed_100%)]">
        <div className="absolute inset-x-0 top-0 h-24 border-b border-line/70 bg-white/70" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {["免费体态评估", "7天训练方案", "微信领取资料"].map((item) => (
                <span key={item} className="rounded-full border border-jade/20 bg-white px-3 py-1 text-xs font-semibold text-jade shadow-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm font-semibold text-jade">SEO体态知识站 + 微信引流系统</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-normal text-ink sm:text-6xl">
              头前伸、圆肩、骨盆前倾等体态问题在线评估
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
              先通过问题解析和动作建议判断自己的体态风险，再领取训练资料包，把搜索流量转化为微信咨询和后续训练服务。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/assessment/" className="rounded-md bg-jade px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-moss">
                开始体态评估
              </a>
              <a href="/resources/" className="rounded-md border border-jade/30 bg-white px-6 py-3 text-sm font-bold text-jade shadow-sm transition hover:bg-mint">
                领取资料包
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
              {[
                ["5000+", "SEO页面"],
                ["5类", "核心体态问题"],
                ["1个", "微信转化入口"]
              ].map(([value, label]) => (
                <div key={label} className="border-r border-line px-4 py-4 last:border-r-0">
                  <strong className="block text-2xl text-ink">{value}</strong>
                  <span className="mt-1 block text-xs text-ink/60">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-jade">体态风险雷达</p>
                  <h2 className="mt-1 text-2xl font-black text-ink">先判断问题，再安排动作</h2>
                </div>
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">在线评估</span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ["颈肩压力", "82%"],
                  ["胸椎活动度", "64%"],
                  ["骨盆控制", "71%"],
                  ["膝关节稳定", "48%"]
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-ink/70">{label}</span>
                      <span className="font-bold text-jade">{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-mint">
                      <div className="h-2 rounded-full bg-jade" style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CTAWeChat source="首页入口" conversionScore={1} />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-8 md:grid-cols-3">
          {[
            ["看", "阅读问题表现，确认是否符合自己的症状。"],
            ["测", "进入体态评估，整理照片和不适位置。"],
            ["加", "添加微信 Wi985211DX，领取训练资料。"]
          ].map(([step, text]) => (
            <div key={step} className="flex gap-4 rounded-lg border border-line bg-[#fbfdfb] p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-jade text-lg font-black text-white">{step}</span>
              <p className="text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-jade">热门体态问题解析</p>
            <h2 className="mt-2 text-3xl font-black text-ink">从高搜索问题进入评估转化</h2>
          </div>
          <a href="/assessment/" className="rounded-md border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-jade hover:text-jade">
            查看全部评估
          </a>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <a key={item.slug} href={`/assessment/${item.slug}/`} className="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-jade hover:shadow-md">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">问题 {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-black text-ink group-hover:text-jade">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
              <span className="mt-5 inline-block text-sm font-bold text-jade">查看改善方案</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
