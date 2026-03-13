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

    // 处理 Markdown 标题
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-800 mt-5 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-slate-800 mt-6 mb-4">$1</h1>');

    // 处理粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>');

    // 处理斜体
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // 处理列表项
    html = html.replace(/^\s*[-*] (.*$)/gim, '<li class="ml-4 text-slate-700 leading-relaxed">$1</li>');

    // 将连续的 li 包装在 ul 中
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc my-2 space-y-1">$&</ul>');

    // 处理段落（将空行分隔的文本包装在 p 标签中）
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs.map(p => {
      if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<li')) {
        return p;
      }
      return `<p class="text-slate-700 leading-relaxed mb-3">${p}</p>`;
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
        try {
          return katex.renderToString(latex, {
            displayMode: false,
            throwOnError: false,
            strict: false,
          });
        } catch (e) {
          console.error('KaTeX inline error:', e);
          return `<span style="color:red">${block}</span>`;
        }
      }

      return block;
    });

    // 处理换行（单个换行转为 <br />）
    html = html.replace(/\n/g, '');

    containerRef.current.innerHTML = html;
    setIsReady(true);
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`math-content prose prose-slate max-w-none ${className}`}
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.2s',
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
