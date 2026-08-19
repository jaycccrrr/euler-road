'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import CubeLoader from '@/components/ui/cube-loader';
import { getAllAnswerRecords, updateAnswerRecord, getUserById } from '@/lib/db';
import { getDailyQuestionByIdFallback } from '@/lib/ai-question-generator';
import { MathRenderer } from '@/components/math/MathRenderer';
import type { AnswerRecord, DailyQuestion } from '@/types';

interface ReviewItem {
  record: AnswerRecord;
  question: DailyQuestion | null;
  nickname: string;
}

export default function AdminReviewPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated } = useAuth();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [finalScores, setFinalScores] = useState<Record<string, string>>({});
  const [finalCorrect, setFinalCorrect] = useState<Record<string, boolean>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/login/');
    }
  }, [isAuthenticated, hasHydrated, router]);

  useEffect(() => {
    if (!user?.isAdmin) return;
    (async () => {
      try {
        const records = await getAllAnswerRecords();
        const flagged = records.filter((r) => r.gradingMeta?.needsReview);

        const resolved: ReviewItem[] = [];
        for (const record of flagged) {
          const [question, author] = await Promise.all([
            getDailyQuestionByIdFallback(record.questionId),
            getUserById(record.userId),
          ]);
          resolved.push({
            record,
            question: question || null,
            nickname: author?.nickname || '未知用户',
          });
        }
        resolved.sort((a, b) => b.record.submittedAt.localeCompare(a.record.submittedAt));
        setItems(resolved);
      } catch (err) {
        console.error('Failed to load review queue:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.isAdmin]);

  const handleResolve = async (item: ReviewItem) => {
    const { record } = item;
    const meta = record.gradingMeta!;
    const rawScore = finalScores[record.id];
    const score = rawScore !== undefined && rawScore !== '' ? Number(rawScore) : (meta.aiScore ?? meta.localScore);
    const isCorrect = finalCorrect[record.id] ?? score >= 75;

    setSavingId(record.id);
    try {
      await updateAnswerRecord({
        ...record,
        aiScore: Math.max(0, Math.min(100, score)),
        isCorrect,
        gradingMeta: { ...meta, needsReview: false },
      });
      setItems((prev) => prev.filter((i) => i.record.id !== record.id));
    } catch (err) {
      console.error('Failed to resolve review:', err);
    } finally {
      setSavingId(null);
    }
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <CubeLoader screen text="加载中" subtext="正在加载待审内容…" />
        </main>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-slate-500">无权限访问此页面</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">批改复核队列</h1>
            <p className="text-sm text-slate-500">本地评分与 AI 评分分歧较大的答题记录</p>
          </div>
        </div>

        {loading ? (
          <CubeLoader compact text="加载中" subtext="正在加载复核队列…" />
        ) : items.length === 0 ? (
          <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
            <p className="text-slate-500">队列已清空，没有待复核的记录</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              const { record, question } = item;
              const meta = record.gradingMeta!;
              return (
                <Card key={record.id} className="p-6 bg-white border-slate-200 shadow-sm">
                  {/* 题目信息 */}
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-slate-900">
                      {question?.title || record.questionId}
                    </span>
                    <Badge variant="secondary" className="text-xs">{item.nickname}</Badge>
                    <span className="text-xs text-slate-400">
                      {new Date(record.submittedAt).toLocaleString('zh-CN')}
                    </span>
                  </div>

                  {/* 分数对比 */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="text-xs text-slate-500 mb-1">本地算法</div>
                      <div className="text-xl font-bold text-slate-800">{meta.localScore} 分</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <div className="text-xs text-slate-500 mb-1">AI 二次批改</div>
                      <div className="text-xl font-bold text-blue-700">{meta.aiScore ?? '—'} 分</div>
                    </div>
                  </div>

                  {/* 学生答案 */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-slate-500 mb-1">学生答案</div>
                    <div className="p-3 rounded-lg bg-slate-50 text-sm text-slate-700 whitespace-pre-line">
                      {record.content || `（${record.images.length} 张图片答案）`}
                    </div>
                  </div>

                  {/* 参考答案 */}
                  {question && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-slate-500 mb-1">参考答案</div>
                      <div className="p-3 rounded-lg bg-slate-50 text-sm text-slate-700">
                        <MathRenderer>{question.answer}</MathRenderer>
                      </div>
                    </div>
                  )}

                  {/* 得分点拆解 */}
                  {meta.breakdown && meta.breakdown.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-medium text-slate-500 mb-1">AI 得分点拆解</div>
                      <ul className="text-sm space-y-1">
                        {meta.breakdown.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={p.earned ? 'text-emerald-600' : 'text-rose-500'}>
                              {p.earned ? '✓' : '✗'}
                            </span>
                            <span className="text-slate-700">
                              {p.point}：{p.comment}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 复核操作 */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder={`最终得分（默认 ${meta.aiScore ?? meta.localScore}）`}
                      value={finalScores[record.id] ?? ''}
                      onChange={(e) =>
                        setFinalScores((prev) => ({ ...prev, [record.id]: e.target.value }))
                      }
                      className="w-56"
                    />
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <Checkbox
                        checked={finalCorrect[record.id] ?? ((meta.aiScore ?? meta.localScore) >= 75)}
                        onCheckedChange={(checked) =>
                          setFinalCorrect((prev) => ({ ...prev, [record.id]: checked as boolean }))
                        }
                      />
                      判定正确
                    </label>
                    <Button
                      onClick={() => handleResolve(item)}
                      disabled={savingId === record.id}
                      className="ml-auto"
                    >
                      {savingId === record.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        '确认复核'
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
