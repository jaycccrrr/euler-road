'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import { KnowledgeModule, Topic } from '@/types';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { getTopicContent, TopicContent, Example } from '@/data/advancedMathContent';
import { allLessons, SubLesson } from '@/data/advancedMathFull';
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
  RotateCcw,
  Eye,
} from 'lucide-react';

interface AdvancedModuleContentProps {
  module: KnowledgeModule | undefined;
  moduleId: string;
}

// 模块路由映射 - 将模块ID映射到 allLessons 的键
const MODULE_ROUTE_MAP: Record<string, string> = {
  'advanced-math': 'am-1', // 默认显示第一章
};

// 获取模块下的所有课时（包括所有章节）
function getAllLessonsForModule(moduleId: string): SubLesson[] {
  if (moduleId === 'advanced-math') {
    // 高等数学包含 am-1 到 am-6 的所有课时
    return [
      ...(allLessons['am-1'] || []),
      ...(allLessons['am-2'] || []),
      ...(allLessons['am-3'] || []),
      ...(allLessons['am-4'] || []),
      ...(allLessons['am-5'] || []),
      ...(allLessons['am-6'] || []),
    ];
  }
  return allLessons[moduleId] || [];
}

// 3D可视化组件
function Visualization3D({ type }: { type: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true); // 默认自动旋转

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    canvas.width = 400;
    canvas.height = 300;

    // 填充白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 根据类型绘制不同的3D可视化
    switch (type) {
      case 'directionCosines':
        drawDirectionCosines(ctx, canvas.width, canvas.height, rotation);
        break;
      case 'surface':
        drawSurface(ctx, canvas.width, canvas.height, rotation);
        break;
      case 'curve':
        drawCurve(ctx, canvas.width, canvas.height, rotation);
        break;
      case 'volume':
        drawVolume(ctx, canvas.width, canvas.height, rotation);
        break;
      default:
        drawDefault(ctx, canvas.width, canvas.height, rotation);
    }
  }, [type, rotation]);

  // 动画控制
  useEffect(() => {
    let animationId: number;
    if (isAnimating) {
      const animate = () => {
        setRotation((r) => (r + 0.5) % 360);
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isAnimating]);

  return (
    <Card className="p-4 bg-white shadow-sm border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <Eye className="w-4 h-4" />
          3D 可视化
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAnimating(!isAnimating)}
        >
          {isAnimating ? '暂停' : '旋转'}
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ maxWidth: '400px', margin: '0 auto', display: 'block', background: '#ffffff' }}
      />
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation((r) => (r - 15) % 360)}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation((r) => (r + 15) % 360)}
        >
          <RotateCcw className="w-4 h-4 scale-x-[-1]" />
        </Button>
      </div>
    </Card>
  );
}

// 绘制方向余弦3D可视化
function drawDirectionCosines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rotation: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 80;

  // 填充白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 绘制坐标轴
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;

  // X轴
  ctx.beginPath();
  ctx.moveTo(centerX - 100, centerY + 50);
  ctx.lineTo(centerX + 100, centerY - 50);
  ctx.stroke();

  // Y轴
  ctx.beginPath();
  ctx.moveTo(centerX - 100, centerY - 30);
  ctx.lineTo(centerX + 100, centerY + 70);
  ctx.stroke();

  // Z轴
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 80);
  ctx.lineTo(centerX, centerY + 80);
  ctx.stroke();

  // 绘制向量
  const angle = (rotation * Math.PI) / 180;
  const vecX = Math.cos(angle) * scale;
  const vecY = Math.sin(angle) * scale * 0.5;

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + vecX, centerY - vecY);
  ctx.stroke();

  // 绘制箭头
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(centerX + vecX, centerY - vecY, 5, 0, Math.PI * 2);
  ctx.fill();

  // 标签
  ctx.fillStyle = '#475569';
  ctx.font = '14px sans-serif';
  ctx.fillText('x', centerX + 110, centerY - 40);
  ctx.fillText('y', centerX + 110, centerY + 80);
  ctx.fillText('z', centerX + 10, centerY - 90);
  ctx.fillText('a', centerX + vecX + 10, centerY - vecY);
}

