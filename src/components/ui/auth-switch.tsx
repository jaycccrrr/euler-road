'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, EyeOff, Loader2, Upload, User, Lock } from 'lucide-react';
import { createUser, getUserByNickname } from '@/lib/db';
import { generateId, compressImage, hashPassword, validatePasswordStrength } from '@/lib/utils';
import { initModuleData, getPrimaryTitle, getPrimaryFrame } from '@/lib/gamification';
import { AuthMathScene } from '@/components/ui/auth-math-scene';
import type { User as UserType } from '@/types';

const DEFAULT_AVATARS = ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🔬', '👩‍🔬', '🧑‍🔬', '🤓', '🦉', '🚀'];

type AuthMode = 'login' | 'register';

export interface AuthSwitchProps {
  /** 初始模式：登录或注册 */
  defaultMode?: AuthMode;
  /** 登录成功回调（由使用方决定跳转/相位切换） */
  onLoginSuccess?: () => void;
  /** 注册成功回调（已完成自动登录） */
  onRegisterSuccess?: () => void;
  className?: string;
}

/** 面板滑动弹簧：临界阻尼，无过冲（Apple §4） */
const PANEL_SPRING = { type: 'spring', stiffness: 170, damping: 26 } as const;

/**
 * AuthSwitch —— 滑动双面板登录/注册（21st.dev Auth Switch 风格）
 *
 * 桌面端：白色表单面板在彩色渐变底上左右滑动，弧边领先；
 * 彩色侧内嵌 3D 数学微场景（AuthMathScene）。
 * 移动端：顶部渐变场景头 + 分段切换 + 表单。
 */
