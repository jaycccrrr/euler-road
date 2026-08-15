'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  Globe,
  History,
  Pencil,
  StickyNote,
  Trash2,
  X,
} from 'lucide-react';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { MathRenderer } from '@/components/math/MathRenderer';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import type { AnswerRecord } from '@/types';

function formatTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

interface MyAnswerRecordsProps {
  questionId: string;
  /** 紧凑模式：用于 π力日历等窄面板 */
  compact?: boolean;
  /** 初始展开记录列表（日历中点击题目时直接展示） */
  defaultOpen?: boolean;
}

/**
 * 我在某道题下的全部提交记录：查看 / 备注 / 删除。
 * 数据来自 useDailyQuestion 的 questionMyRecords（按 questionId 加载）。
 */
export function MyAnswerRecords({ questionId, compact = false, defaultOpen = false }: MyAnswerRecordsProps) {
  const {
    questionMyRecords,
    myRecordsQuestionId,
    loadMyRecordsForQuestion,
    saveAnswerNote,
    deleteAnswer,
    setAnswerPublic,
  } = useDailyQuestion();

  const [open, setOpen] = useState(defaultOpen);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  // 待删除确认的记录（应用内确认弹窗，替代原生 confirm）
  const [deleteTarget, setDeleteTarget] = useState<AnswerRecord | null>(null);

  useEffect(() => {
    loadMyRecordsForQuestion(questionId);
  }, [questionId, loadMyRecordsForQuestion]);

  // 防止渲染到其他题目的旧数据
  const records = myRecordsQuestionId === questionId ? questionMyRecords : [];

  if (records.length === 0) return null;

  const handleDelete = async (record: AnswerRecord) => {
    await deleteAnswer(record.id);
  };

  const startEditNote = (record: AnswerRecord) => {
    setEditingId(record.id);
    setNoteDraft(record.note ?? '');
  };

  const handleSaveNote = async (recordId: string) => {
    await saveAnswerNote(recordId, noteDraft);
    setEditingId(null);
  };

  return (
    <div className={compact ? '' : 'mt-4'}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <History className="w-3.5 h-3.5" />
        我的提交记录（{records.length}）
      </button>

      {open && (
        <div className="mt-2 space-y-2 animate-fade-in-scale">
          {records.map((record) => {
            const expanded = expandedId === record.id;
            const editing = editingId === record.id;
            return (
              <div
                key={record.id}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
              >
                {/* 记录摘要行 */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 shrink-0">{formatTime(record.submittedAt)}</span>
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded-full font-semibold ${
                      record.isCorrect
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {record.aiScore}分
                  </span>
                  <span className="text-slate-500 truncate flex-1 min-w-0">
                    {record.content.replace(/\$+/g, '').slice(0, 40) || '（图片作答）'}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      title={expanded ? '收起' : '查看完整解答'}
                      onClick={() => setExpandedId(expanded ? null : record.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="备注"
                      onClick={() => (editing ? setEditingId(null) : startEditNote(record))}
                      className={`p-1 rounded-md transition-colors ${
                        record.note
                          ? 'text-amber-500 hover:bg-amber-50'
                          : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {editing ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      title={record.isPublic ? '已公开到讨论区，点击取消公开' : '公开这条解答到讨论区'}
                      onClick={() => void setAnswerPublic(record.id, !record.isPublic)}
                      className={`p-1 rounded-md transition-colors ${
                        record.isPublic
                          ? 'text-emerald-500 hover:bg-emerald-50'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="删除此记录"
                      onClick={() => setDeleteTarget(record)}
                      className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 备注展示 */}
                {record.note && !editing && (
                  <div className="mt-1.5 flex items-start gap-1 text-xs text-amber-700 bg-amber-50/70 border border-amber-100 rounded-lg px-2 py-1.5">
                    <StickyNote className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="whitespace-pre-wrap break-words">{record.note}</span>
                  </div>
                )}

                {/* 备注编辑 */}
                {editing && (
                  <div className="mt-2 animate-fade-in-scale">
                    <textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="给这次提交写点备注，如：思路来自换元法…"
                      rows={2}
                      className="w-full text-xs rounded-lg border border-slate-200 bg-white px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
                    />
                    <div className="flex justify-end gap-1.5 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 text-xs rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveNote(record.id)}
                        className="px-2 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        保存备注
                      </button>
                    </div>
                  </div>
                )}

                {/* 展开的完整解答 */}
                {expanded && (
                  <div className="mt-2 pt-2 border-t border-slate-100 animate-fade-in-scale">
                    <div className="text-xs font-medium text-slate-500 mb-1">我的解答</div>
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2 text-sm max-h-56 overflow-y-auto">
                      <MathRenderer>{record.content}</MathRenderer>
                    </div>
                    {record.images.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {record.images.map((img, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={img}
                            alt={`作答图片 ${i + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                          />
                        ))}
                      </div>
                    )}
                    {record.aiFeedback && (
                      <>
                        <div className="text-xs font-medium text-slate-500 mt-2 mb-1">AI 评解</div>
                        <div className="rounded-lg bg-blue-50/50 border border-blue-100 px-3 py-2 text-sm max-h-56 overflow-y-auto">
                          <MathRenderer>{record.aiFeedback}</MathRenderer>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null);
        }}
        title="删除提交记录"
        description="删除后不可恢复，该次提交的得分与备注将一并移除。"
        confirmText="删除"
        onConfirm={() => {
          if (deleteTarget) void handleDelete(deleteTarget);
        }}
      />
    </div>
  );
}
