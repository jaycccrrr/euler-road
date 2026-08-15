import type { NextConfig } from "next";

// GitHub Pages 项目站点托管在 /euler-road 子路径下；
// 本地 dev/build 不设置 GITHUB_PAGES，保持根路径
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/euler-road" : "";

const nextConfig: NextConfig = {
  // 静态导出配置（用于 GitHub Pages 等无服务器环境）
  // 若要启用 Vercel SSR / 图片优化 / API Routes，请注释掉下面两行
  output: 'export',
  distDir: 'dist5',

  basePath,
  // 供客户端代码拼接 public 下的静态资源路径（<img src> 等不走 Next 前缀的场景）
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  trailingSlash: true,
  images: {
    // 静态导出时必须为 true；部署到 Vercel 时设为 false 以启用自动图片优化
    unoptimized: true,
  },

  // 启用 gzip/brotli 压缩
  compress: true,

  experimental: {
    // Turbopack dev 文件系统缓存在本机上反复写入损坏的 SST 文件
    // (globals.css 编译产物出现乱码选择器导致 500),禁用持久化缓存
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
