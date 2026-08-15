'use client';

import { useState, useRef, useMemo } from 'react';
import { MathRenderer } from './MathRenderer';
import { Trash2, ArrowLeft, Calculator, FunctionSquare, Type, ArrowUp } from 'lucide-react';

interface MathFormulaEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

type TabType = 'number' | 'function' | 'letter';

// 数字和基本符号键盘 (123)
const NUMBER_PAD = [
  ['x^2', 'x^y', '√', '∛', 'π', 'e'],
  ['sin', 'cos', 'tan', 'ln', 'log', '1/x'],
  ['7', '8', '9', '×', '÷', '('],
  ['4', '5', '6', '+', '−', ')'],
  ['1', '2', '3', '=', '<'],
  ['0', '.', '%', '>', '≤', '≥'],
];

// 函数键盘 (f(x))
const FUNCTION_PAD = [
  ['sin', 'cos', 'tan', 'cot', 'sec', 'csc'],
  ['arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh'],
  ['ln', 'log', 'log₂', 'exp', '10^x', 'e^x'],
  ['∑', '∫', '∂', 'lim', 'd/dx', '∇'],
  ['√', '∛', '|x|', '⌈x⌉', '⌊x⌋', 'mod'],
  ['x^2', 'x^3', 'x^y', '²√', '³√', 'ⁿ√'],
];

// 字母键盘 (ABC)
const LETTER_PAD = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['g', 'h', 'i', 'j', 'k', 'l'],
  ['m', 'n', 'o', 'p', 'q', 'r'],
  ['s', 't', 'u', 'v', 'w', 'x'],
  ['y', 'z', 'α', 'β', 'γ', 'δ'],
  ['θ', 'λ', 'μ', 'π', 'σ', 'ω'],
];

// 符号到 LaTeX 的映射
const SYMBOL_TO_LATEX: Record<string, string> = {
  // 基本符号
  '+': '+',
  '−': '-',
  '×': '\\times',
  '÷': '\\div',
  '=': '=',
  '<': '<',
  '>': '>',
  '≤': '\\leq',
  '≥': '\\geq',
  '(': '(',
  ')': ')',
  '.': '.',
  '%': '\\%',
  // 幂次和根号
  'x^2': '^{2}',
  'x^3': '^{3}',
  'x^y': '^{}',
  '²√': '\\sqrt{}',
  '³√': '\\sqrt[3]{}',
  'ⁿ√': '\\sqrt[]{}',
  '√': '\\sqrt{}',
  '∛': '\\sqrt[3]{}',
  // 函数
  'sin': '\\sin',
  'cos': '\\cos',
  'tan': '\\tan',
  'cot': '\\cot',
  'sec': '\\sec',
  'csc': '\\csc',
  'arcsin': '\\arcsin',
  'arccos': '\\arccos',
  'arctan': '\\arctan',
  'sinh': '\\sinh',
  'cosh': '\\cosh',
  'tanh': '\\tanh',
  'ln': '\\ln',
  'log': '\\log',
  'log₂': '\\log_{2}',
  'exp': '\\exp',
  '10^x': '10^{}',
  'e^x': 'e^{}',
  '1/x': '\\frac{1}{}',
  '|x|': '|',
  '⌈x⌉': '\\lceil \\rceil',
  '⌊x⌋': '\\lfloor \\rfloor',
  'mod': '\\bmod',
  // 微积分
  '∑': '\\sum_{i=1}^{n}',
  '∫': '\\int_{}^{}',
  '∂': '\\partial',
  'lim': '\\lim_{}',
  'd/dx': '\\frac{d}{dx}',
  '∇': '\\nabla',
  // 希腊字母大写映射
  'Α': '\\Alpha',
  'Β': '\\Beta',
  'Γ': '\\Gamma',
  'Δ': '\\Delta',
  'Θ': '\\Theta',
  'Λ': '\\Lambda',
  'Μ': '\\Mu',
  'Π': '\\Pi',
  'Σ': '\\Sigma',
  'Ω': '\\Omega',

  'b': 'b',
  'c': 'c',
  'd': 'd',
  'f': 'f',
  'g': 'g',
  'h': 'h',
  'i': 'i',
  'j': 'j',
  'k': 'k',
  'l': 'l',
  'm': 'm',
  'n': 'n',
  'o': 'o',
  'p': 'p',
  'q': 'q',
  'r': 'r',
  's': 's',
  't': 't',
  'u': 'u',
  'v': 'v',
  'w': 'w',
  'x': 'x',
  'y': 'y',
  'z': 'z',
  // 大写字母
  'A': 'A',
  'B': 'B',
  'C': 'C',
  'D': 'D',
  'E': 'E',
  'F': 'F',
  'G': 'G',
  'H': 'H',
  'I': 'I',
  'J': 'J',
  'K': 'K',
  'L': 'L',
  'M': 'M',
  'N': 'N',
  'O': 'O',
  'P': 'P',
  'Q': 'Q',
  'R': 'R',
  'S': 'S',
  'T': 'T',
  'U': 'U',
  'V': 'V',
  'W': 'W',
  'X': 'X',
  'Y': 'Y',
  'Z': 'Z',
};

