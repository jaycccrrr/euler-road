'use client';

import { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  children: string;
  className?: string;
}

/**
 * 数学公式和 Markdown 渲染组件
 * 使用 KaTeX 渲染数学公式，同时支持 Markdown 格式
 */
export function MathRenderer({ children, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !children) return;

    // 复制内容并处理
    let html = children;

    // 先保护代码块和数学公式不被 Markdown 处理影响
    const protectedBlocks: string[] = [];

    // 保护 $$...$$ 块级公式
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
      protectedBlocks.push(match);
      return `\0BLOCK${protectedBlocks.length - 1}\0`;
    });

    // 保护 $...$ 行内公式
    html = html.replace(/\$([^$\n]+?)\$/g, (match) => {
      protectedBlocks.push(match);
      return `\0BLOCK${protectedBlocks.length - 1}\0`;
    });

    // 处理 Markdown 标题 - 更优雅的样式
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-800 mt-10 mb-5 pb-3 border-b border-slate-200">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 mt-12 mb-6 pb-4 border-b-2 border-slate-300">$1</h1>');

    // 处理粗体 - 使用更柔和的颜色
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-700 bg-slate-50 px-1 rounded">$1</strong>');

    // 处理斜体
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-600">$1</em>');

    // 处理思考引导区块 - 特殊样式
    html = html.replace(/\[思考引导\]/g, '<div class="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-sm font-medium border border-amber-200 mb-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>思考引导</div>');

    // 处理列表项 - 更好的间距和样式
    html = html.replace(/^\s*[-*] (.*$)/gim, '<li class="ml-2 text-slate-600 leading-relaxed py-1.5">$1</li>');

    // 将连续的 li 包装在 ul 中
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc list-inside my-4 space-y-1 marker:text-slate-400">$&</ul>');

    // 处理重要提示/强调段落
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-400 bg-indigo-50 pl-4 py-3 pr-3 my-4 text-slate-700 italic rounded-r-lg">$1</blockquote>');

    // 处理行内代码
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">$1</code>');

    // 处理段落（将空行分隔的文本包装在 p 标签中）
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs.map(p => {
      if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<li') || p.trim().startsWith('<blockquote')) {
        return p;
      }
      return `<p class="text-slate-600 leading-[1.8] mb-4 text-[15px]">${p}</p>`;
    }).join('\n');

    // 恢复保护的块
    html = html.replace(/\0BLOCK(\d+)\0/g, (match, index) => {
      const block = protectedBlocks[parseInt(index)];

      // 处理块级公式
      if (block.startsWith('$$')) {
        const latex = block.slice(2, -2).trim();
        try {
          return katex.renderToString(latex, {
            displayMode: true,
            throwOnError: false,
            strict: false,
          });
        } catch (e) {
          console.error('KaTeX block error:', e);
          return `<div style="color:red">${block}</div>`;
        }
      }

      // 处理行内公式
      if (block.startsWith('$')) {
        const latex = block.slice(1, -1).trim();
        console.log('[MathRenderer] Rendering inline latex:', latex);
        try {
          return katex.renderToString(latex, {
            displayMode: false,
            throwOnError: false,
            strict: false,
          });
        } catch (e) {
          console.error('[MathRenderer] KaTeX inline error:', e, 'Latex:', latex);
          return `<span style="color:red;border:1px dashed red;padding:2px;" title="KaTeX Error: ${e}">${block}</span>`;
        }
      }

      return block;
    });

    // 处理换行（单个换行转为空格，保持段落流畅）
    html = html.replace(/\n/g, ' ');

    containerRef.current.innerHTML = html;
    setIsReady(true);
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`math-content text-[15px] leading-[1.8] text-slate-600 ${className}`}
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.3s ease',
        minHeight: '1em',
      }}
    />
  );
}

/**
 * 简化版数学渲染组件（用于短文本）
 */
export function InlineMath({ children }: { children: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!spanRef.current || !children) return;

    try {
      spanRef.current.innerHTML = katex.renderToString(children.trim(), {
        displayMode: false,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      console.error('KaTeX inline error:', e);
      spanRef.current.textContent = `$${children}$`;
    }
    setIsReady(true);
  }, [children]);

  return (
    <span
      ref={spanRef}
      className="inline-math"
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
    />
  );
}

export default MathRenderer;
