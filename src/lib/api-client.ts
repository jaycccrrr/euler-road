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

  const data = await response.json();

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
  submit: (questionId: string, content: string, images: string[], isPublic: boolean) =>
    fetchAPI<{ answer: any; feedback: string; score: number; expGained: number }>('/api/answers', {
      method: 'POST',
      body: JSON.stringify({ questionId, content, images, isPublic }),
    }),

  getMyAnswers: () =>
    fetchAPI<{ answers: any[] }>('/api/answers'),
};

// 社区相关
export const postsAPI = {
  getList: (page = 1, pageSize = 20, moduleId?: string, search?: string) =>
    fetchAPI<{ posts: any[]; pagination: any }>(
      `/api/posts?page=${page}&pageSize=${pageSize}${moduleId ? `&moduleId=${moduleId}` : ''}${search ? `&search=${search}` : ''}`
    ),

  create: (title: string, content: string, moduleId: string, images: string[]) =>
    fetchAPI<{ post: any }>('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, moduleId, images }),
    }),
};

// 排行榜
export const leaderboardAPI = {
  get: () =>
    fetchAPI<{ users: any[] }>('/api/leaderboard'),
};
