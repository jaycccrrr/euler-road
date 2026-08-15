import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyQuestion, AnswerRecord, AnswerComment, DiscussionMessage, DiscussionReply } from '@/types';
import {
  getDailyQuestionByDate,
  getDailyQuestionById,
  createDailyQuestion,
  createAnswerRecord,
  getAnswerRecordByUserAndQuestion,
  getAnswerRecordsByUserAndQuestionAll,
  getAnswerRecordsByQuestion,
  getAllDailyQuestions,
  updateAnswerRecord,
  getAnswerRecordsByUser,
  deleteAnswerRecord,
  createDiscussionMessage,
  getDiscussionMessagesByQuestion,
  deleteDiscussionMessage,
  updateDiscussionMessage,
} from '@/lib/db';
import { generateId, formatLocalDate } from '@/lib/utils';
import { gradeAnswerDual } from '@/lib/dual-grader';
import { generateDailyQuestions, getQuestionDateString, getDailyQuestionByIdFallback } from '@/lib/ai-question-generator';
import { getDailyQuestionsByDate } from '@/lib/daily-question-bank';
import { calculateAnswerExp } from '@/lib/gamification';
import { useAuth } from './useAuth';
import { KNOWLEDGE_MODULES } from '@/data/modules';

interface DailyQuestionState {
  todayQuestions: DailyQuestion[]; // 改为数组，存储6道题目
  allQuestions: DailyQuestion[];
  todayAnswers: AnswerRecord[]; // 改为数组，存储今日所有答案
  currentQuestion: DailyQuestion | null;
  currentAnswer: AnswerRecord | null;
  questionAnswers: AnswerRecord[];
  isLoading: boolean;
  error: string | null;
  selectedModule: string | null; // 当前选中的模块
  userAnswerHistory: AnswerRecord[]; // 用户历史答题记录
  questionMyRecords: AnswerRecord[]; // 当前题目下我的全部提交记录（按时间倒序）
  myRecordsQuestionId: string | null; // questionMyRecords 对应的题目ID

  // 讨论区消息（用户主动发送，可引用题目 / 自己的解答）
  discussionMessages: DiscussionMessage[];
  discussionQuestionId: string | null; // discussionMessages 对应的题目ID
  loadDiscussionMessages: (questionId: string) => Promise<void>;
  postDiscussionMessage: (
    questionId: string,
    content: string,
    refs?: { refQuestionId?: string; refAnswerId?: string }
  ) => Promise<boolean>;
  removeDiscussionMessage: (messageId: string) => Promise<boolean>;
  toggleDiscussionMessageLike: (messageId: string) => Promise<boolean>;
  replyDiscussionMessage: (messageId: string, content: string, replyToNickname?: string) => Promise<boolean>;
  toggleDiscussionReplyLike: (messageId: string, replyId: string) => Promise<boolean>;

  // 历史题目
  historicalQuestions: DailyQuestion[];
  loadHistoricalQuestions: (moduleId?: string) => Promise<void>;

  // Actions
  loadTodayQuestions: () => Promise<void>;
  loadAllQuestions: () => Promise<void>;
  loadQuestionById: (id: string) => Promise<DailyQuestion | null>;
  loadQuestionAnswers: (questionId: string) => Promise<void>;
  loadUserAnswerHistory: () => Promise<void>; // 加载用户历史记录
  submitAnswer: (questionId: string, content: string, images: string[], isPublic: boolean) => Promise<{
    success: boolean;
    record?: AnswerRecord;
    feedback?: string;
  }>;
  submitHistoryAnswer: (questionId: string, content: string, images: string[], isPublic: boolean) => Promise<{
    success: boolean;
    record?: AnswerRecord;
    feedback?: string;
  }>;
  checkAnsweredToday: () => Promise<boolean>;
  checkAnsweredQuestion: (questionId: string) => Promise<boolean>;
  generateQuestionsIfNeeded: () => Promise<void>;
  setSelectedModule: (moduleId: string | null) => void;
  // 点赞和评论
  likeAnswer: (answerId: string) => Promise<boolean>;
  unlikeAnswer: (answerId: string) => Promise<boolean>;
  addComment: (answerId: string, content: string) => Promise<boolean>;
  // 删除答题记录
  deleteAnswer: (answerId: string) => Promise<boolean>;
  // 我的提交记录（按题目）
  loadMyRecordsForQuestion: (questionId: string) => Promise<void>;
  saveAnswerNote: (answerId: string, note: string) => Promise<boolean>;
  // 公开/取消公开答案（讨论区可见性）
  setAnswerPublic: (answerId: string, isPublic: boolean) => Promise<boolean>;
  // 退出登录时清除用户相关数据
  clearUserSession: () => void;
}

