import { NextRequest, NextResponse } from 'next/server';
import { gradeAnswerServer, sanitizeGradingImages } from '@/lib/server-grader';
import { getAuthUserId } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

// 判卷接口：供每日一题等前端调用，走后端 AI（识图 + DeepSeek）
// 返回 { aiAvailable: true, score, feedback, isCorrect } 或 { aiAvailable: false }
export async function POST(request: NextRequest) {
  // 判卷调用外部付费 API，必须登录
  const userId = getAuthUserId(request);
  if (!userId) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  // 限流：每用户每分钟最多 10 次（按用户而非 IP，防止换 IP 刷接口）
  const limited = rateLimit(`grade:${userId}`, 10, 60 * 1000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { title, content, answer, studentContent, images } = body || {};

    const result = await gradeAnswerServer(
      {
        title: String(title || '每日一题'),
        content: String(content || ''),
        answer: answer ? String(answer) : undefined,
      },
      String(studentContent || ''),
      sanitizeGradingImages(images)
    );

    if (!result) {
      return NextResponse.json({ aiAvailable: false });
    }
    return NextResponse.json({ aiAvailable: true, ...result });
  } catch (error) {
    console.error('判卷接口失败:', error);
    return NextResponse.json({ aiAvailable: false }, { status: 500 });
  }
}