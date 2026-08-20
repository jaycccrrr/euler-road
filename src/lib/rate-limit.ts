import { NextRequest, NextResponse } from 'next/server';

/**
 * 简单的内存滑动窗口限流。
 *
 * 注意：在 Vercel Serverless 等多实例环境下，每个实例各自计数，
 * 限流是"尽力而为"的。如需精确全局限流，应改用 Upstash Redis 等外部存储。
 */

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

// 定期清理过期 bucket，避免内存泄漏
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}

export function getClientIp(request: NextRequest): string {
  // Vercel 会将真实客户端 IP 写入 x-real-ip，优先使用；
  // x-forwarded-for 的链首可被客户端伪造，取链尾（由平台追加的真实 IP）
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return 'unknown';
}

/**
 * 检查是否超过限流。未超限返回 null；超限返回 429 响应。
 *
 * @param key 限流维度（如 `login:${ip}`）
 * @param limit 窗口内允许的最大请求数
 * @param windowMs 窗口大小（毫秒）
 */
export function rateLimit(key: string, limit: number, windowMs: number): NextResponse | null {
  cleanup(windowMs);
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    const retryAfter = Math.ceil((bucket.timestamps[0] + windowMs - now) / 1000);
    return NextResponse.json(
      { error: '请求过于频繁，请稍后再试' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return null;
}
