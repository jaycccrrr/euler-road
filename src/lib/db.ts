import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { User, DailyQuestion, AnswerRecord, Post, Comment } from '@/types';
import { initModuleData } from '@/lib/gamification';

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
}

const DB_NAME = 'euler-forum-db';
const DB_VERSION = 1;

let db: IDBPDatabase<EulerDBSchema> | null = null;

export async function initDB(): Promise<IDBPDatabase<EulerDBSchema>> {
  if (db) return db;

  db = await openDB<EulerDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Users store
      const userStore = db.createObjectStore('users', { keyPath: 'id' });
      userStore.createIndex('by-nickname', 'nickname', { unique: true });

      // Daily questions store
      const questionStore = db.createObjectStore('dailyQuestions', { keyPath: 'id' });
      questionStore.createIndex('by-date', 'date', { unique: false });
      questionStore.createIndex('by-module', 'moduleId', { unique: false });

      // Answer records store
      const recordStore = db.createObjectStore('answerRecords', { keyPath: 'id' });
      recordStore.createIndex('by-user', 'userId', { unique: false });
      recordStore.createIndex('by-question', 'questionId', { unique: false });

      // Posts store
      const postStore = db.createObjectStore('posts', { keyPath: 'id' });
      postStore.createIndex('by-user', 'userId', { unique: false });
      postStore.createIndex('by-module', 'moduleId', { unique: false });
      postStore.createIndex('by-date', 'createdAt', { unique: false });

      // Comments store
      const commentStore = db.createObjectStore('comments', { keyPath: 'id' });
      commentStore.createIndex('by-post', 'postId', { unique: false });
    },
  });

  return db;
}

// User operations
export async function createUser(user: User): Promise<void> {
  const database = await initDB();
  await database.add('users', user);
}

export async function getUserById(id: string): Promise<User | undefined> {
  const database = await initDB();
  return database.get('users', id);
}

export async function getUserByNickname(nickname: string): Promise<User | undefined> {
  const database = await initDB();
  return database.getFromIndex('users', 'by-nickname', nickname);
}

export async function updateUser(user: User): Promise<void> {
  const database = await initDB();
  await database.put('users', user);
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

export async function getAnswerRecordByUserAndQuestion(
  userId: string,
  questionId: string
): Promise<AnswerRecord | undefined> {
  const database = await initDB();
  const records = await database.getAllFromIndex('answerRecords', 'by-user', userId);
  return records.find(r => r.questionId === questionId);
}

export async function getAnswerRecordsByQuestion(questionId: string): Promise<AnswerRecord[]> {
  const database = await initDB();
  return database.getAllFromIndex('answerRecords', 'by-question', questionId);
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

export async function getAllPosts(): Promise<Post[]> {
  const database = await initDB();
  return database.getAll('posts');
}

export async function getPostsByModule(moduleId: string): Promise<Post[]> {
  const database = await initDB();
  return database.getAllFromIndex('posts', 'by-module', moduleId);
}

export async function updatePost(post: Post): Promise<void> {
  const database = await initDB();
  await database.put('posts', post);
}

// Comment operations
export async function createComment(comment: Comment): Promise<void> {
  const database = await initDB();
  await database.add('comments', comment);
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
    moduleData.physics = { exp: 9999, level: 7, selectedTitle: '牛顿' };
    moduleData.cs = { exp: 9999, level: 7, selectedTitle: '图灵' };

    const adminUser: User = {
      id: 'admin-001',
      nickname: 'admin',
      passwordHash: 'admin123', // In production, use proper hashing
      avatar: '👑',
      moduleData,
      // 兼容旧字段
      level: 7,
      experience: 9999,
      title: '欧拉',
      frame: 'halo',
      isAdmin: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    await createUser(adminUser);
    console.log('Admin user created');
  }
}
