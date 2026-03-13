'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, Trophy, Users, Calendar, LogOut, User as UserIcon, GraduationCap, Sparkles } from 'lucide-react';
import { getPrimaryTitle, getPrimaryFrame, initModuleData } from '@/lib/gamification';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  const { primaryTitle, primaryFrame } = useMemo(() => {
    if (!user) {
      return { primaryTitle: '', primaryFrame: 'default' };
    }
    const moduleData = user.moduleData || initModuleData();
    const titleInfo = getPrimaryTitle(moduleData, user.displayCategory);
    const frame = getPrimaryFrame(moduleData, user.displayCategory);
    return { primaryTitle: titleInfo.title, primaryFrame: frame };
  }, [user]);

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
              欧拉登基之路
            </span>
            <span className="text-xs text-slate-500">理科学习交流平台</span>
          </div>
        </Link>

        {/* Navigation - Class Central 风格：更精致的悬停效果 */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/courses/" icon={<BookOpen className="w-4 h-4" />} label="知识库" />
          <NavLink href="/daily/" icon={<Calendar className="w-4 h-4" />} label="每日一题" />
          <NavLink href="/community/" icon={<Users className="w-4 h-4" />} label="社区" />
          <NavLink href="/leaderboard/" icon={<Trophy className="w-4 h-4" />} label="排行榜" />
        </nav>

        {/* User Menu - 更精致的交互 */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                  <div className={`avatar-frame avatar-frame-${primaryFrame} p-0.5 group-hover:scale-105 transition-transform duration-200`}>
                    <Avatar className="w-9 h-9 ring-2 ring-white shadow-md">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-medium">
                        {user.nickname[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-slate-700">{user.nickname}</span>
                    {primaryTitle && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {primaryTitle}
                      </span>
                    )}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => window.location.href = '/profile/'} className="cursor-pointer">
                  <UserIcon className="w-4 h-4 mr-2 text-slate-500" />
                  个人中心
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer focus:text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <MobileNavLink href="/daily/" icon={<Calendar className="w-5 h-5" />} label="每日一题" />
        <MobileNavLink href="/community/" icon={<Users className="w-5 h-5" />} label="社区" />
        <MobileNavLink href="/leaderboard/" icon={<Trophy className="w-5 h-5" />} label="排行" />
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
