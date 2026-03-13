import Header from '@/components/layout/Header';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">全部课程</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              选择你的学习领域
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              六大核心模块，涵盖数学、物理、计算机科学。
              <br className="hidden md:block" />
              从基础概念到高级理论，循序渐进掌握理科知识。
            </p>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {KNOWLEDGE_MODULES.map((module, index) => (
                <ModuleCard key={module.id} module={module} index={index} />
              ))}
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
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 h-full">
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
