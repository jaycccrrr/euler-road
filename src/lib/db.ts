import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { User, DailyQuestion, AnswerRecord, Post, Comment, Message, Note, CustomLesson, DiscussionMessage } from '@/types';
import { initModuleData } from '@/lib/gamification';
import { hasApiToken } from './api-auth';
import { hashPassword } from '@/lib/utils';

interface EulerDBSchema extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-nickname': string };
  };
  dailyQuestions: {
    key: string;
    value: DailyQuestion;
    indexes: { 'by-date': string; 'by-module': string };
  };
  answerRecords: {
    key: string;
    value: AnswerRecord;
    indexes: { 'by-user': string; 'by-question': string };
  };
  posts: {
    key: string;
    value: Post;
    indexes: { 'by-user': string; 'by-module': string; 'by-date': string };
  };
  comments: {
    key: string;
    value: Comment;
    indexes: { 'by-post': string };
  };
  messages: {
    key: string;
    value: Message;
    indexes: { 'by-sender': string; 'by-receiver': string; 'by-users': [string, string] };
  };
  notes: {
    key: string;
    value: Note;
    indexes: { 'by-user': string; 'by-module': string };
  };
  customLessons: {
    key: string;
    value: CustomLesson;
    indexes: { 'by-module': string; 'by-status': string };
  };
  discussionMessages: {
    key: string;
    value: DiscussionMessage;
    indexes: { 'by-question': string };
  };
}

const DB_NAME = 'euler-forum-db';
const DB_VERSION = 8; // v7 可能被无 discussionMessages 表的中间态占用，v8 强制自愈

/** 所有必需的 object store，initDB 自检用 */
const REQUIRED_STORES = [
  'users',
  'dailyQuestions',
  'answerRecords',
  'posts',
  'comments',
  'messages',
  'notes',
  'customLessons',
  'discussionMessages',
] as const;

let db: IDBPDatabase<EulerDBSchema> | null = null;

// 重置数据库（当版本错误时使用）
export async function resetDatabase(): Promise<void> {
  if (db) {
    db.close();
    db = null;
  }
  // 删除旧数据库
  await new Promise<void>((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => reject(deleteRequest.error);
    deleteRequest.onblocked = () => {
      console.warn('Database deletion blocked');
      resolve();
    };
  });
  console.log('Database reset complete');
}

// 关闭所有可能的数据库连接
function closeAllDatabaseConnections(): void {
  if (db) {
    db.close();
    db = null;
  }
}

