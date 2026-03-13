'use client';

import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  children: string;
  className?: string;
}

/**
 * 去除模板字符串的公共缩进
 */
function dedent(str: string): string {
  const lines = str.split('\n');
  let minIndent = Infinity;

  for (const line of lines) {
    if (line.trim().length > 0) {
      const spaces = line.match(/^(\s*)/)?.[0].length ?? 0;
      minIndent = Math.min(minIndent, spaces);
    }
  }

  if (minIndent === Infinity || minIndent === 0) return str;
  return lines.map(line => line.slice(minIndent)).join('\n');
}

/**
 * 渲染数学公式
 */
function renderMath(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch {
    return displayMode ? `$$${latex}$$` : `$${latex}$`;
  }
}

/**
 * 处理代码块内的数学公式
 */
function processCodeBlock(code: string): string {
  // 去除首尾的换行
  let content = code.replace(/^\n/, '').replace(/\n$/, '');

  // 尝试渲染代码中的数学表达式
  // 匹配模式：字母 + 可选下标/上标 + 数学符号 + ...
  const mathPattern = /([a-zA-Z][₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹ₐₑᵢₒᵤₙₘ]*(?:\s*[×÷√∫∂∇∑∏∞∈∉⊂⊃⊆⊇∪∩∧∨¬⇒⇔∀∃∂∆∇∏∑√∛∜∧∨∩∪∫∮∯∰∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿\+\-\*\/\^\_\(\)\[\]\{\}\|\\.,;=<>~!@#$%&*:?\s0-9])*)/g;

  content = content.replace(mathPattern, (match) => {
    // 如果包含数学字符，尝试渲染
    if (/[αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ√∫∂∇∑∏∞₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(match)) {
      try {
        return katex.renderToString(match.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return match;
      }
    }
    return match;
  });

  return `<pre class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-slate-700 font-mono">${content}</code></pre>`;
}

/**
 * Markdown + 数学公式渲染组件
 */
export function MathRenderer({ children, className = '' }: MathRendererProps) {
  const html = useMemo(() => {
    if (!children) return '';

    // Step 1: 去除缩进
    let text = dedent(children);

    // Step 2: 保护代码块（先处理，因为代码块里可能有$符号）
    const codeBlocks: string[] = [];
    text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
      codeBlocks.push(code);
      return `<<<CODE_${codeBlocks.length - 1}>>>`;
    });

    // Step 3: 保护行内代码
    const inlineCodes: string[] = [];
    text = text.replace(/`([^`]+)`/g, (match, code) => {
      inlineCodes.push(code);
      return `<<<INLINECODE_${inlineCodes.length - 1}>>>`;
    });

    // Step 4: 保护数学公式
    const mathBlocks: string[] = [];
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
      mathBlocks.push(math);
      return `<<<MATHBLOCK_${mathBlocks.length - 1}>>>`;
    });

    const inlineMaths: string[] = [];
    text = text.replace(/\$([^$\n]+?)\$/g, (match, math) => {
      inlineMaths.push(math);
      return `<<<INLINEMATH_${inlineMaths.length - 1}>>>`;
    });

    // Step 5: 处理 Markdown（现在可以安全处理，因为特殊内容已被保护）

    // 标题（从大到小，避免重复匹配）
    text = text.replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-bold text-slate-800 mt-6 mb-3">$1</h4>');
    text = text.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200">$1</h3>');
    text = text.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-slate-800 mt-10 mb-5 pb-3 border-b border-slate-200">$1</h2>');
    text = text.replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold text-slate-900 mt-12 mb-6 pb-4 border-b-2 border-slate-300">$1</h1>');

    // 引用块
    text = text.replace(/^>\s*\*\*提示\*\*$/gm, '<div class="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg my-4 text-blue-800 font-medium"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>提示</div>');
    text = text.replace(/^>\s*(.+)$/gm, '<blockquote class="border-l-4 border-slate-300 bg-slate-50 pl-4 py-3 pr-3 my-4 text-slate-600 italic rounded-r-lg">$1</blockquote>');

    // 列表项
    text = text.replace(/^[-*]\s+(.+)$/gm, '<li class="text-slate-600 leading-relaxed py-1">$1</li>');

    // 将连续的 li 包装成 ul
    const paras = text.split(/\n\n+/);
    const processedParas = paras.map(para => {
      const lines = para.split('\n');
      const result: string[] = [];
      let currentList: string[] = [];

      for (const line of lines) {
        if (line.startsWith('<li')) {
          currentList.push(line);
        } else {
          if (currentList.length > 0) {
            result.push(`<ul class="list-disc list-inside my-4 space-y-1 marker:text-slate-400">${currentList.join('')}</ul>`);
            currentList = [];
          }
          result.push(line);
        }
      }
      if (currentList.length > 0) {
        result.push(`<ul class="list-disc list-inside my-4 space-y-1 marker:text-slate-400">${currentList.join('')}</ul>`);
      }
      return result.join('\n');
    });
    text = processedParas.join('\n\n');

    // 粗体和斜体
    text = text.replace(/\*\*思考引导\*\*/g, '<span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-semibold border border-amber-200"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>思考引导</span>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-700">$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em class="italic text-slate-600">$1</em>');

    // Step 6: 处理段落（将被保护的占位符视为独立块）
    const finalParas = text.split(/\n\n+/).map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';

      // 检查是否是块级元素
      if (/^<(h[1-6]|ul|blockquote|div|pre)/.test(trimmed)) {
        return para;
      }

      // 检查是否只包含保护占位符
      if (/^<<<\w+_\d+>>>$/.test(trimmed)) {
        return para;
      }

      // 普通段落
      return `<p class="text-slate-600 leading-[1.8] mb-4 text-[15px]">${para}</p>`;
    }).filter(Boolean);

    text = finalParas.join('\n');

    // Step 7: 恢复所有保护的内容

    // 恢复代码块
    text = text.replace(/<<<CODE_(\d+)>>>/g, (_, i) => processCodeBlock(codeBlocks[parseInt(i)]));

    // 恢复行内代码
    text = text.replace(/<<<INLINECODE_(\d+)>>>/g, (_, i) => {
      const code = inlineCodes[parseInt(i)];
      return `<code class="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">${code}</code>`;
    });

    // 恢复数学公式块
    text = text.replace(/<<<MATHBLOCK_(\d+)>>>/g, (_, i) => renderMath(mathBlocks[parseInt(i)], true));

    // 恢复行内数学公式
    text = text.replace(/<<<INLINEMATH_(\d+)>>>/g, (_, i) => renderMath(inlineMaths[parseInt(i)], false));

    return text;
  }, [children]);

  return (
    <div
      className={`math-content text-[15px] leading-[1.8] text-slate-600 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default MathRenderer;
