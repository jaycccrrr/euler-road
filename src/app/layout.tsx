import type { Metadata, Viewport } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { PwaRegister } from "@/components/pwa/PwaRegister";

export const metadata: Metadata = {
  title: "欧拉之路 - 数学学习交流平台",
  description: "针对高中及大学的数学教学沟通互动平台，包含高中数学、高等数学、线性代数、概率论与数理统计、离散数学的知识库，每日一题挑战与经典教材在线阅读",
  keywords: ["数学", "高中数学", "高等数学", "线性代数", "概率论", "离散数学", "学习", "教育", "每日一题"],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "欧拉之路",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
  viewportFit: "cover",
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
        <PwaRegister />
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
