'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Note } from '@/types';
import { Button } from '@/components/ui/button';
import { MathRenderer } from '@/components/math/MathRenderer';
import {
  Save,
  X,
  Trash2,
  GripVertical,
} from 'lucide-react';

interface StickyNoteProps {
  note?: Note;
  /** 草稿便签的列表项 id，作为保存时的笔记 id（保证保存后列表项 id 不变、展开状态不丢失） */
  fallbackId?: string;
  defaultX?: number;
  defaultY?: number;
  chapterTitle: string;
  moduleId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSave: (note: Note) => void;
  /** 拖拽落定后持久化新位置（百分比） */
  onMove?: (id: string, x: number, y: number) => void;
  onDelete?: (id: string) => void;
  onClose?: () => void;
  /** 「前往原文」定位后短暂高亮 */
  highlighted?: boolean;
}

const FORMULA_BUTTONS = [
  { label: '½', latex: '\\frac{}{}' },
  { label: '√', latex: '\\sqrt{}' },
  { label: '∫', latex: '\\int_{}^{}' },
  { label: '∑', latex: '\\sum_{i=1}^{n}' },
  { label: 'xⁿ', latex: '^{}' },
  { label: 'xₙ', latex: '_{}' },
  { label: 'α', latex: '\\alpha' },
  { label: 'β', latex: '\\beta' },
  { label: 'π', latex: '\\pi' },
  { label: '∞', latex: '\\infty' },
  { label: '→', latex: '\\rightarrow' },
  { label: '≠', latex: '\\neq' },
];

