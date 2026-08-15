/**
 * 拼接 public 静态资源路径。
 * GitHub Pages 部署在 /euler-road 子路径，硬编码的 "/images/..." 需要加前缀；
 * data:/blob:/http(s): 等运行时 URL 原样返回。
 */
export function assetPath(src: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!base || !src.startsWith('/')) return src;
  return base + src;
}
