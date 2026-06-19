import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/assessment";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const site = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: site.defaultTitle, template: `%s | ${site.siteName}` },
  description: site.defaultDescription,
  alternates: { canonical: site.canonical }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
