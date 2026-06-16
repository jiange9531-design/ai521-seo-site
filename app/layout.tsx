import type { Metadata } from "next";
import PageViewTracker from "@/app/components/page-view-tracker";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "体态评估与纠正训练 | 免费领取改善资料包",
    template: "%s | 体态评估与纠正训练"
  },
  description: "提供头前伸、圆肩、骨盆前倾、翼状肩胛、膝内扣等体态问题评估与改善动作，并引导领取免费体态资料包。",
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans antialiased">
        <header className="border-b border-line bg-white/90">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
            <a href="/" className="text-lg font-bold text-ink">
              体态评估中心
            </a>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-ink/70">
              <a href="/assessment/">体态评估</a>
              <a href="/resources/">资料下载</a>
              <a href="/faq/">FAQ</a>
              <a href="/contact/" className="text-jade">
                加微信
              </a>
            </div>
          </nav>
        </header>
        <PageViewTracker />
        {children}
        <footer className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-ink/60">
            <p>体态评估中心 | 微信：Wi985211DX | 免费体态评估与资料包领取</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
