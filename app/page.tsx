import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments } from "@/lib/assessment";
import { defaultTopicImage, getTopicImage } from "@/lib/topic-images";

const featuredCopy: Record<string, string> = {
  "001-neck-forward-how-to-correct":
    "长期低头、电脑办公、下巴前探，容易让颈后肌群长期紧张，出现肩颈酸、头沉、脖子僵。",
  "002-forward-head-how-to-improve":
    "头部长期前移，会增加颈椎压力，让肩颈更容易酸胀，也会影响呼吸和上肢发力。",
  "003-forward-head-rehab-training":
    "先别急着猛拉脖子，应先改善胸椎活动、激活深层颈屈肌，再配合肩胛稳定训练。",
  "004-neck-forward-solution":
    "如果你经常刷手机、伏案办公，先从屏幕高度、下巴回收和胸椎伸展开始调整。",
  "005-cervical-forward-how-to-recovery":
    "颈椎前倾通常不是单纯脖子问题，还和胸椎僵硬、肩胛控制差、呼吸模式有关。",
  "006-neck-how-to-improve":
    "先减少持续低头时间，再做颈部放松、胸椎伸展和肩胛稳定训练，不建议直接暴力扳脖子。",
  "007-office-neck-soreness-improve":
    "办公室人群要优先处理坐姿、屏幕高度和肩胛稳定，动作应简单、安全、可每天重复。",
  "008-cervical-training":
    "电脑办公人群可以从下巴回收、胸椎伸展、肩胛后缩和呼吸调整开始。",
  "009-neck-shoulder-how-to-release":
    "肩颈僵硬不一定只靠按摩，很多时候需要同时改善胸椎活动度和肩胛稳定能力。",
  "011-rounded-shoulder-how-to-improve":
    "圆肩常见于胸前紧、背部弱、肩胛骨控制差的人，练背没感觉、肩膀容易往前扣。",
  "pelvic-tilt":
    "腰背紧、大腿前侧紧、臀腹力量不足，容易让骨盆长期前倾，站久腰酸明显。",
  "knee-valgus":
    "膝内扣常和髋外展外旋力量不足、足弓控制差、下肢力线不稳有关，训练时要先控制动作轨迹。"
};

export default function HomePage() {
  const assessments = getAllAssessments();
  const isAssessment = (item: (typeof assessments)[number] | undefined): item is (typeof assessments)[number] => Boolean(item);
  const prioritySlugs = [
    "001-neck-forward-how-to-correct",
    "002-forward-head-how-to-improve",
    "003-forward-head-rehab-training",
    "004-neck-forward-solution",
    "005-cervical-forward-how-to-recovery",
    "006-neck-how-to-improve",
    "007-office-neck-soreness-improve",
    "008-cervical-training",
    "009-neck-shoulder-how-to-release",
    "011-rounded-shoulder-how-to-improve",
    "pelvic-tilt",
    "knee-valgus"
  ];
  const featured = prioritySlugs
    .map((slug) => assessments.find((item) => item.slug === slug))
    .filter(isAssessment)
    .concat(assessments.filter((item) => !prioritySlugs.includes(item.slug)))
    .slice(0, 12);

  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#f6fbf8_0%,#ffffff_44%,#e7f4ed_100%)]">
        <div className="absolute inset-x-0 top-0 h-20 border-b border-line/70 bg-white/70" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {["免费体态评估", "7天训练方案", "微信领取资料"].map((item) => (
                <span key={item} className="rounded-full border border-jade/20 bg-white px-3 py-1 text-xs font-semibold text-jade shadow-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold text-jade">体态自测 + 改善动作 + 微信领取方案</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-normal text-ink sm:text-6xl">
              肩颈酸、圆肩、骨盆前倾，
              <br />
              可能不是累，
              <br />
              而是身体正在代偿
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              1分钟完成体态自测，找到你的问题方向，再领取对应改善动作和7天训练方案。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/assessment/" className="inline-flex min-h-12 items-center rounded-md bg-jade px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-moss">
                开始体态自测
              </a>
              <a href="/resources/" className="inline-flex min-h-12 items-center rounded-md border border-jade/30 bg-white px-6 py-3 text-sm font-bold text-jade shadow-sm transition hover:bg-mint">
                领取7天训练方案
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
              {[
                ["5000+", "体态问题库"],
                ["5类", "常见体态"],
                ["1分钟", "自测入口"]
              ].map(([value, label]) => (
                <div key={label} className="border-r border-line px-3 py-4 last:border-r-0 sm:px-4">
                  <strong className="block text-xl text-ink sm:text-2xl">{value}</strong>
                  <span className="mt-1 block text-xs text-ink/60">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
              <img src={defaultTopicImage.src} alt={defaultTopicImage.alt} className="aspect-[3/2] w-full object-cover" />
            </div>
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-jade">体态风险自测维度</p>
                  <h2 className="mt-1 text-2xl font-black text-ink">先判断问题，再安排动作</h2>
                </div>
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">示例</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/65">
                以下为常见体态问题自测维度示例，实际结果需结合你的站姿、侧面照和不适位置判断。
              </p>
              <div className="mt-5 space-y-4">
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
            ["领", "添加微信 Wi985211DX，领取7天训练方案。"]
          ].map(([step, text]) => (
            <div key={step} className="flex gap-4 rounded-lg border border-line bg-[#fbfdfb] p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-jade text-lg font-black text-white">{step}</span>
              <p className="text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-jade">热门体态问题解析</p>
            <h2 className="mt-2 text-3xl font-black text-ink">先找到问题，再选择改善方向</h2>
          </div>
          <a href="/assessment/" className="rounded-md border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-jade hover:text-jade">
            查看全部评估
          </a>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <a key={item.slug} href={`/assessment/${item.slug}/`} className="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-jade hover:shadow-md">
              <img src={getTopicImage(item.slug, item.title).src} alt={getTopicImage(item.slug, item.title).alt} className="mb-4 aspect-[16/10] w-full rounded-md border border-line bg-mint object-cover" />
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-jade">问题 {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-black text-ink group-hover:text-jade">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{featuredCopy[item.slug] ?? item.description}</p>
              <span className="mt-5 inline-block text-sm font-bold text-jade">查看改善方案</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
