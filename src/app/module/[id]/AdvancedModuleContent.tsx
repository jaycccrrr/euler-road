'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { KnowledgeModule } from '@/types';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import {
  SubLesson,
  getAdvancedLessons,
  basicChapters,
  Chapter,
} from '@/data/advancedMathFull';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathRenderer } from '@/components/math/MathRenderer';
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Calculator,
  FunctionSquare,
  Menu,
  X,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Target,
  FileText,
  GraduationCap,
  List,
} from 'lucide-react';

interface AdvancedModuleContentProps {
  module: KnowledgeModule | undefined;
  moduleId: string;
}

// 获取提高篇课时
function getAdvancedLessonsForModule(moduleId: string): SubLesson[] {
  if (moduleId === 'advanced-math') {
    return getAdvancedLessons('advanced-math');
  }
  return [];
}

// 例题组件
function ExampleCard({
  example,
  index,
}: {
  example: {
    id: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  index: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const difficultyColor: Record<string, string> = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-orange-100 text-orange-700',
    hard: 'bg-red-100 text-red-700',
  };

  const difficultyLabel: Record<string, string> = {
    easy: '基础题',
    medium: '提高题',
    hard: '挑战题',
  };

  const isCorrect = selected === example.correct;

  return (
    <Card className="overflow-hidden mb-5 bg-white shadow-md shadow-slate-200/50 border-slate-200/60">
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
            {index + 1}
          </span>
          <Badge className={`${difficultyColor[example.difficulty]} font-medium`}>
            {difficultyLabel[example.difficulty]}
          </Badge>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="text-slate-700 mb-5 text-[15px] leading-relaxed">
          <MathRenderer>{example.question}</MathRenderer>
        </div>

        <div className="space-y-2.5 mb-5">
          {example.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selected === idx
                  ? idx === example.correct
                    ? 'bg-green-50 border-green-400 shadow-sm'
                    : 'bg-red-50 border-red-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm hover:bg-slate-50/50'
              }`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm mr-3">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="math-option text-slate-700">
                <MathRenderer>{option}</MathRenderer>
              </span>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="mt-5 pt-5 border-t border-slate-100">
            <div
              className={`p-4 rounded-xl ${
                isCorrect
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-700">回答正确！</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-red-700">再试一次</span>
                  </>
                )}
              </div>
              {!isCorrect && (
                <p className="text-sm text-slate-600 ml-7">
                  正确答案是：
                  <span className="font-bold text-green-600">
                    {String.fromCharCode(65 + example.correct)}
                  </span>
                </p>
              )}
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {showExplanation ? '隐藏解析' : '查看解析'}
            </button>

            {showExplanation && (
              <div className="mt-3 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-xs">
                    解
                  </span>
                  详细解析
                </h4>
                <div className="text-slate-700 leading-relaxed">
                  <MathRenderer>{example.explanation}</MathRenderer>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

// 提高篇课时卡片组件
function AdvancedLessonCard({
  lesson,
  index,
  onClick,
}: {
  lesson: SubLesson;
  index: number;
  onClick: () => void;
}) {
  return (
    <Card className="p-6 cartoon-card hover:scale-[1.02] transition-transform cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold group-hover:text-purple-600 transition-colors">
              {lesson.title}
            </h3>
            {lesson.examples && lesson.examples.length > 0 && (
              <Badge variant="default">{lesson.examples.length} 道例题</Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">深入理解与拓展应用</p>
          <Button
            variant="outline"
            size="sm"
            className="group-hover:bg-purple-50"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            开始学习
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-500" />
        </div>
      </div>
    </Card>
  );
}

// 基础篇侧边栏组件
function BasicSidebar({
  chapters,
  selectedLessonId,
  onSelectLesson,
  module,
}: {
  chapters: Chapter[];
  selectedLessonId: string;
  onSelectLesson: (lesson: SubLesson) => void;
  module: KnowledgeModule;
}) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => new Set([chapters[0]?.id])
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  // 计算总课时数和已完成数（简化版，实际可以从学习记录中获取）
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* 模块信息 */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-indigo-50 to-white">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center text-2xl shadow-sm`}
          >
            {module.icon}
          </div>
          <div>
            <h2 className="font-bold text-slate-800">{module.name}</h2>
            <p className="text-xs text-slate-500">基础篇 · {totalLessons} 课时</p>
          </div>
        </div>
      </div>

      {/* 章节列表 */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const isActive = chapter.lessons.some((l) => l.id === selectedLessonId);

          return (
            <div
              key={chapter.id}
              className={`border-b border-slate-100 ${
                isActive ? 'bg-indigo-50/30' : ''
              }`}
            >
              {/* 章节标题 */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                  isActive ? 'text-indigo-700' : 'text-slate-700'
                }`}
              >
                <span className="text-xl">{chapter.icon}</span>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-sm">{chapter.title}</h3>
                  <p className="text-xs text-slate-400">
                    {chapter.lessons.length} 课时
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* 课时列表 */}
              {isExpanded && (
                <div className="bg-slate-50/50">
                  {chapter.lessons.map((lesson, idx) => {
                    const isLessonActive = lesson.id === selectedLessonId;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full px-4 py-2.5 pl-12 flex items-center gap-3 text-left transition-colors ${
                          isLessonActive
                            ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-500'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs font-medium ${
                            isLessonActive
                              ? 'bg-indigo-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-sm truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 基础篇内容区域
function BasicContent({
  lesson,
  onToggleSidebar,
}: {
  lesson: SubLesson;
  onToggleSidebar: () => void;
}) {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      {/* 头部 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{lesson.title}</h1>
            {lesson.examples && lesson.examples.length > 0 && (
              <Badge variant="outline" className="mt-1">
                <Calculator className="w-3 h-3 mr-1" />
                {lesson.examples.length} 道例题
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 内容标签页 */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="bg-white border-b border-slate-200 px-6">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="theory"
              className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
            >
              <BookOpen className="w-4 h-4" />
              理论讲解
            </TabsTrigger>
            {lesson.formula && (
              <TabsTrigger
                value="formula"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <FunctionSquare className="w-4 h-4" />
                公式推导
              </TabsTrigger>
            )}
            {lesson.examples && lesson.examples.length > 0 && (
              <TabsTrigger
                value="examples"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <Calculator className="w-4 h-4" />
                例题练习
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <TabsContent value="theory" className="mt-0">
            <Card className="p-6 max-w-4xl">
              <MathRenderer>{lesson.theory}</MathRenderer>
            </Card>
          </TabsContent>

          {lesson.formula && (
            <TabsContent value="formula" className="mt-0">
              <Card className="p-6 max-w-4xl">
                <MathRenderer>{lesson.formula}</MathRenderer>
              </Card>
            </TabsContent>
          )}

          {lesson.examples && lesson.examples.length > 0 && (
            <TabsContent value="examples" className="mt-0">
              <div className="max-w-4xl space-y-4">
                {lesson.examples.map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default function AdvancedModuleContent({
  module: initialModule,
  moduleId,
}: AdvancedModuleContentProps) {
  const [module, setModule] = useState<KnowledgeModule | undefined>(initialModule);
  const [activeMode, setActiveMode] = useState<'basic' | 'advanced'>('advanced');
  const [selectedBasicLesson, setSelectedBasicLesson] = useState<SubLesson | null>(null);
  const [selectedAdvancedLesson, setSelectedAdvancedLesson] = useState<SubLesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!module && moduleId) {
      const foundModule = KNOWLEDGE_MODULES.find((m) => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }
    }
  }, [module, moduleId]);

  // 初始化默认选中第一个基础课时
  useEffect(() => {
    if (activeMode === 'basic' && !selectedBasicLesson && basicChapters.length > 0) {
      setSelectedBasicLesson(basicChapters[0].lessons[0]);
    }
  }, [activeMode, selectedBasicLesson]);

  const advancedLessons = getAdvancedLessonsForModule(moduleId || '');

  if (!module) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/">
            <Button>返回首页</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        {/* 模块头部 */}
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${module.color} p-8 md:p-12 mb-8`}
        >
          <div className="absolute inset-0 bg-pattern-dots opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
              {module.icon}
            </div>
            <div className="text-center md:text-left text-white">
              <Badge className="bg-white/20 text-white mb-2">
                {module.category === 'math'
                  ? '数学'
                  : module.category === 'physics'
                  ? '物理'
                  : '计算机'}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{module.name}</h1>
              <p className="text-white/90 max-w-xl">{module.description}</p>
            </div>
          </div>
        </div>

        {/* 模式切换标签 */}
        <Tabs
          value={activeMode}
          onValueChange={(v) => setActiveMode(v as 'basic' | 'advanced')}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              提高篇
            </TabsTrigger>
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              基础篇
            </TabsTrigger>
          </TabsList>

          {/* 提高篇内容 */}
          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedLessons.length > 0 ? (
                advancedLessons.map((lesson, index) => (
                  <AdvancedLessonCard
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    onClick={() => setSelectedAdvancedLesson(lesson)}
                  />
                ))
              ) : (
                <Card className="p-8 text-center col-span-2">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-gray-500">提高篇内容正在开发中...</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 基础篇内容 - 侧边栏布局 */}
          <TabsContent value="basic" className="mt-0">
            <Card className="overflow-hidden" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
              <div className="flex h-full">
                {/* 侧边栏 */}
                {sidebarOpen && (
                  <BasicSidebar
                    chapters={basicChapters}
                    selectedLessonId={selectedBasicLesson?.id || ''}
                    onSelectLesson={setSelectedBasicLesson}
                    module={module}
                  />
                )}

                {/* 内容区 */}
                {selectedBasicLesson ? (
                  <BasicContent
                    lesson={selectedBasicLesson}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <List className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">请从左侧选择一个课时开始学习</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 提高篇课时详情对话框 */}
      {selectedAdvancedLesson && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setSelectedAdvancedLesson(null)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  {selectedAdvancedLesson.title}
                </h2>
                {selectedAdvancedLesson.examples &&
                  selectedAdvancedLesson.examples.length > 0 && (
                    <Badge variant="default" className="mt-2">
                      <Calculator className="w-3 h-3 mr-1" />
                      {selectedAdvancedLesson.examples.length} 道例题
                    </Badge>
                  )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedAdvancedLesson(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <Tabs defaultValue="theory" className="flex-1 flex flex-col">
                <TabsList className="mx-6 mt-4">
                  <TabsTrigger value="theory" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    理论讲解
                  </TabsTrigger>
                  {selectedAdvancedLesson.formula && (
                    <TabsTrigger value="formula" className="flex items-center gap-2">
                      <FunctionSquare className="w-4 h-4" />
                      公式推导
                    </TabsTrigger>
                  )}
                  {selectedAdvancedLesson.examples &&
                    selectedAdvancedLesson.examples.length > 0 && (
                      <TabsTrigger value="examples" className="flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        例题练习
                      </TabsTrigger>
                    )}
                </TabsList>

                <div className="flex-1 overflow-y-auto p-6">
                  <TabsContent value="theory" className="mt-0">
                    <Card className="p-6">
                      <MathRenderer>{selectedAdvancedLesson.theory}</MathRenderer>
                    </Card>
                  </TabsContent>

                  {selectedAdvancedLesson.formula && (
                    <TabsContent value="formula" className="mt-0">
                      <Card className="p-6">
                        <MathRenderer>{selectedAdvancedLesson.formula}</MathRenderer>
                      </Card>
                    </TabsContent>
                  )}

                  {selectedAdvancedLesson.examples &&
                    selectedAdvancedLesson.examples.length > 0 && (
                      <TabsContent value="examples" className="mt-0">
                        <div className="space-y-4">
                          {selectedAdvancedLesson.examples.map((example, index) => (
                            <ExampleCard
                              key={example.id}
                              example={example}
                              index={index}
                            />
                          ))}
                        </div>
                      </TabsContent>
                    )}
                </div>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <Button onClick={() => setSelectedAdvancedLesson(null)}>
                <X className="w-4 h-4 mr-2" />
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
