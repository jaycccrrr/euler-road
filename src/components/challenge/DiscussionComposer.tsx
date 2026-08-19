'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CubeLoader from '@/components/ui/cube-loader';
import { getAnswerRecordsByUserAndQuestionAll } from '@/lib/db';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { User, AnswerRecord } from '@/types';
import { CheckCircle2, FileSignature, Loader2, Send, X, XCircle } from 'lucide-react';

interface DiscussionComposerProps {
  /** 当前讨论区所属题目（每道题的讨论区独立） */
  questionId: string;
  currentUser: User;
}

function formatRecordTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/**
 * 讨论区发言框：直接发消息，可引用自己在当前题目下的某次解答。
 * 引用内容在发布时做快照（摘要/得分），不随原记录变化。
 */
export function DiscussionComposer({ questionId, currentUser }: DiscussionComposerProps) {
  const { postDiscussionMessage } = useDailyQuestion();

  const [content, setContent] = useState('');
  const [refAnswer, setRefAnswer] = useState<AnswerRecord | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const canSend = content.trim().length > 0 && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    setError('');
    try {
      const ok = await postDiscussionMessage(questionId, content, {
        refAnswerId: refAnswer?.id,
      });
      if (ok) {
        setContent('');
        setRefAnswer(null);
      } else {
        setError('发布失败，请刷新页面后重试');
      }
    } catch {
      setError('发布失败，请刷新页面后重试');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2.5">
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          if (error) setError('');
        }}
        placeholder="写下你的想法…"
        rows={2}
        className="w-full text-xs rounded-md border border-slate-100 bg-slate-50/60 px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
      />

      {/* 已选引用：仅限当前题目的解答 */}
      {refAnswer && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] rounded-md border border-emerald-100 bg-emerald-50/60 px-2 py-1">
          <FileSignature className="w-3 h-3 text-emerald-500 shrink-0" />
          <span className="text-slate-600 truncate flex-1 min-w-0">
            引用我的解答：{refAnswer.aiScore}分 · {(refAnswer.content.replace(/\$+/g, '') || '（图片作答）').slice(0, 30)}
          </span>
          <button type="button" onClick={() => setRefAnswer(null)} className="text-slate-400 hover:text-slate-600 shrink-0">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="mt-1.5 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] transition-colors ${
            refAnswer ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
        >
          <FileSignature className="w-3 h-3" />
          引用我的解答
        </button>
        {error && <span className="text-[11px] text-rose-500">{error}</span>}
        <Button
          size="sm"
          className="ml-auto h-7 text-xs px-3"
          onClick={() => void handleSend()}
          disabled={!canSend}
        >
          {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3 mr-1" />}
          发布
        </Button>
      </div>

      <MyAnswerRefPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        questionId={questionId}
        currentUser={currentUser}
        onSelect={(r) => {
          setRefAnswer(r);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}

/** 引用我的解答选择器：仅列出当前题目下的提交记录 */
function MyAnswerRefPicker({
  open,
  onClose,
  questionId,
  currentUser,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  questionId: string;
  currentUser: User;
  onSelect: (r: AnswerRecord) => void;
}) {
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const list = await getAnswerRecordsByUserAndQuestionAll(currentUser.id, questionId);
        if (!cancelled) setRecords(list);
      } catch (err) {
        console.error('Failed to load my answers:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [open, currentUser.id, questionId]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="!w-[420px] !max-h-[520px] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 py-3 border-b shrink-0">
          <DialogTitle className="text-base">引用我的解答（本题）</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {loading ? (
              <CubeLoader compact text="加载中" subtext="正在加载解答记录…" />
            ) : records.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-sm">当前题目还没有提交记录</p>
                <p className="text-xs mt-1">先在右侧作答区提交一次解答吧</p>
              </div>
            ) : (
              records.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => onSelect(record)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-400">{formatRecordTime(record.submittedAt)}</span>
                    {record.isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-amber-500 ml-auto" />
                    )}
                    <span className="text-xs text-gray-500">{record.aiScore} 分</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 group-hover:text-emerald-800">
                    {(record.content.replace(/\$+/g, '') || '（图片作答）').slice(0, 60)}
                  </p>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
