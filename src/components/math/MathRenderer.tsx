'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRendererProps {
  children: string;
  className?: string;
}

/**
 * 数学公式渲染组件
 * 使用 KaTeX 直接渲染 LaTeX 数学公式
 */
export function MathRenderer({ children, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !children) return;

    let html = children;

    // 处理块级公式 $$...$$
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), {
          displayMode: true,
          throwOnError: false,
        });
      } catch (e) {
        console.error('KaTeX block render error:', e);
        return `<div class="text-red-500">${match}</div>`;
      }
    });

    // 处理行内公式 $...$
    html = html.replace(/\$([^\$]+)\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), {
          displayMode: false,
          throwOnError: false,
        });
      } catch (e) {
        console.error('KaTeX inline render error:', e);
        return `<span class="text-red-500">${match}</span>`;
      }
    });

    // 处理 Markdown 标题
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-slate-700 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-indigo-100 mt-6">$1</h2>');

    // 处理加粗
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-indigo-700">$1</strong>');

    // 处理换行
    html = html.replace(/\n/g, '<br />');

    containerRef.current.innerHTML = html;
  }, [children]);

  return <div ref={containerRef} className={className} />;
}

/**
 * 简化版数学渲染组件（用于短文本）
 */
export function InlineMath({ children }: { children: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current || !children) return;

    try {
      spanRef.current.innerHTML = katex.renderToString(children.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX inline render error:', e);
      spanRef.current.textContent = `$${children}$`;
    }
  }, [children]);

  return <span ref={spanRef} className="inline" />;
}

export default MathRenderer;
