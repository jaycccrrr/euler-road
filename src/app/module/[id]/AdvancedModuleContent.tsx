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

// 模块课时映射
const MODULE_LESSONS: Record<string, string[]> = {
  'am-1': ['direction-cosines', 'cross-product', 'triple-product', 'plane-line', 'quadric-surfaces', 'coordinate-systems', 'vector-fields', 'multivariable-concept'],
  'am-2': ['partial-derivative', 'total-differential', 'chain-rule', 'implicit-function', 'directional-derivative', 'extrema', 'taylor', 'lagrange'],
  'am-3': ['integral-concept', 'double-integral', 'triple-integral', 'change-variables', 'applications', 'polar-coordinates', 'cylindrical-spherical'],
  'am-4': ['surface-integral-first', 'surface-integral-second', 'gauss-theorem', 'stokes-theorem', 'greens-theorem', 'differential-forms'],
  'am-5': ['ode-basic', 'first-order', 'higher-order', 'linear-system', 'laplace', 'series-solution'],
  'am-6': ['numerical', 'physics', 'engineering', 'ml', 'graphics', 'economics', 'biology']
};

// 3D可视化组件
function Visualization3D({ type }: { type: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    canvas.width = 400;
    canvas.height = 300;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    <Card className="p-4 bg-white shadow-sm">
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
        className="w-full rounded-lg border border-slate-200"
        style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
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
    <Card className="p-6 mb-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold text-sm">
          {index + 1}
        </span>
        <Badge className={difficultyColor[example.difficulty]}>
          {difficultyLabel[example.difficulty]}
        </Badge>
      </div>

      <div className="text-slate-800 mb-4 font-medium">
        <MathRenderer>{example.question}</MathRenderer>
      </div>

      <div className="space-y-2 mb-4">
        {example.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              selected === idx
                ? idx === example.correct
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
            }`}
          >
            <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
            <span className="math-option"><MathRenderer>{option}</MathRenderer></span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="mt-4">
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700">回答正确！</span>
                </>
              ) : (
                <>
                  <X className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">再试一次</span>
                </>
              )}
            </div>
            {!isCorrect && (
              <p className="text-sm text-slate-600">
                正确答案是：{String.fromCharCode(65 + example.correct)}
              </p>
            )}
          </div>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" />
            {showExplanation ? '隐藏解析' : '查看解析'}
          </button>

          {showExplanation && (
            <div className="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-900 mb-2">解析</h4>
              <div className="text-slate-700 text-sm">
                <MathRenderer>{example.explanation}</MathRenderer>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function AdvancedModuleContent({
  module: initialModule,
  moduleId,
}: AdvancedModuleContentProps) {
  const [module, setModule] = useState<KnowledgeModule | undefined>(initialModule);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
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

  // 获取当前章节内容
  const currentTopic = module?.topics[selectedTopicIndex];
  const topicContent = getTopicContent(currentTopic?.id || '');
  const hasDetailedContent = !!topicContent;

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
                  {module.topics.length} 个章节
                </p>
              </div>
            </div>
          </div>

          {/* 章节列表 */}
          <div className="p-4 space-y-2">
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 block">
              选择章节
            </label>
            <select
              value={selectedTopicIndex}
              onChange={(e) => {
                setSelectedTopicIndex(Number(e.target.value));
              }}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              {module.topics.map((topic, index) => (
                <option key={topic.id} value={index}>
                  {index + 1}. {topic.title}
                </option>
              ))}
            </select>
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
                    {currentTopic?.title}
                  </div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    {topicContent?.title || currentTopic?.title}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge
                      variant={
                        currentTopic?.difficulty && currentTopic.difficulty > 3
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {'★'.repeat(currentTopic?.difficulty || 0)}
                    </Badge>
                    {topicContent?.has3D && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-600 border-blue-200"
                      >
                        3D可视化
                      </Badge>
                    )}
                    {hasDetailedContent && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 border-green-200"
                      >
                        <Calculator className="w-3 h-3 mr-1" />
                        {topicContent?.examples?.length || 0} 道例题
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
                {hasDetailedContent && (
                  <TabsTrigger value="formula" className="flex items-center gap-2">
                    <FunctionSquare className="w-4 h-4" />
                    公式推导
                  </TabsTrigger>
                )}
                {hasDetailedContent && topicContent?.examples && (
                  <TabsTrigger value="examples" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    例题练习
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {topicContent.examples.length}
                    </Badge>
                  </TabsTrigger>
                )}
              </TabsList>

              {/* 理论讲解 Tab */}
              <TabsContent value="theory">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div
                    className={
                      hasDetailedContent && topicContent?.has3D
                        ? 'lg:col-span-2'
                        : 'lg:col-span-3'
                    }
                  >
                    <Card className="p-8 bg-white shadow-sm border-slate-200">
                      <div className="prose prose-slate max-w-none">
                        {hasDetailedContent ? (
                          <MathRenderer className="text-slate-700 leading-relaxed">
                            {topicContent?.theory || ''}
                          </MathRenderer>
                        ) : (
                          <MathRenderer className="text-slate-700">
                            {currentTopic?.content || ''}
                          </MathRenderer>
                        )}
                      </div>
                    </Card>
                  </div>

                  {hasDetailedContent && topicContent?.has3D && (
                    <div className="lg:col-span-1">
                      <Visualization3D type={topicContent?.vizType || ''} />
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 公式推导 Tab */}
              <TabsContent value="formula">
                <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-sm border-indigo-100">
                  <div className="text-center mb-6">
                    <FunctionSquare className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-slate-800">核心公式与推导</h3>
                    <p className="text-slate-500 mt-2">
                      理解公式来源比死记硬背更重要
                    </p>
                  </div>

                  {hasDetailedContent ? (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <MathRenderer className="text-slate-700 leading-relaxed">
                        {topicContent?.formula || ''}
                      </MathRenderer>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <p className="text-slate-500 text-center">
                        该章节暂无公式推导内容
                      </p>
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* 例题练习 Tab */}
              <TabsContent value="examples">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      精选例题
                    </h3>
                    <p className="text-sm text-slate-500">
                      共 {topicContent?.examples?.length || 0} 道例题
                    </p>
                  </div>

                  {hasDetailedContent &&
                  topicContent?.examples &&
                  topicContent.examples.length > 0 ? (
                    topicContent.examples.map((example, index) => (
                      <ExampleCard
                        key={example.id}
                        example={example}
                        index={index}
                      />
                    ))
                  ) : (
                    <Card className="p-8 text-center text-slate-500">
                      <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>该章节暂无例题</p>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* 章节导航 */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                disabled={selectedTopicIndex <= 0}
                onClick={() => {
                  if (selectedTopicIndex > 0) {
                    setSelectedTopicIndex(selectedTopicIndex - 1);
                  }
                }}
              >
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                上一章
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                disabled={!module?.topics || selectedTopicIndex >= module.topics.length - 1}
                onClick={() => {
                  if (module?.topics && selectedTopicIndex < module.topics.length - 1) {
                    setSelectedTopicIndex(selectedTopicIndex + 1);
                  }
                }}
              >
                下一章
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
