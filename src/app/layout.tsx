import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { AnimationProvider } from "@/contexts/AnimationContext";

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
        {/* 使用系统字体栈，避免 Google Fonts 在国内不可达导致首屏阻塞 */}
      </head>
      <body className="antialiased bg-white min-h-screen">
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
