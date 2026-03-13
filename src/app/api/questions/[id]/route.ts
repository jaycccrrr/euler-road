import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const question = await prisma.dailyQuestion.findUnique({
      where: { id },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const answers = await prisma.answerRecord.findMany({
      where: {
        questionId: id,
        isPublic: true,
      },
      orderBy: { likes: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      question,
      answers,
    });
  } catch (error) {
    console.error('Get question error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
