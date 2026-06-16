import type { Metadata } from "next";
import CTAWeChat from "@/components/CTAWeChat";

export const metadata: Metadata = {
  title: "联系体态评估老师｜添加微信领取免费资料包",
  description: "添加微信 Wi985211DX，领取免费体态评估、头前伸圆肩骨盆前倾改善资料包和训练建议。"
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-4xl font-bold text-ink">联系体态评估老师</h1>
      <p className="mt-4 text-lg leading-8 text-ink/70">
        添加微信后发送你的主要问题，例如头前伸、圆肩、骨盆前倾、翼状肩胛或膝内扣，并领取免费资料包。
      </p>
      <div className="mt-8">
        <CTAWeChat source="联系转化页" />
      </div>
    </main>
  );
}
