import { NextRequest, NextResponse } from 'next/server';
import { TEXTBOOKS } from '@/data/textbooks';

export const dynamic = 'force-dynamic';

// 教材同源代理：服务器拉取 GitHub Release 教材并流式转发
// 支持 Range 请求，pdf.js 可按需按页拉取，无需整本下载
export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');
  const book = TEXTBOOKS.find((b) => b.file === file);
  if (!book) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const url = `https://github.com/jaycccrrr/euler-road/releases/download/textbooks/${encodeURIComponent(book.file)}`;
  try {
    const range = request.headers.get('range');
    const upstream = await fetch(url, {
      redirect: 'follow',
      headers: range ? { Range: range } : undefined,
    });
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
