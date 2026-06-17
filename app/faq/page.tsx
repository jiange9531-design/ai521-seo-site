import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "体态评估常见问题 FAQ",
  description: "解答体态评估、头前伸、圆肩、骨盆前倾、资料领取和训练周期等常见问题。"
};

const faqs = [
  ["体态评估需要准备什么？", "建议准备正面、侧面、背面自然站姿照片，并说明是否有肩颈、腰背或膝盖不适。"],
  ["头前伸和圆肩可以一起改善吗？", "可以。两者常与胸椎活动度、深层颈屈肌和肩胛控制有关，训练计划通常需要组合处理。"],
  ["骨盆前倾多久能看到变化？", "多数人需要先改善呼吸、核心控制、髋屈肌紧张和臀肌发力，通常按周观察变化更稳妥。"],
  ["可以只靠拉伸改善体态吗？", "不建议只拉伸。很多体态问题还需要激活弱化肌群、建立稳定控制，并调整日常姿势。"],
  ["添加微信后能领取什么？", "可以领取体态自测表、基础动作清单、7天训练方案和常见错误提醒。微信号：Wi985211DX。"]
];

export default function FAQPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-black text-jade">FAQ</p>
        <h1 className="mt-3 text-4xl font-black text-ink">体态评估常见问题 FAQ</h1>
        <div className="mt-8 grid gap-4">
          {faqs.map(([question, answer], index) => (
            <section key={question} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-black text-ink">
                  Q{index + 1}
                </span>
                <div>
                  <h2 className="text-xl font-black text-moss">{question}</h2>
                  <p className="mt-3 leading-7 text-body">{answer}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          <Image
            src="/images/services/service-posture-check.jpg"
            alt="体态评估咨询"
            width={900}
            height={560}
            className="h-full min-h-64 object-cover"
          />
          <div className="p-6 lg:p-8">
            <h2 className="text-3xl font-black text-ink">还不确定自己属于哪类体态问题？</h2>
            <p className="mt-3 leading-7 text-body">先完成1分钟体态自测，再领取对应的7天训练方案。</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/assessment/" className="rounded-xl bg-jade px-6 py-3 text-sm font-black text-white">
                开始免费评估
              </a>
              <a href="/contact/" className="rounded-xl bg-accent px-6 py-3 text-sm font-black text-ink">
                领取7天训练方案
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
