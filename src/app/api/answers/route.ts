import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthUserId } from '@/lib/auth';

const prisma = new PrismaClient();

function calculateExperience(score: number, difficulty: number): number {
  const baseExp = 10 * difficulty;
  const multiplier = score / 100;
  return Math.round(baseExp * multiplier);
}

export async function POST(req: NextRequest) {
  try {
    const userId = getAuthUserId(req);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { questionId, content, images } = await req.json();

    if (!questionId || !content) {
      return NextResponse.json(
        { error: 'Question ID and content are required' },
        { status: 400 }
      );
    }

    const question = await prisma.dailyQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const aiScore = 75;
    const aiFeedback = '回答基本正确，思路清晰。建议补充更多细节和推导过程。';
    const isCorrect = aiScore >= 60;
    const experienceGained = calculateExperience(aiScore, question.difficulty);

    const answer = await prisma.answerRecord.create({
      data: {
        userId,
        questionId,
        content,
        images: images || [],
        aiScore,
        aiFeedback,
        isCorrect,
        experienceGained,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && user.moduleData) {
      const moduleData: any = user.moduleData;
      const moduleKey = question.moduleId === 'advanced-math' ? 'math' : question.moduleId;

      if (moduleData[moduleKey]) {
        moduleData[moduleKey].exp = (moduleData[moduleKey].exp || 0) + experienceGained;
        const newLevel = Math.floor((moduleData[moduleKey].exp || 0) / 100) + 1;
        if (newLevel > moduleData[moduleKey].level) {
          moduleData[moduleKey].level = newLevel;
        }

        await prisma.user.update({
          where: { id: userId },
          data: { moduleData },
        });
      }
    }

    return NextResponse.json({
      answer: {
        ...answer,
        experienceGained,
        levelUp: false,
      },
      feedback: {
        score: aiScore,
        feedback: aiFeedback,
        isCorrect,
      },
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = getAuthUserId(req);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get('questionId');

    const where: any = { userId };
    if (questionId) {
      where.questionId = questionId;
    }

    const answers = await prisma.answerRecord.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
    });

    return NextResponse.json({ answers });
  } catch (error) {
    console.error('Get answers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
