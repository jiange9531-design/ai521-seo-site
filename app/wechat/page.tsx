import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <p className="text-2xl font-black text-ink">方案已生成</p>
        <div className="mx-auto mt-5 overflow-hidden rounded-2xl border-4 border-white bg-white">
          <Image
            src="/images/wechat/wechat-qr.png"
            alt={`微信二维码 ${cta.wechatId}`}
            width={750}
            height={750}
            priority
            className="aspect-square w-full object-contain"
          />
        </div>
        <p className="mt-5 text-lg font-black text-ink">微信号：{cta.wechatId}</p>
        <p className="mt-3 text-sm font-bold text-body">长按识别二维码，客服将发送完整修复方案</p>
      </section>
    </main>
  );
}
