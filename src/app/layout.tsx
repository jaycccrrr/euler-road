import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { CloudSyncProvider } from "@/components/providers/CloudSyncProvider";

export const metadata: Metadata = {
  title: "欧拉之路 - 数学学习交流平台",
  description: "针对高中及大学的数学教学沟通互动平台，包含高中数学、高等数学、线性代数的知识库和每日一题挑战",
  keywords: ["数学", "高中数学", "高等数学", "线性代数", "学习", "教育", "每日一题"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Noto+Serif+SC:wght@400;500;600;700&family=Playfair+Display:wght@400..900&family=Caveat:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white min-h-screen">
        <AnimationProvider>
          <CloudSyncProvider>
            {children}
          </CloudSyncProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
