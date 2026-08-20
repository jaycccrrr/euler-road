import Header from '@/components/layout/Header';
import CourseSearch from '@/components/search/CourseSearch';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { staticAdvancedTopics } from '@/data/highschoolStatic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, Download, ExternalLink, Library } from 'lucide-react';
import { TEXTBOOKS } from '@/data/textbooks';
import { assetPath } from '@/lib/asset';
import { Card } from '@/components/ui/card';

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
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">全部课程</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              选择你的学习领域
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              三大核心模块，涵盖高中数学、高等数学、线性代数。
              <br className="hidden md:block" />
              从基础概念到高级理论，循序渐进掌握数学知识。
            </p>

            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto">
              <CourseSearch modules={SEARCH_MODULES} />
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">所有课程</h2>
              <span className="text-sm text-slate-500">
                共 {KNOWLEDGE_MODULES.length} 个模块
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {KNOWLEDGE_MODULES.map((module, index) => (
                <ModuleCard key={module.id} module={module} index={index} />
              ))}
            </div>
          </div>
        </section>
        {/* 常用教材 */}
        <section className="pb-16 bg-slate-50/60">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">常用教材</h2>
            </div>
            <p className="text-sm text-slate-500 mb-8">经典教材 PDF，可直接在线阅读或下载。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEXTBOOKS.map((book) => {
                const url = `https://github.com/jaycccrrr/euler-road/releases/download/textbooks/${encodeURIComponent(book.file)}`;
                return (
                  <Card key={book.id} className="p-5 flex flex-col gap-3 rounded-2xl border-slate-200">
                    <div className="flex items-start gap-3">
                      <img
                        src={assetPath(book.cover)}
                        alt={book.name}
                        className="w-16 h-[88px] object-cover rounded-lg shadow-sm border border-slate-200 shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 leading-snug">{book.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{book.author}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{book.note}</p>
                    <div className="flex gap-2 mt-auto">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full rounded-lg">
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> 在线阅读
                        </Button>
                      </a>
                      <a href={url} download className="flex-1">
                        <Button size="sm" className="w-full rounded-lg">
                          <Download className="w-3.5 h-3.5 mr-1.5" /> 下载
                        </Button>
                      </a>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ModuleCard({ module, index }: { module: typeof KNOWLEDGE_MODULES[0]; index: number }) {
  const colors: Record<string, string> = {
    'from-blue-500 to-blue-600': 'bg-blue-500',
    'from-purple-500 to-purple-600': 'bg-purple-500',
    'from-emerald-500 to-emerald-600': 'bg-emerald-500',
    'from-rose-500 to-rose-600': 'bg-rose-500',
    'from-amber-500 to-amber-600': 'bg-amber-500',
    'from-cyan-500 to-cyan-600': 'bg-cyan-500',
  };

  const bgColor = colors[module.color] || 'bg-slate-500';

  return (
    <Link href={`/module/${module.id}/`} className="group">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 motion-safe:active:scale-[0.98] border border-slate-100 h-full">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            {module.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {module.name}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-400">{module.topics.length} 个主题</span>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
