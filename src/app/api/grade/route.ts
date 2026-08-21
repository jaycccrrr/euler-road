import { NextRequest, NextResponse } from 'next/server';
import { gradeAnswerServer, sanitizeGradingImages } from '@/lib/server-grader';
import { getAuthUserId } from '@/lib/auth';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// 判卷接口：供每日一题等前端调用，走后端 AI（识图 + DeepSeek）
// 返回 { aiAvailable: true, score, feedback, isCorrect } 或 { aiAvailable: false }
export async function POST(request: NextRequest) {
  // 判卷调用外部付费 API：有登录则按用户限流，未登录/本地账号按 IP 限流（10 次/分钟）
  const userId = getAuthUserId(request);
  const limited = rateLimit(
    userId ? `grade:${userId}` : `grade:ip:${getClientIp(request)}`,
    10,
    60 * 1000
  );
  if (limited) return limited;

  try {
    const body = await request.json();
    const { title, content, answer, studentContent, images } = body || {};

    const cleanImages = sanitizeGradingImages(images);
    const result = await gradeAnswerServer(
      {
        title: String(title || '每日一题'),
        content: String(content || ''),
        answer: answer ? String(answer) : undefined,
      },
      String(studentContent || ''),
      cleanImages
    );

    if (!result) {
      if (cleanImages.length > 0) console.warn('判卷不可用：收到图片 ' + cleanImages.length + ' 张但识图未返回结果');
      return NextResponse.json({
        aiAvailable: false,
        reason: process.env.VISION_API_KEY
          ? '识图/AI 判卷调用失败（详见服务端日志）'
          : '服务端未配置识图密钥（VISION_API_KEY）',
      });
    }
    return NextResponse.json({ aiAvailable: true, imageCount: cleanImages.length, visionUsed: true, ...result });
  } catch (error) {
    console.error('判卷接口失败:', error);
    return NextResponse.json({ aiAvailable: false }, { status: 500 });
  }
}