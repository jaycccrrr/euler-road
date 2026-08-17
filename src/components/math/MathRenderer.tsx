'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { assetPath } from '@/lib/asset';

interface MathRendererProps {
  children: string;
  className?: string;
}

/**
 * 预处理文本内容，修复常见格式问题
 * 主要针对高等数学数据中的格式不规范：
 * 1. \r\n → \n
 * 2. 行首多余空格/缩进
 * 3. 转义的反引号分隔符（\`\`\` 并非真正的代码块，只是视觉分隔符）
 */
function preprocessContent(text: string): string {
  let html = text;

  // 1. 统一换行为 \n
  html = html.replace(/\r\n/g, '\n');
  html = html.replace(/\r/g, '\n');

  // 2. 去除每行行首的多余空格
  //    高等数学数据中每行前有大量缩进空格（6个以上视为多余，清除）
  html = html
    .split('\n')
    .map(line => {
      if (line.trim() === '') return '';
      return line.replace(/^\s{6,}/, '');
    })
    .join('\n');

  // 3. 高等数学数据中的 \`\`\` 不是真正的 Markdown 代码块标记，
  //    只是 AI 生成时的视觉分隔符。将其替换为水平线，避免被代码块正则误匹配
  html = html.replace(/\\`\\`\\`/g, '\n---\n');

  return html;
}

/**
 * 数学公式和 Markdown 渲染组件
 * 使用 KaTeX 渲染数学公式，同时支持 Markdown 格式
 */
export function MathRenderer({ children, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect 而非 useLayoutEffect:KaTeX 同步渲染 + innerHTML 开销大,
  // 不阻塞首帧绘制,避免列表场景连续阻塞渲染线程
  useEffect(() => {
    if (!containerRef.current) return;

    const text = typeof children === 'string' ? children : String(children || '');
    if (!text) {
      containerRef.current.innerHTML = '';
      return;
    }

    let html = preprocessContent(text);

    // 先保护代码块和数学公式不被 Markdown 处理影响
    const protectedBlocks: string[] = [];

    // 保护 HTML img 标签
    html = html.replace(/<img[^>]+>/gi, (match) => {
      protectedBlocks.push(match);
      return `\0BLOCK${protectedBlocks.length - 1}\0`;
    });

    // 保护代码块 ```...``` (只匹配成对的)
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
      const codeHtml = code
        .split('\n')
        .map((line: string) => `<div class="code-line">${line || '&nbsp;'}</div>`)
        .join('');
      const block = `<div class="my-4 bg-slate-800 text-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">${codeHtml}</div>`;
      protectedBlocks.push(block);
      return `\0BLOCK${protectedBlocks.length - 1}\0`;
    });

    // 处理不成对的 ``` (可能是残留的分隔符，直接移除)
    html = html.replace(/```/g, '');

    // 保护 $$...$$ 块级公式
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
      protectedBlocks.push(match);
      return `\0BLOCK${protectedBlocks.length - 1}\0`;
    });

    // 保护 $...$ 行内公式
    html = html.replace(/\$([^$]+?)\$/g, (match) => {
      protectedBlocks.push(match);
      return `\0BLOCK${protectedBlocks.length - 1}\0`;
    });

    // 处理 <span class="math">...</span> 格式公式
    html = html.replace(/<span class="math">([\s\S]*?)<\/span>/g, (match, latex) => {
      try {
        // 只还原双重转义（4 个反斜杠 → 2 个），保留合法的 LaTeX 换行符 \\，
        // 否则 vmatrix/pmatrix/array 等多行结构会并为一行
        const normalizedLatex = latex.trim().replace(/\\\\\\\\/g, '\\\\');
        return katex.renderToString(normalizedLatex, {
          displayMode: false,
          throwOnError: false,
          strict: false,
        });
      } catch {
        return `<span style="color:red;border:1px dashed red;padding:2px;">${match}</span>`;
      }
    });

    // ===== Markdown 处理 =====

    // 标题 (从长到短匹配，避免 #### 被 ## 先匹配)
    html = html.replace(/^#### (.*)$/gm, '<h4 class="text-lg font-bold text-slate-800 mt-6 mb-3">$1</h4>');
    html = html.replace(/^### (.*)$/gm, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200">$1</h3>');
    html = html.replace(/^## (.*)$/gm, '<h2 class="text-2xl font-bold text-slate-800 mt-10 mb-5 pb-3 border-b border-slate-200">$1</h2>');
    html = html.replace(/^# (.*)$/gm, '<h1 class="text-3xl font-bold text-slate-900 mt-12 mb-6 pb-4 border-b-2 border-slate-300">$1</h1>');

    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-700 bg-slate-50 px-1 rounded">$1</strong>');

    // 斜体
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em class="italic text-slate-600">$1</em>');

    // 思考引导
    html = html.replace(/\[思考引导\]/g, '<div class="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-sm font-medium border border-amber-200 mb-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>思考引导</div>');

    // 列表项
    html = html.replace(/^\s*[-*] (.*)$/gm, '<li class="ml-2 text-slate-600 leading-relaxed py-1.5">$1</li>');

    // 有序列表项
    html = html.replace(/^\s*(\d+)\.\s+(.*)$/gm, '<li class="ml-2 text-slate-600 leading-relaxed py-1.5"><span class="text-slate-400 mr-1">$1.</span>$2</li>');

    // 将连续的 li 包装在 ul 中
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc list-inside my-4 space-y-1 marker:text-slate-400">$&</ul>');

    // 引用
    html = html.replace(/^\s*> (.*)$/gm, '<blockquote class="border-l-4 border-indigo-400 bg-indigo-50 pl-4 py-3 pr-3 my-4 text-slate-700 italic rounded-r-lg">$1</blockquote>');

    // Markdown 表格
    // 匹配连续的以 | 开头的行（至少2行，含表头+分隔行）
    html = html.replace(/((?:^\|.+\|$\n?)+)/gm, (tableBlock) => {
      const lines = tableBlock.trim().split('\n').filter(l => l.trim());
      if (lines.length < 2) return tableBlock;

      // 检查第二行是否为分隔行 (|---|---|)
      const isSeparator = /^\|?[\s\-:|]+\|?$/;
      if (!isSeparator.test(lines[1].trim())) return tableBlock;

      // 解析对齐方式
      const alignCells = lines[1].trim().split('|').filter((c: string) => c.trim() !== '');
      const aligns = alignCells.map((cell: string) => {
        const t = cell.trim();
        if (t.startsWith(':') && t.endsWith(':')) return 'center';
        if (t.endsWith(':')) return 'right';
        if (t.startsWith(':')) return 'left';
        return 'left';
      });

      // 解析表头
      const headerCells = lines[0].trim().split('|').filter((c: string) => c.trim() !== '');
      const headerHtml = headerCells.map((cell: string, i: number) =>
        `<th class="px-4 py-2.5 text-left text-sm font-semibold text-slate-700 bg-slate-50 border-b border-slate-200 ${aligns[i] === 'center' ? 'text-center' : aligns[i] === 'right' ? 'text-right' : ''}">${cell.trim()}</th>`
      ).join('');

      // 解析数据行（跳过前两行：表头和分隔行）
      const bodyRows = lines.slice(2).map((line: string) => {
        const cells = line.trim().split('|').filter((c: string) => c.trim() !== '');
        const cellsHtml = cells.map((cell: string, i: number) =>
          `<td class="px-4 py-2 text-sm text-slate-600 border-b border-slate-100 ${aligns[i] === 'center' ? 'text-center' : aligns[i] === 'right' ? 'text-right' : ''}">${cell.trim()}</td>`
        ).join('');
        return `<tr class="hover:bg-slate-50/50">${cellsHtml}</tr>`;
      }).join('');

      return `<div class="my-4 overflow-x-auto"><table class="w-full border-collapse border border-slate-200 rounded-lg"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
    });

    // 水平线 --- (预处理将 \`\`\` 替换为了 ---)
    html = html.replace(/^---$/gm, '<hr class="my-6 border-slate-200" />');

    // 行内代码 (排除已保护的块)
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">$1</code>');

    // Markdown 图片
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
      const cleanUrl = url.trim();
      const cleanAlt = alt.trim();
      const rawUrl = cleanUrl.startsWith('http') || cleanUrl.startsWith('//')
        ? cleanUrl
        : cleanUrl.startsWith('/') ? cleanUrl : '/' + cleanUrl;
      // GitHub Pages 子路径部署时，本地绝对路径需要补 basePath 前缀
      const finalUrl = assetPath(rawUrl);
      return `<div class="my-4"><img src="${finalUrl}" alt="${cleanAlt}" class="max-w-full rounded-lg" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.style.display='none'; this.parentElement.querySelector('.img-error').style.display='block';" /><div class="img-error" style="display:none; padding:12px; background:#fee; color:#c00; border:1px solid #fcc; border-radius:8px; word-break:break-all;"><strong>图片加载失败</strong><br/>路径: ${finalUrl}</div></div>`;
    });

    // 段落分割（将空行分隔的文本包装在 p 标签中）
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs.map(p => {
      const trimmed = p.trim();
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<div class="my-4">') ||
        trimmed.startsWith('<div class="my-4 overflow-x-auto">') ||
        trimmed.startsWith('<img') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<table') ||
        trimmed.startsWith('\0BLOCK') ||
        trimmed === ''
      ) {
        return p;
      }
      return `<p class="text-slate-600 leading-[1.8] mb-4 text-[15px]">${p}</p>`;
    }).join('\n');

    // 恢复保护的块
    html = html.replace(/\0BLOCK(\d+)\0/g, (_, index) => {
      const block = protectedBlocks[parseInt(index)];

      // 块级公式 $$...$$
      if (block.startsWith('$$')) {
        const latex = block.slice(2, -2).trim().replace(/\\\\\\\\/g, '\\\\');
        try {
          return katex.renderToString(latex, {
            displayMode: true,
            throwOnError: false,
            strict: false,
          });
        } catch (e) {
          console.error('[MathRenderer] KaTeX block error:', e, 'Latex:', latex);
          return `<div class="text-red-500 text-sm p-2 bg-red-50 rounded">公式渲染错误</div>`;
        }
      }

      // 行内公式 $...$
      if (block.startsWith('$')) {
        const latex = block.slice(1, -1).trim().replace(/\\\\\\\\/g, '\\\\');
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

      // 受保护的 <img> 标签：补齐 GitHub Pages 子路径前缀
      if (/^<img[\s>]/i.test(block)) {
        return block.replace(/src\s*=\s*(["'])(.*?)\1/i, (_, q, src) => `src=${q}${assetPath(src)}${q}`);
      }

      // 其他保护的块（代码块等）
      return block;
    });

    // 单个换行转为空格
    html = html.replace(/\n/g, ' ');

    containerRef.current.innerHTML = html;
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`math-content text-[15px] leading-[1.8] text-slate-600 ${className}`}
      suppressHydrationWarning
    />
  );
}

/**
 * 简化版数学渲染组件（用于短文本）
 */
export function InlineMath({ children }: { children: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;
    const text = typeof children === 'string' ? children : String(children || '');
    if (!text) {
      spanRef.current.innerHTML = '';
      return;
    }

    try {
      const normalizedLatex = text.trim().replace(/\\\\\\\\/g, '\\\\');
      spanRef.current.innerHTML = katex.renderToString(normalizedLatex, {
        displayMode: false,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      console.error('[InlineMath] KaTeX error:', e);
      spanRef.current.textContent = `$${text}$`;
    }
  }, [children]);

  return (
    <span
      ref={spanRef}
      className="inline-math"
      suppressHydrationWarning
    />
  );
}

export default MathRenderer;
