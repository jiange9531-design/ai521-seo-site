import type { Metadata } from "next";
import PageViewTracker from "@/app/components/page-view-tracker";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "每日运动解剖分享 | 体态评估中心",
    template: "%s | 每日运动解剖分享"
  },
  description:
    "提供头前伸、圆肩、骨盆前倾、翼状肩胛、膝内扣等常见体态问题评估、运动解剖分析和7天改善训练方案。",
  alternates: {
    canonical: "/"
  }
};

const navItems = [
  ["首页", "/"],
  ["体态自测", "/assessment/"],
  ["资料包", "/resources/"],
  ["课程中心", "/courses/"],
  ["常见问题", "/faq/"]
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-sm backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <a href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-jade text-lg font-black text-white shadow-sm">
                体
              </span>
              <span>
                <span className="block text-lg font-black leading-5 text-ink">每日运动解剖分享</span>
                <span className="hidden text-xs font-semibold text-body sm:block">体态评估中心</span>
              </span>
            </a>

            <div className="hidden items-center gap-5 text-sm font-semibold text-ink/75 md:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="transition hover:text-jade">
                  {label}
                </a>
              ))}
              <a
                href="/contact/"
                className="rounded-full bg-accent px-4 py-2 font-black text-ink shadow-sm transition hover:bg-[#ffd95a]"
              >
                领取方案
              </a>
            </div>

            <a
              href="/contact/"
              className="rounded-full bg-accent px-4 py-2 text-sm font-black text-ink shadow-sm md:hidden"
            >
              领取方案
            </a>
          </nav>
        </header>
        <PageViewTracker />
        {children}
        <footer className="bg-ink text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-black text-ink">
                  体
                </span>
                <strong className="text-lg">每日运动解剖分享 · 体态评估中心</strong>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                用运动解剖和体态评估，帮你更清楚地理解身体问题。内容仅用于健康科普和训练参考，不能替代医疗诊断。
              </p>
            </div>
            <div>
              <h2 className="text-sm font-black text-accent">快速链接</h2>
              <div className="mt-3 grid gap-2 text-sm text-white/75">
                <a href="/assessment/">体态自测</a>
                <a href="/resources/">资料包</a>
                <a href="/courses/">课程中心</a>
                <a href="/faq/">常见问题</a>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black text-accent">联系领取</h2>
              <p className="mt-3 text-sm text-white/75">微信号：Wi985211DX</p>
              <p className="mt-2 text-sm text-white/75">发送「体态评估」领取自测表和7天训练方案。</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
