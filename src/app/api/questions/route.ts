import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 获取每日一题列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');

    const where = moduleId ? { moduleId } : {};

    const questions = await prisma.dailyQuestion.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 30,
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('获取题目失败:', error);
    return NextResponse.json({ error: '获取题目失败' }, { status: 500 });
  }
}
