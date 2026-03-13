import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "欧拉登基之路 - 理科学习交流平台",
  description: "针对高中及大学的理科教学沟通互动平台，包含数学、物理、计算机等科目的知识库和每日一题挑战",
  keywords: ["数学", "物理", "计算机", "学习", "教育", "每日一题", "论坛"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoSerifSC.variable} antialiased bg-slate-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
