import type { Metadata } from "next";
import CTAWeChat from "@/components/CTAWeChat";

export const metadata: Metadata = {
  title: "体态评估常见问题FAQ｜头前伸圆肩骨盆前倾怎么改善",
  description: "解答体态评估、头前伸、圆肩、骨盆前倾、膝内扣改善周期和微信评估资料领取等常见问题。"
};

const faqs = [
  ["体态评估需要准备什么？", "建议准备正面、侧面、背面自然站姿照片，并说明是否有肩颈、腰背或膝盖不适。"],
  ["头前伸和圆肩可以一起改善吗？", "可以。两者常与胸椎活动度、深颈屈肌和肩胛控制能力有关，训练计划通常需要组合处理。"],
  ["骨盆前倾多久能看到变化？", "多数人需要先改善呼吸、核心控制、髋屈肌紧张和臀肌发力，通常按周观察变化更稳妥。"],
  ["添加微信后能领取什么？", "可以领取体态自测表、动作清单和初步训练建议，微信号：Wi985211DX。"]
];

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold text-ink">体态评估常见问题FAQ</h1>
      <div className="mt-8 space-y-4">
        {faqs.map(([question, answer]) => (
          <section key={question} className="rounded-lg border border-line bg-white p-6">
            <h2 className="text-xl font-bold text-ink">{question}</h2>
            <p className="mt-3 leading-7 text-ink/70">{answer}</p>
          </section>
        ))}
      </div>
      <div className="mt-10">
        <CTAWeChat source="FAQ页面" />
      </div>
    </main>
  );
}
