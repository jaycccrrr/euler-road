'use client';

import { IntroAnimation } from '@/components/animations/IntroAnimation';
import { AnimatedRegister } from '@/components/animations/AnimatedRegister';
import { HomeTransition } from '@/components/animations/HomeTransition';
import { AnimatedHome } from '@/components/animations/AnimatedHome';
import { useAnimation } from '@/contexts/AnimationContext';

export default function Home() {
  const { phase } = useAnimation();

  return (
    <>
      {/* 开场动画 - 新用户首次进入 */}
      <IntroAnimation />

      {/* 注册页面 - 流动玻璃背景 */}
      <AnimatedRegister />

      {/* 主页过渡动画 */}
      <HomeTransition />

      {/* 主页内容 */}
      <AnimatedHome />
    </>
  );
}