// 绘制曲面
function drawSurface(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rotation: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 60;

  // 填充白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 1;

  const angle = (rotation * Math.PI) / 180;

  for (let i = -3; i <= 3; i += 0.5) {
    ctx.beginPath();
    for (let j = -3; j <= 3; j += 0.1) {
      const x = j * scale + centerX;
      const y =
        centerY -
        (Math.sin(j + angle) * Math.cos(i) * scale * 0.5 + i * scale * 0.3);
      if (j === -3) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
}

// 绘制曲线
function drawCurve(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rotation: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 50;

  // 填充白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;

  const angle = (rotation * Math.PI) / 180;

  // 绘制螺旋线
  ctx.beginPath();
  for (let t = 0; t < 4 * Math.PI; t += 0.1) {
    const x = centerX + Math.cos(t + angle) * scale * (1 + t / 10);
    const y = centerY + Math.sin(t) * scale * 0.5;
    if (t === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

// 绘制体积
function drawVolume(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rotation: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const size = 60;

  // 填充白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const angle = (rotation * Math.PI) / 180;
  const offsetX = Math.cos(angle) * 20;

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;

  // 绘制立方体
  ctx.beginPath();
  // 前面
  ctx.rect(centerX - size + offsetX, centerY - size, size * 2, size * 2);
  // 后面
  ctx.rect(centerX - size - offsetX, centerY - size - 20, size * 2, size * 2);
  // 连接线
  ctx.moveTo(centerX - size + offsetX, centerY - size);
  ctx.lineTo(centerX - size - offsetX, centerY - size - 20);
  ctx.moveTo(centerX + size + offsetX, centerY - size);
  ctx.lineTo(centerX + size - offsetX, centerY - size - 20);
  ctx.moveTo(centerX - size + offsetX, centerY + size);
  ctx.lineTo(centerX - size - offsetX, centerY + size - 20);
  ctx.moveTo(centerX + size + offsetX, centerY + size);
  ctx.lineTo(centerX + size - offsetX, centerY + size - 20);
  ctx.stroke();
}

// 默认绘制
function drawDefault(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rotation: number
) {
  const centerX = width / 2;
  const centerY = height / 2;

  // 填充白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(centerX - 50, centerY - 50, 100, 100);

  ctx.fillStyle = '#6366f1';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('3D 可视化', centerX, centerY);
}

// 例题组件
function ExampleCard({ example, index }: { example: Example; index: number }) {
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
      {/* 题目头部 */}
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
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm mr-3">{String.fromCharCode(65 + idx)}</span>
            <span className="math-option text-slate-700"><MathRenderer>{option}</MathRenderer></span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div
            className={`p-4 rounded-xl ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
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
                正确答案是：<span className="font-bold text-green-600">{String.fromCharCode(65 + example.correct)}</span>
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
                <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-xs">解</span>
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

export default function AdvancedModuleContent({
  module: initialModule,
  moduleId,
}: AdvancedModuleContentProps) {
  const [module, setModule] = useState<KnowledgeModule | undefined>(initialModule);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('theory');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!module && moduleId) {
      const foundModule = KNOWLEDGE_MODULES.find((m) => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }
    }
  }, [module, moduleId]);

  // 获取当前模块的课时列表
  const moduleLessons = getAllLessonsForModule(moduleId || '');
  const currentLesson = moduleLessons.find(l => l.id === selectedLessonId) || moduleLessons[0];
  const currentLessonIndex = moduleLessons.findIndex(l => l.id === selectedLessonId);

  // 初始化默认选中第一个课时
  useEffect(() => {
    if (moduleLessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(moduleLessons[0].id);
    }
  }, [moduleLessons, selectedLessonId]);

  // 切换到指定课时
  const goToLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab('theory');
  };

  // 上一课时/下一课时
  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      goToLesson(moduleLessons[currentLessonIndex - 1].id);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < moduleLessons.length - 1) {
      goToLesson(moduleLessons[currentLessonIndex + 1].id);
    }
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <div className="flex pt-16">
        {/* 侧边栏导航 */}
        <aside
          className={`fixed left-0 top-16 bottom-0 bg-white border-r border-slate-200 overflow-y-auto transition-all duration-300 z-40 ${
            sidebarOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'
          }`}
        >
          {/* 模块信息 */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-lg ${module.color} flex items-center justify-center text-xl`}
              >
                {module.icon}
              </div>
              <div>
                <h2 className="font-bold text-slate-800">{module.name}</h2>
                <p className="text-xs text-slate-500">
                  {moduleLessons.length} 个课时
                </p>
              </div>
            </div>
          </div>

          {/* 课时列表 */}
          <div className="p-4 space-y-2">
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 block">
              课时列表 ({moduleLessons.length} 个)
            </label>
            <div className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto">
              {moduleLessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => goToLesson(lesson.id)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                    selectedLessonId === lesson.id
                      ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700'
                      : 'hover:bg-slate-50 text-slate-600 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      selectedLessonId === lesson.id
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-medium truncate">{lesson.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="p-4 border-t border-slate-200">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
          </div>
        </aside>

        {/* 主内容区 */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-80' : 'ml-0'
          }`}
        >
          {/* 侧边栏切换按钮 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed left-4 top-20 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* 头部信息 */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center text-2xl`}
                >
                  {module.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-500 mb-1">
                    {module.name} · 课时 {currentLessonIndex + 1}/{moduleLessons.length}
                  </div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    {currentLesson?.title || '加载中...'}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    {currentLesson?.has3D && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-600 border-blue-200"
                      >
                        3D可视化
                      </Badge>
                    )}
                    {currentLesson?.examples && currentLesson.examples.length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 border-green-200"
                      >
                        <Calculator className="w-3 h-3 mr-1" />
                        {currentLesson.examples.length} 道例题
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 内容标签页 */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="theory" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  理论讲解
                </TabsTrigger>
                {currentLesson?.formula && (
                  <TabsTrigger value="formula" className="flex items-center gap-2">
                    <FunctionSquare className="w-4 h-4" />
                    公式推导
                  </TabsTrigger>
                )}
                {currentLesson?.examples && currentLesson.examples.length > 0 && (
                  <TabsTrigger value="examples" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    例题练习
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {currentLesson.examples.length}
                    </Badge>
                  </TabsTrigger>
                )}
                {currentLesson?.has3D && (
                  <TabsTrigger value="visualization" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    3D可视化
                  </TabsTrigger>
                )}
              </TabsList>

              {/* 理论讲解 Tab */}
              <TabsContent value="theory">
                <Card className="overflow-hidden bg-white shadow-lg shadow-slate-200/50 border-slate-200/60">
                  {/* 理论内容头部 */}
                  <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">理论讲解</h3>
                        <p className="text-sm text-slate-500">理解概念的本质与应用</p>
                      </div>
                    </div>
                  </div>
                  {/* 理论内容主体 */}
                  <div className="px-8 py-8">
                    <MathRenderer>
                      {currentLesson?.theory || '暂无理论内容'}
                    </MathRenderer>
                  </div>
                </Card>
              </TabsContent>

              {/* 3D可视化 Tab */}
              {currentLesson?.has3D && (
                <TabsContent value="visualization">
                  <Card className="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl border-slate-700">
                    {/* 3D可视化头部 */}
                    <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700 px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">3D可视化演示</h3>
                          <p className="text-sm text-slate-400">交互式图形帮助理解抽象概念</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-8 py-8">
                      <div className="max-w-3xl mx-auto">
                        <Visualization3D type={currentLesson?.vizType || ''} />
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              )}

              {/* 公式推导 Tab */}
              <TabsContent value="formula">
                <Card className="overflow-hidden bg-gradient-to-br from-indigo-50/80 to-purple-50/80 shadow-lg shadow-indigo-100/50 border-indigo-100">
                  {/* 公式推导头部 */}
                  <div className="bg-gradient-to-r from-indigo-100/50 to-purple-100/30 border-b border-indigo-100 px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                        <FunctionSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">核心公式与推导</h3>
                        <p className="text-sm text-slate-500">理解公式来源比死记硬背更重要</p>
                      </div>
                    </div>
                  </div>

                  {currentLesson?.formula ? (
                    <div className="px-8 py-8">
                      <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100/50">
                        <MathRenderer>
                          {currentLesson.formula}
                        </MathRenderer>
                      </div>
                    </div>
                  ) : (
                    <div className="px-8 py-8">
                      <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <p className="text-slate-500">该课时暂无公式推导内容</p>
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* 例题练习 Tab */}
              <TabsContent value="examples">
                <div className="space-y-5">
                  {/* 例题头部 */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200/60 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center"
                        >
                          <Sparkles className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800"
                          >精选例题</h3>
                          <p className="text-sm text-slate-500">通过练习巩固所学知识</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-slate-100 rounded-full">
                        <p className="text-sm font-medium text-slate-600">
                          共 {currentLesson?.examples?.length || 0} 道例题
                        </p>
                      </div>
                    </div>
                  </div>

                  {currentLesson?.examples && currentLesson.examples.length > 0 ? (
                    currentLesson.examples.map((example, index) => (
                      <ExampleCard
                        key={example.id}
                        example={example}
                        index={index}
                      />
                    ))
                  ) : (
                    <Card className="p-10 text-center text-slate-500 border-slate-200/60 shadow-sm">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-lg font-medium text-slate-600">该课时暂无例题</p>
                      <p className="text-sm text-slate-400 mt-1">敬请期待更多练习内容</p>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* 课时导航 */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                disabled={currentLessonIndex <= 0}
                onClick={goToPrevLesson}
              >
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                上一课时
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                disabled={currentLessonIndex >= moduleLessons.length - 1}
                onClick={goToNextLesson}
              >
                下一课时
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
