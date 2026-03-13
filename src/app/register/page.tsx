'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createUser, getUserByNickname } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Eye, EyeOff, Loader2, Upload } from 'lucide-react';
import { generateId, compressImage } from '@/lib/utils';
import { User } from '@/types';
import { initModuleData, getPrimaryTitle, getPrimaryFrame } from '@/lib/gamification';

const DEFAULT_AVATARS = [
  '👨‍🎓', '👩‍🎓', '🧑‍🎓', '👨‍💻', '👩‍💻', '🧑‍💻',
  '👨‍🔬', '👩‍🔬', '🧑‍🔬', '🤓', '🦉', '🚀'
];

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, init } = useAuth();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 200);
      setCustomAvatar(compressed);
    } catch (err) {
      setError('图片上传失败，请重试');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!nickname.trim() || !password.trim()) {
      setError('请输入昵称和密码');
      return;
    }

    if (nickname.length < 2 || nickname.length > 20) {
      setError('昵称长度需在2-20个字符之间');
      return;
    }

    if (password.length < 4) {
      setError('密码长度至少为4位');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setIsLoading(true);

    try {
      // Check if nickname exists
      const existingUser = await getUserByNickname(nickname);
      if (existingUser) {
        setError('该昵称已被使用');
        setIsLoading(false);
        return;
      }

      // Create new user with module data
      const moduleData = initModuleData();
      const newUser: User = {
        id: generateId(),
        nickname: nickname.trim(),
        passwordHash: password,
        avatar: customAvatar || selectedAvatar,
        moduleData,
        // 保留旧字段用于兼容
        level: 1,
        experience: 0,
        title: getPrimaryTitle(moduleData).title,
        frame: getPrimaryFrame(moduleData),
        isAdmin: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      await createUser(newUser);

      // Redirect to login
      router.push('/login/');
    } catch (err) {
      setError('注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const finalAvatar = customAvatar || selectedAvatar;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <Card className="w-full max-w-md p-8 cartoon-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            创建账号
          </h1>
          <p className="text-gray-500 mt-2">开启你的欧拉登基之路</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Selection */}
          <div className="space-y-2">
            <Label>选择头像</Label>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={finalAvatar} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-400 to-pink-400">
                  {finalAvatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-wrap justify-center gap-2">
                {DEFAULT_AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(emoji);
                      setCustomAvatar('');
                    }}
                    className={`w-10 h-10 rounded-lg text-xl transition-all ${
                      !customAvatar && selectedAvatar === emoji
                        ? 'bg-purple-100 ring-2 ring-purple-500'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="avatar-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  上传自定义头像
                </Label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">昵称</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="请输入昵称（2-20个字符）"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="cartoon-input"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="至少4位密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cartoon-input pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认密码</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="cartoon-input"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cartoon-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                注册中...
              </>
            ) : (
              '创建账号'
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            已有账号？{' '}
            <Link href="/login/" className="text-purple-600 hover:underline font-medium">
              立即登录
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
