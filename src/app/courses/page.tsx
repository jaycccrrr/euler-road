import Header from '@/components/layout/Header';
import CourseSearch from '@/components/search/CourseSearch';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { staticAdvancedTopics } from '@/data/highschoolStatic';
import Link from 'next/link';
import { ArrowRight, BookOpen, Library } from 'lucide-react';
import { TextbookSection } from '@/components/textbook/TextbookSection';

// 搜索索引：高中数学页实际渲染的是提高篇 staticAdvancedTopics，
// 其标题与 KNOWLEDGE_MODULES 的主题标题不一致（如「函数」vs「函数与方程」），
// 而模块页按标题匹配 #topic= 定位，故搜索索引必须用页面真实主题，否则跳转落空。
const SEARCH_MODULES = KNOWLEDGE_MODULES.map((m) =>
  m.id === 'highschool-math'
    ? {
        ...m,
        topics: staticAdvancedTopics.map((t) => ({
          id: t.id,
          title: t.title,
          difficulty: 3,
        })),
      }
    : m
);

export default function CoursesPage() {
  const totalTopics = KNOWLEDGE_MODULES.reduce((n, m) => n + m.topics.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 via-white to-white">
          <div className="pointer-events-none absolute inset-0 bg-pattern-dots opacity-30" />
          <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/40 via-indigo-200/40 to-violet-200/40 blur-3xl" />
          <div className="relative container mx-auto px-4 max-w-6xl py-14 md:py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-500 shadow-sm backdrop-blur">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              知识库 · {KNOWLEDGE_MODULES.length} 大数学模块
            </div>
            <h1 className="mt-6 text-3xl md:text-[42px] font-bold tracking-tight text-slate-900">
              系统构建你的数学知识体系
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500">
              高中数学、高等数学、线性代数、概率论与数理统计、离散数学——五大模块，从基础概念到高阶理论，循序渐进，逐章精进。
            </p>
            <div className="mx-auto mt-8 max-w-2xl">
              <CourseSearch modules={SEARCH_MODULES} />
            </div>
          </div>
        </section>

        {/* 课程区：紧凑上移，让下方教材区露出一角 */}
        <section className="pt-10 pb-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600">知识库</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">所有课程</h2>
              </div>
              <span className="text-sm text-slate-400">
                {KNOWLEDGE_MODULES.length} 个模块 · {totalTopics} 个主题
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {KNOWLEDGE_MODULES.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </section>

        {/* 常用教材 */}
        <section className="pt-10 pb-16 bg-slate-50/70 border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600">经典资源</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">常用教材</h2>
              </div>
              <p className="hidden md:block text-sm text-slate-400">封面可拖动浏览，点击即可在线阅读</p>
            </div>
            <TextbookSection />
          </div>
        </section>
      </main>
    </div>
  );
}

interface ModuleCardProps {
  module: (typeof KNOWLEDGE_MODULES)[0];
}

function ModuleCard({ module }: ModuleCardProps) {
  const softColors: Record<string, { bg: string; text: string; ring: string }> = {
    'from-blue-400 to-blue-600': { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'hover:border-blue-200' },
    'from-indigo-400 to-indigo-600': { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'hover:border-indigo-200' },
    'from-violet-400 to-violet-600': { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'hover:border-violet-200' },
    'from-pink-400 to-rose-500': { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'hover:border-rose-200' },
    'from-emerald-400 to-emerald-600': { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'hover:border-emerald-200' },
  };
  const s = softColors[module.color] || { bg: 'bg-slate-50', text: 'text-slate-600', ring: 'hover:border-slate-200' };

  return (
    <Link href={`/module/${module.id}/`} className="group block h-full">
      <div
        className={`flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(15,23,42,0.16)] ${s.ring}`}
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${s.bg}`}>
            {module.icon}
          </div>
          <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-500" />
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{module.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{module.description}</p>
        <div className="mt-5 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
            {module.topics.length} 个主题
          </span>
          <span className="text-xs text-slate-300">·</span>
          <span className="text-xs text-slate-400">点击开始学习</span>
        </div>
      </div>
    </Link>
  );
}
