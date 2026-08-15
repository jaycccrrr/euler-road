'use client';

import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { getNotesByUser, deleteNote } from '@/lib/db';
import { assetPath, navigateTo } from '@/lib/asset';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { PenLine, Trash2, Calendar, BookOpen, X, ExternalLink, StickyNote } from 'lucide-react';
import { MathRenderer } from '@/components/math/MathRenderer';

interface NotePanelProps {
  moduleId: string;
  moduleName: string;
  chapterTitle: string;
  onCreateNote: () => void;
  onEditNote?: (note: Note) => void;
}

export function NotePanel({
  moduleId,
  moduleName,
  onCreateNote,
}: NotePanelProps) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  // 待删除确认的笔记（应用内确认弹窗，替代原生 confirm）
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const allNotes = await getNotesByUser(user.id);
      const filtered = allNotes.filter((n) => n.moduleId === moduleId);
      filtered.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      setNotes(filtered);
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      setLoading(false);
    }
  }, [user, moduleId]);

  useEffect(() => {
    if (isOpen) {
      loadNotes();
    }
  }, [isOpen, loadNotes]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (previewNote?.id === id) setPreviewNote(null);
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const handleCreate = () => {
    setIsOpen(false);
    onCreateNote();
  };

  // 前往原文：主动写 hash 触发章节定位。
  // 不能用普通 <a href>——若 hash 与当前相同（如返回列表后再次点击同一笔记），
  // 浏览器不触发 hashchange，定位逻辑不会执行，表现为「无效」。
  const goToSource = (n: Note) => {
    setPreviewNote(null);
    setIsOpen(false);
    const path = `/module/${n.moduleId}/`;
    const hash = `#chapter=${encodeURIComponent(n.chapterTitle)}&note=${encodeURIComponent(n.id)}`;
    if (window.location.pathname !== assetPath(path)) {
      // 跨页（如个人主页）：整页跳转，目标页挂载时读取 hash 定位
      navigateTo(path + hash);
      return;
    }
    if (window.location.hash === hash) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <>
      {/* 入口按钮：悬浮固定，阅读到任何位置都可添加笔记 */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 gap-1.5 rounded-full h-11 px-5 shadow-lg shadow-blue-600/30 bg-blue-600 hover:bg-blue-700 text-white"
        title="我的笔记"
      >
        <StickyNote className="w-4 h-4" />
        笔记
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              {moduleName} · 我的笔记
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-4 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              共 {notes.length} 条笔记
            </span>
            <Button size="sm" onClick={handleCreate}>
              <PenLine className="w-4 h-4 mr-1" />
              添加笔记
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-500">加载中...</div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>暂无笔记</p>
              <p className="text-sm mt-1">点击「添加笔记」在页面上创建</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] px-6 pb-6">
              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group bg-white"
                    onClick={() => setPreviewNote(note)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-800 text-sm truncate">
                          {note.title ||
                            (note.content || '').split('\n')[0] ||
                            '空便签'}
                        </h4>
                        {note.content && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {note.content}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1 truncate">
                          {note.chapterTitle}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(note);
                        }}
                        className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(note.updatedAt).toLocaleDateString('zh-CN')}
                      </span>
                      {/* 快捷前往原文（JS 写 hash 定位章节，hash 相同时强制派发） */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToSource(note);
                        }}
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-0.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                        前往原文
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* 预览弹窗 */}
      {previewNote && (
        <div className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800">
                  {previewNote.title ||
                    (previewNote.content || '').split('\n')[0] ||
                    '空便签'}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {previewNote.chapterTitle} · {new Date(previewNote.updatedAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
              <button
                onClick={() => setPreviewNote(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {previewNote.content ? (
                <div className="prose prose-sm max-w-none text-slate-700">
                  <MathRenderer>{previewNote.content}</MathRenderer>
                </div>
              ) : (
                <p className="text-slate-400 italic">无文本内容</p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100">
              <Button variant="ghost" onClick={() => goToSource(previewNote)}>
                <ExternalLink className="w-4 h-4 mr-1" />
                前往原文
              </Button>
              <Button variant="outline" onClick={() => setPreviewNote(null)}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null);
        }}
        title="删除笔记"
        description="删除后不可恢复，这条笔记的内容将一并移除。"
        confirmText="删除"
        onConfirm={() => {
          if (deleteTarget) void handleDelete(deleteTarget.id);
        }}
      />
    </>
  );
}
