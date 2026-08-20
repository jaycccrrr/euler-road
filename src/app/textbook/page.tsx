'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { TEXTBOOKS } from '@/data/textbooks';
import { Button } from '@/components/ui/button';
import CubeLoader from '@/components/ui/cube-loader';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';

import type { PDFDocumentProxy, PDFDocumentLoadingTask } from 'pdfjs-dist';

async function loadPdfJs() {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  return pdfjsLib;
}

const BASE_SCALE = 1.15;

function ReaderContent() {
  const searchParams = useSearchParams();
  const file = searchParams.get('file');
  const book = TEXTBOOKS.find((b) => b.file === file);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const loadingTaskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(BASE_SCALE);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState('');

  const renderPage = useCallback(
    async (pageNumber: number, pdf: PDFDocumentProxy, s: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pageObj = await pdf.getPage(pageNumber);
      const viewport = pageObj.getViewport({ scale: s });
      const dpr = window.devicePixelRatio || 1;
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

  // 首次加载 PDF 元数据
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
        const task = pdfjsLib.getDocument({
          url: `/api/textbook?file=${encodeURIComponent(book.file)}`,
        });
        loadingTaskRef.current = task;
        const pdf = await task.promise;
        if (cancelled) {
          task.destroy();
          loadingTaskRef.current = null;
          return;
        }
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
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
  }, [book]);

  // 页码 / 缩放变化时渲染当前页
  useEffect(() => {
    const pdf = pdfRef.current;
    if (!pdf || loading) return;
    let cancelled = false;
    setRendering(true);
    renderPage(page, pdf, scale)
      .then(() => {
        if (!cancelled) setRendering(false);
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

  // 键盘翻页
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        {/* 顶部工具栏 */}
        <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/courses">
              <Button variant="outline" size="sm" className="rounded-lg shrink-0">
                <ArrowLeft className="w-4 h-4 mr-1" /> 返回
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-slate-800 truncate">{book.name}</h1>
              <p className="text-xs text-slate-400 truncate">{book.author}</p>
            </div>
          </div>
          <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Download className="w-4 h-4 mr-1.5" /> 下载
            </Button>
          </a>
        </div>

        {/* 阅读区 */}
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex items-center justify-center min-h-[70vh]">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-24">
              <CubeLoader />
              <p className="text-sm text-slate-400">正在加载教材…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-24 px-6 text-center">
              <p className="text-slate-600">{error}</p>
              <Button
                className="rounded-xl"
                onClick={async () => {
                  setError('');
                  setLoading(true);
                  const pdfjsLib = await loadPdfJs();
                  const task = pdfjsLib.getDocument({
                    url: `/api/textbook?file=${encodeURIComponent(book.file)}`,
                  });
                  loadingTaskRef.current?.destroy();
                  loadingTaskRef.current = task;
                  task.promise
                    .then((pdf) => {
                      pdfRef.current = pdf;
                      setNumPages(pdf.numPages);
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
            <div className="relative w-full flex items-center justify-center py-6 px-4">
              {rendering && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 pointer-events-none">
                  <p className="text-xs text-slate-400 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                    渲染中…
                  </p>
                </div>
              )}
              <canvas ref={canvasRef} className="shadow-md max-w-full h-auto" />
            </div>
          )}
        </div>

        {/* 底部控制栏 */}
        {!loading && !error && numPages > 0 && (
          <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mt-4 bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-600 tabular-nums min-w-[88px] text-center">
                第 {page} / {numPages} 页
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                disabled={page >= numPages}
                onClick={() => setPage((p) => Math.min(numPages, p + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                disabled={scale <= 0.6}
                onClick={() => setScale((s) => Math.max(0.6, +(s - 0.15).toFixed(2)))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-slate-500 tabular-nums w-10 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                disabled={scale >= 2.5}
                onClick={() => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
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