export function AuthSwitch({
  defaultMode = 'login',
  onLoginSuccess,
  onRegisterSuccess,
  className,
}: AuthSwitchProps) {
  const { login } = useAuth();

  const [mode, setMode] = useState<AuthMode>(defaultMode);

  // 登录表单
  const [loginNickname, setLoginNickname] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // 注册表单
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setLoginError('');
    setRegisterError('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginNickname.trim() || !loginPassword.trim()) {
      setLoginError('请输入昵称和密码');
      return;
    }

    setIsLoginLoading(true);
    try {
      const success = await login(loginNickname, loginPassword);
      if (success) {
        onLoginSuccess?.();
      } else {
        setLoginError('昵称或密码错误');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('登录失败，请刷新页面重试');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!nickname.trim() || !password.trim()) {
      setRegisterError('请输入昵称和密码');
      return;
    }
    if (nickname.length < 2 || nickname.length > 20) {
      setRegisterError('昵称长度需在2-20个字符之间');
      return;
    }
    const strength = validatePasswordStrength(password);
    if (!strength.valid) {
      setRegisterError(strength.message);
      return;
    }
    if (password !== confirmPassword) {
      setRegisterError('两次输入的密码不一致');
      return;
    }

    setIsRegisterLoading(true);

    try {
      const existingUser = await getUserByNickname(nickname);
      if (existingUser) {
        setRegisterError('该昵称已被使用');
        setIsRegisterLoading(false);
        return;
      }

      const moduleData = initModuleData();
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const passwordHash = await hashPassword(password);

      const newUser: UserType = {
        id: generateId(),
        nickname: nickname.trim(),
        passwordHash,
        avatar: customAvatar || selectedAvatar,
        moduleData,
        piPower: {
          currentPi: 0,
          monthlyPi: 0,
          totalAnswered: 0,
          monthlyAnswered: 0,
          lastAnswerDate: null,
          currentStreak: 0,
          monthlyResetDate: nextMonth.toISOString(),
          dailyAttempts: {},
        },
        eulerTitleHistory: [],
        level: 1,
        experience: 0,
        title: getPrimaryTitle(moduleData).title,
        frame: getPrimaryFrame(moduleData),
        isAdmin: false,
        createdAt: now.toISOString(),
        lastLoginAt: now.toISOString(),
      };

      await createUser(newUser);

      // 注册成功后自动登录
      const loginSuccess = await login(nickname.trim(), password);
      if (!loginSuccess) {
        setRegisterError('注册成功但自动登录失败，请手动登录');
        setIsRegisterLoading(false);
        return;
      }

      onRegisterSuccess?.();
    } catch {
      setRegisterError('注册失败，请重试');
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 200);
      setCustomAvatar(compressed);
    } catch {
      setRegisterError('图片上传失败，请重试');
    }
  };

  const finalAvatar = customAvatar || selectedAvatar;

  /* ===== 通用 pill 输入样式 ===== */
  const pillInput =
    'h-11 rounded-full bg-slate-100 border-transparent pl-11 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:bg-white';

  /* ===== 登录表单 ===== */
  const loginForm = (
    <div className="w-full max-w-xs mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">登录</h2>
      <p className="text-sm text-slate-400 text-center mb-6">欢迎回来，继续你的数学之旅</p>

      {loginError && (
        <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
          <AlertDescription className="text-red-600">{loginError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-3.5">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="login-nickname"
            type="text"
            placeholder="昵称"
            value={loginNickname}
            onChange={(e) => setLoginNickname(e.target.value)}
            className={pillInput}
            disabled={isLoginLoading}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="login-password"
            type={showLoginPassword ? 'text' : 'password'}
            placeholder="密码"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className={cn(pillInput, 'pr-11')}
            disabled={isLoginLoading}
          />
          <button
            type="button"
            onClick={() => setShowLoginPassword(!showLoginPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full h-11 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#2563eb] text-white shadow-lg shadow-blue-400/25 tracking-[0.3em] font-semibold"
          disabled={isLoginLoading}
        >
          {isLoginLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              登录中
            </>
          ) : (
            '登 录'
          )}
        </Button>
      </form>
    </div>
  );

  /* ===== 注册表单 ===== */
  const registerForm = (
    <div className="w-full max-w-xs mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">创建账号</h2>
      <p className="text-sm text-slate-400 text-center mb-5">开启你的欧拉之路</p>

      {registerError && (
        <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
          <AlertDescription className="text-red-600">{registerError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
        {/* 头像 */}
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11 shrink-0 ring-2 ring-blue-400/50">
            {customAvatar ? <AvatarImage src={finalAvatar} /> : null}
            <AvatarFallback className="text-lg bg-gradient-to-br from-[#60a5fa] to-[#3b82f6]">
              {finalAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap gap-1 flex-1">
            {DEFAULT_AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  setSelectedAvatar(emoji);
                  setCustomAvatar('');
                }}
                className={cn(
                  'w-7 h-7 rounded-md text-sm transition-all',
                  !customAvatar && selectedAvatar === emoji
                    ? 'bg-blue-50 ring-2 ring-blue-400/50'
                    : 'bg-slate-100 hover:bg-slate-200'
                )}
              >
                {emoji}
              </button>
            ))}
          </div>
          <Label
            htmlFor="avatar-upload"
            className="shrink-0 w-7 h-7 flex items-center justify-center bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors"
            title="上传自定义头像"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
          </Label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="nickname"
            type="text"
            placeholder="昵称（2-20个字符）"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={pillInput}
            disabled={isRegisterLoading}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="密码（至少8位，含字母和数字）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(pillInput, 'pr-11')}
            disabled={isRegisterLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={cn(pillInput, 'pr-11')}
            disabled={isRegisterLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full h-11 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#2563eb] text-white shadow-lg shadow-blue-400/25 tracking-[0.3em] font-semibold"
          disabled={isRegisterLoading}
        >
          {isRegisterLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              注册中
            </>
          ) : (
            '创建账号'
          )}
        </Button>
      </form>
    </div>
  );

  /* ===== 彩色侧欢迎区 ===== */
  const zone = (
    title: string,
    desc: string,
    btn: string,
    visible: boolean,
    onSwitch: () => void
  ) => (
    <div className="relative h-full flex flex-col items-center justify-end pb-16 px-8 text-center">
      <AuthMathScene />
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ duration: 0.3, delay: visible ? 0.18 : 0 }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/80 leading-relaxed max-w-[220px]">{desc}</p>
        <button
          type="button"
          onClick={onSwitch}
          tabIndex={visible ? 0 : -1}
          className="mt-1 px-9 h-10 rounded-full border border-white/70 text-white text-sm font-semibold tracking-widest hover:bg-white/15 active:scale-95 transition-all"
        >
          {btn}
        </button>
      </motion.div>
    </div>
  );

  const isLogin = mode === 'login';

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn('w-full max-w-4xl', className)}>
        {/* ===== 桌面端：滑动双面板 ===== */}
        <div
          className="hidden md:block relative rounded-[28px] overflow-hidden shadow-[0_24px_80px_-24px_rgba(37,99,235,0.45)]"
          style={{
            minHeight: 620,
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 55%, #2563eb 100%)',
          }}
        >
          {/* 底层左右欢迎区（register 时白板在左 → 右侧可见；login 时白板在右 → 左侧可见） */}
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative">
              {zone('新来到这里？', '立即加入，与万千数学爱好者一起，开启你的欧拉数学之旅。', '去注册', isLogin, () => switchMode('register'))}
            </div>
            <div className="relative">
              {zone('欢迎回来', '登录继续你的数学之旅，今日挑战正等着你。', '去登录', !isLogin, () => switchMode('login'))}
            </div>
          </div>

          {/* 滑动白色表单面板（弧边领先） */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-white flex items-center justify-center py-10 z-10"
            initial={false}
            animate={{
              x: isLogin ? '100%' : '0%',
              borderTopLeftRadius: isLogin ? '120px 320px' : '0px 0px',
              borderBottomLeftRadius: isLogin ? '120px 320px' : '0px 0px',
              borderTopRightRadius: isLogin ? '0px 0px' : '120px 320px',
              borderBottomRightRadius: isLogin ? '0px 0px' : '120px 320px',
            }}
            transition={PANEL_SPRING}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                className="w-full"
                initial={{ opacity: 0, x: isLogin ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? -24 : 24 }}
                transition={{ duration: 0.22 }}
              >
                {isLogin ? loginForm : registerForm}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ===== 移动端：场景头 + 分段切换 ===== */}
        <div className="md:hidden rounded-3xl overflow-hidden shadow-[0_24px_60px_-24px_rgba(37,99,235,0.45)] bg-white">
          <div
            className="relative h-44"
            style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 55%, #2563eb 100%)' }}
          >
            <AuthMathScene />
            <div className="absolute inset-x-6 bottom-4 grid grid-cols-2 gap-1 p-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={cn(
                    'py-1.5 rounded-full text-sm font-medium transition-all',
                    mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-white/85'
                  )}
                >
                  {m === 'login' ? '登录' : '注册'}
                </button>
              ))}
            </div>
          </div>
          <div className="px-6 py-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {isLogin ? loginForm : registerForm}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default AuthSwitch;
