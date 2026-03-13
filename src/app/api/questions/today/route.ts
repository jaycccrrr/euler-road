import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getTodayStr() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId') || 'math';
    const today = getTodayStr();

    let question = await prisma.dailyQuestion.findFirst({
      where: {
        moduleId,
        date: today,
      },
    });

    if (!question) {
      const titles: Record<string, string[]> = {
        math: ['函数极限计算', '导数应用题', '积分求解', '微分方程', '级数求和'],
        physics: ['力学分析', '电磁场计算', '热力学问题', '光学问题', '量子力学基础'],
        cs: ['算法复杂度分析', '数据结构实现', '图论问题', '动态规划', '递归与分治'],
      };

      const moduleTitles = titles[moduleId] || titles.math;
      const randomTitle = moduleTitles[Math.floor(Math.random() * moduleTitles.length)];

      question = await prisma.dailyQuestion.create({
        data: {
          moduleId,
          date: today,
          title: `${randomTitle} - ${today}`,
          content: `这是一道关于${randomTitle}的每日练习题。\n\n请尝试解决以下问题...`,
          difficulty: 3,
        },
      });
    }

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Get today question error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
