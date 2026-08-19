'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CubeLoader from '@/components/ui/cube-loader';
import { getAnswerRecordsByUser, getDailyQuestionById } from '@/lib/db';
import { User, DailyQuestion, AnswerRecord, QuestionCardPayload } from '@/types';
import { Flame, CheckCircle2, XCircle } from 'lucide-react';

interface ShareQuestionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSelect: (payload: QuestionCardPayload) => void;
}

const MODULE_NAMES: Record<string, string> = {
  'highschool-math': '高中数学',
  'advanced-math': '高等数学',
  'linear-algebra': '线性代数',
};

interface ShareableItem {
  question: DailyQuestion;
  record: AnswerRecord;
}

/**
 * 题目卡片选择器：列出当前用户最近答过的每日一题，选择后生成卡片负载。
 */
export function ShareQuestionPicker({ isOpen, onClose, currentUser, onSelect }: ShareQuestionPickerProps) {
  const [items, setItems] = useState<ShareableItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const records = await getAnswerRecordsByUser(currentUser.id);
        // 按提交时间倒序，去重（同一题只保留最近一次），最多 20 条
        const sorted = [...records].sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        const seen = new Set<string>();
        const latest: AnswerRecord[] = [];
        for (const r of sorted) {
          if (!seen.has(r.questionId)) {
            seen.add(r.questionId);
            latest.push(r);
          }
          if (latest.length >= 20) break;
        }

        const resolved: ShareableItem[] = [];
        for (const record of latest) {
          const question = await getDailyQuestionById(record.questionId);
          if (question) resolved.push({ question, record });
        }
        if (!cancelled) setItems(resolved);
      } catch (error) {
        console.error('Failed to load shareable questions:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [isOpen, currentUser.id]);

  const handleSelect = (item: ShareableItem) => {
    const dateMatch = item.question.id.match(/^daily-(\d{4}-\d{2}-\d{2})-/);
    const payload: QuestionCardPayload = {
      kind: 'question-card',
      questionId: item.question.id,
      questionTitle: item.question.title,
      questionContent: item.question.content,
      moduleId: item.question.moduleId,
      date: dateMatch ? dateMatch[1] : item.question.date,
      difficulty: item.question.difficulty,
      isCorrect: item.record.isCorrect,
      score: item.record.aiScore,
      streak: currentUser.piPower?.currentStreak ?? 0,
    };
    onSelect(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[420px] !max-h-[520px] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 py-3 border-b shrink-0">
          <DialogTitle className="text-base">分享题目卡片</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {isLoading ? (
              <CubeLoader compact text="加载中" subtext="正在加载答题记录…" />
            ) : items.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-sm">还没有答题记录</p>
                <p className="text-xs mt-1">先去完成今日一题，再来分享给好友吧</p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.question.id}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                      {MODULE_NAMES[item.question.moduleId] || item.question.moduleId}
                    </span>
                    <span className="text-[10px] text-amber-500">
                      {'★'.repeat(item.question.difficulty)}
                    </span>
                    {item.record.isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-amber-500 ml-auto" />
                    )}
                    <span className="text-xs text-gray-500">{item.record.aiScore} 分</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-amber-800">
                    {item.question.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.question.id.match(/^daily-(\d{4}-\d{2}-\d{2})-/)?.[1] || ''}
                  </p>
                </button>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-3 border-t bg-gray-50 shrink-0">
          <Button variant="outline" className="w-full" onClick={onClose}>
            取消
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
