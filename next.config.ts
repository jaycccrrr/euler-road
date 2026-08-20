import type { NextConfig } from "next";

// GitHub Pages 项目站点托管在 /euler-road 子路径下；
// 本地 dev/build 不设置 GITHUB_PAGES，保持根路径
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/euler-road" : "";

const nextConfig: NextConfig = {
  // 后端模式：启用 SSR / API Routes（部署到 Vercel）
  // 如需回到 GitHub Pages 静态导出，再取消下面两行注释
  // output: 'export',
  // distDir: 'dist5',

  basePath,
  // 供客户端代码拼接 public 下的静态资源路径（<img src> 等不走 Next 前缀的场景）
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // 关闭 trailingSlash：避免 API 路由 308 重定向时丢失 Authorization 头
  // （GitHub Pages 静态托管时代需要，Vercel 上不需要）
  trailingSlash: false,
  images: {
    // 静态导出（GitHub Pages）时必须为 true；Vercel 部署下启用自动图片优化
    unoptimized: isGithubPages,
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