export function StickyNote({
  note,
  fallbackId,
  defaultX = 65,
  defaultY = 10,
  chapterTitle,
  moduleId,
  containerRef,
  onSave,
  onMove,
  onDelete,
  onClose,
  highlighted = false,
}: StickyNoteProps) {
  const [content, setContent] = useState(note?.content || '');
  // 编辑模式：草稿默认编辑；已保存笔记默认纯净视图（点击重新进入编辑）
  const [editing, setEditing] = useState(!note);
  const [position, setPosition] = useState({
    x: note?.positionX ?? defaultX,
    y: note?.positionY ?? defaultY,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [settling, setSettling] = useState(false);
  const reduceMotion = useReducedMotion();
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 区分「点击」与「拖拽」：移动超过阈值才算拖拽，否则抬起视为点击（进入编辑）
  const dragMovedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef(position);

  // 自由缩放（宽高独立，比例随意）
  const [size, setSize] = useState({ w: 288, h: 240 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 拖拽逻辑
  // 注意：不能用共享 ref 取卡片元素——视图/编辑卡片切换时 AnimatePresence 双挂载，
  // 后卸载的一方会把共享 ref 置 null，导致点击/拖拽整体失效。
  // 这里统一用 e.currentTarget 向上找最近的卡片元素。
  const handleMouseDown = (e: React.MouseEvent) => {
    const card = (e.currentTarget as HTMLElement).closest(
      '[data-sticky-note]'
    ) as HTMLElement | null;
    if (!card || !containerRef.current) return;
    const rect = card.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    dragMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      // 拖动阈值：4px 内的抖动视为点击，不移动位置
      if (!dragMovedRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        if (Math.hypot(dx, dy) < 4) return;
        dragMovedRef.current = true;
      }
      const containerRect = containerRef.current.getBoundingClientRect();
      // 拖动边界按卡片实际尺寸动态计算：卡片完整留在容器内，
      // 而不是写死 0~80%/0~70%（容器很高时旧下限会卡住笔记拖不下去）
      const maxX = Math.max(
        0,
        ((containerRect.width - size.w) / containerRect.width) * 100
      );
      const maxY = Math.max(
        0,
        ((containerRect.height - size.h) / containerRect.height) * 100
      );
      const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
      const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;
      const next = {
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY)),
      };
      positionRef.current = next;
      setPosition(next);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      if (dragMovedRef.current) {
        // 拖拽落定：持久化新位置 + 轻微回弹反馈（尊重 prefers-reduced-motion）
        if (note && onMove) {
          onMove(note.id, positionRef.current.x, positionRef.current.y);
        }
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          if (settleTimeout.current) clearTimeout(settleTimeout.current);
          setSettling(true);
          settleTimeout.current = setTimeout(() => setSettling(false), 400);
        }
      } else if (!editing && note) {
        // 视图模式下未移动的抬起 = 点击 → 进入编辑
        setEditing(true);
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, containerRef, editing, note, onMove, size]);

  // 缩放逻辑（右下角手柄，自由改变宽高比例）
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      setSize({
        w: Math.max(220, resizeStart.current.w + (e.clientX - resizeStart.current.x)),
        h: Math.max(150, resizeStart.current.h + (e.clientY - resizeStart.current.y)),
      });
    };
    const handleMouseUp = () => setIsResizing(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // 插入公式
  const insertFormula = (latex: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const before = content.substring(0, start);
    const after = content.substring(end);
    const newContent = before + latex + after;
    let cursorPos = start + latex.length;
    if (latex.includes('{}')) {
      const braceIdx = latex.indexOf('{}');
      cursorPos = start + braceIdx + 1;
    }
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const handleSave = () => {
    onSave({
      id: note?.id || fallbackId || Math.random().toString(36).slice(2) + Date.now().toString(36),
      userId: note?.userId || '',
      moduleId,
      chapterTitle,
      content,
      positionX: position.x,
      positionY: position.y,
      createdAt: note?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // 保存后切换为纯净视图（仅文本，无编辑栏）
    setEditing(false);
  };

  // 收缩/展开切换：缩放 + 淡入过渡（spring，reduced-motion 时仅快速淡入）
  const expandMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.85 },
        transition: { type: 'spring' as const, stiffness: 220, damping: 24 },
      };

  return (
    <AnimatePresence initial={false}>
      {!editing && note ? (
        /* ===== 纯净视图：仅笔记正文；拖动移动位置，点击进入编辑 ===== */
        <motion.div
          key="note-view"
          data-sticky-note
          className={`absolute z-40 shadow-xl rounded-lg overflow-hidden pointer-events-auto cursor-move select-none border border-slate-200${settling ? ' animate-note-settle' : ''}${highlighted ? ' animate-note-highlight' : ''}`}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            width: size.w,
            height: size.h,
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)',
            backgroundSize: '18px 18px',
          }}
          onMouseDown={handleMouseDown}
          title="拖动移动，点击编辑"
          {...expandMotion}
        >
          <div className="h-full px-3.5 py-3 overflow-auto text-sm text-slate-800 leading-6">
            {note.content ? (
              <MathRenderer>{note.content}</MathRenderer>
            ) : (
              <span className="text-slate-400 italic">空便签</span>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="note"
          data-sticky-note
          className={`absolute z-40 shadow-2xl rounded-lg overflow-hidden select-none pointer-events-auto flex flex-col border border-slate-200${settling ? ' animate-note-settle' : ''}${highlighted ? ' animate-note-highlight' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: size.w,
        height: size.h,
        // 白色点格纸
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* 头部：可拖拽 */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-white/85 border-b border-slate-200 cursor-move relative shrink-0"
        style={{ zIndex: 2 }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1.5">
          <GripVertical className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">笔记</span>
        </div>
        <div className="flex items-center gap-0.5">
          {onClose ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 rounded hover:bg-red-100 text-slate-600 hover:text-red-700"
              title="关闭"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(false);
              }}
              className="p-1 rounded hover:bg-slate-200 text-slate-600"
              title="完成"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 min-h-0 px-3 py-2 flex flex-col gap-2 relative" style={{ zIndex: 2 }}>
        <textarea
          ref={textareaRef}
          className="flex-1 min-h-0 w-full bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 resize-none leading-6"
          placeholder="在此输入笔记，支持 $公式$ ..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 公式快捷栏 */}
      <div className="px-3 py-1.5 bg-white/70 border-t border-slate-100 relative shrink-0" style={{ zIndex: 2 }}>
        <div className="flex flex-wrap gap-1">
          {FORMULA_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              onClick={() => insertFormula(btn.latex)}
              className="px-1 py-0.5 text-[10px] bg-white/90 border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors"
              title={btn.latex}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div
        className="px-3 py-2 bg-white/85 border-t border-slate-200 flex items-center justify-between relative shrink-0"
        style={{ zIndex: 2 }}
      >
        <div className="flex items-center gap-1">
          {note?.id && onDelete && (
            <button
              onClick={() => onDelete(note.id)}
              className="p-1 rounded text-slate-500 hover:bg-red-100 hover:text-red-700"
              title="删除"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
        <Button
          size="sm"
          className="h-6 text-xs bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSave}
        >
          <Save className="w-3 h-3 mr-1" />
          保存
        </Button>
      </div>

      {/* 缩放手柄（右下角，自由调整宽高） */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute bottom-0.5 right-0.5 w-4 h-4 cursor-nwse-resize text-slate-400 hover:text-slate-600 transition-colors"
        style={{ zIndex: 3 }}
        title="拖拽调整大小"
      >
        <svg viewBox="0 0 12 12" className="w-full h-full">
          <path d="M11 3 L3 11 M11 7 L7 11 M11 11 L11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
