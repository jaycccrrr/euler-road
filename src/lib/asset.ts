/**
 * 拼接 public 静态资源路径。
 * GitHub Pages 部署在 /euler-road 子路径，硬编码的 "/images/..." 需要加前缀；
 * data:/blob:/http(s): 等运行时 URL 原样返回。
 */
export function assetPath(src: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // 外部/协议相对/data/blob URL 原样返回；本地绝对路径才加前缀
  if (!base || !src.startsWith('/') || src.startsWith('//')) return src;
  // 已带前缀时避免重复拼接
  if (src.startsWith(base)) return src;
  return base + src;
}

/**
 * 整页跳转（window.location）时同样需要 basePath 前缀，
 * 否则在 GitHub Pages 子路径下会跳到域根导致 404。
 */
export function navigateTo(path: string): void {
  window.location.href = assetPath(path);
}
