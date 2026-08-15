'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathRenderer } from '@/components/math/MathRenderer';
import { ContentBlockView } from './ContentBlockView';
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Edit3,
  Plus,
  Save,
  Trash2,
  X,
  Download,
  Upload,
  Type,
  Image as ImageIcon,
  FunctionSquare,
  Calculator,
  Menu,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import type { KnowledgeModule } from '@/types';
import type { ContentBlock, ContentBlockType } from '@/data/highschoolMath';
import type { AdvancedSubLesson } from '@/data/advancedMathBlocks';
import type { LinearAlgebraLesson } from '@/data/linearAlgebraBlocks';
import { LazyImage } from '@/components/LazyImage';

// 通用课程类型
type GenericLesson = AdvancedSubLesson | LinearAlgebraLesson;

// 类型守卫函数
function isLinearAlgebraLesson(lesson: GenericLesson): lesson is LinearAlgebraLesson {
  return 'difficulty' in lesson && !('has3D' in lesson);
}

interface EditableAdvancedMathContentProps {
  module: KnowledgeModule | undefined;
  moduleId: string;
  initialLessons: GenericLesson[];
  basicChapters: { id: string; title: string; icon: string; lessons: GenericLesson[] }[];
}

function getStorageKey(moduleId: string) {
  return `${moduleId}-edited-data`;
}

function getBackupKeyPrefix(moduleId: string) {
  return `${moduleId}-backup`;
}

// 从 localStorage 加载编辑后的数据
function loadEditedData(moduleId: string): Record<string, GenericLesson> | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(getStorageKey(moduleId));
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// 保存编辑后的数据到 localStorage
function saveEditedData(moduleId: string, data: Record<string, GenericLesson>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(moduleId), JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save edited data:', e);
  }
}

// 创建备份
function createBackup(moduleId: string, data: Record<string, GenericLesson>) {
  if (typeof window === 'undefined') return null;
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupKey = `${getBackupKeyPrefix(moduleId)}-${timestamp}`;
    const backupData = {
      timestamp: new Date().toISOString(),
      data: data,
    };
    localStorage.setItem(backupKey, JSON.stringify(backupData));
    return backupKey;
  } catch (e) {
    console.error('Failed to create backup:', e);
    return null;
  }
}

// 获取所有备份列表
function getBackupList(moduleId: string): { key: string; timestamp: string }[] {
  if (typeof window === 'undefined') return [];
  const prefix = getBackupKeyPrefix(moduleId);
  const backups: { key: string; timestamp: string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        backups.push({ key, timestamp: data.timestamp || 'Unknown' });
      } catch {
        backups.push({ key, timestamp: 'Unknown' });
      }
    }
  }
  return backups.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

// 加载备份
function loadBackup(key: string): Record<string, GenericLesson> | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed.data || null;
  } catch {
    return null;
  }
}

