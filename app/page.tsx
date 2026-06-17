import Image from "next/image";
import CTAWeChat from "@/components/CTAWeChat";
import { getAllAssessments } from "@/lib/assessment";
import { getTopicImage } from "@/lib/topic-images";

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
  "008-cervical-training": "电脑办公人群可以从下巴回收、胸椎伸展、肩胛后缩和呼吸调整开始。",
  "009-neck-shoulder-how-to-release":
    "肩颈僵硬不一定只靠按摩，很多时候需要同时改善胸椎活动度和肩胛稳定能力。",
  "011-rounded-shoulder-how-to-improve":
    "圆肩常见于胸前紧、背部弱、肩胛骨控制差的人，练背没感觉、肩膀容易往前扣。",
  "026-pelvic-tilt":
    "腰背紧、大腿前侧紧、臀腹力量不足，容易让骨盆长期前倾，站久腰酸明显。",
  "knee-valgus":
    "膝内扣常和髋外展外旋力量不足、足弓控制差、下肢力线不稳有关，训练时要先控制动作轨迹。"
};

const coreEntries = [
  {
    title: "热门体态问题",
    desc: "头前伸、圆肩、骨盆前倾、膝内扣、翼状肩胛等常见问题解析。",
    image: "/images/entry/entry-problems.jpg",
    href: "/assessment/",
    button: "查看问题库"
  },
  {
    title: "运动解剖分析",
    desc: "从肌肉紧张、关节活动度、动作控制和日常姿势四个方向分析问题。",
    image: "/images/entry/entry-analysis.jpg",
    href: "/assessment/001-neck-forward-how-to-correct/",
    button: "查看分析"
  },
  {
    title: "改善训练指导",
    desc: "提供拉伸、激活、稳定和动作纠正建议，帮你建立正确训练顺序。",
    image: "/images/entry/entry-training.jpg",
    href: "/courses/",
    button: "查看训练方案"
  }
];

const services = [
  {
    title: "姿势评估",
    desc: "专业体态筛查与评估，精准定位问题。",
    image: "/images/services/service-posture-check.jpg",
    href: "/assessment/"
  },
  {
    title: "肩颈改善",
    desc: "缓解肩颈紧张酸痛，改善圆肩头前伸。",
    image: "/images/services/service-neck-shoulder.jpg",
    href: "/assessment/001-neck-forward-how-to-correct/"
  },
  {
    title: "骨盆与下肢",
    desc: "纠正骨盆前倾后倾，改善下肢力线。",
    image: "/images/services/service-pelvis-leg.jpg",
    href: "/assessment/026-pelvic-tilt/"
  },
  {
    title: "康复训练",
    desc: "定制训练方案，提升功能与运动表现。",
    image: "/images/services/service-rehab-training.jpg",
    href: "/courses/"
  }
];

const postureCards = [
  {
    title: "头前伸",
    desc: "颈椎压力增加，容易引发颈肩酸痛与头沉。",
    image: "/images/problems/problem-forward-head.png",
    href: "/assessment/001-neck-forward-how-to-correct/"
  },
  {
    title: "圆肩",
    desc: "影响呼吸与姿态美观，易出现肩颈酸痛。",
    image: "/images/problems/problem-rounded-shoulder.png",
    href: "/assessment/011-rounded-shoulder-how-to-improve/"
  },
  {
    title: "骨盆前倾",
    desc: "腰椎代偿、易导致腰酸，影响下肢发力。",
    image: "/images/problems/problem-pelvic-tilt.png",
    href: "/assessment/026-pelvic-tilt/"
  },
  {
    title: "翼状肩胛",
    desc: "肩胛稳定差，影响肩部功能与力量输出。",
    image: "/images/problems/problem-scapular-winging.png",
    href: "/assessment/031-scapular-winging-how-to-improve/"
  },
  {
    title: "膝内扣",
    desc: "下肢力线异常，增加膝关节负担。",
    image: "/images/problems/problem-knee-valgus.png",
    href: "/assessment/knee-valgus/"
  },
  {
    title: "高低肩",
    desc: "左右肩线不平衡，常伴随颈肩紧张。",
    image: "/images/problems/problem-uneven-shoulder.png",
    href: "/assessment/017-shoulder-how-to-correct/"
  }
];

