'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, X, Plus, Clock, CheckSquare2, Square } from 'lucide-react';
import { Poll } from '@/types';
import { generateId } from '@/lib/utils';

interface PollCreatorProps {
  poll?: Poll;
  onChange: (poll: Poll | undefined) => void;
  onRemove: () => void;
  showCreator?: boolean;
  setShowCreator?: (show: boolean) => void;
}

const DURATION_OPTIONS = [
  { value: '1', label: '1天' },
  { value: '3', label: '3天' },
  { value: '7', label: '7天' },
  { value: '14', label: '14天' },
  { value: '30', label: '30天' },
  { value: '0', label: '无限制' },
] as const;

export function PollCreator({ poll, onChange, onRemove, showCreator = true, setShowCreator }: PollCreatorProps) {
  const [question, setQuestion] = useState(poll?.question || '');
  const [options, setOptions] = useState<{ id: string; text: string }[]>(
    poll?.options.map(o => ({ id: o.id, text: o.text })) || [
      { id: generateId(), text: '' },
      { id: generateId(), text: '' },
    ]
  );
  const [multiple, setMultiple] = useState(poll?.multiple || false);
  const [duration, setDuration] = useState('7');
  const [isEditing, setIsEditing] = useState(!poll);
  const [localPoll, setLocalPoll] = useState<Poll | undefined>(poll);

  // 更新投票数据
  const updatePoll = () => {
    const validOptions = options.filter(o => o.text.trim());
    if (validOptions.length < 2 || !question.trim()) return;

    const endTime = duration !== '0'
      ? new Date(Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000).toISOString()
      : undefined;

    const newPoll: Poll = {
      question: question.trim(),
      options: validOptions.map(o => ({
        id: o.id,
        text: o.text.trim(),
        votes: 0,
        votedBy: [],
      })),
      endTime,
      multiple,
    };

    setLocalPoll(newPoll);
    onChange(newPoll);
    setIsEditing(false);
    setShowCreator?.(false);
  };

  // 添加选项
  const addOption = () => {
    if (options.length >= 10) return;
    setOptions([...options, { id: generateId(), text: '' }]);
  };

  // 移除选项
  const removeOption = (id: string) => {
    if (options.length <= 2) return;
    setOptions(options.filter(o => o.id !== id));
  };

  // 更新选项文本
  const updateOption = (id: string, text: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, text } : o));
  };

  // 判断是否可以保存
  const canSave = question.trim().length > 0 && options.filter(o => o.text.trim()).length >= 2;

  // 编辑已有投票
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 删除投票
  const handleRemove = () => {
    setLocalPoll(undefined);
    onRemove();
  };

  // 如果不在创建模式且没有本地投票，不显示
  if (!showCreator && !localPoll) {
    return null;
  }

  // 预览模式（投票已创建但未在编辑）
  if (!isEditing && localPoll) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{localPoll.question}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 px-2 text-blue-600"
            >
              编辑
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {localPoll.options.map((option) => (
            <div
              key={option.id}
              className="flex items-center gap-2 p-2 bg-white rounded border"
            >
              {localPoll.multiple ? (
                <Square className="w-4 h-4 text-gray-300" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              )}
              <span className="text-sm text-gray-700">{option.text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {localPoll.endTime
              ? `截止: ${new Date(localPoll.endTime).toLocaleDateString('zh-CN')}`
              : '无截止时间'}
          </span>
          <span>{localPoll.multiple ? '多选' : '单选'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">添加投票</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* 投票问题 */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">投票问题</Label>
        <Input
          placeholder="请输入投票问题"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-white"
        />
      </div>

      {/* 投票选项 */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">
          选项
          <span className="text-gray-400 font-normal ml-1">（最少2个，最多10个）</span>
        </Label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                {multiple ? <Square className="w-4 h-4" /> : <CheckSquare2 className="w-4 h-4" />}
              </div>
              <Input
                placeholder={`选项 ${index + 1}`}
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                className="flex-1 bg-white"
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {options.length < 10 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            className="w-full gap-1.5"
          >
            <Plus className="w-4 h-4" />
            添加选项
          </Button>
        )}
      </div>

      {/* 设置 */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t">
        {/* 多选开关 */}
        <div className="flex items-center gap-2">
          <Switch
            id="multiple"
            checked={multiple}
            onCheckedChange={setMultiple}
          />
          <Label htmlFor="multiple" className="text-sm cursor-pointer">
            允许多选
          </Label>
        </div>

        {/* 持续时间 */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <Select value={duration} onValueChange={(value) => setDuration(value || '7')}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={updatePoll}
          disabled={!canSave}
        >
          确认添加
        </Button>
      </div>
    </div>
  );
}
