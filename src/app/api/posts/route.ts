import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 获取帖子列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where = moduleId ? { moduleId } : {};

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
              displayCategory: true,
            },
          },
          _count: {
            select: { comments: true },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('获取帖子失败:', error);
    return NextResponse.json({ error: '获取帖子失败' }, { status: 500 });
  }
}

// 创建帖子
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: '无效的token' }, { status: 401 });
    }

    const { id, moduleId, title, content, images, postType, topics } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: '请填写标题和内容' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        ...(id ? { id } : {}),
        userId: payload.userId,
        moduleId: moduleId || 'general',
        postType: postType || 'general',
        topics: topics || [],
        title,
        content,
        images: images || [],
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            displayCategory: true,
          },
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('创建帖子失败:', error);
    return NextResponse.json({ error: '创建帖子失败' }, { status: 500 });
  }
}