export default function HomePage() {
  const assessments = getAllAssessments();
  const prioritySlugs = Object.keys(featuredCopy);
  const featured = prioritySlugs
    .map((slug) => assessments.find((item) => item.slug === slug))
    .filter((item): item is (typeof assessments)[number] => Boolean(item))
    .slice(0, 12);

  return (
    <main>
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#ffffff_0%,#eef5ff_55%,#f8fbff_100%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <p className="text-sm font-black text-jade">每日运动解剖分享 · 体态评估中心</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-normal text-ink sm:text-6xl">
              肩颈酸、圆肩、骨盆前倾，
              <br />
              可能不是累，
              <br />
              而是身体正在代偿
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-body">
              用 1 分钟完成体态自测，找到你的问题方向，再领取对应的改善动作和 7 天训练方案。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/assessment/"
                className="inline-flex min-h-12 items-center rounded-xl bg-jade px-7 py-3 text-sm font-black text-white shadow-sm transition hover:bg-moss"
              >
                开始体态自测
              </a>
              <a
                href="/resources/"
                className="inline-flex min-h-12 items-center rounded-xl border border-jade bg-white px-7 py-3 text-sm font-black text-jade shadow-sm transition hover:bg-mint"
              >
                领取7天训练方案
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["免费领取", "每日3分钟", "先自测再训练"].map((item) => (
                <span key={item} className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[24px] border border-line bg-white p-3 shadow-xl">
              <Image
                src="/images/hero/hero-posture-assessment.jpg"
                alt="体态评估师进行肩颈与站姿检查"
                width={1400}
                height={820}
                priority
                className="aspect-[4/3] rounded-[18px] object-cover"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {["头前伸", "圆肩", "骨盆前倾", "肩胛稳定"].map((item) => (
                  <span key={item} className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-jade">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute right-5 top-5 rounded-full bg-accent px-4 py-2 text-sm font-black text-ink shadow">
              体态自测
            </div>
            <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-sm lg:absolute lg:-bottom-8 lg:right-8 lg:w-72">
              <p className="text-sm text-body">微信号</p>
              <strong className="mt-1 block text-xl text-jade">Wi985211DX</strong>
              <p className="mt-2 text-sm leading-6 text-body">添加微信，领取体态自测表和7天训练方案。</p>
              <a href="/contact/" className="mt-4 inline-flex w-full justify-center rounded-xl bg-jade px-4 py-3 text-sm font-black text-white">
                立即领取方案
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-8 md:grid-cols-3">
          {[
            ["5000+", "体态问题库"],
            ["5类", "常见体态问题"],
            ["1分钟", "完成初步自测"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-line bg-panel p-6">
              <strong className="block text-4xl font-black text-moss">{value}</strong>
              <span className="mt-2 block font-bold text-body">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-ink">先判断问题，再安排动作</h2>
          <p className="mt-3 max-w-3xl leading-7 text-body">
            以下为常见体态问题自测维度示例，实际结果需结合站姿、侧面照和不适位置判断。
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["颈肩压力", "82%"],
              ["肩胛控制", "64%"],
              ["骨盆位置", "71%"],
              ["体态协调度", "48%"]
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-ink">{label}</span>
                  <span className="text-jade">{value}</span>
                </div>
                <div className="h-3 rounded-full bg-mint">
                  <div className="h-3 rounded-full bg-jade" style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageCardSection title="从问题判断到改善训练" items={coreEntries} columns="lg:grid-cols-3" />
      <ImageCardSection title="我们的服务" items={services} columns="lg:grid-cols-4" />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-line" />
            <h2 className="text-center text-3xl font-black text-jade">常见体态问题解析</h2>
            <span className="h-px w-20 bg-line" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {postureCards.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Image src={item.image} alt={item.title} width={900} height={620} className="aspect-[16/10] object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-black text-ink group-hover:text-jade">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{item.desc}</p>
                  <span className="mt-4 inline-block text-sm font-black text-jade">了解更多 &gt;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
          <Image
            src="/images/cta/cta-wechat-plan.jpg"
            alt="领取7天体态改善训练计划"
            width={1000}
            height={620}
            className="h-full min-h-64 object-cover"
          />
          <div className="p-6 lg:p-8">
            <h2 className="text-3xl font-black text-ink">添加微信，免费领取7天体态改善训练计划</h2>
            <p className="mt-3 leading-7 text-body">
              发送关键词「体态评估」，领取体态自测表、基础动作清单和7天训练方案。
            </p>
            <div className="mt-5">
              <CTAWeChat source="首页底部领取模块" conversionScore={1} compact />
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-12">
          <h2 className="text-3xl font-black text-ink">热门体态问题解析</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => {
              const image = getTopicImage(item.slug, item.title);
              return (
                <a
                  key={item.slug}
                  href={`/assessment/${item.slug}/`}
                  className="group rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Image src={image.src} alt={image.alt} width={900} height={620} className="aspect-[16/10] rounded-xl object-cover" />
                  <h3 className="mt-4 text-lg font-black text-ink group-hover:text-jade">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-body">{featuredCopy[item.slug] ?? item.description}</p>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

function ImageCardSection({
  title,
  items,
  columns
}: {
  title: string;
  items: Array<{ title: string; desc: string; image: string; href: string; button?: string }>;
  columns: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <h2 className="text-center text-3xl font-black text-ink">{title}</h2>
      <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${columns}`}>
        {items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Image src={item.image} alt={item.title} width={900} height={560} className="aspect-[16/10] object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-black text-ink group-hover:text-jade">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{item.desc}</p>
              <span className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-black text-ink">
                {item.button ?? "查看详情"}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
