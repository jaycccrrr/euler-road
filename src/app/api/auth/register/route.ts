import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { nickname, password } = await request.json();

    if (!nickname || !password) {
      return NextResponse.json({ error: '请输入昵称和密码' }, { status: 400 });
    }

    if (nickname.length < 2 || nickname.length > 20) {
      return NextResponse.json({ error: '昵称长度应在2-20个字符之间' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '密码长度至少为6个字符' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { nickname },
    });

    if (existingUser) {
      return NextResponse.json({ error: '该昵称已被使用' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nickname,
        passwordHash,
        avatar: '👤',
      },
    });

    const token = generateToken(user.id);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        displayCategory: user.displayCategory,
        moduleData: user.moduleData,
      },
    });
  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json({ error: '注册失败' }, { status: 500 });
  }
}
