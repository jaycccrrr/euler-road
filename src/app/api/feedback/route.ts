import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth';

// 提交反馈（未登录也可提交，登录则记录用户）
export async function POST(request: NextRequest) {
  try {
    const { content, page } = await request.json();
    if (!content || !String(content).trim()) {
      return NextResponse.json({ error: '请填写反馈内容' }, { status: 400 });
    }
    const userId = getAuthUserId(request);
    await prisma.feedback.create({
      data: {
        userId: userId || undefined,
        content: String(content).trim().slice(0, 2000),
        page: page ? String(page).slice(0, 200) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('提交反馈失败:', error);
    return NextResponse.json({ error: '提交失败' }, { status: 500 });
  }
}