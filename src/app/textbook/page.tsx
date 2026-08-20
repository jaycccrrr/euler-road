'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { TEXTBOOKS } from '@/data/textbooks';
import { Button } from '@/components/ui/button';
import CubeLoader from '@/components/ui/cube-loader';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  getCachedTextbook,
  saveCachedTextbook,
  removeCachedTextbook,
} from '@/lib/textbook-cache';

import type { PDFDocumentProxy, PDFDocumentLoadingTask } from 'pdfjs-dist';

async function loadPdfJs() {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
}

const BASE_SCALE = 1.15;
const MAX_DPR = 2;

type CacheStatus = 'none' | 'loading' | 'caching' | 'cached';

function ReaderContent() {
  const searchParams = useSearchParams();
  const file = searchParams.get('file');
  const book = TEXTBOOKS.find((b) => b.file === file);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const loadingTaskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const sliderTimerRef = useRef<number | null>(null);
  const aliveRef = useRef(true);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [sliderPage, setSliderPage] = useState(1);
  const [scale, setScale] = useState(BASE_SCALE);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState('');
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>('none');
  const [cacheProgress, setCacheProgress] = useState<number | null>(null);

  // 拖动滑块时防抖跳页，松手/键盘确认时立即跳页
  const queueSlider = useCallback((v: number) => {
    setSliderPage(v);
    if (sliderTimerRef.current !== null) window.clearTimeout(sliderTimerRef.current);
    sliderTimerRef.current = window.setTimeout(() => setPage(v), 160);
  }, []);

  const commitSlider = useCallback((v: number) => {
    if (sliderTimerRef.current !== null) {
      window.clearTimeout(sliderTimerRef.current);
      sliderTimerRef.current = null;
    }
    setSliderPage(v);
    setPage(v);
  }, []);

  useEffect(() => {
    setSliderPage(page);
  }, [page]);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      if (sliderTimerRef.current !== null) window.clearTimeout(sliderTimerRef.current);
    };
  }, []);

  // 首次打开时按阅读区宽高自动缩放，避免大页面渲染过慢
  const fittedScale = useCallback(async (pdf: PDFDocumentProxy) => {
    try {
      const first = await pdf.getPage(1);
      const base = first.getViewport({ scale: 1 });
      const el = viewerRef.current;
      const availW = (el?.clientWidth || Math.min(window.innerWidth, 1000)) - 64;
      const availH = (el?.clientHeight || window.innerHeight) - 96;
      return Math.max(0.5, Math.min(BASE_SCALE, availW / base.width, availH / base.height));
    } catch {
      return BASE_SCALE;
    }
  }, []);

  // 后台整本下载教材并写入本地缓存（带进度）
  const downloadAndCache = useCallback(async (fileName: string) => {
    try {
      setCacheStatus('caching');
      setCacheProgress(0);
      const res = await fetch(`/api/textbook?file=${encodeURIComponent(fileName)}`);
      if (!res.ok || !res.body) throw new Error('download failed');
      const total = Number(res.headers.get('content-length') || 0);
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          received += value.byteLength;
        }
        if (aliveRef.current) {
          setCacheProgress(total ? Math.min(100, Math.round((received / total) * 100)) : null);
        }
      }
      const buffer = await new Blob(chunks as BlobPart[]).arrayBuffer();
      await saveCachedTextbook(fileName, buffer, total || received);
      if (aliveRef.current) setCacheStatus('cached');
    } catch {
      if (aliveRef.current) setCacheStatus('none');
    } finally {
      if (aliveRef.current) setCacheProgress(null);
    }
  }, []);

  // 打开缓存后后台校验文件大小是否变化，变化则重新缓存
  const verifyCachedSize = useCallback(
    async (fileName: string, cachedSize: number) => {
      try {
        const res = await fetch(`/api/textbook?file=${encodeURIComponent(fileName)}`, {
          headers: { Range: 'bytes=0-0' },
        });
        const cr = res.headers.get('content-range') || '';
        const total = Number(cr.match(/\/(\d+)\s*$/)?.[1] || 0);
        if (total && total !== cachedSize) {
          await removeCachedTextbook(fileName);
          await downloadAndCache(fileName);
        }
      } catch {
        // 校验失败不影响阅读
      }
    },
    [downloadAndCache]
  );

  // 首次加载 PDF：优先本地缓存，未缓存则按需加载并后台缓存
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!book) {
        setError('未找到该教材，请返回课程页重新选择');
        setLoading(false);
        return;
      }
      try {
        const pdfjsLib = await loadPdfJs();
        const cached = await getCachedTextbook(book.file);
        let task: PDFDocumentLoadingTask;
        if (cached) {
          setCacheStatus('cached');
          task = pdfjsLib.getDocument({ data: cached.data });
          verifyCachedSize(book.file, cached.size);
        } else {
          setCacheStatus('loading');
          task = pdfjsLib.getDocument({
            url: `/api/textbook?file=${encodeURIComponent(book.file)}`,
            disableStream: true,
            disableAutoFetch: true,
          });
          downloadAndCache(book.file);
        }
        loadingTaskRef.current = task;
        const pdf = await task.promise;
        if (cancelled) {
          task.destroy();
          loadingTaskRef.current = null;
          return;
        }
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        const s = await fittedScale(pdf);
        setScale(+s.toFixed(3));
        setPage(1);
        setError('');
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError('教材加载失败，请检查网络后重试');
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
      loadingTaskRef.current?.destroy();
      loadingTaskRef.current = null;
      pdfRef.current = null;
    };
  }, [book, fittedScale, downloadAndCache, verifyCachedSize]);

  const renderPage = useCallback(
    async (pageNumber: number, pdf: PDFDocumentProxy, s: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pageObj = await pdf.getPage(pageNumber);
      const viewport = pageObj.getViewport({ scale: s });
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, viewport.width, viewport.height);
      await pageObj.render({ canvas, canvasContext: ctx, viewport }).promise;
    },
    []
  );

  // 页码 / 缩放变化时渲染当前页，并预取后两页数据
  useEffect(() => {
    const pdf = pdfRef.current;
    if (!pdf || loading) return;
    let cancelled = false;
    setRendering(true);
    renderPage(page, pdf, scale)
      .then(() => {
        if (!cancelled) {
          setRendering(false);
          for (const p of [page + 1, page + 2]) {
            if (p >= 1 && p <= pdf.numPages) pdf.getPage(p).catch(() => {});
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRendering(false);
          setError('页面渲染失败，请缩小后重试');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [page, scale, loading, renderPage]);

  // 键盘翻页（输入框聚焦时不抢键）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1));
      if (e.key === 'ArrowRight') setPage((p) => Math.min(numPages, p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [numPages]);



  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-slate-600">{error || '教材不存在'}</p>
          <Link href="/courses">
            <Button className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> 返回课程页
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const downloadUrl = `https://github.com/jaycccrrr/euler-road/releases/download/textbooks/${encodeURIComponent(book.file)}`;
  const progressWidth = cacheProgress !== null ? `${cacheProgress}%` : undefined;
  const cacheBadge =
    cacheStatus === 'caching' && cacheProgress !== null
      ? `缓存 ${cacheProgress}%`
      : cacheStatus === 'cached'
        ? '已缓存'
        : '';

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <Header />

      {/* 顶部工具栏（紧凑） */}
      <div className="h-12 shrink-0 bg-white border-b border-slate-200 flex items-center gap-2 px-3">
        <Link href="/courses">
          <Button variant="ghost" size="sm" className="rounded-lg shrink-0 px-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> 返回
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-slate-800 truncate leading-tight">{book.name}</h1>
          <p className="text-[11px] text-slate-400 truncate leading-tight">{book.author}</p>
        </div>
        <div className="flex-1" />
        <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="rounded-lg">
            <Download className="w-4 h-4 mr-1.5" /> 下载
          </Button>
        </a>
      </div>

      <main className="flex-1 min-h-0 flex">
        {/* 阅读区 */}
        <div
          ref={viewerRef}
          className="relative flex-1 min-h-0 bg-slate-100 flex items-center justify-center overflow-hidden"
        >


          {loading ? (
            <div className="flex flex-col items-center gap-3 py-16 px-6">
              <CubeLoader />
              <p className="text-sm text-slate-400">正在加载教材…</p>
              <p className="text-xs text-slate-300">首次打开会自动缓存，之后打开秒开</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-16 px-6 text-center">
              <p className="text-slate-600">{error}</p>
              <Button
                className="rounded-xl"
                onClick={async () => {
                  setError('');
                  setLoading(true);
                  const pdfjsLib = await loadPdfJs();
                  const cached = await getCachedTextbook(book.file);
                  let task: PDFDocumentLoadingTask;
                  if (cached) {
                    task = pdfjsLib.getDocument({ data: cached.data });
                  } else {
                    task = pdfjsLib.getDocument({
                      url: `/api/textbook?file=${encodeURIComponent(book.file)}`,
                      disableStream: true,
                      disableAutoFetch: true,
                    });
                  }
                  loadingTaskRef.current?.destroy();
                  loadingTaskRef.current = task;
                  task.promise
                    .then(async (pdf) => {
                      pdfRef.current = pdf;
                      setNumPages(pdf.numPages);
                      const s = await fittedScale(pdf);
                      setScale(+s.toFixed(3));
                      setPage(1);
                      setLoading(false);
                    })
                    .catch(() => {
                      setError('教材加载失败，请检查网络后重试');
                      setLoading(false);
                    });
                }}
              >
                重试
              </Button>
            </div>
          ) : (
            <div className="w-full h-full overflow-auto grid place-items-center p-6">
              {rendering && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 pointer-events-none">
                  <p className="text-xs text-slate-400 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                    渲染中…
                  </p>
                </div>
              )}
              <canvas ref={canvasRef} className="shadow-md m-auto" />
            </div>
          )}

          {/* 左右翻页按钮 */}
          {!loading && !error && (
            <>
              <button
                type="button"
                aria-label="上一页"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="absolute left-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/55 backdrop-blur-sm shadow-md border border-white/70 flex items-center justify-center text-slate-700 hover:bg-white/85 hover:text-blue-600 motion-safe:transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                aria-label="下一页"
                disabled={page >= numPages}
                onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                className="absolute right-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/55 backdrop-blur-sm shadow-md border border-white/70 flex items-center justify-center text-slate-700 hover:bg-white/85 hover:text-blue-600 motion-safe:transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* 右侧控制栏 */}
        <aside className="w-16 shrink-0 bg-white border-l border-slate-200 flex flex-col items-center justify-between py-3">
          <div className="flex flex-col items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg px-1"
              aria-label="缩小"
              disabled={scale <= 0.5}
              onClick={() => setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)))}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-slate-600 tabular-nums w-10 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg px-1"
              aria-label="放大"
              disabled={scale >= 2.5}
              onClick={() => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)))}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {(loading || cacheStatus === 'caching') && (
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-1.5 h-24 rounded-full bg-slate-200 overflow-hidden relative">
                <div
                  className={
                    progressWidth
                      ? 'absolute bottom-0 inset-x-0 bg-blue-500 transition-all duration-200'
                      : 'absolute bottom-0 inset-x-0 h-1/3 bg-blue-500 animate-pulse'
                  }
                  style={progressWidth ? { height: progressWidth } : undefined}
                />
              </div>
              {cacheProgress !== null && (
                <span className="text-[10px] text-slate-400 tabular-nums">{cacheProgress}%</span>
              )}
            </div>
          )}

          <div
            className="text-xs text-slate-600 tabular-nums whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            第 {page} / {numPages} 页
          </div>

          <div className="h-60 w-8 flex items-center justify-center">
            <input
              type="range"
              min={1}
              max={numPages}
              step={1}
              value={sliderPage}
              onChange={(e) => queueSlider(Number(e.target.value))}
              onPointerUp={(e) => commitSlider(Number((e.target as HTMLInputElement).value))}
              onMouseUp={(e) => commitSlider(Number((e.currentTarget as HTMLInputElement).value))}
              onKeyUp={(e) => commitSlider(Number((e.target as HTMLInputElement).value))}
              aria-label="拖动跳转页码"
              className="w-52 h-2 accent-blue-600 cursor-pointer"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </div>

          <div className="text-[10px] text-slate-400 text-center leading-tight min-h-[14px]">
            {cacheBadge}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default function TextbookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <CubeLoader />
              <p className="text-sm text-slate-400">正在打开阅读器…</p>
            </div>
          </main>
        </div>
      }
    >
      <ReaderContent />
    </Suspense>
  );
}
