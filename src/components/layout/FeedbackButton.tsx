'use client';

import { useState } from 'react';
import { MessageSquareText, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { usePathname } from 'next/navigation';

/** 右上角反馈按钮：弹窗提交反馈到后端 */
export function FeedbackButton() {
  const pathname = usePathname();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!content.trim()) { setError('请填写反馈内容'); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim(), page: pathname || '' }),
      });
      if (!res.ok) throw new Error('fail');
      setDone(true);
      setContent('');
    } catch {
      setError('提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        aria-label="反馈"
        title="意见反馈"
        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-90"
      >
        <MessageSquareText className="w-[18px] h-[18px]" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>意见反馈</DialogTitle>
        </DialogHeader>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-slate-700 font-medium">感谢你的反馈！</p>
            <p className="text-sm text-slate-400 mt-1">我们会认真查看每一条建议</p>
            <Button className="mt-5 rounded-xl" variant="outline" onClick={() => setDone(false)}>
              再写一条
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="告诉我们遇到的问题或想加的功能…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="rounded-xl"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button className="rounded-xl" onClick={submit} disabled={submitting || !content.trim()}>
                {submitting ? '提交中…' : (<><Send className="w-3.5 h-3.5 mr-1.5" /> 提交反馈</>)}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
