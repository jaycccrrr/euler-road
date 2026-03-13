import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyQuestion, AnswerRecord, AnswerComment } from '@/types';
import {
  getDailyQuestionByDate,
  getDailyQuestionById,
  createDailyQuestion,
  createAnswerRecord,
  getAnswerRecordByUserAndQuestion,
  getAnswerRecordsByQuestion,
  getAllDailyQuestions,
  updateAnswerRecord,
  getAnswerRecordsByUser,
  deleteAnswerRecord,
  getHistoricalQuestions,
} from '@/lib/db';
import { getTodayString, generateId } from '@/lib/utils';
import { gradeAnswer, generateRandomQuestion } from '@/lib/ai-grader';
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
      historicalQuestions: [],

      loadTodayQuestions: async () => {
        set({ isLoading: true });
        try {
          const today = getTodayString();
          const questions: DailyQuestion[] = [];
          const answers: AnswerRecord[] = [];

          // 为每个模块生成一道题
          for (const module of KNOWLEDGE_MODULES) {
            let question = await getDailyQuestionByDate(today, module.id);

            // 检查旧数据是否有错误的 LaTeX (如 \rac 而不是 \frac)
            if (question && (question.content.includes('\\rac') || question.answer.includes('\\rac'))) {
              console.log('检测到错误的 LaTeX，重新生成题目:', question.id);
              question = undefined; // 强制重新生成
            }

            if (!question) {
              question = generateRandomQuestion(today, module.id);
              await createDailyQuestion(question);
            }

            questions.push(question);

            // 检查用户是否已回答此题
            const user = useAuth.getState().user;
            if (user) {
              const record = await getAnswerRecordByUserAndQuestion(user.id, question.id);
              if (record) {
                answers.push(record);
              }
            }
          }

          set({ todayQuestions: questions, todayAnswers: answers, isLoading: false });
        } catch (error) {
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
          const question = await getDailyQuestionById(id);
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

      // 加载历史题目（过去的每日一题）
      loadHistoricalQuestions: async (moduleId?: string) => {
        set({ isLoading: true });
        try {
          const today = getTodayString();
          const questions = await getHistoricalQuestions(today, moduleId);
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
          // Grade the answer
          const grading = await gradeAnswer(question, content, images);

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
          };

          await createAnswerRecord(record);

          // Update module experience
          const moduleCategory = question.moduleId.startsWith('math') ? 'math' :
                                question.moduleId.startsWith('physics') ? 'physics' :
                                question.moduleId.startsWith('cs') ? 'cs' : 'math';

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
          // Grade the answer
          const grading = await gradeAnswer(currentQuestion, content, images);

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
          };

          await createAnswerRecord(record);

          // Reload answers
          await get().loadQuestionAnswers(questionId);

          set({ currentAnswer: record, isLoading: false });

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
        const today = getTodayString();
        const questions: DailyQuestion[] = [];

        for (const module of KNOWLEDGE_MODULES) {
          let question = await getDailyQuestionByDate(today, module.id);

          if (!question) {
            question = generateRandomQuestion(today, module.id);
            await createDailyQuestion(question);
          }

          questions.push(question);
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
          const { userAnswerHistory, todayAnswers, questionAnswers } = get();
          const record = userAnswerHistory.find(a => a.id === answerId);

          if (!record || record.userId !== user.id) {
            return false;
          }

          await deleteAnswerRecord(answerId);

          set({
            userAnswerHistory: userAnswerHistory.filter(a => a.id !== answerId),
            todayAnswers: todayAnswers.filter(a => a.id !== answerId),
            questionAnswers: questionAnswers.filter(a => a.id !== answerId),
          });

          return true;
        } catch (error) {
          console.error('Failed to delete answer:', error);
          return false;
        }
      },
    }),
    {
      name: 'daily-question-storage',
      partialize: (state) => ({
        todayQuestions: state.todayQuestions,
        todayAnswers: state.todayAnswers,
        selectedModule: state.selectedModule,
        userAnswerHistory: state.userAnswerHistory,
        historicalQuestions: state.historicalQuestions,
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
    }
  )
);
