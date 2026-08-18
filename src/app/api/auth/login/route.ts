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

    const user = await prisma.user.findUnique({
      where: { nickname },
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: '密码错误' }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
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
    console.error('登录失败:', error);
    return NextResponse.json({ error: '登录失败' }, { status: 500 });
  }
}