// 添加超时包装函数
async function openDBWithTimeout(version: number = DB_VERSION): Promise<IDBPDatabase<EulerDBSchema>> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Database initialization timeout - please close other tabs and refresh'));
    }, 10000);

    openDB<EulerDBSchema>(DB_NAME, version, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`Upgrading database from v${oldVersion} to v${newVersion}`);

        // Users store
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('by-nickname', 'nickname', { unique: true });
        }

        // Daily questions store
        if (!db.objectStoreNames.contains('dailyQuestions')) {
          const questionStore = db.createObjectStore('dailyQuestions', { keyPath: 'id' });
          questionStore.createIndex('by-date', 'date', { unique: false });
          questionStore.createIndex('by-module', 'moduleId', { unique: false });
        }

        // Answer records store
        if (!db.objectStoreNames.contains('answerRecords')) {
          const recordStore = db.createObjectStore('answerRecords', { keyPath: 'id' });
          recordStore.createIndex('by-user', 'userId', { unique: false });
          recordStore.createIndex('by-question', 'questionId', { unique: false });
        }

        // Posts store
        if (!db.objectStoreNames.contains('posts')) {
          const postStore = db.createObjectStore('posts', { keyPath: 'id' });
          postStore.createIndex('by-user', 'userId', { unique: false });
          postStore.createIndex('by-module', 'moduleId', { unique: false });
          postStore.createIndex('by-date', 'createdAt', { unique: false });
        }

        // Comments store
        if (!db.objectStoreNames.contains('comments')) {
          const commentStore = db.createObjectStore('comments', { keyPath: 'id' });
          commentStore.createIndex('by-post', 'postId', { unique: false });
        }

        // Messages store (version 3+)
        if (!db.objectStoreNames.contains('messages')) {
          const messageStore = db.createObjectStore('messages', { keyPath: 'id' });
          messageStore.createIndex('by-sender', 'senderId', { unique: false });
          messageStore.createIndex('by-receiver', 'receiverId', { unique: false });
        }

        // Notes store (version 5+)
        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('by-user', 'userId', { unique: false });
          noteStore.createIndex('by-module', 'moduleId', { unique: false });
        }

        // Custom lessons store (version 6+)
        if (!db.objectStoreNames.contains('customLessons')) {
          const lessonStore = db.createObjectStore('customLessons', { keyPath: 'id' });
          lessonStore.createIndex('by-module', 'moduleId', { unique: false });
          lessonStore.createIndex('by-status', 'status', { unique: false });
        }

        // Discussion messages store (version 7+)
        if (!db.objectStoreNames.contains('discussionMessages')) {
          const dmStore = db.createObjectStore('discussionMessages', { keyPath: 'id' });
          dmStore.createIndex('by-question', 'questionId', { unique: false });
        }

        console.log(`Database upgrade complete to v${newVersion}`);
      },
      blocking(currentVersion, blockedVersion, event) {
        console.warn(`Database blocking: current=${currentVersion}, blocked=${blockedVersion}`);
        // 关闭当前连接以允许升级
        closeAllDatabaseConnections();
      },
    })
      .then((database) => {
        clearTimeout(timeout);
        resolve(database);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

export async function initDB(): Promise<IDBPDatabase<EulerDBSchema>> {
  if (db) {
    console.log('Database already initialized, returning existing connection');
    return db;
  }

  console.log('Initializing database v' + DB_VERSION + '...');

  // 首先关闭所有可能存在的连接
  closeAllDatabaseConnections();

  try {
    db = await openDBWithTimeout();

    // 自检：版本号可能被"缺表的中间态"占用（同版本号不会再触发 upgrade），
    // 发现缺表时以更高版本重开，upgrade 里的 contains 守卫会补齐缺失的 store
    const missing = REQUIRED_STORES.filter((s) => !db!.objectStoreNames.contains(s));
    if (missing.length > 0) {
      console.warn('Database missing stores:', missing, '— reopening with bumped version to self-heal');
      const nextVersion = db.version + 1;
      db.close();
      db = null;
      db = await openDBWithTimeout(nextVersion);
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    // 如果初始化失败，尝试重置数据库
    try {
      console.log('Attempting to reset database...');
      await resetDatabase();
      // 重试一次
      console.log('Retrying database initialization...');
      db = await openDBWithTimeout();
      console.log('Database initialized successfully after reset');
    } catch (retryError) {
      console.error('Failed to initialize database after reset:', retryError);
      throw retryError;
    }
  }

  return db;
}

// User operations
export async function createUser(user: User): Promise<void> {
  const database = await initDB();
  await database.add('users', user);
}

// 用户数据迁移：确保旧用户数据包含 moduleData
function migrateUserData(user: User | undefined): User | undefined {
  if (!user) return undefined;

  // 如果缺少 moduleData，添加默认值
  if (!user.moduleData) {
    user.moduleData = initModuleData();
  }

  return user;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const database = await initDB();
  const user = await database.get('users', id);
  return migrateUserData(user);
}

export async function getUserByNickname(nickname: string): Promise<User | undefined> {
  const database = await initDB();
  const user = await database.getFromIndex('users', 'by-nickname', nickname);
  return migrateUserData(user);
}

export async function updateUser(user: User): Promise<void> {
  const database = await initDB();
  await database.put('users', user);
}

export async function getAllUsers(): Promise<User[]> {
  const database = await initDB();
  const users = await database.getAll('users');
  return users.map(migrateUserData).filter((u): u is User => u !== undefined);
}

// Daily question operations
export async function createDailyQuestion(question: DailyQuestion): Promise<void> {
  const database = await initDB();
  await database.add('dailyQuestions', question);
}

export async function getDailyQuestionById(id: string): Promise<DailyQuestion | undefined> {
  const database = await initDB();
  return database.get('dailyQuestions', id);
}

export async function getDailyQuestionByDate(date: string, moduleId?: string): Promise<DailyQuestion | undefined> {
  const database = await initDB();
  const questions = await database.getAllFromIndex('dailyQuestions', 'by-date', date);
  if (moduleId) {
    return questions.find(q => q.moduleId === moduleId);
  }
  return questions[0];
}

export async function deleteDailyQuestion(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('dailyQuestions', id);
}

export async function getDailyQuestionsByModule(moduleId: string): Promise<DailyQuestion[]> {
  const database = await initDB();
  return database.getAllFromIndex('dailyQuestions', 'by-module', moduleId);
}

export async function getAllDailyQuestions(): Promise<DailyQuestion[]> {
  const database = await initDB();
  return database.getAll('dailyQuestions');
}

export async function getHistoricalQuestions(
  beforeDate: string,
  moduleId?: string
): Promise<DailyQuestion[]> {
  const database = await initDB();
  const allQuestions = await database.getAll('dailyQuestions');

  // Filter questions before the given date
  let filtered = allQuestions.filter(q => q.date < beforeDate);

  // Filter by module if specified
  if (moduleId) {
    filtered = filtered.filter(q => q.moduleId === moduleId);
  }

  // Sort by date descending (newest first)
  return filtered.sort((a, b) => b.date.localeCompare(a.date));
}

// Answer record operations
export async function createAnswerRecord(record: AnswerRecord): Promise<void> {
  const database = await initDB();
  await database.add('answerRecords', record);
}

export async function getAnswerRecordsByUser(userId: string): Promise<AnswerRecord[]> {
  const database = await initDB();
  return database.getAllFromIndex('answerRecords', 'by-user', userId);
}

export async function getAnswerRecordById(id: string): Promise<AnswerRecord | undefined> {
  const database = await initDB();
  return database.get('answerRecords', id);
}

export async function getAnswerRecordByUserAndQuestion(
  userId: string,
  questionId: string
): Promise<AnswerRecord | undefined> {
  const database = await initDB();
  const records = await database.getAllFromIndex('answerRecords', 'by-user', userId);
  return records.find(r => r.questionId === questionId);
}

// 查询某用户对某题的全部提交记录，按提交时间倒序（最新在前）
export async function getAnswerRecordsByUserAndQuestionAll(
  userId: string,
  questionId: string
): Promise<AnswerRecord[]> {
  const database = await initDB();
  const records = await database.getAllFromIndex('answerRecords', 'by-user', userId);
  return records
    .filter(r => r.questionId === questionId)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export async function getAnswerRecordsByQuestion(questionId: string): Promise<AnswerRecord[]> {
  const database = await initDB();
  return database.getAllFromIndex('answerRecords', 'by-question', questionId);
}

export async function getAllAnswerRecords(): Promise<AnswerRecord[]> {
  const database = await initDB();
  return database.getAll('answerRecords');
}

export async function updateAnswerRecord(record: AnswerRecord): Promise<void> {
  const database = await initDB();
  await database.put('answerRecords', record);
}

export async function deleteAnswerRecord(recordId: string): Promise<void> {
  const database = await initDB();
  await database.delete('answerRecords', recordId);
}

// Post operations
export async function createPost(post: Post): Promise<void> {
  const database = await initDB();
  await database.add('posts', post);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const database = await initDB();
  return database.get('posts', id);
}

export async function getPostsByUser(userId: string): Promise<Post[]> {
  if (typeof window === 'undefined') return [];
  try {
    const database = await initDB();
    return database.getAllFromIndex('posts', 'by-user', userId);
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<Post[]> {
  if (typeof window === 'undefined') return [];
  try {
    const database = await initDB();
    return await database.getAll('posts');
  } catch {
    return [];
  }
}

export async function getPostsPaginated(
  options: {
    cursor?: string;
    lastId?: string;
    limit?: number;
    moduleId?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<{ posts: Post[]; nextCursor: string | null; nextLastId: string | null }> {
  if (typeof window === 'undefined') return { posts: [], nextCursor: null, nextLastId: null };
  const { cursor, lastId, limit = 20, moduleId, order = 'desc' } = options;

  try {
    const database = await initDB();
    const tx = database.transaction('posts', 'readonly');
    const store = tx.objectStore('posts');
    const index = store.index('by-date');

    // 游标含边界，配合 lastId 跳过上一页最后一条，避免同时间戳帖子在翻页时被跳过
    const range = cursor
      ? order === 'desc'
        ? IDBKeyRange.upperBound(cursor, false)
        : IDBKeyRange.lowerBound(cursor, false)
      : undefined;

    const posts: Post[] = [];
    let cursorObj = await index.openCursor(range, order === 'desc' ? 'prev' : 'next');
    let passedBoundary = !cursor || !lastId;

    while (cursorObj) {
      const post = cursorObj.value as Post;
      if (!passedBoundary) {
        if (post.id === lastId) passedBoundary = true;
        cursorObj = await cursorObj.continue();
        continue;
      }
      if (!moduleId || post.moduleId === moduleId) {
        posts.push(post);
      }
      if (posts.length >= limit) {
        return { posts, nextCursor: post.createdAt, nextLastId: post.id };
      }
      cursorObj = await cursorObj.continue();
    }

    return { posts, nextCursor: null, nextLastId: null };
  } catch {
    return { posts: [], nextCursor: null, nextLastId: null };
  }
}
export async function getPostsByModule(moduleId: string): Promise<Post[]> {
  const database = await initDB();
  return database.getAllFromIndex('posts', 'by-module', moduleId);
}

export async function updatePost(post: Post): Promise<void> {
  const database = await initDB();
  await database.put('posts', post);
}

export async function deletePost(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('posts', id);
}

// 更新用户所有帖子的头像和昵称
export async function updateUserPostsAvatar(userId: string, avatar: string, nickname?: string): Promise<void> {
  const database = await initDB();
  // 获取用户所有帖子
  const userPosts = await database.getAllFromIndex('posts', 'by-user', userId);

  // 批量更新
  const tx = database.transaction('posts', 'readwrite');
  const store = tx.objectStore('posts');

  for (const post of userPosts) {
    post.userAvatar = avatar;
    if (nickname) {
      post.userNickname = nickname;
    }
    await store.put(post);
  }

  await tx.done;
}

// 更新用户所有评论的头像和昵称
export async function updateUserCommentsAvatar(userId: string, avatar: string, nickname?: string): Promise<void> {
  const database = await initDB();
  // 获取所有评论
  const allComments = await database.getAll('comments');
  const userComments = allComments.filter(c => c.userId === userId);

  // 批量更新
  const tx = database.transaction('comments', 'readwrite');
  const store = tx.objectStore('comments');

  for (const comment of userComments) {
    comment.userAvatar = avatar;
    if (nickname) {
      comment.userNickname = nickname;
    }
    await store.put(comment);
  }

  await tx.done;
}

// Comment operations
export async function createComment(comment: Comment): Promise<void> {
  const database = await initDB();
  await database.add('comments', comment);
}

export async function getCommentById(id: string): Promise<Comment | undefined> {
  const database = await initDB();
  return database.get('comments', id);
}

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const database = await initDB();
  return database.getAllFromIndex('comments', 'by-post', postId);
}

// Initialize with admin user
export async function initAdminUser(): Promise<void> {
  const admin = await getUserByNickname('admin');
  if (!admin) {
    const moduleData = initModuleData();
    // 设置管理员为最高等级
    moduleData.math = { exp: 9999, level: 7, selectedTitle: '欧拉' };

    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // 管理员密码使用 bcrypt 哈希，不再硬编码明文
    const adminPasswordHash = await hashPassword('admin123');

    const adminUser: User = {
      id: 'admin-001',
      nickname: 'admin',
      passwordHash: adminPasswordHash,
      avatar: '👑',
      moduleData,
      // π力系统数据
      piPower: {
        currentPi: 100,
        monthlyPi: 50,
        totalAnswered: 50,
        monthlyAnswered: 10,
        lastAnswerDate: now.toISOString(),
        currentStreak: 7,
        monthlyResetDate: nextMonth.toISOString(),
        dailyAttempts: {},
      },
      // 位置信息
      location: {
        province: '北京',
        updatedAt: now.toISOString(),
      },
      // 称号历史
      eulerTitleHistory: [
        {
          id: 'title-001',
          title: '欧拉本尊',
          rankType: 'global',
          rank: 1,
          obtainedAt: now.toISOString(),
          month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
        },
      ],
      // 当前称号
      currentEulerTitle: {
        title: '欧拉本尊',
        rankType: 'global',
        rank: 1,
        obtainedAt: now.toISOString(),
        month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
      },
      // 兼容旧字段
      level: 7,
      experience: 9999,
      title: '欧拉',
      frame: 'halo',
      isAdmin: true,
      createdAt: now.toISOString(),
      lastLoginAt: now.toISOString(),
    };
    await createUser(adminUser);
    console.log('Admin user created');
  }
}

// Message operations
export async function createMessage(message: Message): Promise<void> {
  const database = await initDB();
  await database.add('messages', message);
}

export async function getMessageById(id: string): Promise<Message | undefined> {
  const database = await initDB();
  return database.get('messages', id);
}

export async function getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
  const database = await initDB();
  const allMessages = await database.getAll('messages');
  return allMessages.filter(
    m => (m.senderId === userId1 && m.receiverId === userId2) ||
         (m.senderId === userId2 && m.receiverId === userId1)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function markMessagesAsRead(receiverId: string, senderId: string): Promise<void> {
  const database = await initDB();
  const allMessages = await database.getAll('messages');
  const unreadMessages = allMessages.filter(
    m => m.receiverId === receiverId && m.senderId === senderId && !m.isRead
  );

  const tx = database.transaction('messages', 'readwrite');
  const store = tx.objectStore('messages');

  for (const message of unreadMessages) {
    message.isRead = true;
    await store.put(message);
  }

  await tx.done;
}

export async function getUnreadMessageCount(userId: string): Promise<number> {
  const database = await initDB();
  const allMessages = await database.getAll('messages');
  return allMessages.filter(m => m.receiverId === userId && !m.isRead).length;
}

export async function getChatSessions(userId: string): Promise<Array<{
  friendId: string;
  friend: User | undefined;
  lastMessage: Message;
  unreadCount: number;
}>> {
  const database = await initDB();
  const allMessages = await database.getAll('messages');

  // 获取所有与该用户相关的消息
  const userMessages = allMessages.filter(
    m => m.senderId === userId || m.receiverId === userId
  );

  // 按好友分组
  const friendMap = new Map<string, Message[]>();
  for (const message of userMessages) {
    const friendId = message.senderId === userId ? message.receiverId : message.senderId;
    if (!friendMap.has(friendId)) {
      friendMap.set(friendId, []);
    }
    friendMap.get(friendId)!.push(message);
  }

  // 构建会话列表
  const sessions: Array<{
    friendId: string;
    friend: User | undefined;
    lastMessage: Message;
    unreadCount: number;
  }> = [];

  for (const [friendId, messages] of friendMap) {
    const sortedMessages = messages.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const lastMessage = sortedMessages[0];
    const unreadCount = messages.filter(m => m.receiverId === userId && !m.isRead).length;
    const friend = await getUserById(friendId);

    sessions.push({
      friendId,
      friend,
      lastMessage,
      unreadCount,
    });
  }

  // 按最后消息时间排序
  return sessions.sort(
    (a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
  );
}

// 关注/好友相关操作
export async function followUser(userId: string, targetUserId: string): Promise<void> {
  const database = await initDB();
  const user = await database.get('users', userId);
  if (!user) return;

  if (!user.following) {
    user.following = [];
  }

  if (!user.following.includes(targetUserId)) {
    user.following.push(targetUserId);
    await database.put('users', user);
  }
}

export async function unfollowUser(userId: string, targetUserId: string): Promise<void> {
  const database = await initDB();
  const user = await database.get('users', userId);
  if (!user || !user.following) return;

  user.following = user.following.filter(id => id !== targetUserId);
  await database.put('users', user);
}

export async function getFollowers(userId: string): Promise<User[]> {
  const database = await initDB();
  const allUsers = await database.getAll('users');
  const followers = allUsers.filter(u => u.following?.includes(userId));
  return followers;
}

export async function getFollowing(userId: string): Promise<User[]> {
  const database = await initDB();
  const user = await database.get('users', userId);
  if (!user || !user.following) return [];

  const following: User[] = [];
  for (const id of user.following) {
    const followUser = await database.get('users', id);
    if (followUser) {
      following.push(followUser);
    }
  }
  return following;
}

// 检查两个用户是否为好友（互相关注）
export async function areFriends(userId1: string, userId2: string): Promise<boolean> {
  // 后端优先：跨设备互相关注也能正确判定；失败回退本地
  if (hasApiToken()) {
    try {
      const res = await fetch(
        '/api/friends/status?userIdA=' + encodeURIComponent(userId1) + '&userIdB=' + encodeURIComponent(userId2)
      );
      if (res.ok) {
        const data = await res.json();
        if (typeof data.areFriends === 'boolean') return data.areFriends;
      }
    } catch {
      // 网络异常回退本地
    }
  }
  const database = await initDB();
  const [user1, user2] = await Promise.all([
    database.get('users', userId1),
    database.get('users', userId2),
  ]);

  const user1FollowsUser2 = user1?.following?.includes(userId2) ?? false;
  const user2FollowsUser1 = user2?.following?.includes(userId1) ?? false;

  return user1FollowsUser2 && user2FollowsUser1;
}

// 搜索用户
export async function searchUsers(query: string): Promise<User[]> {
  const database = await initDB();
  const allUsers = await database.getAll('users');
  const lowerQuery = query.toLowerCase();

  return allUsers
    .filter(u =>
      u.nickname.toLowerCase().includes(lowerQuery) ||
      u.bio?.toLowerCase().includes(lowerQuery)
    )
    .map(u => ({ ...u, passwordHash: '' }));
}

// 更新用户资料
export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
  const database = await initDB();
  const user = await database.get('users', userId);
  if (!user) return;

  Object.assign(user, updates);
  await database.put('users', user);
}

// ===== 笔记操作 =====
export async function createNote(note: Note): Promise<void> {
  const database = await initDB();
  await database.add('notes', note);
}

export async function getNoteById(id: string): Promise<Note | undefined> {
  const database = await initDB();
  return database.get('notes', id);
}

export async function getNotesByUser(userId: string): Promise<Note[]> {
  const database = await initDB();
  return database.getAllFromIndex('notes', 'by-user', userId);
}

export async function getNotesByModule(moduleId: string): Promise<Note[]> {
  const database = await initDB();
  return database.getAllFromIndex('notes', 'by-module', moduleId);
}

export async function updateNote(note: Note): Promise<void> {
  const database = await initDB();
  await database.put('notes', note);
}

export async function deleteNote(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('notes', id);
}

// ==================== 自定义课时（导入管线） ====================

export async function createCustomLesson(lesson: CustomLesson): Promise<void> {
  const database = await initDB();
  await database.put('customLessons', lesson);
}

export async function getCustomLessonsByModule(moduleId: string): Promise<CustomLesson[]> {
  const database = await initDB();
  return database.getAllFromIndex('customLessons', 'by-module', moduleId);
}

export async function getAllCustomLessons(): Promise<CustomLesson[]> {
  const database = await initDB();
  return database.getAll('customLessons');
}

export async function updateCustomLesson(lesson: CustomLesson): Promise<void> {
  const database = await initDB();
  await database.put('customLessons', lesson);
}

export async function deleteCustomLesson(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('customLessons', id);
}

// ===== 讨论区消息 =====
export async function createDiscussionMessage(message: DiscussionMessage): Promise<void> {
  const database = await initDB();
  await database.put('discussionMessages', message);
}

export async function getDiscussionMessagesByQuestion(questionId: string): Promise<DiscussionMessage[]> {
  const database = await initDB();
  const list = await database.getAllFromIndex('discussionMessages', 'by-question', questionId);
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteDiscussionMessage(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('discussionMessages', id);
}

/** 更新讨论消息（点赞 / 回复等整文档写回） */
export async function updateDiscussionMessage(message: DiscussionMessage): Promise<void> {
  const database = await initDB();
  await database.put('discussionMessages', message);
}
