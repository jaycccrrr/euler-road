'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAnimation } from '@/contexts/AnimationContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, Users, Calendar, LogOut, User as UserIcon, GraduationCap } from 'lucide-react';
import { getPrimaryFrame, initModuleData, FRAME_COLORS } from '@/lib/gamification';
import { navigateTo } from '@/lib/asset';
import { MessageCenter } from './MessageCenter';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { resetAnimation } = useAnimation();

  const handleLogout = () => {
    logout();
    resetAnimation();
  };

  const { level, primaryFrame } = useMemo(() => {
    if (!user) {
      return { level: 1, primaryFrame: 'default' };
    }
    const moduleData = user.moduleData || initModuleData();
    const frame = getPrimaryFrame(moduleData, user.displayCategory);
    return { level: moduleData.math.level, primaryFrame: frame };
  }, [user]);

  const levelColors = FRAME_COLORS[primaryFrame] || FRAME_COLORS.default;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - Class Central 风格：更简洁 */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-lg text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">
              欧拉之路
            </span>
            <span className="text-xs text-slate-500">数学学习交流平台</span>
          </div>
        </Link>

        {/* Navigation - Class Central 风格：更精致的悬停效果 */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/courses/" icon={<BookOpen className="w-4 h-4" />} label="知识库" />
          <NavLink href="/question-bank/" icon={<Calendar className="w-4 h-4" />} label="题库" />
          <NavLink href="/community/" icon={<Users className="w-4 h-4" />} label="社区" />
        </nav>

        {/* User Menu - 更精致的交互 */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <>
              <MessageCenter />
              <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                  <div className={`avatar-frame avatar-frame-${primaryFrame} p-0.5 group-hover:scale-105 transition-transform duration-200`}>
                    <Avatar className="w-9 h-9 ring-2 ring-white shadow-md">
                      {user.avatar?.startsWith('data:') || user.avatar?.startsWith('http') ? (
                        <AvatarImage src={user.avatar} />
                      ) : null}
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-medium">
                        {user.avatar && !user.avatar.startsWith('data:') && !user.avatar.startsWith('http') ? user.avatar : user.nickname[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-slate-700">{user.nickname}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${levelColors.bg} ${levelColors.text} border ${levelColors.border}`}>
                      Lv.{level}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-0 overflow-hidden rounded-2xl border-slate-200/80 shadow-xl shadow-slate-900/10">
                {/* 用户卡片头 */}
                <div className="relative px-4 pt-4 pb-3 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-white">
                  <div className="flex items-center gap-3">
                    <div className={`avatar-frame avatar-frame-${primaryFrame} p-0.5 shrink-0`}>
                      <Avatar className="w-11 h-11 ring-2 ring-white shadow">
                        {user.avatar?.startsWith('data:') || user.avatar?.startsWith('http') ? (
                          <AvatarImage src={user.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-base font-medium">
                          {user.avatar && !user.avatar.startsWith('data:') && !user.avatar.startsWith('http') ? user.avatar : user.nickname[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800 truncate">{user.nickname}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${levelColors.bg} ${levelColors.text} border ${levelColors.border}`}>
                          Lv.{level}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-[11px] text-slate-500">
                        <span className="font-serif font-bold text-violet-500">π</span>
                        <span>{user.piPower?.currentPi || 0} π力</span>
                        {user.moduleData?.math?.selectedTitle && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="truncate">{user.moduleData.math.selectedTitle}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-1.5">
                  <DropdownMenuItem
                    onClick={() => navigateTo('/profile/')}
                    className="cursor-pointer rounded-lg px-2.5 py-2"
                  >
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-2.5">
                      <UserIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[13px]">个人中心</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1.5" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50 rounded-lg px-2.5 py-2"
                  >
                    <span className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-2.5">
                      <LogOut className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[13px]">退出登录</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login/">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                  登录
                </Button>
              </Link>
              <Link href="/register/">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 transition-all duration-200">
                  注册
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation - 更现代的样式 */}
      <nav className="md:hidden flex items-center justify-around py-2 border-t bg-slate-50/80 backdrop-blur-sm">
        <MobileNavLink href="/courses/" icon={<BookOpen className="w-5 h-5" />} label="知识库" />
        <MobileNavLink href="/question-bank/" icon={<Calendar className="w-5 h-5" />} label="题库" />
        <MobileNavLink href="/community/" icon={<Users className="w-5 h-5" />} label="社区" />
      </nav>
    </header>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 transition-all duration-200 active:scale-95"
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-3 py-2 text-xs text-slate-600 hover:text-blue-700 transition-colors active:scale-95"
    >
      {icon}
      {label}
    </Link>
  );
}
