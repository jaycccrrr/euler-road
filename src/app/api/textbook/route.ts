import { NextRequest, NextResponse } from 'next/server';
import { TEXTBOOKS } from '@/data/textbooks';

export const dynamic = 'force-dynamic';

// 教材同源代理：服务器拉取 GitHub Release 教材并流式转发
// 支持 Range 请求，pdf.js 可按需按页拉取，无需整本下载
// GitHub 偶发连接中断，此处做有限次数自动重试
async function fetchUpstream(url: string, headers: HeadersInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await fetch(url, {
        redirect: 'follow',
        headers,
        signal: AbortSignal.timeout(20000),
      });
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
    }
  }
  throw lastError;
}

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');
  const book = TEXTBOOKS.find((b) => b.file === file);
  if (!book) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const url = `https://github.com/jaycccrrr/euler-road/releases/download/textbooks/${encodeURIComponent(book.file)}`;
  try {
    const range = request.headers.get('range');
    const upstream = await fetchUpstream(url, range ? { Range: range } : {});
    if ((!upstream.ok && upstream.status !== 206) || !upstream.body) {
      return NextResponse.json({ error: '上游获取失败' }, { status: 502 });
    }
    const headers = new Headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
      'Accept-Ranges': 'bytes',
    });
    const contentRange = upstream.headers.get('content-range');
    const contentLength = upstream.headers.get('content-length');
    if (contentRange) headers.set('Content-Range', contentRange);
    if (contentLength) headers.set('Content-Length', contentLength);
    return new NextResponse(upstream.body as ReadableStream, {
      status: upstream.status,
      headers,
    });
  } catch (error) {
    console.error('教材代理失败:', error);
    return NextResponse.json({ error: '代理失败' }, { status: 502 });
  }
}