export const useDailyQuestion = create<DailyQuestionState>()(
  persist(
    (set, get) => ({
      todayQuestions: [],
      allQuestions: [],
      todayAnswers: [],
      currentQuestion: null,
      currentAnswer: null,
      questionAnswers: [],
      isLoading: false,
      error: null,
      selectedModule: null,
      userAnswerHistory: [],
      questionMyRecords: [],
      myRecordsQuestionId: null,
      discussionMessages: [],
      discussionQuestionId: null,
      historicalQuestions: [],

      loadTodayQuestions: async () => {
        set({ isLoading: true });
        try {
          // 使用新的日期逻辑（以早上5点为分界）
          const today = getQuestionDateString();
          const questions: DailyQuestion[] = [];
          const answers: AnswerRecord[] = [];

          // 三个核心模块，按需生成今天的题目（使用稳定ID，不再删除重建）
          const targetModules = ['highschool-math', 'advanced-math', 'linear-algebra'];

          for (const moduleId of targetModules) {
            let question = await getDailyQuestionByDate(today, moduleId);

            if (!question) {
              // 该模块今天没有题目，从题库生成并保存
              const generated = await generateDailyQuestions(today);
              const moduleQuestion = generated.find(q => q.moduleId === moduleId);
              if (moduleQuestion) {
                await createDailyQuestion(moduleQuestion);
                question = moduleQuestion;
              }
            }

            if (question) {
              questions.push(question);
            }
          }

          // 检查用户是否已回答此题
          const user = useAuth.getState().user;
          if (user) {
            for (const question of questions) {
              const record = await getAnswerRecordByUserAndQuestion(user.id, question.id);
              if (record) {
                answers.push(record);
              }
            }
          }

          set({ todayQuestions: questions, todayAnswers: answers, isLoading: false });
        } catch (error) {
          console.error('[Daily Question] Failed to load questions:', error);
          set({ error: '加载题目失败', isLoading: false });
        }
      },

      loadAllQuestions: async () => {
        try {
          const questions = await getAllDailyQuestions();
          set({ allQuestions: questions.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )});
        } catch (error) {
          console.error('Failed to load questions:', error);
        }
      },

      loadQuestionById: async (id: string) => {
        set({ isLoading: true });
        try {
          let question = await getDailyQuestionById(id);

          // 如果 IndexedDB 中没有，从备用题库生成（稳定ID支持）
          if (!question) {
            question = await getDailyQuestionByIdFallback(id);
          }

          set({ currentQuestion: question || null, isLoading: false });
          return question || null;
        } catch (error) {
          set({ error: '加载题目失败', isLoading: false });
          return null;
        }
      },

      loadQuestionAnswers: async (questionId: string) => {
        try {
          const records = await getAnswerRecordsByQuestion(questionId);
          // 只显示公开且已回答的记录
          const publicRecords = records.filter(r => r.isPublic);
          set({ questionAnswers: publicRecords.sort((a, b) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          )});
        } catch (error) {
          console.error('Failed to load answers:', error);
        }
      },

      loadUserAnswerHistory: async () => {
        const user = useAuth.getState().user;
        if (!user) return;

        try {
          const records = await getAnswerRecordsByUser(user.id);
          // 按时间倒序排列
          set({ userAnswerHistory: records.sort((a, b) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          )});
        } catch (error) {
          console.error('Failed to load user answer history:', error);
        }
      },

      // 加载历史题目（从网站上线日 2026-03-14 开始，逐日生成到今天）
      loadHistoricalQuestions: async (moduleId?: string) => {
        set({ isLoading: true });
        try {
          const questions: DailyQuestion[] = [];

          // 网站上线日
          const launchDate = new Date('2026-03-14T00:00:00');
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // 从上线日到今天，逐日生成
          const current = new Date(launchDate);
          while (current <= today) {
            const dateStr = formatLocalDate(current);

            const dailyQuestions = getDailyQuestionsByDate(dateStr);
            for (const q of dailyQuestions) {
              if (moduleId && q.moduleId !== moduleId) continue;

              questions.push({
                id: `daily-${dateStr}-${q.moduleId}`,
                moduleId: q.moduleId,
                date: dateStr,
                title: q.title,
                content: q.content,
                images: [],
                answer: q.answer,
                answerImages: [],
                difficulty: q.difficulty,
                isAutoGenerated: true,
                createdAt: current.toISOString(),
              });
            }

            current.setDate(current.getDate() + 1);
          }

          // 按日期倒序排列
          questions.sort((a, b) => b.date.localeCompare(a.date));

          set({ historicalQuestions: questions, isLoading: false });
        } catch (error) {
          console.error('Failed to load historical questions:', error);
          set({ error: '加载历史题目失败', isLoading: false });
        }
      },

      submitAnswer: async (questionId: string, content: string, images: string[], isPublic: boolean) => {
        const { todayQuestions } = get();
        const user = useAuth.getState().user;
        const question = todayQuestions.find(q => q.id === questionId);

        if (!question || !user) {
          return { success: false, feedback: '无法提交答案' };
        }

        set({ isLoading: true });

        try {
          // Grade the answer（双通道：本地算法 + 低置信度时 AI 二次批改）
          const grading = await gradeAnswerDual(question, content, images);

          // Calculate experience
          const expGained = calculateAnswerExp(grading.score);

          // Create answer record
          const record: AnswerRecord = {
            id: generateId(),
            userId: user.id,
            questionId: questionId,
            content,
            images,
            submittedAt: new Date().toISOString(),
            aiScore: grading.score,
            aiFeedback: grading.feedback,
            isCorrect: grading.isCorrect,
            experienceGained: expGained,
            isPublic,
            likes: 0,
            likedBy: [],
            comments: [],
            gradingMeta: grading.meta,
          };

          await createAnswerRecord(record);

          // Update module experience
          const moduleCategory = 'math' as const;

          await useAuth.getState().addModuleExp(moduleCategory, expGained);

          // Update todayAnswers - 替换已存在的记录而不是添加
          const { todayAnswers, userAnswerHistory } = get();
          const existingTodayIndex = todayAnswers.findIndex(a => a.questionId === questionId);
          const newTodayAnswers = [...todayAnswers];
          if (existingTodayIndex >= 0) {
            newTodayAnswers[existingTodayIndex] = record;
          } else {
            newTodayAnswers.push(record);
          }

          // Update userAnswerHistory - 替换已存在的记录
          const existingHistoryIndex = userAnswerHistory.findIndex(a => a.questionId === questionId);
          const newUserAnswerHistory = [...userAnswerHistory];
          if (existingHistoryIndex >= 0) {
            newUserAnswerHistory[existingHistoryIndex] = record;
          } else {
            newUserAnswerHistory.unshift(record);
          }

          set({
            todayAnswers: newTodayAnswers,
            userAnswerHistory: newUserAnswerHistory,
            // 若正在查看该题的提交记录，同步插入新纪录
            questionMyRecords: get().myRecordsQuestionId === questionId
              ? [record, ...get().questionMyRecords]
              : get().questionMyRecords,
            isLoading: false
          });

          return {
            success: true,
            record,
            feedback: `${grading.feedback}\n获得 ${expGained} 经验值！`,
          };
        } catch (error) {
          set({ error: '提交失败', isLoading: false });
          return { success: false, feedback: '提交失败，请重试' };
        }
      },

      // 提交历史题目答案（不给经验值）
      submitHistoryAnswer: async (questionId: string, content: string, images: string[], isPublic: boolean) => {
        const user = useAuth.getState().user;
        const { currentQuestion } = get();

        if (!currentQuestion || !user) {
          return { success: false, feedback: '无法提交答案' };
        }

        set({ isLoading: true });

        try {
          // Grade the answer（双通道：本地算法 + 低置信度时 AI 二次批改）
          const grading = await gradeAnswerDual(currentQuestion, content, images);

          // Create answer record
          const record: AnswerRecord = {
            id: generateId(),
            userId: user.id,
            questionId: questionId,
            content,
            images,
            submittedAt: new Date().toISOString(),
            aiScore: grading.score,
            aiFeedback: grading.feedback,
            isCorrect: grading.isCorrect,
            experienceGained: 0,
            isPublic,
            likes: 0,
            likedBy: [],
            comments: [],
            gradingMeta: grading.meta,
          };

          await createAnswerRecord(record);

          // Reload answers
          await get().loadQuestionAnswers(questionId);

          set({
            currentAnswer: record,
            questionMyRecords: get().myRecordsQuestionId === questionId
              ? [record, ...get().questionMyRecords]
              : get().questionMyRecords,
            isLoading: false,
          });

          return {
            success: true,
            record,
            feedback: `${grading.feedback}\n（历史题目不获得经验值）`,
          };
        } catch (error) {
          set({ error: '提交失败', isLoading: false });
          return { success: false, feedback: '提交失败，请重试' };
        }
      },

      checkAnsweredToday: async () => {
        const user = useAuth.getState().user;
        const { todayQuestions } = get();

        if (!user || todayQuestions.length === 0) return false;

        const answers: AnswerRecord[] = [];
        for (const question of todayQuestions) {
          const record = await getAnswerRecordByUserAndQuestion(user.id, question.id);
          if (record) {
            answers.push(record);
          }
        }

        set({ todayAnswers: answers });
        return answers.length > 0;
      },

      checkAnsweredQuestion: async (questionId: string) => {
        const user = useAuth.getState().user;

        if (!user) return false;

        const record = await getAnswerRecordByUserAndQuestion(user.id, questionId);
        if (record) {
          set({ currentAnswer: record });
          return true;
        }
        return false;
      },

      generateQuestionsIfNeeded: async () => {
        const today = getQuestionDateString();
        const questions: DailyQuestion[] = [];

        // 只生成三个核心模块的题目
        const targetModules = ['highschool-math', 'advanced-math', 'linear-algebra'];

        for (const moduleId of targetModules) {
          let question = await getDailyQuestionByDate(today, moduleId);

          if (!question) {
            // 使用AI生成新题目
            const generated = await generateDailyQuestions(today);
            const moduleQuestion = generated.find(q => q.moduleId === moduleId);
            if (moduleQuestion) {
              await createDailyQuestion(moduleQuestion);
              question = moduleQuestion;
            }
          }

          if (question) {
            questions.push(question);
          }
        }

        set({ todayQuestions: questions });
      },

      setSelectedModule: (moduleId: string | null) => {
        set({ selectedModule: moduleId });
      },

      // 点赞功能
      likeAnswer: async (answerId: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const { questionAnswers } = get();
          const answer = questionAnswers.find(a => a.id === answerId);

          if (!answer || answer.likedBy.includes(user.id)) {
            return false;
          }

          const updatedAnswer = {
            ...answer,
            likes: answer.likes + 1,
            likedBy: [...answer.likedBy, user.id],
          };

          await updateAnswerRecord(updatedAnswer);

          set({
            questionAnswers: questionAnswers.map(a =>
              a.id === answerId ? updatedAnswer : a
            ),
          });

          return true;
        } catch (error) {
          console.error('Failed to like answer:', error);
          return false;
        }
      },

      // 取消点赞
      unlikeAnswer: async (answerId: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const { questionAnswers } = get();
          const answer = questionAnswers.find(a => a.id === answerId);

          if (!answer || !answer.likedBy.includes(user.id)) {
            return false;
          }

          const updatedAnswer = {
            ...answer,
            likes: answer.likes - 1,
            likedBy: answer.likedBy.filter(id => id !== user.id),
          };

          await updateAnswerRecord(updatedAnswer);

          set({
            questionAnswers: questionAnswers.map(a =>
              a.id === answerId ? updatedAnswer : a
            ),
          });

          return true;
        } catch (error) {
          console.error('Failed to unlike answer:', error);
          return false;
        }
      },

      // 添加评论
      addComment: async (answerId: string, content: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const { questionAnswers } = get();
          const answer = questionAnswers.find(a => a.id === answerId);

          if (!answer) return false;

          const comment: AnswerComment = {
            id: generateId(),
            answerId,
            userId: user.id,
            userNickname: user.nickname,
            userAvatar: user.avatar,
            content,
            createdAt: new Date().toISOString(),
          };

          const updatedAnswer = {
            ...answer,
            comments: [...answer.comments, comment],
          };

          await updateAnswerRecord(updatedAnswer);

          set({
            questionAnswers: questionAnswers.map(a =>
              a.id === answerId ? updatedAnswer : a
            ),
          });

          return true;
        } catch (error) {
          console.error('Failed to add comment:', error);
          return false;
        }
      },

      // 删除答题记录
      deleteAnswer: async (answerId: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const { userAnswerHistory, todayAnswers, questionAnswers, questionMyRecords } = get();
          const record =
            userAnswerHistory.find(a => a.id === answerId) ||
            questionMyRecords.find(a => a.id === answerId);

          if (!record || record.userId !== user.id) {
            return false;
          }

          await deleteAnswerRecord(answerId);

          set({
            userAnswerHistory: userAnswerHistory.filter(a => a.id !== answerId),
            todayAnswers: todayAnswers.filter(a => a.id !== answerId),
            questionAnswers: questionAnswers.filter(a => a.id !== answerId),
            questionMyRecords: questionMyRecords.filter(a => a.id !== answerId),
          });

          return true;
        } catch (error) {
          console.error('Failed to delete answer:', error);
          return false;
        }
      },

      // ===== 讨论区消息 =====

      loadDiscussionMessages: async (questionId: string) => {
        try {
          const messages = await getDiscussionMessagesByQuestion(questionId);
          set({ discussionMessages: messages, discussionQuestionId: questionId });
        } catch (error) {
          console.error('Failed to load discussion messages:', error);
        }
      },

      postDiscussionMessage: async (questionId, content, refs) => {
        const user = useAuth.getState().user;
        if (!user || !content.trim()) return false;

        try {
          const message: DiscussionMessage = {
            id: generateId(),
            questionId,
            userId: user.id,
            content: content.trim(),
            likes: 0,
            likedBy: [],
            replies: [],
            createdAt: new Date().toISOString(),
          };

          // 引用题目：快照标题/模块/日期（题库未持久化的日期用 fallback 重建）
          if (refs?.refQuestionId) {
            const q =
              (await getDailyQuestionById(refs.refQuestionId)) ||
              (await getDailyQuestionByIdFallback(refs.refQuestionId));
            if (q) {
              message.refQuestionId = q.id;
              message.refQuestionTitle = q.title;
              message.refQuestionModuleId = q.moduleId;
              message.refQuestionDate = q.id.match(/^daily-(\d{4}-\d{2}-\d{2})-/)?.[1] || q.date;
            }
          }

          // 引用自己的解答：快照摘要/得分（发布时截取，私密答案原文不随消息扩散）
          if (refs?.refAnswerId) {
            const mine = await getAnswerRecordsByUser(user.id);
            const record = mine.find((r) => r.id === refs.refAnswerId);
            if (record) {
              message.refAnswerId = record.id;
              message.refAnswerExcerpt = record.content.replace(/\$+/g, '').slice(0, 80);
              message.refAnswerScore = record.aiScore;
              message.refAnswerIsCorrect = record.isCorrect;
            }
          }

          await createDiscussionMessage(message);
          const { discussionMessages, discussionQuestionId } = get();
          if (discussionQuestionId === questionId) {
            set({ discussionMessages: [message, ...discussionMessages] });
          }
          return true;
        } catch (error) {
          console.error('Failed to post discussion message:', error);
          return false;
        }
      },

      removeDiscussionMessage: async (messageId: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const target = get().discussionMessages.find((m) => m.id === messageId);
          if (!target || target.userId !== user.id) return false;
          await deleteDiscussionMessage(messageId);
          set({ discussionMessages: get().discussionMessages.filter((m) => m.id !== messageId) });
          return true;
        } catch (error) {
          console.error('Failed to delete discussion message:', error);
          return false;
        }
      },

      toggleDiscussionMessageLike: async (messageId: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const target = get().discussionMessages.find((m) => m.id === messageId);
          if (!target) return false;
          const likedBy = target.likedBy || [];
          const hasLiked = likedBy.includes(user.id);
          const updated: DiscussionMessage = {
            ...target,
            likedBy: hasLiked ? likedBy.filter((id) => id !== user.id) : [...likedBy, user.id],
            likes: (target.likes ?? likedBy.length) + (hasLiked ? -1 : 1),
          };
          await updateDiscussionMessage(updated);
          set({
            discussionMessages: get().discussionMessages.map((m) => (m.id === messageId ? updated : m)),
          });
          return true;
        } catch (error) {
          console.error('Failed to like discussion message:', error);
          return false;
        }
      },

      replyDiscussionMessage: async (messageId: string, content: string, replyToNickname?: string) => {
        const user = useAuth.getState().user;
        if (!user || !content.trim()) return false;

        try {
          const target = get().discussionMessages.find((m) => m.id === messageId);
          if (!target) return false;
          const reply: DiscussionReply = {
            id: generateId(),
            userId: user.id,
            userNickname: user.nickname,
            userAvatar: user.avatar,
            content: content.trim(),
            replyToNickname,
            likes: 0,
            likedBy: [],
            createdAt: new Date().toISOString(),
          };
          const updated: DiscussionMessage = {
            ...target,
            replies: [...(target.replies || []), reply],
          };
          await updateDiscussionMessage(updated);
          set({
            discussionMessages: get().discussionMessages.map((m) => (m.id === messageId ? updated : m)),
          });
          return true;
        } catch (error) {
          console.error('Failed to reply discussion message:', error);
          return false;
        }
      },

      toggleDiscussionReplyLike: async (messageId: string, replyId: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const target = get().discussionMessages.find((m) => m.id === messageId);
          if (!target) return false;
          const updated: DiscussionMessage = {
            ...target,
            replies: (target.replies || []).map((r) => {
              if (r.id !== replyId) return r;
              const likedBy = r.likedBy || [];
              const hasLiked = likedBy.includes(user.id);
              return {
                ...r,
                likedBy: hasLiked ? likedBy.filter((id) => id !== user.id) : [...likedBy, user.id],
                likes: (r.likes ?? likedBy.length) + (hasLiked ? -1 : 1),
              };
            }),
          };
          await updateDiscussionMessage(updated);
          set({
            discussionMessages: get().discussionMessages.map((m) => (m.id === messageId ? updated : m)),
          });
          return true;
        } catch (error) {
          console.error('Failed to like discussion reply:', error);
          return false;
        }
      },

      // 加载我在某题下的全部提交记录（按时间倒序）
      loadMyRecordsForQuestion: async (questionId: string) => {
        const user = useAuth.getState().user;
        if (!user) {
          set({ questionMyRecords: [], myRecordsQuestionId: null });
          return;
        }

        try {
          const records = await getAnswerRecordsByUserAndQuestionAll(user.id, questionId);
          set({ questionMyRecords: records, myRecordsQuestionId: questionId });
        } catch (error) {
          console.error('Failed to load my records for question:', error);
        }
      },

      // 保存/更新某条提交记录的备注
      saveAnswerNote: async (answerId: string, note: string) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const { questionMyRecords, userAnswerHistory, todayAnswers, currentAnswer } = get();
          const record =
            questionMyRecords.find(a => a.id === answerId) ||
            userAnswerHistory.find(a => a.id === answerId);

          if (!record || record.userId !== user.id) return false;

          const updated = { ...record, note: note.trim() || undefined };
          await updateAnswerRecord(updated);

          set({
            questionMyRecords: questionMyRecords.map(a => a.id === answerId ? updated : a),
            userAnswerHistory: userAnswerHistory.map(a => a.id === answerId ? updated : a),
            todayAnswers: todayAnswers.map(a => a.id === answerId ? updated : a),
            currentAnswer: currentAnswer?.id === answerId ? updated : currentAnswer,
          });

          return true;
        } catch (error) {
          console.error('Failed to save answer note:', error);
          return false;
        }
      },

      // 公开/取消公开答案（控制讨论区可见性）
      setAnswerPublic: async (answerId: string, isPublic: boolean) => {
        const user = useAuth.getState().user;
        if (!user) return false;

        try {
          const { questionMyRecords, userAnswerHistory, todayAnswers, questionAnswers, currentAnswer } = get();
          const record =
            questionMyRecords.find(a => a.id === answerId) ||
            userAnswerHistory.find(a => a.id === answerId);

          if (!record || record.userId !== user.id) return false;

          const updated = { ...record, isPublic };
          await updateAnswerRecord(updated);

          set({
            questionMyRecords: questionMyRecords.map(a => a.id === answerId ? updated : a),
            userAnswerHistory: userAnswerHistory.map(a => a.id === answerId ? updated : a),
            todayAnswers: todayAnswers.map(a => a.id === answerId ? updated : a),
            currentAnswer: currentAnswer?.id === answerId ? updated : currentAnswer,
            // 公开状态影响讨论区列表：公开则加入，取消公开则移除
            questionAnswers: isPublic
              ? [updated, ...questionAnswers.filter(a => a.id !== answerId)]
              : questionAnswers.filter(a => a.id !== answerId),
          });

          return true;
        } catch (error) {
          console.error('Failed to update answer visibility:', error);
          return false;
        }
      },

      clearUserSession: () => {
        set({
          userAnswerHistory: [],
          todayAnswers: [],
          currentAnswer: null,
          questionMyRecords: [],
          myRecordsQuestionId: null,
        });
      },
    }),
    {
      name: 'daily-question-storage',
      partialize: (state) => ({
        todayQuestions: state.todayQuestions,
        todayAnswers: state.todayAnswers,
        selectedModule: state.selectedModule,
        userAnswerHistory: state.userAnswerHistory,
        // 历史题目每次都重新生成，避免旧缓存导致显示异常
      }),
      onRehydrateStorage: () => (state) => {
        // 确保新字段有默认值
        if (state) {
          if (!state.userAnswerHistory) state.userAnswerHistory = [];
          if (!state.todayQuestions) state.todayQuestions = [];
          if (!state.todayAnswers) state.todayAnswers = [];
          if (!state.historicalQuestions) state.historicalQuestions = [];
        }
      },
      // 合并前检查日期，避免旧日期的数据在 loadTodayQuestions 完成前被渲染
      merge: (persistedState: any, currentState: DailyQuestionState) => {
        const today = getQuestionDateString();
        const loaded = persistedState?.state || {};

        // 检查缓存的今日题目是否属于当天
        const cachedQuestions = loaded.todayQuestions || [];
        const isDateMatched = cachedQuestions.every((q: DailyQuestion) => q.date === today);

        if (!isDateMatched || cachedQuestions.length === 0) {
          // 日期不匹配或为空，清除脏数据
          cachedQuestions.length = 0;
          loaded.todayAnswers = [];
          if (loaded.hasOwnProperty('selectedModule')) {
            loaded.selectedModule = null;
          }
        }

        return {
          ...currentState,
          ...loaded,
        };
      },
    }
  )
);

// 监听退出登录事件，立即清除用户相关数据（无需依赖组件挂载）
useAuth.subscribe((state, prevState) => {
  if (prevState.isAuthenticated && !state.isAuthenticated) {
    useDailyQuestion.getState().clearUserSession();
  }
});
