'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search, X, ArrowRight, BookOpen, History, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'module' | 'topic';
  moduleId?: string;
  url: string;
}

interface Topic {
  id: string;
  title: string;
  difficulty: number;
  content?: string;
}

interface CourseSearchProps {
  modules: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    topics: Topic[];
  }>;
}

export default function CourseSearch({ modules }: CourseSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { history, addHistory, removeHistory, clearHistory } = useSearchHistory('course');

  // 构建搜索索引
  const searchItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    modules.forEach((module) => {
      // 添加模块
      items.push({
        id: module.id,
        title: module.name,
        description: module.description,
        type: 'module',
        url: `/module/${module.id}/`,
      });

      // 添加主题（hash 携带标题，模块页据此定位并展开对应章节）
      module.topics.forEach((topic) => {
        items.push({
          id: `${module.id}-${topic.id}`,
          title: topic.title,
          description: `${module.name} - ${topic.title}`,
          type: 'topic',
          moduleId: module.id,
          url: `/module/${module.id}/#topic=${encodeURIComponent(topic.title)}`,
        });
      });
    });

    return items;
  }, [modules]);

  // 初始化 Fuse
  const fuse = useMemo(
    () =>
      new Fuse(searchItems, {
        keys: ['title', 'description'],
        threshold: 0.4,
        includeScore: true,
      }),
    [searchItems]
  );

  // 执行搜索
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  // 点击外部关闭
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  // 应用搜索词（历史记录/热门搜索点击时回填并记录）
  const applyTerm = (term: string) => {
    setQuery(term);
    addHistory(term);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* 搜索输入框 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="搜索课程、知识点..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) addHistory(query);
          }}
          className="w-full pl-12 pr-12 py-6 text-lg bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 max-h-[60vh] overflow-y-auto origin-top animate-popover-in">
          {!query ? (
            // 默认状态：搜索历史 + 热门搜索
            <div className="p-4 space-y-4">
              {history.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      <History className="w-4 h-4" />
                      搜索历史
                    </p>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      清空
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map((term) => (
                      <span
                        key={term}
                        className="group inline-flex items-center gap-1 pl-3 pr-1.5 py-1.5 bg-slate-50 hover:bg-blue-50 rounded-full text-sm text-slate-600 transition-colors"
                      >
                        <button
                          onClick={() => applyTerm(term)}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeHistory(term)}
                          className="p-0.5 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                          aria-label={`删除搜索历史 ${term}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  热门搜索
                </p>
                <div className="flex flex-wrap gap-2">
                  {['集合', '函数', '导数', '积分', '矩阵'].map((term) => (
                    <button
                      key={term}
                      onClick={() => applyTerm(term)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-full text-sm text-slate-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            // 无结果
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500">未找到相关结果</p>
              <p className="text-sm text-slate-400 mt-1">
                试试其他关键词？
              </p>
            </div>
          ) : (
            // 搜索结果列表
            <div className="py-2">
              <p className="px-4 py-2 text-xs text-slate-400">
                找到 {results.length} 个结果
              </p>
              {results.map(({ item }) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => {
                    addHistory(query);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      item.type === 'module'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.type === 'module' ? (
                      <BookOpen className="w-5 h-5" />
                    ) : (
                      <span className="text-sm">#</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-400 truncate">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
