// API 客户端封装
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  // 添加默认 headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  // 添加认证 token
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || '请求失败');
  }

  return data;
}

// 认证相关
export const authAPI = {
  login: (nickname: string, password: string) =>
    fetchAPI<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
    }),

  register: (nickname: string, password: string, avatar?: string) =>
    fetchAPI<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nickname, password, avatar }),
    }),

  getMe: () =>
    fetchAPI<{ user: any }>('/api/auth/me'),

  updateProfile: (updates: any) =>
    fetchAPI<{ user: any }>('/api/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
};

// 题目相关
export const questionsAPI = {
  getToday: () =>
    fetchAPI<{ questions: any[] }>('/api/questions/today'),

  getHistory: (page = 1, pageSize = 20, moduleId?: string) =>
    fetchAPI<{ questions: any[]; pagination: any }>(
      `/api/questions?page=${page}&pageSize=${pageSize}${moduleId ? `&moduleId=${moduleId}` : ''}`
    ),

  getById: (id: string) =>
    fetchAPI<{ question: any }>(`/api/questions/${id}`),
};

// 答题相关
export const answersAPI = {
  submit: (payload: {
    questionId: string;
    content: string;
    images: string[];
    isPublic: boolean;
    id?: string;
    question?: any;
  }) =>
    fetchAPI<{ answer: any; feedback: string; score: number; expGained: number }>('/api/answers', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMyAnswers: () =>
    fetchAPI<{ answers: any[] }>('/api/answers'),

  update: (id: string, updates: any) =>
    fetchAPI<{ answer: any }>(`/api/answers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  remove: (id: string) =>
    fetchAPI<{ message: string }>(`/api/answers/${id}`, {
      method: 'DELETE',
    }),
};

// 社区相关
export const postsAPI = {
  getList: (page = 1, pageSize = 20, moduleId?: string, search?: string) =>
    fetchAPI<{ posts: any[]; pagination: any }>(
      `/api/posts?page=${page}&limit=${pageSize}${moduleId ? `&moduleId=${moduleId}` : ''}${search ? `&search=${search}` : ''}`
    ),

  create: (payload: {
    title: string;
    content: string;
    moduleId: string;
    images: string[];
    id?: string;
    postType?: string;
    topics?: string[];
  }) =>
    fetchAPI<{ post: any }>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, updates: any) =>
    fetchAPI<{ post: any }>(`/api/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  remove: (id: string) =>
    fetchAPI<{ message: string }>(`/api/posts/${id}`, {
      method: 'DELETE',
    }),
};

// 用户相关（关注等）
export const usersAPI = {
  get: (id: string) =>
    fetchAPI<any>(`/api/users/${id}`),
  search: (q: string, limit = 20) =>
    fetchAPI<{ users: any[] }>(`/api/users/search?q=${encodeURIComponent(q)}&limit=${limit}`),
  follow: (id: string) =>
    fetchAPI<{ following: boolean; message?: string }>(`/api/users/${id}/follow`, {
      method: 'POST',
    }),
  isFollowing: (id: string) =>
    fetchAPI<{ following: boolean }>(`/api/users/${id}/follow`),
};

// 评论相关
export const commentsAPI = {
  getForPost: (postId: string) =>
    fetchAPI<{ comments: any[] }>(`/api/posts/${postId}/comments`),
  createForPost: (postId: string, payload: { id?: string; content: string }) =>
    fetchAPI<{ comment: any }>(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    fetchAPI<{ message: string }>(`/api/comments/${id}`, { method: 'DELETE' }),
  getForAnswer: (answerId: string) =>
    fetchAPI<{ comments: any[] }>(`/api/answers/${answerId}/comments`),
  createForAnswer: (answerId: string, payload: { id?: string; content: string }) =>
    fetchAPI<{ comment: any }>(`/api/answers/${answerId}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  removeAnswerComment: (id: string) =>
    fetchAPI<{ message: string }>(`/api/answer-comments/${id}`, { method: 'DELETE' }),
};

// 点赞相关
export const likesAPI = {
  togglePost: (postId: string) =>
    fetchAPI<{ liked: boolean; likes: number; likedBy: string[] }>(`/api/posts/${postId}/like`, {
      method: 'POST',
    }),
  toggleAnswer: (answerId: string) =>
    fetchAPI<{ liked: boolean; likes: number; likedBy: string[] }>(`/api/answers/${answerId}/like`, {
      method: 'POST',
    }),
};

// 私信相关
export const messagesAPI = {
  getWith: (userId: string, limit = 100) =>
    fetchAPI<{ messages: any[] }>(`/api/messages?with=${encodeURIComponent(userId)}&limit=${limit}`),
  conversations: () =>
    fetchAPI<{ conversations: any[] }>('/api/messages/conversations'),
  send: (payload: any) =>
    fetchAPI<{ message: any }>('/api/messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// 讨论区消息相关
export const discussionsAPI = {
  getForQuestion: (questionId: string) =>
    fetchAPI<{ messages: any[] }>(`/api/questions/${questionId}/discussions`),
  create: (questionId: string, payload: any) =>
    fetchAPI<{ message: any }>(`/api/questions/${questionId}/discussions`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    fetchAPI<{ message: string }>(`/api/discussions/${id}`, { method: 'DELETE' }),
  toggleLike: (id: string) =>
    fetchAPI<{ liked: boolean; likes: number; likedBy: string[] }>(`/api/discussions/${id}/like`, {
      method: 'POST',
    }),
  addReply: (messageId: string, payload: { id?: string; content: string; replyToNickname?: string }) =>
    fetchAPI<{ reply: any }>(`/api/discussions/${messageId}/replies`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  removeReply: (replyId: string) =>
    fetchAPI<{ message: string }>(`/api/discussion-replies/${replyId}`, { method: 'DELETE' }),
  toggleReplyLike: (replyId: string) =>
    fetchAPI<{ liked: boolean; likes: number; likedBy: string[] }>(`/api/discussion-replies/${replyId}/like`, {
      method: 'POST',
    }),
};

// 排行榜
export const leaderboardAPI = {
  get: () =>
    fetchAPI<{ users: any[] }>('/api/leaderboard'),
};
