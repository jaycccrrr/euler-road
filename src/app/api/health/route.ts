import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 健康检查：直接测试数据库连接，失败时返回具体错误信息（便于排查线上配置）
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
