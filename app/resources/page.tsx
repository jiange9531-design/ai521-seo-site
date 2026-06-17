import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import CTAWeChat from "@/components/CTAWeChat";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "体态改善资料包下载",
  description: "领取体态自测表、7天改善训练表、基础拉伸激活动作和常见错误提醒。"
};

const resources = [
  {
    title: "体态自测表",
    desc: "用正面、侧面和背面三个角度，初步判断头前伸、圆肩、骨盆和下肢力线问题。",
    image: siteImages.resources.assessmentForm
  },
  {
    title: "7天改善训练表",
    desc: "按照放松、激活、稳定、动作整合的顺序，每天安排3到5个基础动作。",
    image: siteImages.resources.sevenDayPlan
  },
  {
    title: "基础拉伸激活动作",
    desc: "覆盖肩颈、胸椎、骨盆、臀腿和肩胛稳定的入门动作清单。",
    image: siteImages.resources.exerciseList
  },
  {
    title: "微信评估模板",
    desc: "告诉你添加微信后如何发送照片和不适位置，方便获得更清晰的反馈。",
    image: siteImages.resources.wechatTemplate
  }
];

export default function ResourcesPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">资料包下载</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">体态改善资料包下载</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-body">
          资料包包含体态自测表、7天改善训练表、基础动作清单和常见错误提醒。建议先完成自测，再选择对应动作。
        </p>

        <SiteImage
          src={siteImages.resources.header}
          alt="体态改善资料包、评估表和训练清单展示"
          width={1200}
          height={720}
          priority
          className="mt-8 aspect-[16/7] w-full rounded-3xl border border-line object-cover shadow-sm"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((item) => (
            <a
              key={item.title}
              href="/contact/"
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <SiteImage src={item.image} alt={item.title} width={900} height={620} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-black text-ink group-hover:text-jade">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-body">{item.desc}</p>
                <span className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-black text-ink">
                  添加微信领取
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SiteImage
            src={siteImages.cta.wechatPlan}
            alt="领取7天体态改善训练方案"
            width={1000}
            height={620}
            className="w-full rounded-3xl border border-line object-cover shadow-sm"
          />
          <CTAWeChat source="资料包下载页" conversionScore={1} />
        </div>
      </section>
    </main>
  );
}
