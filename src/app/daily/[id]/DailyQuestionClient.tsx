'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { getModuleById } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CheckCircle,
  XCircle,
  Upload,
  Send,
  ChevronLeft,
  Star,
  MessageCircle,
  Users,
  Calendar,
  Trophy,
  ThumbsUp,
  Lock,
  Globe,
} from 'lucide-react';
import { compressImage, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { AnswerRecord } from '@/types';
import { getUserById } from '@/lib/db';
import { MathRenderer } from '@/components/math/MathRenderer';

interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
}

interface DailyQuestionClientProps {
  questionId: string;
}

export default function DailyQuestionClient({ questionId }: DailyQuestionClientProps) {
  // 如果是 placeholder，从 URL 获取真实ID
  const [actualQuestionId, setActualQuestionId] = useState<string>(questionId);

  useEffect(() => {
    if (questionId === 'placeholder' && typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const realId = pathParts[pathParts.length - 1] || '';
      if (realId && realId !== 'placeholder') {
        setActualQuestionId(realId);
      }
    }
  }, [questionId]);

  const { isAuthenticated, user: currentUser } = useAuth();
  const {
    currentQuestion,
    currentAnswer,
    questionAnswers,
    isLoading,
    loadQuestionById,
    loadQuestionAnswers,
    checkAnsweredQuestion,
    submitHistoryAnswer,
    likeAnswer,
    unlikeAnswer,
    addComment,
  } = useDailyQuestion();

  const [answer, setAnswer] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    record?: AnswerRecord;
    feedback?: string;
  } | null>(null);
  const [userInfos, setUserInfos] = useState<Record<string, UserInfo>>({});
  const [commentText, setCommentText] = useState('');
  const [commentingAnswerId, setCommentingAnswerId] = useState<string | null>(null);

  useEffect(() => {
    if (actualQuestionId && actualQuestionId !== 'placeholder') {
      loadQuestionById(actualQuestionId).then(() => {
        checkAnsweredQuestion(actualQuestionId);
        loadQuestionAnswers(actualQuestionId);
      });
    }
  }, [actualQuestionId, loadQuestionById, checkAnsweredQuestion, loadQuestionAnswers]);

  // 加载答题用户的用户信息
  useEffect(() => {
    const loadUserInfos = async () => {
      const infos: Record<string, UserInfo> = {};
      for (const ans of questionAnswers) {
        if (!userInfos[ans.userId]) {
          const user = await getUserById(ans.userId);
          if (user) {
            infos[ans.userId] = {
              id: user.id,
              nickname: user.nickname,
              avatar: user.avatar,
            };
          }
        }
      }
      setUserInfos((prev) => ({ ...prev, ...infos }));
    };

    if (questionAnswers.length > 0) {
      loadUserInfos();
    }
  }, [questionAnswers]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (const file of Array.from(files).slice(0, 3)) {
      try {
        const compressed = await compressImage(file);
        newImages.push(compressed);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }
    setImages([...images, ...newImages].slice(0, 3));
  };

  const handleSubmit = async () => {
    if (!answer.trim() && images.length === 0) return;

    setSubmitting(true);
    const res = await submitHistoryAnswer(actualQuestionId, answer, images, isPublic);
    setResult(res);
    setSubmitting(false);
  };

  const handleLike = async (answerId: string) => {
    const ans = questionAnswers.find(a => a.id === answerId);
    if (!ans || !currentUser) return;

    const likedBy = ans.likedBy || [];
    if (likedBy.includes(currentUser.id)) {
      await unlikeAnswer(answerId);
    } else {
      await likeAnswer(answerId);
    }
  };

  const handleAddComment = async (answerId: string) => {
    if (!commentText.trim()) return;

    const success = await addComment(answerId, commentText);
    if (success) {
      setCommentText('');
      setCommentingAnswerId(null);
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < difficulty ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
        />
      ));
  };

  const module = currentQuestion ? getModuleById(currentQuestion.moduleId) : null;
  const isToday = currentQuestion?.date === new Date().toISOString().split('T')[0];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500">加载中... (ID: {actualQuestionId})</p>
          </div>
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">题目未找到 (ID: {actualQuestionId})</p>
            <Link href="/daily/">
              <Button>返回每日一题</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/daily/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            返回每日一题
          </Button>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              {isToday ? '今日题目' : '历史题目'}
            </h1>
            <p className="text-slate-500 mt-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(currentQuestion.date)}
              {!isToday && (
                <Badge variant="secondary" className="ml-2">历史题目</Badge>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Question */}
          <div className="space-y-6">
            {/* Question Card */}
            <Card className="p-6 academic-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {module && (
                    <Badge
                      className={`${
                        module.category === 'math'
                          ? 'tag-math'
                          : module.category === 'physics'
                            ? 'tag-physics'
                            : 'tag-cs'
                      }`}
                    >
                      {module.name}
                    </Badge>
                  )}
                  {currentQuestion.isAutoGenerated && (
                    <Badge variant="secondary">系统自动出题</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">{getDifficultyStars(currentQuestion.difficulty)}</div>
              </div>

              <h2 className="text-xl font-bold mb-4">{currentQuestion.title}</h2>

              <div className="prose prose-sm max-w-none mb-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <MathRenderer>{currentQuestion.content}</MathRenderer>
                </div>
              </div>

              {currentQuestion.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {currentQuestion.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`题目图片 ${idx + 1}`}
                      className="rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </Card>

            {/* Answer Section */}
            {currentAnswer || result?.success ? (
              <Card className="p-6 academic-card">
                <div className="text-center">
                  {currentAnswer?.isCorrect || result?.record?.isCorrect ? (
                    <>
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-green-600 mb-2">回答正确！</h3>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-10 h-10 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-orange-600 mb-2">继续加油！</h3>
                    </>
                  )}

                  <Alert className="mt-4 text-left">
                    <AlertDescription className="whitespace-pre-line">
                      {currentAnswer?.aiFeedback || result?.feedback || '感谢你的参与！'}
                    </AlertDescription>
                  </Alert>

                  {!isToday && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500">历史题目不获得经验值</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">参考答案：</h4>
                    <div className="bg-slate-50 rounded-lg p-4 text-left">
                      <MathRenderer>{currentQuestion.answer}</MathRenderer>
                    </div>
                  </div>
                </div>
              </Card>
            ) : !isAuthenticated ? (
              <Card className="p-6 academic-card text-center">
                <p className="text-slate-500 mb-4">登录后即可参与答题</p>
                <Link href="/login/">
                  <Button>立即登录</Button>
                </Link>
              </Card>
            ) : (
              <Card className="p-6 academic-card">
                <h3 className="text-lg font-bold mb-4">提交你的答案</h3>

                {!isToday && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      这是历史题目，提交后可以获得 AI 评价，但不会获得经验值。
                    </AlertDescription>
                  </Alert>
                )}

                <Textarea
                  placeholder="在这里输入你的答案..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="min-h-[120px] mb-4"
                />

                {/* Image Upload */}
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-2">上传图片答案（最多3张）</p>
                  <div className="flex flex-wrap gap-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img}
                          alt={`上传图片 ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => setImages(images.filter((_, i) => i !== idx))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <label className="w-20 h-20 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                        <Upload className="w-6 h-6 text-slate-400" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          multiple
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Privacy Toggle */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-lg">
                  <Checkbox
                    id="isPublic"
                    checked={isPublic}
                    onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                  />
                  <label htmlFor="isPublic" className="text-sm text-slate-600 flex items-center gap-2 cursor-pointer">
                    {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {isPublic ? '公开答案（其他用户可在讨论区看到）' : '私密答案（仅自己可见）'}
                  </label>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={submitting || (!answer.trim() && images.length === 0)}
                  className="w-full btn-primary"
                >
                  {submitting ? (
                    '提交中...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      提交答案
                    </>
                  )}
                </Button>
              </Card>
            )}
          </div>

          {/* Right Column - Discussion */}
          <div>
            <Card className="p-6 academic-card">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold">讨论区</h3>
                <Badge variant="secondary">{questionAnswers.length}</Badge>
              </div>

              {questionAnswers.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>暂无公开答案</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {questionAnswers.map((ans) => {
                    const userInfo = userInfos[ans.userId];
                    const isLiked = currentUser ? (ans.likedBy || []).includes(currentUser.id) : false;

                    return (
                      <div
                        key={ans.id}
                        className={`p-4 rounded-lg ${
                          ans.userId === currentUser?.id
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={userInfo?.avatar} />
                            <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-blue-700">
                              {userInfo?.nickname?.[0] || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {userInfo?.nickname || '未知用户'}
                              {ans.userId === currentUser?.id && (
                                <span className="text-blue-600 ml-1">（我）</span>
                              )}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(ans.submittedAt).toLocaleString('zh-CN')}
                            </p>
                          </div>
                          <Badge
                            variant={ans.isCorrect ? 'default' : 'secondary'}
                            className={ans.isCorrect ? 'bg-green-500' : ''}
                          >
                            {ans.isCorrect ? '正确' : '待改进'}
                          </Badge>
                        </div>

                        <div className="text-sm text-slate-700 mb-2">
                          <p className="line-clamp-3">{ans.content}</p>
                        </div>

                        {ans.images.length > 0 && (
                          <div className="flex gap-2 mb-2">
                            {ans.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`答案图片 ${idx + 1}`}
                                className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => window.open(img, '_blank')}
                              />
                            ))}
                          </div>
                        )}

                        <div className="text-xs text-slate-500 mb-3">
                          <span className="font-medium">AI 评价：</span>
                          <span className="line-clamp-2">{ans.aiFeedback}</span>
                        </div>

                        {/* Like & Comment Actions */}
                        <div className="flex items-center gap-4 pt-2 border-t border-slate-200">
                          <button
                            onClick={() => handleLike(ans.id)}
                            className={`flex items-center gap-1 text-sm transition-colors ${
                              isLiked ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span>{ans.likes}</span>
                          </button>
                          <button
                            onClick={() => setCommentingAnswerId(commentingAnswerId === ans.id ? null : ans.id)}
                            className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{(ans.comments || []).length}</span>
                          </button>
                        </div>

                        {/* Comments */}
                        {(ans.comments || []).length > 0 && (
                          <div className="mt-3 space-y-2 pl-4 border-l-2 border-slate-200">
                            {(ans.comments || []).map((comment) => (
                              <div key={comment.id} className="text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-slate-700">{comment.userNickname}</span>
                                  <span className="text-xs text-slate-400">
                                    {new Date(comment.createdAt).toLocaleString('zh-CN')}
                                  </span>
                                </div>
                                <p className="text-slate-600">{comment.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment */}
                        {commentingAnswerId === ans.id && (
                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="写下你的评论..."
                              className="flex-1 px-3 py-2 border rounded-lg text-sm"
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(ans.id)}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddComment(ans.id)}
                              disabled={!commentText.trim()}
                            >
                              发送
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
