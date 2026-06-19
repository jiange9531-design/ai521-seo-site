import type { Metadata } from "next";
import { getGlobalCTA } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "训练方案交付",
  description: "微信号 Wi985211DX",
  alternates: { canonical: "/wechat/" }
};

export default function WechatPage() {
  const cta = getGlobalCTA();

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5">
      <section className="text-center">
        <p className="text-2xl font-black text-white">方案已生成</p>
        <p className="mt-5 text-lg font-black text-white">微信号：{cta.wechatId}</p>
        <p className="mt-3 text-sm font-bold text-white/65">客服将发送完整修复方案</p>
      </section>
    </main>
  );
}
