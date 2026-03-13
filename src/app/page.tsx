import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { MathSymbols } from '@/components/animations/MathSymbols';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section - Brilliant 风格：极简、大标题、装饰动画 */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* 背景装饰 - 数学符号动画 */}
          <MathSymbols />

          {/* 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />

          {/* 中心内容 */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-600">开启你的理科登基之路</span>
            </div>

            {/* 主标题 - 衬线字体风格 */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-slate-900 mb-6 tracking-tight animate-fade-in">
              Euler Road
            </h1>

            {/* 副标题 */}
            <p className="text-2xl md:text-3xl text-slate-600 mb-4 font-light animate-fade-in" style={{ animationDelay: '0.1s' }}>
              通过实践学习
            </p>

            {/* 描述 */}
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              数学、物理、计算机科学。从基础概念到高级理论，
              <br className="hidden md:block" />
              通过互动练习和每日挑战掌握理科知识。
            </p>

            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link href="/daily/">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  开始每日挑战
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses/">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  浏览课程
                </Button>
              </Link>
            </div>
          </div>

          {/* 底部渐变过渡 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
        </section>

        {/* 特色介绍 - 三列布局 */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                icon="🎯"
                title="每日一题"
                description="每天一道精选题目，循序渐进提升能力，坚持打卡积累经验值"
                delay={0}
              />
              <FeatureCard
                icon="🏆"
                title="成就系统"
                description="从数学爱好者到新的欧拉，解锁称号、头像框，展示你的理科实力"
                delay={0.1}
              />
              <FeatureCard
                icon="💬"
                title="社区讨论"
                description="与志同道合的学习者交流，分享解题思路，共同进步成长"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* CTA 区域 */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              准备好开始了吗？
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              加入 Euler Road，在理科之路上不断前进
            </p>
            <Link href="/register/">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 py-7 text-xl font-semibold shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                免费注册
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  return (
    <div className="text-center animate-fade-in" style={{ animationDelay: `${delay}s` }}>
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