export function MathFormulaEditor({
  value,
  onChange,
  placeholder = '点击按钮输入数学公式...',
  className = '',
}: MathFormulaEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('number');
  const [isUpperCase, setIsUpperCase] = useState(false);

  // 字母键盘（ABC）- 根据大小写状态生成
  const getLetterPad = useMemo(() => {
    const lowercase = [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      ['g', 'h', 'i', 'j', 'k', 'l'],
      ['m', 'n', 'o', 'p', 'q', 'r'],
      ['s', 't', 'u', 'v', 'w', 'x'],
      ['y', 'z', 'α', 'β', 'γ', 'δ'],
      ['θ', 'λ', 'μ', 'π', 'σ', 'ω'],
    ];

    if (!isUpperCase) return lowercase;

    // 转换为大小写
    return lowercase.map(row =>
      row.map(char => {
        const greekMap: Record<string, string> = {
          'α': 'Α', 'β': 'Β', 'γ': 'Γ', 'δ': 'Δ',
          'θ': 'Θ', 'λ': 'Λ', 'μ': 'Μ', 'π': 'Π',
          'σ': 'Σ', 'ω': 'Ω',
        };
        // 如果是希腊字母，转换为大写希腊字母
        if (greekMap[char]) {
          return greekMap[char];
        }
        // 普通字母转大写
        return char.toUpperCase();
      })
    );
  }, [isUpperCase]);

  // 自动将纯文本转换为 LaTeX 格式
  const processedValue = useMemo(() => {
    if (!value) return '';
    if (value.includes('$')) return value;
    return `$$${value}$$`;
  }, [value]);

  const insertText = (symbol: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const before = value.substring(0, start);
    const after = value.substring(end);

    // 获取对应的 LaTeX
    let latex = SYMBOL_TO_LATEX[symbol] || symbol;

    // 特殊处理：如果 symbol 是数字，直接使用
    if (/^[0-9]$/.test(symbol)) {
      latex = symbol;
    }

    let newValue;
    let newCursorPos;

    // 处理需要光标定位的情况
    if (latex.includes('{}')) {
      newValue = before + latex + after;
      const bracePos = latex.indexOf('{}');
      newCursorPos = start + bracePos + 1;
    } else if (latex === '|') {
      newValue = before + '|' + after + '|';
      newCursorPos = start + 1;
    } else {
      newValue = before + latex + after;
      newCursorPos = start + latex.length;
    }

    onChange(newValue);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBackspace = () => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    if (start === end && start > 0) {
      // 检查是否是 LaTeX 命令
      let deleteCount = 1;
      const prevChar = value.substring(start - 1, start);

      if (prevChar === '}') {
        // 找到匹配的 {
        let braceCount = 1;
        let i = start - 2;
        while (i >= 0 && braceCount > 0) {
          if (value[i] === '}') braceCount++;
          if (value[i] === '{') braceCount--;
          i--;
        }
        if (braceCount === 0) {
          deleteCount = start - i - 1;
        }
      } else if (prevChar.match(/[a-zA-Z]/)) {
        // 检查是否是 \command
        let i = start - 1;
        while (i > 0 && value[i - 1].match(/[a-zA-Z]/)) i--;
        if (i > 0 && value[i - 1] === '\\') {
          deleteCount = start - i + 1;
        }
      }

      const newValue = value.substring(0, start - deleteCount) + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start - deleteCount, start - deleteCount);
      }, 0);
    } else {
      const newValue = value.substring(0, start) + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start, start);
      }, 0);
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // 渲染键盘按钮
  const renderKey = (symbol: string) => (
    <button
      key={symbol}
      onClick={() => insertText(symbol)}
      className="h-10 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 font-medium text-sm transition-all active:scale-95 active:bg-blue-100"
    >
      {symbol}
    </button>
  );

  // 渲染当前键盘
  const renderKeypad = () => {
    let pad = activeTab === 'number' ? NUMBER_PAD :
                activeTab === 'function' ? FUNCTION_PAD : getLetterPad;

    return (
      <div className="space-y-1">
        {/* 字母栏大小写切换按钮 */}
        {activeTab === 'letter' && (
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs text-slate-500">字母键盘</span>
            <button
              onClick={() => setIsUpperCase(!isUpperCase)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isUpperCase
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              <ArrowUp className={`w-3.5 h-3.5 transition-transform ${isUpperCase ? 'rotate-0' : 'rotate-180'}`} />
              {isUpperCase ? '大写' : '小写'}
            </button>
          </div>
        )}
        {pad.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-6 gap-1">
            {row.map((key) => renderKey(key))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* 输入显示区 - 类似 GeoGebra */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 text-white shadow-lg">
        <div className="text-xs text-slate-400 mb-1">输入</div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-xl font-mono text-white placeholder-slate-500 border-none outline-none"
        />
      </div>

      {/* 预览区 */}
      <div className="bg-white rounded-xl border-2 border-blue-200 p-4 shadow-sm min-h-[60px]">
        <div className="text-xs text-blue-600 font-medium mb-1">预览</div>
        {value ? (
          <MathRenderer>{processedValue}</MathRenderer>
        ) : (
          <div className="text-slate-400 text-sm italic">公式预览...</div>
        )}
      </div>

      {/* Tab 切换按钮 */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('number')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'number'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          123
        </button>
        <button
          onClick={() => setActiveTab('function')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'function'
              ? 'bg-purple-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FunctionSquare className="w-4 h-4" />
          f(x)
        </button>
        <button
          onClick={() => setActiveTab('letter')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'letter'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Type className="w-4 h-4" />
          ABC
        </button>
      </div>

      {/* 键盘区域 */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
        {renderKeypad()}

        {/* 底部操作按钮 */}
        <div className="grid grid-cols-6 gap-1 mt-2 pt-2 border-t border-slate-200">
          <button
            onClick={() => insertText('\\frac{}{}')}
            className="h-10 rounded-lg bg-purple-50 border border-purple-200 hover:border-purple-400 text-purple-700 font-medium text-sm"
          >
            ½
          </button>
          <button
            onClick={() => insertText('^{}')}
            className="h-10 rounded-lg bg-purple-50 border border-purple-200 hover:border-purple-400 text-purple-700 font-medium text-sm"
          >
            xⁿ
          </button>
          <button
            onClick={() => insertText('_{}')}
            className="h-10 rounded-lg bg-purple-50 border border-purple-200 hover:border-purple-400 text-purple-700 font-medium text-sm"
          >
            xₙ
          </button>
          <button
            onClick={() => insertText('(')}
            className="h-10 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 text-blue-700 font-medium text-lg"
          >
            (
          </button>
          <button
            onClick={() => insertText(')')}
            className="h-10 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 text-blue-700 font-medium text-lg"
          >
            )
          </button>
          <button
            onClick={handleBackspace}
            className="h-10 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MathFormulaEditor;
