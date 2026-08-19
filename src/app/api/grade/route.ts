import { NextRequest, NextResponse } from 'next/server';
import { gradeAnswerServer } from '@/lib/server-grader';

// 判卷接口：供每日一题等前端调用，走后端 AI（识图 + DeepSeek）
// 返回 { aiAvailable: true, score, feedback, isCorrect } 或 { aiAvailable: false }
export async function POST(request: NextRequest) {
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
      Array.isArray(images) ? images : []
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