'use client';

import { useState } from 'react';
import { Post } from '@/types';
import { BarChart3, Check, Clock } from 'lucide-react';

interface PollDisplayProps {
  post: Post;
  currentUserId?: string;
  /** 投票变更回调：父组件负责持久化（updatePost）并更新本地状态 */
  onVote: (updated: Post) => void;
  /** 紧凑模式（帖子卡片内） */
  compact?: boolean;
}

/** 投票展示与投票交互：先选择选项，点「确认投票」提交后才展示结果（不可改票/撤票） */
export function PollDisplay({ post, currentUserId, onVote, compact }: PollDisplayProps) {
  const poll = post.poll;
  // 截止判断仅需在挂载时计算一次（惰性初始化避免渲染期调用 Date.now）
  const [ended] = useState(
    () => (poll?.endTime ? new Date(poll.endTime).getTime() < Date.now() : false)
  );
  // 本地选择状态：选择不等于投票，确认后才写入
  const [selected, setSelected] = useState<Set<string>>(new Set());
  if (!poll || poll.options.length === 0) return null;

  const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
  const myVotes = new Set(
    currentUserId
      ? poll.options.filter((o) => o.votedBy.includes(currentUserId)).map((o) => o.id)
      : []
  );
  const hasVoted = myVotes.size > 0;
  const showResults = hasVoted || ended || !currentUserId;

  const toggleSelect = (optionId: string) => {
    if (!currentUserId || ended || hasVoted) return;
    setSelected((prev) => {
      if (poll.multiple) {
        const next = new Set(prev);
        if (next.has(optionId)) {
          next.delete(optionId);
        } else {
          next.add(optionId);
        }
        return next;
      }
      // 单选：点击已选项可取消选择，否则替换
      if (prev.has(optionId)) return new Set();
      return new Set([optionId]);
    });
  };

  const handleConfirmVote = () => {
    if (!currentUserId || ended || hasVoted || selected.size === 0) return;
    const options = poll.options.map((o) =>
      selected.has(o.id)
        ? { ...o, votes: o.votes + 1, votedBy: [...o.votedBy, currentUserId] }
        : o
    );
    onVote({ ...post, poll: { ...poll, options } });
  };

  return (
    <div
      className={`rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 ${
        compact ? 'p-3 mb-3' : 'p-4'
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <BarChart3 className="w-4 h-4 text-indigo-500 shrink-0" />
        <span className={`font-medium text-slate-800 ${compact ? 'text-sm' : 'text-base'}`}>
          {poll.question}
        </span>
        {poll.multiple && (
          <span className="text-[10px] text-indigo-500 bg-indigo-100/70 px-1.5 py-0.5 rounded">多选</span>
        )}
      </div>

      <div className="space-y-1.5">
        {poll.options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const mine = myVotes.has(option.id);
          const isSelected = !showResults && selected.has(option.id);
          return (
            <button
              key={option.id}
              onClick={(e) => {
                e.stopPropagation();
                toggleSelect(option.id);
              }}
              disabled={showResults}
              className={`relative w-full text-left rounded-lg border overflow-hidden transition-colors ${
                mine || isSelected
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-slate-200 bg-white/80 hover:border-indigo-300 hover:bg-indigo-50/50'
              } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {/* 得票比例条（仅确认投票后/截止后展示） */}
              {showResults && (
                <div
                  className={`absolute inset-y-0 left-0 ${mine ? 'bg-indigo-200/70' : 'bg-slate-200/60'} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className={`relative flex items-center justify-between ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'}`}>
                <span className="flex items-center gap-1.5 text-slate-700 min-w-0">
                  {(mine || isSelected) && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                  <span className="truncate">{option.text}</span>
                </span>
                {showResults && (
                  <span className="text-slate-500 shrink-0 ml-2">
                    {option.votes} 票 · {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 未投票：选择后需确认才提交并展示结果 */}
      {!showResults && (
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[11px] text-slate-400">
            {selected.size > 0 ? `已选 ${selected.size} 项` : '选择一个选项后确认'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirmVote();
            }}
            disabled={selected.size === 0}
            className={`rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 ${
              compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
            }`}
          >
            确认投票
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
        <span>{totalVotes} 人参与</span>
        {poll.endTime && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {ended ? '已截止' : `${new Date(poll.endTime).toLocaleDateString('zh-CN')} 截止`}
          </span>
        )}
        {!currentUserId && <span>登录后可投票</span>}
      </div>
    </div>
  );
}

export default PollDisplay;
