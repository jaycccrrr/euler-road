'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Note } from '@/types';
import {
  getNotesByUser,
  createNote,
  updateNote,
  deleteNote,
} from '@/lib/db';
import { StickyNote } from './StickyNote';

export interface StickyNoteManagerRef {
  addNote: () => void;
}

interface StickyNoteManagerProps {
  moduleId: string;
  chapterTitle: string;
  userId?: string;
  /** 「前往原文」要求定位的笔记（ts 用于区分重复点击同一笔记） */
  focusNote?: { id: string; ts: number } | null;
}

interface NoteItem {
  id: string;
  note?: Note;
  isDraft: boolean;
  x: number;
  y: number;
}

export const StickyNoteManager = forwardRef<
  StickyNoteManagerRef,
  StickyNoteManagerProps
>(function StickyNoteManager({ moduleId, chapterTitle, userId, focusNote }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<NoteItem[]>([]);
  // 供 handleMove 读取最新 items（避免闭包过期）
  const itemsRef = useRef<NoteItem[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  // 已消费的「前往原文」定位信号（避免 items 变化时重复滚动）
  const consumedFocusTs = useRef(0);

  const loadNotes = useCallback(async () => {
    if (!userId) return;
    try {
      const all = await getNotesByUser(userId);
      const filtered = all.filter(
        (n) =>
          n.moduleId === moduleId && n.chapterTitle === chapterTitle
      );
      setItems((prev) => {
        const drafts = prev.filter((i) => i.isDraft);
        const existingIds = new Set(filtered.map((n) => n.id));
        // 保留仍存在的非 draft，避免保存后闪烁
        const keptOld = prev.filter(
          (i) => !i.isDraft && existingIds.has(i.note?.id || '')
        );
        const mergedNotes: NoteItem[] = filtered.map((n) => {
          const old = keptOld.find((i) => i.note?.id === n.id);
          return {
            id: n.id,
            note: n,
            isDraft: false,
            x: old?.x ?? n.positionX ?? 65,
            y: old?.y ?? n.positionY ?? 10,
          };
        });
        return [...mergedNotes, ...drafts];
      });
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  }, [userId, moduleId, chapterTitle]);

  // 章节/模块/用户变化时重新加载（切子章节不重挂载组件，必须每次重新拉取，
  // 否则「前往原文」切换章节后便签看似消失）
  useEffect(() => {
    if (!userId) return;
    const t = setTimeout(() => {
      void loadNotes();
    }, 0);
    return () => clearTimeout(t);
  }, [userId, loadNotes]);

  useImperativeHandle(ref, () => ({
    addNote: () => {
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      // 新笔记生成在当前视口可见位置，而不是容器顶部：
      // rect.top 是视口相对坐标，-rect.top 即容器顶部被卷上去的距离
      const x = 55;
      let y = 8;
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const viewportTopInContainer = Math.max(0, -rect.top);
        const targetPx = viewportTopInContainer + 90;
        y = Math.min((targetPx / rect.height) * 100, 92);
      }
      setItems((prev) => {
        // 连续添加多张时轻微错开，避免完全重叠
        const stagger = (prev.length % 4) * 2;
        return [
          ...prev,
          { id, isDraft: true, x: x + stagger, y: y + stagger },
        ];
      });
    },
  }));

  // 「前往原文」定位：笔记加载完成后平滑滚动到其当前位置（拖动后的新位置）
  useEffect(() => {
    if (!focusNote || focusNote.ts === consumedFocusTs.current) return;
    const item = items.find((i) => i.note?.id === focusNote.id);
    if (!item || !containerRef.current) return;
    consumedFocusTs.current = focusNote.ts;
    const rect = containerRef.current.getBoundingClientRect();
    const noteAbsTop =
      rect.top + window.scrollY + (item.y / 100) * rect.height;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: Math.max(0, noteAbsTop - window.innerHeight * 0.3),
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [focusNote, items]);

  const handleSave = async (note: Note) => {
    if (!userId) return;
    const data = { ...note, userId };
    try {
      // 草稿保存时 data.id === 草稿列表项 id（StickyNote 使用 fallbackId），
      // 因此同时按列表项 id 与笔记 id 匹配
      const existing = items.find(
        (i) => (!i.isDraft && i.note?.id === data.id) || i.id === data.id
      );
      if (existing && !existing.isDraft) {
        await updateNote(data);
      } else {
        await createNote(data);
      }
      // 本地更新，避免闪烁
      setItems((prev) =>
        prev.map((i) =>
          i.id === data.id
            ? {
                id: data.id,
                note: data,
                isDraft: false,
                x: data.positionX ?? i.x,
                y: data.positionY ?? i.y,
              }
            : i
        )
      );
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setItems((prev) => prev.filter((i) => i.note?.id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  // 拖拽落定后持久化位置（仅已保存笔记写库；草稿仅更新本地状态）
  const handleMove = async (id: string, x: number, y: number) => {
    const item = itemsRef.current.find(
      (i) => i.note?.id === id || i.id === id
    );
    setItems((prev) =>
      prev.map((i) =>
        i.note?.id === id || i.id === id
          ? {
              ...i,
              x,
              y,
              note: i.note ? { ...i.note, positionX: x, positionY: y } : i.note,
            }
          : i
      )
    );
    if (item?.note) {
      try {
        await updateNote({ ...item.note, positionX: x, positionY: y });
      } catch (err) {
        console.error('Failed to move note:', err);
      }
    }
  };

  const handleCloseDraft = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
    >
      {items.map((item) => (
        <StickyNote
          key={item.id}
          note={item.note}
          fallbackId={item.id}
          defaultX={item.x}
          defaultY={item.y}
          chapterTitle={chapterTitle}
          moduleId={moduleId}
          containerRef={containerRef}
          onSave={handleSave}
          onMove={handleMove}
          onDelete={item.isDraft ? undefined : handleDelete}
          onClose={item.isDraft ? () => handleCloseDraft(item.id) : undefined}
          highlighted={focusNote?.id != null && item.note?.id === focusNote.id}
        />
      ))}
    </div>
  );
});
