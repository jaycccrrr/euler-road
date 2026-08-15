'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Hash, X, Search, TrendingUp } from 'lucide-react';
import { HOT_TOPICS, searchTopics, getRecommendedTopics } from '@/lib/topics';

interface TopicSelectorProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
  maxTopics?: number;
}

export function TopicSelector({
  selectedTopics,
  onTopicsChange,
  maxTopics = 5,
}: TopicSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recommendedTopics, setRecommendedTopics] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 获取推荐话题
  useEffect(() => {
    setRecommendedTopics(getRecommendedTopics(selectedTopics, 6));
  }, [selectedTopics]);

  // 搜索建议
  useEffect(() => {
    if (inputValue.trim()) {
      const results = searchTopics(inputValue, 8);
      setSuggestions(results.filter(t => !selectedTopics.includes(t)));
    } else {
      setSuggestions([]);
    }
  }, [inputValue, selectedTopics]);

  // 添加话题
  const addTopic = (topic: string) => {
    if (selectedTopics.length >= maxTopics) return;
    if (selectedTopics.includes(topic)) return;

    onTopicsChange([...selectedTopics, topic]);
    setInputValue('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // 移除话题
  const removeTopic = (topic: string) => {
    onTopicsChange(selectedTopics.filter(t => t !== topic));
  };

  // 处理输入回车
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !selectedTopics.includes(trimmed)) {
        addTopic(trimmed);
      }
    }
  };

  return (
    <div className="space-y-2">
      {/* 已选话题标签 */}
      {selectedTopics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTopics.map((topic) => (
            <Badge
              key={topic}
              variant="secondary"
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 px-2 py-1"
            >
              <Hash className="w-3 h-3 mr-0.5" />
              {topic}
              <button
                onClick={() => removeTopic(topic)}
                className="ml-1 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* 话题输入 */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              ref={inputRef}
              placeholder={
                selectedTopics.length >= maxTopics
                  ? `最多添加 ${maxTopics} 个话题`
                  : '添加话题，按回车确认'
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={selectedTopics.length >= maxTopics}
              className="pl-9"
              onFocus={() => setIsOpen(true)}
            />
            {selectedTopics.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {selectedTopics.length}/{maxTopics}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 border-b">
            <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
              {inputValue.trim() ? (
                <>
                  <Search className="w-4 h-4" />
                  搜索结果
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  推荐话题
                </>
              )}
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-2">
            {inputValue.trim() ? (
              // 搜索结果
              suggestions.length > 0 ? (
                <div className="space-y-1">
                  {suggestions.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        addTopic(topic);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="flex-1">{topic}</span>
                      <span className="text-xs text-gray-400">点击添加</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">未找到相关话题</p>
                  <p className="text-xs mt-1">按回车创建新话题 &quot;{inputValue.trim()}&quot;</p>
                </div>
              )
            ) : (
              // 推荐话题
              <div className="space-y-3">
                {/* 热门话题 */}
                <div>
                  <div className="text-xs text-gray-500 mb-2 px-1">热门话题</div>
                  <div className="flex flex-wrap gap-1.5">
                    {recommendedTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          addTopic(topic);
                          setIsOpen(false);
                        }}
                        className="px-2 py-1 text-sm bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 所有话题分类 */}
                <div className="border-t pt-2">
                  <div className="text-xs text-gray-500 mb-2 px-1">数学基础</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['高等数学', '线性代数', '概率论', '微积分'].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          addTopic(topic);
                          setIsOpen(false);
                        }}
                        disabled={selectedTopics.includes(topic)}
                        className="px-2 py-1 text-sm bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-2">
                  <div className="text-xs text-gray-500 mb-2 px-1">学习交流</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['考研数学', '数学竞赛', '学习方法', '解题技巧'].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          addTopic(topic);
                          setIsOpen(false);
                        }}
                        disabled={selectedTopics.includes(topic)}
                        className="px-2 py-1 text-sm bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* 快捷话题标签 */}
      {selectedTopics.length === 0 && !inputValue && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-gray-400">热门：</span>
          {['高等数学', '线性代数', '考研数学', '学习方法'].map((topic) => (
            <button
              key={topic}
              onClick={() => addTopic(topic)}
              className="text-xs text-blue-600 hover:underline"
            >
              #{topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
