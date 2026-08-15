'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toBlob, toPng } from 'html-to-image';
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Download, Link2, Loader2, Flame, MessageSquare, MessagesSquare, Share2 } from 'lucide-react';
import { MathRenderer } from '@/components/math/MathRenderer';
import { useAuth } from '@/hooks/useAuth';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { createPost } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { assetPath } from '@/lib/asset';
import { pickQuote } from '@/lib/quotes';

const MODULE_NAMES: Record<string, string> = {
  'highschool-math': '高中数学',
  'advanced-math': '高等数学',
  'linear-algebra': '线性代数',
};

export interface ShareCardData {
  questionId: string;
  questionTitle: string;
  questionContent: string;
  moduleId: string;
  date: string;
  difficulty: number;
  isCorrect: boolean;
  score: number;
  nickname: string;
  avatar: string;
  streak: number;
  /** 我的解答内容（可选，配合 showAnswer 控制是否出现在卡片上） */
  answerContent?: string;
  answerImages?: string[];
}

interface ShareCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ShareCardData;
  /** 关联的答题记录ID：提供后可控制"公开到讨论区" */
  recordId?: string;
}

/** 题目分享卡片本体（纯展示，可被对话、社区复用） */
export function QuestionShareCard({ data, showAnswer = true }: { data: ShareCardData; showAnswer?: boolean }) {
  const questionUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${assetPath(`/daily/#date=${data.date}&module=${data.moduleId}`)}`
      : assetPath(`/daily/#date=${data.date}&module=${data.moduleId}`);
  const quote = pickQuote(data.date);
  const hasSolution = showAnswer && (!!data.answerContent?.trim() || (data.answerImages?.length ?? 0) > 0);

  return (
    <div
      className="w-[375px] rounded-2xl overflow-hidden"
      style={{
        background: '#faf8f3',
        backgroundImage:
          'linear-gradient(#e8e4dc 1px, transparent 1px), linear-gradient(90deg, #e8e4dc 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        border: '1px solid #e2e8f0',
      }}
    >
      {/* 今日名言 */}
      <div className="px-6 pt-5 pb-2 text-center">
        <p
          className="text-[13px] leading-relaxed text-slate-600 italic"
          style={{ fontFamily: 'Georgia, "Noto Serif SC", serif' }}
        >
          「{quote.text}」
        </p>
        <p className="text-[11px] text-slate-400 mt-1 tracking-wide">—— {quote.author}</p>
      </div>

      {/* 头部品牌区 */}
      <div className="flex items-center justify-between px-6 pt-2 pb-3">
        <div
          style={{
            fontFamily: 'Georgia, "Playfair Display", serif',
            fontSize: '18px',
            letterSpacing: '0.05em',
            color: '#1e293b',
          }}
        >
          Euler Road
        </div>
        <div className="text-xs text-slate-500">{data.date} · 每日一题</div>
      </div>

      <div className="px-6">
        <div className="h-px bg-slate-300/70" />
      </div>

      {/* 题目区 */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-600 text-white">
            {MODULE_NAMES[data.moduleId] || data.moduleId}
          </span>
          <span className="text-[11px] text-amber-600 tracking-wide">
            {'★'.repeat(data.difficulty)}
            <span className="text-slate-300">{'★'.repeat(Math.max(0, 5 - data.difficulty))}</span>
          </span>
        </div>
        <div className="text-[15px] font-bold text-slate-800 leading-snug mb-2">
          <MathRenderer>{data.questionTitle}</MathRenderer>
        </div>
        <div className="text-xs text-slate-600 leading-relaxed max-h-[72px] overflow-hidden">
          <MathRenderer>{data.questionContent}</MathRenderer>
        </div>
      </div>

      {/* 我的解答（可选） */}
      {hasSolution && (
        <div className="px-6 pb-3">
          <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3">
            <div className="text-[11px] tracking-wide text-slate-400 mb-1.5">我的解答</div>
            {data.answerContent?.trim() && (
              <div className="text-xs text-slate-700 leading-relaxed max-h-[96px] overflow-hidden">
                <MathRenderer>{data.answerContent}</MathRenderer>
              </div>
            )}
            {data.answerImages && data.answerImages.length > 0 && (
              <div className="flex gap-2 mt-2">
                {data.answerImages.slice(0, 3).map((img, i) => (
                  // 分享卡片导出走 html-to-image，不能用 next/image
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 成绩区 */}
      <div className="px-6 pb-3">
        <div
          className={`rounded-xl px-4 py-3 flex items-center justify-between ${
            data.isCorrect
              ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg flex-shrink-0">{data.avatar.startsWith('data:') || data.avatar.startsWith('http') ? '🎓' : data.avatar}</span>
            <span className="text-sm font-medium text-slate-700 truncate">{data.nickname}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {data.streak > 0 && (
              <span className="flex items-center gap-1 text-xs text-amber-600">
                <Flame className="w-3.5 h-3.5" />
                {data.streak} 天
              </span>
            )}
            <span
              className={`text-lg font-bold ${
                data.isCorrect ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {data.score}
              <span className="text-xs font-normal text-slate-500"> 分</span>
            </span>
          </div>
        </div>
      </div>

      {/* 底部二维码区 */}
      <div className="flex items-center justify-between px-6 pb-5 pt-1">
        <div className="text-xs text-slate-500 leading-relaxed">
          我在这道题得了 {data.score} 分
          <br />
          扫码来挑战 →
        </div>
        <div className="bg-white p-1.5 rounded-lg border border-slate-200">
          <QRCode value={questionUrl} size={64} fgColor="#1e293b" />
        </div>
      </div>
    </div>
  );
}

export function ShareCardDialog({ open, onOpenChange, data, recordId }: ShareCardDialogProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [togglingPublic, setTogglingPublic] = useState(false);
  const [includeSolution, setIncludeSolution] = useState(true);
  const [shareFallback, setShareFallback] = useState(false);

  const { user } = useAuth();
  const { questionMyRecords, userAnswerHistory, setAnswerPublic } = useDailyQuestion();

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${assetPath(`/daily/#date=${data.date}&module=${data.moduleId}`)}`
      : assetPath(`/daily/#date=${data.date}&module=${data.moduleId}`);
  const hasAnswerData = !!data.answerContent?.trim() || (data.answerImages?.length ?? 0) > 0;
  const shareTitle = `每日一题 · ${MODULE_NAMES[data.moduleId] || data.moduleId}`;
  const shareText = `我在欧拉之路解答了「${data.questionTitle.replace(/\$+/g, '')}」，得分 ${data.score}，来挑战吧！`;

  // 当前记录的公开状态（控制讨论区可见性）
  const record = recordId
    ? questionMyRecords.find(r => r.id === recordId) || userAnswerHistory.find(r => r.id === recordId)
    : undefined;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `欧拉之路-每日一题-${data.date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export share card failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // 剪贴板 API 不可用时的降级
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  /** 系统分享：优先携带卡片图片，其次纯链接；不支持则降级为复制链接（并给出反馈） */
  const handleSystemShare = async () => {
    const fallbackCopy = async () => {
      await copyLink();
      setShareFallback(true);
      setTimeout(() => setShareFallback(false), 2000);
    };
    if (typeof navigator === 'undefined' || !navigator.share) {
      await fallbackCopy();
      return;
    }
    setSharing(true);
    try {
      // 尝试附带卡片图片
      if (cardRef.current && navigator.canShare) {
        const blob = await toBlob(cardRef.current, { pixelRatio: 2, cacheBust: true });
        if (blob) {
          const file = new File([blob], `欧拉之路-每日一题-${data.date}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ title: shareTitle, text: shareText, url: shareUrl, files: [file] });
            return;
          }
        }
      }
      await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
    } catch (err) {
      // 用户取消分享不视为错误
      if ((err as Error)?.name !== 'AbortError') {
        console.error('System share failed:', err);
        await fallbackCopy();
      }
    } finally {
      setSharing(false);
    }
  };

  /** 分享到社区：生成一条带题目链接的帖子 */
  const handleShareToCommunity = async () => {
    if (!user || posting || posted) return;
    setPosting(true);
    try {
      await createPost({
        id: generateId(),
        userId: user.id,
        userNickname: user.nickname,
        userAvatar: user.avatar,
        moduleId: data.moduleId,
        postType: 'thought',
        title: `我解答了每日一题「${data.questionTitle.replace(/\$+/g, '').slice(0, 30)}」`,
        content: `${data.date} 的${MODULE_NAMES[data.moduleId] || ''}每日一题，我得了 ${data.score} 分${data.isCorrect ? '，解答正确' : ''}。\n\n一起来挑战 → [查看题目](${assetPath(`/daily/#date=${data.date}&module=${data.moduleId}`)})`,
        topics: ['每日一题'],
        images: [],
        commentPermission: 'all',
        mentions: [],
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: [],
      });
      setPosted(true);
    } catch (err) {
      console.error('Share to community failed:', err);
    } finally {
      setPosting(false);
    }
  };

  /** 公开/取消公开到讨论区 */
  const handleTogglePublic = async () => {
    if (!recordId || !record || togglingPublic) return;
    setTogglingPublic(true);
    await setAnswerPublic(recordId, !record.isPublic);
    setTogglingPublic(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>分享我的答题卡片</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2">
          {/* 卡片内容开关：带解答 / 仅题目 */}
          {hasAnswerData && (
            <div className="w-full grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-100">
              {([
                { value: true, label: '包含解答过程' },
                { value: false, label: '仅题目' },
              ] as const).map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setIncludeSolution(opt.value)}
                  className={`py-1.5 text-xs rounded-md motion-safe:transition-all motion-safe:duration-200 ${
                    includeSolution === opt.value
                      ? 'bg-white text-slate-800 font-medium shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          <div ref={cardRef}>
            <QuestionShareCard data={data} showAnswer={includeSolution} />
          </div>

          {/* 站外分享 */}
          <div className="w-full grid grid-cols-3 gap-2">
            <Button onClick={handleDownload} disabled={exporting} variant="outline" className="w-full">
              {exporting ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-1.5" />
              )}
              存图片
            </Button>
            <Button onClick={copyLink} variant="outline" className="w-full">
              {linkCopied ? (
                <Check className="w-4 h-4 mr-1.5 text-emerald-500" />
              ) : (
                <Link2 className="w-4 h-4 mr-1.5" />
              )}
              {linkCopied ? '已复制' : '复制链接'}
            </Button>
            <Button onClick={handleSystemShare} disabled={sharing} variant="outline" className="w-full">
              {sharing ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : shareFallback ? (
                <Check className="w-4 h-4 mr-1.5 text-emerald-500" />
              ) : (
                <Share2 className="w-4 h-4 mr-1.5" />
              )}
              {shareFallback ? '已复制链接' : '更多分享'}
            </Button>
          </div>

          {/* 站内分享 */}
          <div className="w-full space-y-2">
            <Button
              onClick={handleShareToCommunity}
              disabled={posting || posted || !user}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              {posting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : posted ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <MessagesSquare className="w-4 h-4 mr-2" />
              )}
              {posted ? '已分享到社区' : '分享到社区'}
            </Button>
            {posted && (
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  router.push('/community/');
                }}
                className="w-full text-center text-xs text-blue-600 hover:underline animate-fade-in-scale"
              >
                前往社区查看 →
              </button>
            )}

            {recordId && record && (
              <button
                type="button"
                onClick={handleTogglePublic}
                disabled={togglingPublic}
                className={`w-full flex items-center justify-center gap-1.5 text-xs rounded-lg border px-3 py-2 motion-safe:transition-colors motion-safe:duration-200 ${
                  record.isPublic
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {togglingPublic ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MessageSquare className="w-3.5 h-3.5" />
                )}
                {record.isPublic ? '已公开到讨论区（点击取消）' : '公开这条解答到讨论区'}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
