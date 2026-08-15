'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Layers, BookOpen, TrendingUp, Sparkles, BarChart3 } from 'lucide-react';
import { Reveal, SectionLabel, GradientText } from './Reveal';
import { MathCurve } from './MathCurve';

const HEADING_FONT = '"Playfair Display", Georgia, "Noto Serif SC", serif';

/* ================= 数据 ================= */

const FEATURES = [
  {
    icon: Zap,
    title: '每日挑战',
    desc: '每天 5:00 更新，高中数学、高等数学、线性代数三科精选题目轮换。当天作答、即时评分，让学习保持节奏感。',
  },
  {
    icon: Layers,
    title: '知识模块',
    desc: '结构化讲义层层递进：概念、例题、习题环环相扣。从基础到进阶，每一步都有迹可循。',
  },
  {
    icon: BookOpen,
    title: '题库 · 笔记',
    desc: '题库按考点索引，支持个人笔记与收藏。把每一次练习沉淀为自己的复习路径。',
  },
];

const STATS = [
  { value: '3', label: '核心学科' },
  { value: '365', label: '天每日挑战' },
  { value: '100%', label: '数据本地存储' },
  { value: '0', label: '广告与信息流' },
];

const STEPS = [
  { num: '01', title: '学', desc: '讲义概念精讲' },
  { num: '02', title: '练', desc: '每日一题 + 题库' },
  { num: '03', title: '评', desc: '即时批改与统计' },
];

const EXPERIENCES = [
  {
    icon: TrendingUp,
    title: 'π力成长体系',
    desc: '连续作答积累 π 力，称号与头像框见证坚持的力量。',
  },
  {
    icon: Sparkles,
    title: '即时批改反馈',
    desc: '提交即评，本地评分算法给出得分与解析，反馈不过夜。',
  },
  {
    icon: BarChart3,
    title: '答题统计洞察',
    desc: '正确率、平均分、学科分布——用数据看清自己的进步曲线。',
  },
];

/* ================= 小组件 ================= */

/** 旋转虚线环（60s 冰川速度，Minimalist Modern 签名元素） */
function DashedRing({ className }: { className?: string }) {
  return (
    <div
      className={`ls-anim absolute rounded-full border-2 border-dashed border-[#0052FF]/20 pointer-events-none ${className ?? ''}`}
      style={{ animation: 'ls-rotate 60s linear infinite' }}
      aria-hidden
    />
  );
}

