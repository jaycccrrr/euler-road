import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出用于部署到 Surge.sh
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
