import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '欧拉之路 - 数学学习交流平台',
    short_name: '欧拉之路',
    description:
      '高中数学、高等数学、线性代数、概率论与数理统计、离散数学知识库，每日一题 AI 判卷，经典教材在线阅读与数学社区',
    start_url: base + '/',
    scope: base + '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f8fafc',
    theme_color: '#4f46e5',
    lang: 'zh-CN',
    icons: [
      {
        src: base + '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: base + '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: base + '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
