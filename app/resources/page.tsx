import type { Metadata } from "next";
import CTAWeChat from "@/components/CTAWeChat";

export const metadata: Metadata = {
  title: "体态改善资料包下载｜免费训练清单与评估表",
  description: "领取头前伸、圆肩、骨盆前倾、翼状肩胛、膝内扣体态改善资料包，包含评估表、动作清单和训练建议。"
};

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold text-ink">体态改善资料包下载</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/70">
        资料包包含常见体态问题自测表、动作训练清单和日常姿势注意事项，适合先自查再做系统改善。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["体态自测表", "改善动作清单", "微信评估模板"].map((item) => (
          <section key={item} className="rounded-lg border border-line bg-white p-6">
            <h2 className="text-xl font-bold text-ink">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">添加微信后发送关键词「体态资料」，即可领取对应文件和初步评估建议。</p>
          </section>
        ))}
      </div>
      <div className="mt-10">
        <CTAWeChat source="资料下载页" />
      </div>
    </main>
  );
}