/** 漂浮公式片 */
function FormulaChip({
  text,
  className,
  duration = 6,
  delay = 0,
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <div
      className={`ls-anim absolute px-3.5 py-1.5 rounded-full text-xs italic text-slate-600 whitespace-nowrap pointer-events-none ${className ?? ''}`}
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(226,232,240,0.9)',
        boxShadow: '0 8px 24px -10px rgba(0,82,255,0.25)',
        fontFamily: 'Georgia, serif',
        animation: `ls-float ${duration}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden
    >
      {text}
    </div>
  );
}

/* ================= 区块 ================= */

/** ① 核心功能 */
function FeaturesSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
      {/* 角落环境光晕 */}
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#0052FF]/[0.05] blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-16">
          <SectionLabel>Features · 核心功能</SectionLabel>
          <h2
            className="mt-6 text-4xl md:text-5xl text-slate-900 leading-[1.15]"
            style={{ fontFamily: HEADING_FONT }}
          >
            为数学学习而生的<GradientText>完整闭环</GradientText>
          </h2>
          <p className="mt-5 text-slate-500 max-w-xl mx-auto leading-relaxed">
            不多不少，刚好三件事：每天一题保持手感，模块讲义搭建体系，题库笔记沉淀所学。
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.1 * i}>
              <div className="group relative h-full bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* 悬停渐变罩 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] flex items-center justify-center shadow-[0_4px_14px_rgba(0,82,255,0.25)] group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-slate-900">{f.title}</h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ② 纯粹（暗色反白区） */
function PureSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#0F172A] text-white overflow-hidden">
      {/* 点阵纹理 3% 透明度 */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* 角落径向光晕 */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#0052FF]/20 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[380px] h-[380px] rounded-full bg-[#4D7CFF]/15 blur-[150px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-20">
          <SectionLabel dark>Pure · 纯粹</SectionLabel>
          <h2
            className="mt-6 text-4xl md:text-5xl leading-[1.15]"
            style={{ fontFamily: HEADING_FONT }}
          >
            <GradientText>纯粹</GradientText>，是一种选择
          </h2>
          <p className="mt-5 text-slate-400 max-w-xl mx-auto leading-relaxed">
            没有信息流、没有广告、没有无限下滑。欧拉之路只做一件事：让你专注地与数学相处。
            所有学习数据保存在本地，完全属于你。
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i} className="relative text-center">
              {/* 竖向分隔线（桌面端，跳过首个） */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-14 w-px bg-white/10" />
              )}
              <div
                className="text-5xl md:text-6xl bg-clip-text text-transparent"
                style={{
                  fontFamily: HEADING_FONT,
                  backgroundImage: 'linear-gradient(to right, #4D7CFF, #60a5fa)',
                }}
              >
                {s.value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ③ 理论与实践结合 */
function TheorySection() {
  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        {/* 左：文案 + 步骤 */}
        <div>
          <Reveal>
            <SectionLabel>Theory × Practice · 知行合一</SectionLabel>
            <h2
              className="mt-6 text-4xl md:text-5xl text-slate-900 leading-[1.15]"
              style={{ fontFamily: HEADING_FONT }}
            >
              理论在左，<GradientText>实践在右</GradientText>
            </h2>
            <p className="mt-5 text-slate-500 leading-relaxed max-w-lg">
              每个知识点都不是孤岛：讲义里的每一个概念，都能在当天的每日挑战与题库中找到对应的实战。
              学完即练、练后即评——理解在解题中被真正完成。
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-3">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-4xl bg-clip-text text-transparent"
                      style={{
                        fontFamily: HEADING_FONT,
                        backgroundImage: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
                      }}
                    >
                      {s.num}
                    </span>
                    <span>
                      <span className="block font-semibold text-slate-900">{s.title}</span>
                      <span className="block text-xs text-slate-400 mt-0.5">{s.desc}</span>
                    </span>
                  </div>
                  {/* 箭头连接件（桌面端） */}
                  {i < STEPS.length - 1 && (
                    <span className="hidden sm:flex w-7 h-7 ml-3 rounded-full bg-[#0052FF]/10 items-center justify-center shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-[#0052FF]" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 右：数学可视化卡片 */}
        <Reveal delay={0.2} className="relative">
          <DashedRing className="-top-12 -right-12 w-44 h-44" />
          <FormulaChip text="∫ sin x dx = −cos x + C" className="-left-4 top-8 z-10" duration={6.4} />
          <FormulaChip text="f′(x) = cos x" className="-right-3 -bottom-4 z-10" duration={7.2} delay={0.9} />
          <div className="relative bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-7">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
                Function Lab
              </span>
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#4D7CFF]" />
              </span>
            </div>
            <MathCurve />
            <p className="mt-4 text-xs text-slate-400 text-center">
              每日一题，正来自当天讲义的考点
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** ④ 学习体验 */
function ExperienceSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#0052FF]/[0.05] blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-16">
          <SectionLabel>Experience · 学习体验</SectionLabel>
          <h2
            className="mt-6 text-4xl md:text-5xl text-slate-900 leading-[1.15]"
            style={{ fontFamily: HEADING_FONT }}
          >
            一场有<GradientText>反馈</GradientText>的学习旅程
          </h2>
          <p className="mt-5 text-slate-500 max-w-xl mx-auto leading-relaxed">
            学习不该是黑箱。每一次作答都被记录、被回应、被转化为看得见的成长。
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.title} delay={0.1 * i}>
              <div className="group h-full bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] flex items-center justify-center shadow-[0_8px_24px_rgba(0,82,255,0.35)] group-hover:scale-110 transition-transform duration-300">
                  <e.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-slate-900">{e.title}</h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ⑤ 最终 CTA（签名渐变） */
function CtaSection() {
  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0052FF 0%, #4D7CFF 60%, #60a5fa 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <FormulaChip text="e^(iπ) + 1 = 0" className="left-[8%] top-[22%] !text-white/85 !bg-white/10 !border-white/20" duration={7} />
      <FormulaChip text="∑ 1/n² = π²/6" className="right-[10%] bottom-[24%] !text-white/85 !bg-white/10 !border-white/20" duration={6.2} delay={0.7} />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <Reveal>
          <h2
            className="text-4xl md:text-6xl text-white leading-[1.1]"
            style={{ fontFamily: HEADING_FONT }}
          >
            从今天开始，
            <br />
            走上欧拉之路
          </h2>
          <p className="mt-6 text-white/75 text-lg">第一道每日挑战，正在等你。</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Link href="/daily/">
            <button className="group inline-flex items-center gap-3 h-14 px-10 rounded-full bg-white text-[#0052FF] text-lg font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.24)] active:scale-[0.98] transition-all duration-200">
              开始今日挑战
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 导出 ================= */

export function LandingSections() {
  return (
    <>
      <style>{`
        @keyframes ls-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ls-float {
          0%, 100% { transform: translateY(-8px); }
          50%      { transform: translateY(8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ls-anim { animation: none !important; }
        }
      `}</style>
      <FeaturesSection />
      <PureSection />
      <TheorySection />
      <ExperienceSection />
      <CtaSection />
      <footer className="py-10 bg-[#FAFAFA] text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          Euler Road · 以实践驱动数学认知
        </p>
      </footer>
    </>
  );
}

export default LandingSections;
