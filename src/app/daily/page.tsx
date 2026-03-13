'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { KNOWLEDGE_MODULES, getModuleById } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CheckCircle,
  XCircle,
  Upload,
  Send,
  Star,
  Flame,
  MessageCircle,
  ThumbsUp,
  Lock,
  Globe,
  Calendar,
} from 'lucide-react';
import { compressImage } from '@/lib/utils';
import Link from 'next/link';
import { AnswerRecord, DailyQuestion } from '@/types';
import { initModuleData } from '@/lib/gamification';
import { getUserById, getDailyQuestionById } from '@/lib/db';
import { MathRenderer } from '@/components/math/MathRenderer';

interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
}

export default function DailyPage() {
  const { isAuthenticated, user: currentUser } = useAuth();
  const {
    todayQuestions,
    todayAnswers,
    questionAnswers,
    userAnswerHistory = [],
    historicalQuestions,
    selectedModule,
    loadTodayQuestions,
    loadQuestionAnswers,
    loadUserAnswerHistory,
    loadHistoricalQuestions,
    submitAnswer,
    likeAnswer,
    unlikeAnswer,
    addComment,
    deleteAnswer,
    isLoading,
  } = useDailyQuestion();

  const [activeTab, setActiveTab] = useState('today');
  const [selectedQuestion, setSelectedQuestion] = useState<DailyQuestion | null>(null);
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
  const [questionInfos, setQuestionInfos] = useState<Record<string, DailyQuestion>>({});
  const [commentText, setCommentText] = useState('');
  const [commentingAnswerId, setCommentingAnswerId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 加载今日题目
  useEffect(() => {
    loadTodayQuestions();
  }, [loadTodayQuestions]);

  // 加载用户历史答题记录
  useEffect(() => {
    if (isAuthenticated) {
      loadUserAnswerHistory();
    }
  }, [isAuthenticated, loadUserAnswerHistory]);

  // 当选择题目时加载讨论区数据
  useEffect(() => {
    if (selectedQuestion?.id) {
      loadQuestionAnswers(selectedQuestion.id);
    }
  }, [selectedQuestion?.id, loadQuestionAnswers]);

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

  // 加载答题记录对应的题目信息
  useEffect(() => {
    const loadQuestionInfos = async () => {
      const infos: Record<string, DailyQuestion> = {};
      for (const record of userAnswerHistory) {
        if (!questionInfos[record.questionId]) {
          const question = await getDailyQuestionById(record.questionId);
          if (question) {
            infos[record.questionId] = question;
          }
        }
      }
      setQuestionInfos((prev) => ({ ...prev, ...infos }));
    };

    if (userAnswerHistory.length > 0 && activeTab === 'my-records') {
      loadQuestionInfos();
    }
  }, [userAnswerHistory, activeTab]);

  // 检查某题是否已回答
  const isQuestionAnswered = (questionId: string) => {
    return todayAnswers.some(a => a.questionId === questionId);
  };

  // 获取某题的回答
  const getQuestionAnswer = (questionId: string) => {
    return todayAnswers.find(a => a.questionId === questionId);
  };

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
    if (!selectedQuestion || (!answer.trim() && images.length === 0)) return;

    setSubmitting(true);
    const res = await submitAnswer(selectedQuestion.id, answer, images, isPublic);
    setResult(res);
    setSubmitting(false);
  };

  const handleLike = async (answerId: string) => {
    const answer = questionAnswers.find(a => a.id === answerId);
    if (!answer || !currentUser) return;

    const likedBy = answer.likedBy || [];
    if (likedBy.includes(currentUser.id)) {
      await unlikeAnswer(answerId);
    } else {
      await likeAnswer(answerId);
    }
  };

  const handleDelete = async (answerId: string) => {
    if (!confirm('确定要删除这条答题记录吗？')) return;
    setDeletingId(answerId);
    const success = await deleteAnswer(answerId);
    if (success) {
      await loadUserAnswerHistory();
    }
    setDeletingId(null);
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

  const answeredCount = todayAnswers.length;
  const totalCount = todayQuestions.length;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6 text-white" />
              </div>
              每日一题
            </h1>
            <p className="text-slate-500 mt-2">
              今日进度: {answeredCount}/{totalCount} 已完成
              {answeredCount === totalCount && totalCount > 0 && (
                <span className="text-green-600 font-medium ml-2">🎉 全部完成！</span>
              )}
            </p>
          </div>

          {isAuthenticated && currentUser && (
            <div className="text-right">
              <p className="text-sm text-slate-500">当前用户</p>
              <p className="font-semibold text-slate-800">{currentUser.nickname}</p>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Flame className="w-4 h-4" />
              今日题目 ({answeredCount}/{totalCount})
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              历史题目
            </TabsTrigger>
            <TabsTrigger value="my-records" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              我的记录 ({userAnswerHistory.length})
            </TabsTrigger>
          </TabsList>

          {/* Today's Questions */}
          <TabsContent value="today">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-500">加载中...</p>
              </div>
            ) : todayQuestions.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Question List */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="font-semibold text-slate-700 mb-4">选择模块</h3>
                  {todayQuestions.map((question) => {
                    const module = getModuleById(question.moduleId);
                    const isAnswered = isQuestionAnswered(question.id);
                    const isSelected = selectedQuestion?.id === question.id;

                    return (
                      <Card
                        key={question.id}
                        className={`p-4 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-blue-500 bg-blue-50'
                            : 'hover:bg-slate-50'
                        }`}
                        onClick={() => {
                          setSelectedQuestion(question);
                          setResult(null);
                          setAnswer('');
                          setImages([]);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                            module?.color || 'bg-slate-500'
                          }`}>
                            {module?.icon || '📚'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{module?.name}</span>
                              {isAnswered && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {getDifficultyStars(question.difficulty)}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Right: Question Detail & Answer */}
                <div className="lg:col-span-2">
                  {selectedQuestion ? (
                    <div className="space-y-4">
                      {/* Question Card */}
                      <Card className="p-6 academic-card">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="tag-academic">
                            {getModuleById(selectedQuestion.moduleId)?.name}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getDifficultyStars(selectedQuestion.difficulty)}
                          </div>
                        </div>

                        <h2 className="text-xl font-bold mb-4">{selectedQuestion.title}</h2>

                        <div className="prose prose-sm max-w-none mb-4">
                          <div className="bg-slate-50 rounded-lg p-4 text-slate-700 border border-slate-100">
                            <MathRenderer>{selectedQuestion.content}</MathRenderer>
                          </div>
                        </div>

                        {selectedQuestion.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {selectedQuestion.images.map((img, idx) => (
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

                      {/* Answer Section - 始终显示提交表单，允许重复答题 */}
                      {!isAuthenticated ? (
                        <Card className="p-6 academic-card text-center">
                          <p className="text-slate-500 mb-4">登录后即可参与每日一题挑战</p>
                          <Link href="/login/">
                            <Button>立即登录</Button>
                          </Link>
                        </Card>
                      ) : (
                        <>
                          {/* 提交表单 */}
                          <Card className="p-6 academic-card">
                            <h3 className="text-lg font-bold mb-4">提交你的答案</h3>

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

                            {result && !result.success && (
                              <Alert className="mt-4" variant="destructive">
                                <AlertDescription>{result.feedback}</AlertDescription>
                              </Alert>
                            )}
                          </Card>

                          {/* 上次答题结果（如果有） */}
                          {result?.success && (
                            <Card className="p-6 academic-card mt-4">
                              <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">上次答题结果</p>
                                {result.record?.isCorrect ? (
                                  <>
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                      <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-green-600 mb-2">回答正确！</h3>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                      <XCircle className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-orange-600 mb-2">继续加油！</h3>
                                  </>
                                )}

                                <Alert className="mt-4 text-left">
                                  <AlertDescription className="whitespace-pre-line">
                                    {result.feedback || '感谢你的参与！'}
                                  </AlertDescription>
                                </Alert>

                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                  <p className="text-sm text-blue-600">
                                    获得经验值: +{result.record?.experienceGained} EXP
                                  </p>
                                </div>

                                <div className="mt-6">
                                  <h4 className="font-medium mb-2">参考答案：</h4>
                                  <div className="bg-slate-50 rounded-lg p-4 text-left">
                                    <MathRenderer>{selectedQuestion.answer}</MathRenderer>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          )}
                        </>
                      )}

                      {/* Discussion Area - 始终显示 */}
                      {isAuthenticated && (
                        <Card className="p-6 academic-card">
                          <div className="flex items-center gap-2 mb-4">
                            <MessageCircle className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold">讨论区</h3>
                            <Badge variant="secondary">{questionAnswers.length}</Badge>
                          </div>

                          {questionAnswers.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                              <p>暂无公开答案，来抢沙发吧！</p>
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
                      )}
                    </div>
                  ) : (
                    <Card className="p-8 text-center text-slate-500">
                      <p>请从左侧选择一个模块开始答题</p>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">暂无今日题目</p>
              </div>
            )}
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <HistoryTab />
          </TabsContent>

          {/* My Records */}
          <TabsContent value="my-records">
            {userAnswerHistory.length === 0 ? (
              <Card className="p-8 text-center text-slate-500">
                <p>暂无答题记录，快去答题吧！</p>
              </Card>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 mb-4">
                  共 {userAnswerHistory.length} 条答题记录
                </h3>
                {userAnswerHistory.map((record) => {
                  const question = questionInfos[record.questionId];
                  const module = question ? getModuleById(question.moduleId) : null;

                  return (
                    <Card key={record.id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* 题目信息 */}
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              {module && (
                                <Badge className={module.color}>
                                  {module.name}
                                </Badge>
                              )}
                              <Badge
                                variant={record.isCorrect ? 'default' : 'secondary'}
                                className={record.isCorrect ? 'bg-green-500' : ''}
                              >
                                {record.isCorrect ? '正确' : '待改进'}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-slate-800 truncate">
                              {question?.title || '加载中...'}
                            </h4>
                            {question && (
                              <div className="text-sm text-slate-500 line-clamp-2 mt-1">
                                <MathRenderer>{question.content.slice(0, 150)}</MathRenderer>
                              </div>
                            )}
                          </div>

                          {/* 答题信息 */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-sm text-slate-500">
                              {new Date(record.submittedAt).toLocaleString('zh-CN')}
                            </span>
                            {record.isPublic ? (
                              <Badge variant="outline" className="text-blue-600 text-xs">
                                <Globe className="w-3 h-3 mr-1" />
                                公开
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-slate-500 text-xs">
                                <Lock className="w-3 h-3 mr-1" />
                                私密
                              </Badge>
                            )}
                          </div>

                          {/* 用户答案 */}
                          <div className="bg-slate-50 rounded p-3 mb-3">
                            <p className="text-sm text-slate-600 line-clamp-3">
                              <span className="font-medium">我的答案: </span>
                              {record.content}
                            </p>
                          </div>

                          {/* 统计信息 */}
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>得分: {record.aiScore}/100</span>
                            <span>获得 {record.experienceGained} EXP</span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {record.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {(record.comments || []).length}
                            </span>
                          </div>

                          {record.aiFeedback && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-slate-600">
                              <span className="font-medium">AI 评价: </span>
                              {record.aiFeedback}
                            </div>
                          )}
                        </div>

                        {/* 删除按钮 */}
                        <button
                          onClick={() => handleDelete(record.id)}
                          disabled={deletingId === record.id}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="删除记录"
                        >
                          {deletingId === record.id ? (
                            <span className="text-xs">删除中...</span>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// 历史题目标签页组件
function HistoryTab() {
  const { historicalQuestions, isLoading, loadHistoricalQuestions } = useDailyQuestion();
  const [selectedModule, setSelectedModule] = useState<string>('all');

  useEffect(() => {
    loadHistoricalQuestions(selectedModule === 'all' ? undefined : selectedModule);
  }, [selectedModule, loadHistoricalQuestions]);

  // 按日期分组
  const groupedByDate = historicalQuestions.reduce((acc, q) => {
    if (!acc[q.date]) {
      acc[q.date] = [];
    }
    acc[q.date].push(q);
    return acc;
  }, {} as Record<string, typeof historicalQuestions>);

  // 排序日期（最新的在前）
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      {/* 模块筛选 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedModule('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedModule === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          全部模块
        </button>
        {KNOWLEDGE_MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModule(m.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedModule === m.id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{m.icon}</span>
            {m.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500">加载中...</p>
        </div>
      ) : sortedDates.length === 0 ? (
        <Card className="p-8 text-center text-slate-500">
          <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>暂无历史题目</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => (
            <div key={date}>
              <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                {new Date(date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedByDate[date].map((question) => {
                  const module = getModuleById(question.moduleId);
                  return (
                    <a
                      key={question.id}
                      href={`/daily/${question.id}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/daily/${question.id}/`;
                      }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                            module?.color || 'bg-slate-500'
                          }`}>
                            {module?.icon || '📚'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-800 truncate mb-1">
                              {question.title}
                            </h4>
                            <div className="text-sm text-slate-500 line-clamp-2">
                              <MathRenderer>{question.content.slice(0, 100) + '...'}</MathRenderer>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {module?.name}
                              </Badge>
                              <span className="text-xs text-slate-400">
                                难度: {'★'.repeat(question.difficulty)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
