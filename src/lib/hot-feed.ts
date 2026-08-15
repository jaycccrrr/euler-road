import { Post } from '@/types';

/**
 * 热榜算法：借鉴 Hacker News / Reddit 的时间衰减排序
 *
 * score = (点赞 × 3 + 评论 × 2 + 1) / (小时数 + 2)^1.5
 *
 * - 点赞权重高于评论：点赞是更普遍的认可信号
 * - +1 避免新帖零分
 * - 重力因子 1.5：约 24 小时后热度衰减到 1/8 左右
 */

const LIKE_WEIGHT = 3;
const COMMENT_WEIGHT = 2;
const GRAVITY = 1.5;

export function hotScore(post: Post, now: number = Date.now()): number {
  const likes = post.likes || 0;
  const comments = post.comments?.length || 0;
  const ageHours = Math.max(0, (now - new Date(post.createdAt).getTime()) / 3600000);
  const signal = likes * LIKE_WEIGHT + comments * COMMENT_WEIGHT + 1;
  return signal / Math.pow(ageHours + 2, GRAVITY);
}

/** 按热度降序排序（不修改原数组） */
export function sortByHot(posts: Post[], now: number = Date.now()): Post[] {
  return [...posts].sort((a, b) => hotScore(b, now) - hotScore(a, now));
}

/**
 * 相关推荐：同模块优先，其次共享话题，最后按热度取 top N
 */
export function getRelatedPosts(current: Post, allPosts: Post[], limit = 5): Post[] {
  const candidates = allPosts.filter((p) => p.id !== current.id);
  const scored = candidates.map((p) => {
    let relevance = 0;
    if (p.moduleId === current.moduleId) relevance += 2;
    const sharedTopics = (p.topics || []).filter((t) => (current.topics || []).includes(t));
    relevance += sharedTopics.length;
    return { post: p, relevance, hot: hotScore(p) };
  });
  return scored
    .filter((s) => s.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || b.hot - a.hot)
    .slice(0, limit)
    .map((s) => s.post);
}
