import type { Metadata } from "next";
import Image from "next/image";
import CTAWeChat from "@/components/CTAWeChat";

export const metadata: Metadata = {
  title: "联系体态评估老师",
  description: "添加微信 Wi985211DX，领取体态自测表、基础动作建议、常见错误提醒和7天训练方案。"
};

export default function ContactPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_260px)]">
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-black text-jade">微信咨询</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-ink lg:text-5xl">联系体态评估老师</h1>
          <p className="mt-5 text-lg leading-8 text-body">
            如果你不确定自己属于头前伸、圆肩、骨盆前倾还是膝内扣，可以先添加微信，发送站姿照片和主要不适位置，领取基础改善方案。
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["体态自测表", "基础动作建议", "常见错误提醒", "7天训练方案"].map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-white p-4 font-bold text-body">
                <span className="mr-2 text-jade">●</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/contact/contact-wechat.jpg"
            alt="添加微信领取体态改善方案"
            width={1000}
            height={620}
            priority
            className="rounded-3xl border border-line object-cover shadow-sm"
          />
          <CTAWeChat source="联系转化页" conversionScore={1} />
        </div>
      </section>
    </main>
  );
}