// 删除备份
function deleteBackup(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

// 导出数据为 JSON 文件
function exportDataToFile(moduleId: string, data: Record<string, GenericLesson>) {
  const exportData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    data: data,
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `advanced-math-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 内容块编辑器组件
function ContentBlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  block: ContentBlock;
  onChange: (content: string) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);
    const newContent =
      block.content.substring(0, start) +
      before +
      selectedText +
      after +
      block.content.substring(end);

    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="border rounded-lg p-4 bg-white mb-4">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline">
          {block.type === 'text' && <><Type className="w-3 h-3 mr-1 inline" />文本</>}
          {block.type === 'image' && <><ImageIcon className="w-3 h-3 mr-1 inline" />图片</>}
          {block.type === 'formula' && <><FunctionSquare className="w-3 h-3 mr-1 inline" />公式</>}
        </Badge>
        <div className="flex gap-1">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
            title="上移"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
            title="下移"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-red-50 text-red-500"
            title="删除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {block.type === 'image' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={block.content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="输入图片URL..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
          {block.content && (
            <LazyImage src={block.content} alt="预览" className="max-h-40 rounded-lg border" />
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1 mb-2">
            <button
              onClick={() => insertAtCursor('<span class="math">', '</span>')}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
            >
              公式
            </button>
            <button
              onClick={() => insertAtCursor('**', '**')}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
            >
              粗体
            </button>
            <button
              onClick={() => insertAtCursor('*', '*')}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
            >
              斜体
            </button>
            <button
              onClick={() => insertAtCursor('\n\n```\n', '\n```\n\n')}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
            >
              代码块
            </button>
            <button
              onClick={() => insertAtCursor('\n\n> ', '\n\n')}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
            >
              引用
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={block.content}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
            placeholder={block.type === 'formula' ? '输入公式内容...' : '输入文本内容...'}
          />
          <div className="text-xs text-slate-500">
            预览：
            <div className="mt-1 p-2 bg-slate-50 rounded border">
              <MathRenderer>{block.content}</MathRenderer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 课程编辑器组件
function LessonEditor({
  lesson,
  onSave,
  onClose,
}: {
  lesson: GenericLesson;
  onSave: (lesson: GenericLesson) => void;
  onClose: () => void;
}) {
  const [editedLesson, setEditedLesson] = useState<GenericLesson>({ ...lesson });
  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    onSave(editedLesson);
  };

  const addBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'image' ? '/images/placeholder.png' : '',
    };
    setEditedLesson({
      ...editedLesson,
      blocks: [...(editedLesson.blocks || []), newBlock],
    });
  };

  const updateBlock = (blockId: string, content: string) => {
    setEditedLesson({
      ...editedLesson,
      blocks: editedLesson.blocks?.map((b) =>
        b.id === blockId ? { ...b, content } : b
      ) || [],
    });
  };

  const deleteBlock = (blockId: string) => {
    setEditedLesson({
      ...editedLesson,
      blocks: editedLesson.blocks?.filter((b) => b.id !== blockId) || [],
    });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blocks = editedLesson.blocks || [];
    const index = blocks.findIndex((b) => b.id === blockId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }
    const newBlocks = [...blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
    setEditedLesson({ ...editedLesson, blocks: newBlocks });
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-white">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-indigo-500" />
              编辑：{lesson.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">ID: {lesson.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* 左侧：工具栏 */}
          <div className="w-64 border-r border-slate-200 bg-slate-50 p-4 flex flex-col">
            <h3 className="font-bold text-slate-700 mb-4">添加内容块</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addBlock('text')}
              >
                <Type className="w-4 h-4 mr-2" />
                添加文本
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addBlock('image')}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                添加图片
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addBlock('formula')}
              >
                <FunctionSquare className="w-4 h-4 mr-2" />
                添加公式块
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                提示
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 使用 **粗体** 标记重点</li>
                <li>• 使用 &lt;span class=&quot;math&quot;&gt;\\frac&#123;a&#125;&#123;b&#125;&lt;/span&gt; 插入公式</li>
                <li>• 使用 ``` 包裹代码块</li>
                <li>• 使用 &gt; 开头创建引用</li>
              </ul>
            </div>
          </div>

          {/* 右侧：编辑器 */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
            {editedLesson.blocks?.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                <p>暂无内容块，请从左侧添加</p>
              </div>
            ) : (
              editedLesson.blocks?.map((block, index) => (
                <ContentBlockEditor
                  key={block.id}
                  block={block}
                  onChange={(content) => updateBlock(block.id, content)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, 'up')}
                  onMoveDown={() => moveBlock(block.id, 'down')}
                  isFirst={index === 0}
                  isLast={index === (editedLesson.blocks?.length || 0) - 1}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 备份管理器组件
function BackupManager({
  currentData,
  onRestore,
  onClose,
  moduleId,
}: {
  currentData: Record<string, GenericLesson>;
  onRestore: (data: Record<string, GenericLesson>) => void;
  moduleId: string;
  onClose: () => void;
}) {
  const [backups, setBackups] = useState<{ key: string; timestamp: string }[]>([]);
  const [importData, setImportData] = useState('');

  useEffect(() => {
    setBackups(getBackupList(moduleId));
  }, [moduleId]);

  const handleCreateBackup = () => {
    const key = createBackup(moduleId, currentData);
    if (key) {
      setBackups(getBackupList(moduleId));
      alert('备份创建成功！');
    }
  };

  const handleRestore = (key: string) => {
    if (confirm('确定要恢复此备份吗？当前未保存的修改将丢失。')) {
      const data = loadBackup(key);
      if (data) {
        onRestore(data);
        onClose();
      }
    }
  };

  const handleDeleteBackup = (key: string) => {
    if (confirm('确定要删除此备份吗？')) {
      deleteBackup(key);
      setBackups(getBackupList(moduleId));
    }
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);
      if (parsed.data) {
        onRestore(parsed.data);
        onClose();
      } else {
        alert('无效的数据格式');
      }
    } catch {
      alert('JSON 解析失败');
    }
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-10 md:inset-20 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Download className="w-6 h-6 text-green-500" />
            备份管理
          </h2>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            关闭
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 创建备份 */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">创建备份</h3>
              <p className="text-sm text-slate-500 mb-4">
                将当前编辑的数据备份到本地存储
              </p>
              <Button onClick={handleCreateBackup} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                立即备份
              </Button>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-2">导出到文件</h4>
                <p className="text-sm text-slate-500 mb-2">
                  将数据下载为 JSON 文件
                </p>
                <Button
                  variant="outline"
                  onClick={() => exportDataToFile(moduleId, currentData)}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  导出 JSON
                </Button>
              </div>
            </Card>

            {/* 导入备份 */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">导入数据</h3>
              <p className="text-sm text-slate-500 mb-2">
                粘贴之前导出的 JSON 数据
              </p>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono mb-2"
                placeholder="粘贴 JSON 数据..."
              />
              <Button
                onClick={handleImport}
                disabled={!importData.trim()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                导入
              </Button>
            </Card>
          </div>

          {/* 备份列表 */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">本地备份列表</h3>
            {backups.length === 0 ? (
              <p className="text-slate-400 text-center py-8">暂无备份</p>
            ) : (
              <div className="space-y-2">
                {backups.map((backup) => (
                  <div
                    key={backup.key}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(backup.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-500">{backup.key}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestore(backup.key)}
                      >
                        恢复
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBackup(backup.key)}
                        className="text-red-500 hover:text-red-700"
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 主组件
export default function EditableAdvancedMathContent({
  module,
  moduleId,
  initialLessons,
  basicChapters,
}: EditableAdvancedMathContentProps) {
  const [lessons, setLessons] = useState<GenericLesson[]>(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<GenericLesson | null>(null);
  const [editingLesson, setEditingLesson] = useState<GenericLesson | null>(null);
  const [showBackupManager, setShowBackupManager] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 加载已保存的编辑数据
  useEffect(() => {
    const saved = loadEditedData(moduleId);
    if (saved) {
      const mergedLessons = initialLessons.map((lesson) =>
        saved[lesson.id] ? { ...lesson, ...saved[lesson.id] } : lesson
      );
      setLessons(mergedLessons);
    }
  }, [initialLessons, moduleId]);

  // 保存编辑数据
  const handleSaveLesson = (updatedLesson: GenericLesson) => {
    const newLessons = lessons.map((l) =>
      l.id === updatedLesson.id ? updatedLesson : l
    );
    setLessons(newLessons);

    // 保存到 localStorage
    const editedData: Record<string, GenericLesson> = {};
    newLessons.forEach((l) => {
      editedData[l.id] = l;
    });
    saveEditedData(moduleId, editedData);
    setHasUnsavedChanges(false);

    // 如果当前选中的课程被编辑了，更新选中状态
    if (selectedLesson?.id === updatedLesson.id) {
      setSelectedLesson(updatedLesson);
    }

    setEditingLesson(null);
  };

  // 选择课程
  const handleSelectLesson = (lesson: GenericLesson) => {
    if (hasUnsavedChanges && editingLesson) {
      if (!confirm('有未保存的修改，确定要放弃吗？')) {
        return;
      }
    }
    setSelectedLesson(lesson);
    setHasUnsavedChanges(false);
  };

  // 导出所有编辑的数据
  const handleExportAll = () => {
    const editedData: Record<string, GenericLesson> = {};
    lessons.forEach((l) => {
      editedData[l.id] = l;
    });
    exportDataToFile(moduleId, editedData);
  };

  // 恢复备份
  const handleRestoreBackup = (data: Record<string, GenericLesson>) => {
    const mergedLessons = initialLessons.map((lesson) =>
      data[lesson.id] ? { ...lesson, ...data[lesson.id] } : lesson
    );
    setLessons(mergedLessons);
    saveEditedData(moduleId, data);
    setHasUnsavedChanges(true);
  };

  if (!module) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/courses">
            <Button>所有课程</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex h-[calc(100vh-8rem)]">
          {/* 侧边栏 */}
          <div
            className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-slate-200 bg-white rounded-l-2xl`}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-indigo-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-sm">
                    {module.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">{module.name}</h2>
                    <p className="text-xs text-slate-500">编辑模式</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {basicChapters.map((chapter) => (
                  <div key={chapter.id} className="border border-slate-200 rounded-lg">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 font-medium text-sm flex items-center gap-2">
                      <span>{chapter.icon}</span>
                      {chapter.title}
                    </div>
                    <div className="p-2 space-y-1">
                      {chapter.lessons.map((lesson, idx) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lesson)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-slate-400 mr-2">{idx + 1}.</span>
                          {lesson.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="flex-1 bg-white rounded-r-2xl border border-l-0 border-slate-200 overflow-hidden flex flex-col">
            {/* 顶部工具栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <Link href="/courses">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    所有课程
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBackupManager(true)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  备份管理
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportAll}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  导出全部
                </Button>
                {hasUnsavedChanges && (
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    未保存
                  </Badge>
                )}
              </div>
            </div>

            {/* 课程内容 */}
            {selectedLesson ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
                    <Button onClick={() => setEditingLesson(selectedLesson)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      编辑内容
                    </Button>
                  </div>

                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content">课程内容</TabsTrigger>
                      <TabsTrigger value="preview">预览</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content">
                      <Card className="p-6">
                        {selectedLesson.blocks?.length === 0 ? (
                          <p className="text-slate-400 text-center py-8">
                            暂无内容，点击"编辑内容"添加
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {selectedLesson.blocks?.map((block, index) => (
                              <div
                                key={block.id}
                                className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline">
                                    {block.type === 'text' && '文本'}
                                    {block.type === 'image' && '图片'}
                                    {block.type === 'formula' && '公式'}
                                  </Badge>
                                  <span className="text-xs text-slate-400">
                                    #{index + 1}
                                  </span>
                                </div>
                                <div className="text-sm text-slate-600 line-clamp-3">
                                  {block.content.substring(0, 100)}
                                  {block.content.length > 100 ? '...' : ''}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    </TabsContent>

                    <TabsContent value="preview">
                      <Card className="p-6">
                        {selectedLesson.blocks?.map((block) => (
                          <ContentBlockView key={block.id} block={block} />
                        ))}
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>从左侧选择一个课程开始编辑</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 编辑器弹窗 */}
      {editingLesson && (
        <LessonEditor
          lesson={editingLesson}
          onSave={handleSaveLesson}
          onClose={() => setEditingLesson(null)}
        />
      )}

      {/* 备份管理弹窗 */}
      {showBackupManager && (
        <BackupManager
          currentData={lessons.reduce((acc, l) => ({ ...acc, [l.id]: l }), {})}
          onRestore={handleRestoreBackup}
          onClose={() => setShowBackupManager(false)}
          moduleId={moduleId}
        />
      )}
    </div>
  );
}
