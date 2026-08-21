export async function getPostWithBackendFallback(id: string): Promise<Post | null> {
  // 本地无该帖时从后端拉取并缓存，解决直链或通知跳转时找不到帖子的问题
  const local = await getPostById(id);
  if (local) return local;
  if (!hasApiToken()) return null;
  try {
    const res = await postsAPI.getById(id);
    if (res?.post) {
      const mapped = mapApiPostToLocal(res.post);
      await createPost(mapped);
      return mapped;
    }
  } catch (error) {
    console.warn('拉取后端帖子失败:', error);
  }
  return null;
}

export async function getFriends(userId: string): Promise<User[]> {
  // 后端优先：互相关注的好友（跨设备一致）；失败回退本地
  if (hasApiToken()) {
    try {
      const [following, followers] = await Promise.all([
        usersAPI.followingList(userId),
        usersAPI.followersList(userId),
      ]);
      const followerIds = new Set((followers || []).map((u: any) => u.id));
      const ids = (following || []).filter((u: any) => followerIds.has(u.id)).map((u: any) => u.id);
      // 并行拉取好友资料，避免好友多时逐个请求造成长时间等待
      const cachedList = await Promise.all(ids.map((id) => fetchAndCacheUser(id)));
      return cachedList.filter((u): u is User => Boolean(u));
    } catch (error) {
      console.warn('获取好友列表失败，回退本地:', error);
    }
  }
  const [following, followers] = await Promise.all([getFollowing(userId), getFollowers(userId)]);
  const followerIds = new Set(followers.map((u) => u.id));
  return following.filter((u) => followerIds.has(u.id));
}

/** 后端优先获取关注列表（跨设备一致），失败回退本地；同时把资料缓存到本地 */
export async function getFollowingWithBackend(userId: string): Promise<User[]> {
  if (hasApiToken()) {
    try {
      const list = await usersAPI.followingList(userId);
      const result: User[] = [];
      for (const item of list || []) {
        result.push(apiUserToLocalUser(item));
        try {
          await cacheApiUser(item);
        } catch {
          // 缓存失败不影响列表展示
        }
      }
      return result;
    } catch (error) {
      console.warn('获取关注列表失败，回退本地:', error);
    }
  }
  return getFollowing(userId);
}

/** 后端优先获取粉丝列表（跨设备一致），失败回退本地；同时把资料缓存到本地 */
export async function getFollowersWithBackend(userId: string): Promise<User[]> {
  if (hasApiToken()) {
    try {
      const list = await usersAPI.followersList(userId);
      const result: User[] = [];
      for (const item of list || []) {
        result.push(apiUserToLocalUser(item));
        try {
          await cacheApiUser(item);
        } catch {
          // 缓存失败不影响列表展示
        }
      }
      return result;
    } catch (error) {
      console.warn('获取粉丝列表失败，回退本地:', error);
    }
  }
  return getFollowers(userId);
}

// 答题记录与社区帖子的后端同步（Supabase，最佳努力：失败不影响本地）
import { answersAPI, postsAPI } from '@/lib/api-client';
import {
  commentsAPI,
  likesAPI,
  messagesAPI,
  discussionsAPI,
  usersAPI,
} from '@/lib/api-client';
import { hasApiToken, apiUserToLocalUser } from '@/lib/api-auth';
import {
  updatePost,
  createAnswerRecord,
  getAnswerRecordById,
  createPost,
  getPostById,
  getUserById,
  createUser,
  getCommentById,
  createComment,
  getMessageById,
  createMessage,
  createDiscussionMessage,
  getDiscussionMessagesByQuestion,
  getFollowing,
  getFollowers,
} from '@/lib/db';
import type { AnswerRecord, AnswerComment, Comment, DiscussionMessage, DiscussionReply, Message, Post, User } from '@/types';

let lastPostsMergeAt = 0;
let lastAnswersMergeAt = 0;
const MERGE_INTERVAL = 30 * 1000;

/** 把后端用户信息缓存到本地（已存在则跳过） */
export async function cacheApiUser(apiUser: any): Promise<void> {
  if (!apiUser?.id) return;
  try {
    const existing = await getUserById(apiUser.id);
    if (existing) return;
    await createUser(apiUserToLocalUser(apiUser));
  } catch (error) {
    console.warn('缓存后端用户失败:', error);
  }
}

/** 获取用户：优先本地，未命中则从后端拉取并缓存（点击他人头像/作者卡片时使用） */
export async function fetchAndCacheUser(userId: string) {
  try {
    const local = await getUserById(userId);
    if (local) return local;
  } catch {
    // 本地读取失败继续走后端
  }
  try {
    const res = await usersAPI.get(userId);
    if (res?.id) {
      const user = apiUserToLocalUser(res);
      try {
        await createUser(user);
      } catch {
        // 已存在或缓存失败不影响返回
      }
      return user;
    }
  } catch (error) {
    console.warn('从后端拉取用户失败:', error);
  }
  return undefined;
}

/** 后端答题记录 → 前端 AnswerRecord（缺少的本地字段用默认值） */
export function mapApiAnswerToLocal(a: any): AnswerRecord {
  return {
    id: a.id,
    userId: a.userId,
    questionId: a.questionId,
    content: a.content,
    images: a.images || [],
    submittedAt: a.submittedAt,
    aiScore: a.aiScore ?? 0,
    aiFeedback: a.aiFeedback || '',
    isCorrect: !!a.isCorrect,
    experienceGained: a.experienceGained ?? 0,
    isPublic: !!a.isPublic,
    likes: a.likes ?? 0,
    likedBy: a.likedBy || [],
    comments: [],
  };
}

/** 后端帖子 → 前端 Post（缺少的本地字段用默认值） */
export function mapApiPostToLocal(p: any): Post {
  return {
    id: p.id,
    userId: p.userId,
    userNickname: p.user?.nickname || '',
    userAvatar: p.user?.avatar || '👤',
    moduleId: p.moduleId || 'general',
    postType: p.postType || 'question',
    title: p.title,
    content: p.content,
    topics: p.topics || [],
    images: p.images || [],
    commentPermission: 'all',
    mentions: [],
    createdAt: p.createdAt,
    likes: p.likes ?? 0,
    likedBy: p.likedBy || [],
    comments: [],
  };
}

/** 后端帖子评论 → 前端 Comment */
export function mapApiCommentToLocal(c: any): Comment {
  return {
    id: c.id,
    postId: c.postId,
    userId: c.userId,
    userNickname: c.user?.nickname || '',
    userAvatar: c.user?.avatar || '👤',
    content: c.content,
    createdAt: c.createdAt,
  };
}

/** 后端答案评论 → 前端 AnswerComment */
export function mapApiAnswerCommentToLocal(c: any): AnswerComment {
  return {
    id: c.id,
    answerId: c.answerId,
    userId: c.userId,
    userNickname: c.user?.nickname || '',
    userAvatar: c.user?.avatar || '👤',
    content: c.content,
    createdAt: c.createdAt,
  };
}

/** 后端私信 → 前端 Message */
export function mapApiMessageToLocal(m: any): Message {
  return {
    id: m.id,
    senderId: m.senderId,
    receiverId: m.receiverId,
    content: m.content,
    images: m.images || [],
    createdAt: m.createdAt,
    isRead: !!m.isRead,
    messageType: m.messageType || 'text',
    cardPayload: m.cardPayload || undefined,
  };
}

/** 后端讨论区回复 → 前端 DiscussionReply */
export function mapApiReplyToLocal(r: any): DiscussionReply {
  return {
    id: r.id,
    userId: r.userId,
    userNickname: r.user?.nickname || '',
    userAvatar: r.user?.avatar || '👤',
    content: r.content,
    replyToNickname: r.replyToNickname || undefined,
    likes: r.likes ?? 0,
    likedBy: r.likedBy || [],
    createdAt: r.createdAt,
  };
}

/** 后端讨论区消息 → 前端 DiscussionMessage */
export function mapApiDiscussionToLocal(m: any): DiscussionMessage {
  return {
    id: m.id,
    questionId: m.questionId,
    userId: m.userId,
    content: m.content,
    refQuestionId: m.refQuestionId || undefined,
    refQuestionTitle: m.refQuestionTitle || undefined,
    refQuestionModuleId: m.refQuestionModuleId || undefined,
    refQuestionDate: m.refQuestionDate || undefined,
    refAnswerId: m.refAnswerId || undefined,
    refAnswerExcerpt: m.refAnswerExcerpt || undefined,
    refAnswerScore: m.refAnswerScore ?? undefined,
    refAnswerIsCorrect: m.refAnswerIsCorrect ?? undefined,
    likes: m.likes ?? 0,
    likedBy: m.likedBy || [],
    replies: (m.replies || []).map(mapApiReplyToLocal),
    createdAt: m.createdAt,
  };
}

/** 登录态下同步答题记录到后端（题目不存在时后端会自动建档） */
export async function syncAnswerToBackend(
  record: AnswerRecord,
  question: {
    id: string;
    moduleId: string;
    date: string;
    title: string;
    content: string;
    images?: string[];
    answer?: string;
    answerImages?: string[];
    difficulty?: number;
    isAutoGenerated?: boolean;
  }
): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await answersAPI.submit({
      id: record.id,
      questionId: record.questionId,
      content: record.content,
      images: record.images,
      isPublic: record.isPublic,
      question,
    });
  } catch (error) {
    console.warn('同步答题记录到后端失败:', error);
  }
}

/** 登录态下同步答题记录的更新（公开状态等） */
export async function syncAnswerUpdateToBackend(record: AnswerRecord): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await answersAPI.update(record.id, {
      isPublic: record.isPublic,
    });
  } catch (error) {
    console.warn('同步答题记录更新到后端失败:', error);
  }
}

/** 登录态下同步删除答题记录 */
export async function syncAnswerDeleteToBackend(answerId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await answersAPI.remove(answerId);
  } catch (error) {
    console.warn('同步删除答题记录到后端失败:', error);
  }
}

/** 登录态下把后端答题记录合并进本地（不覆盖本地已有记录） */
export async function mergeAnswersFromBackend(): Promise<void> {
  if (!hasApiToken()) return;
  const now = Date.now();
  if (now - lastAnswersMergeAt < MERGE_INTERVAL) return;
  lastAnswersMergeAt = now;

  try {
    const res = await answersAPI.getMyAnswers();
    for (const apiAnswer of res.answers || []) {
      try {
        const existing = await getAnswerRecordById(apiAnswer.id);
        if (!existing) {
          await createAnswerRecord(mapApiAnswerToLocal(apiAnswer));
        }
      } catch (error) {
        console.warn('合并答题记录失败:', error);
      }
    }
  } catch (error) {
    console.warn('拉取后端答题记录失败:', error);
  }
}

/** 登录态下同步帖子到后端 */
export async function syncPostToBackend(post: Post): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await postsAPI.create({
      id: post.id,
      title: post.title,
      content: post.content,
      moduleId: post.moduleId,
      images: post.images,
      postType: post.postType,
      topics: post.topics || [],
    });
  } catch (error) {
    console.warn('同步帖子到后端失败:', error);
  }
}

/** 登录态下同步帖子的更新 */
export async function syncPostUpdateToBackend(post: Post): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await postsAPI.update(post.id, {
      title: post.title,
      content: post.content,
      moduleId: post.moduleId,
      images: post.images,
      postType: post.postType,
      topics: post.topics || [],
    });
  } catch (error) {
    console.warn('同步帖子更新到后端失败:', error);
  }
}

/** 登录态下同步删除帖子 */
export async function syncPostDeleteToBackend(postId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await postsAPI.remove(postId);
  } catch (error) {
    console.warn('同步删除帖子到后端失败:', error);
  }
}

/** 登录态下把后端帖子合并进本地（不覆盖本地已有记录；带30秒节流） */
export async function mergePostsFromBackend(): Promise<void> {
  // 帖子列表接口无需登录，游客/本地账号也应看到全部帖子
  const now = Date.now();
  if (now - lastPostsMergeAt < MERGE_INTERVAL) return;
  lastPostsMergeAt = now;

  try {
    let page = 1;
    for (;;) {
      const res = await postsAPI.getList(page, 100);
      const items = res.posts || [];
      for (const apiPost of items) {
        try {
          await cacheApiUser(apiPost.user);
          const existing = await getPostById(apiPost.id);
          if (existing) {
            // 已存在则刷新内容（保留本地点赞/评论等状态），避免本地旧数据漏显示
            await updatePost({
              ...mapApiPostToLocal(apiPost),
              likedBy: existing.likedBy || [],
              comments: existing.comments || [],
            });
          } else {
            await createPost(mapApiPostToLocal(apiPost));
          }
        } catch (error) {
          console.warn('合并帖子失败:', error);
        }
      }
      const totalPages = res.pagination?.totalPages ?? 1;
      const total = res.pagination?.total ?? items.length;
      if (page >= totalPages || items.length === 0 || total === 0) break;
      page += 1;
    }
  } catch (error) {
    console.warn('拉取后端帖子失败:', error);
  }
}

/** 同步帖子评论到后端 */
export async function syncPostCommentToBackend(comment: Comment): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await commentsAPI.createForPost(comment.postId, {
      id: comment.id,
      content: comment.content,
    });
  } catch (error) {
    console.warn('同步帖子评论到后端失败:', error);
  }
}

/** 把后端帖子评论合并进本地（返回合并后的完整评论列表） */
export async function mergePostCommentsFromBackend(postId: string): Promise<Comment[]> {
  if (!hasApiToken()) return [];
  try {
    const res = await commentsAPI.getForPost(postId);
    const merged: Comment[] = [];
    for (const apiComment of res.comments || []) {
      try {
        const existing = await getCommentById(apiComment.id);
        if (!existing) {
          await createComment(mapApiCommentToLocal(apiComment));
        }
      } catch (error) {
        console.warn('合并帖子评论失败:', error);
      }
      merged.push(mapApiCommentToLocal(apiComment));
    }
    return merged;
  } catch (error) {
    console.warn('拉取后端帖子评论失败:', error);
    return [];
  }
}

/** 同步答案评论到后端 */
export async function syncAnswerCommentToBackend(comment: AnswerComment): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await commentsAPI.createForAnswer(comment.answerId, {
      id: comment.id,
      content: comment.content,
    });
  } catch (error) {
    console.warn('同步答案评论到后端失败:', error);
  }
}

/** 把后端答案评论合并进本地答案对象（返回带评论的答案数组） */
export async function mergeAnswerCommentsFromBackend(answers: AnswerRecord[]): Promise<AnswerRecord[]> {
  if (!hasApiToken()) return answers;
  const result: AnswerRecord[] = [];
  for (const answer of answers) {
    try {
      const res = await commentsAPI.getForAnswer(answer.id);
      const comments = (res.comments || []).map(mapApiAnswerCommentToLocal);
      result.push({ ...answer, comments });
    } catch {
      result.push(answer);
    }
  }
  return result;
}

/** 帖子点赞（后端 toggle，失败不影响本地） */
export async function syncPostLikeToggleToBackend(postId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await likesAPI.togglePost(postId);
  } catch (error) {
    console.warn('同步帖子点赞到后端失败:', error);
  }
}

/** 答案点赞（后端 toggle） */
export async function syncAnswerLikeToggleToBackend(answerId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await likesAPI.toggleAnswer(answerId);
  } catch (error) {
    console.warn('同步答案点赞到后端失败:', error);
  }
}

/** 同步私信到后端 */
export async function syncMessageToBackend(message: Message): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await messagesAPI.send({
      id: message.id,
      receiverId: message.receiverId,
      content: message.content,
      images: message.images,
      messageType: message.messageType || 'text',
      cardPayload: message.cardPayload,
    });
  } catch (error) {
    console.warn('同步私信到后端失败:', error);
  }
}

/** 把后端私信合并进本地（两人会话） */
export async function mergeMessagesFromBackend(meId: string, otherId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    const res = await messagesAPI.getWith(otherId);
    for (const apiMessage of res.messages || []) {
      try {
        const existing = await getMessageById(apiMessage.id);
        if (!existing) {
          await createMessage(mapApiMessageToLocal(apiMessage));
        }
      } catch (error) {
        console.warn('合并私信失败:', error);
      }
    }
  } catch (error) {
    console.warn('拉取后端私信失败:', error);
  }
}

/** 把后端会话列表合并进本地（保证会话侧栏能看到云端消息） */
export async function mergeConversationsFromBackend(): Promise<void> {
  if (!hasApiToken()) return;
  try {
    const res = await messagesAPI.conversations();
    for (const conv of res.conversations || []) {
      const last = conv.lastMessage;
      if (!last) continue;
      try {
        const existing = await getMessageById(last.id);
        if (!existing) {
          await createMessage(mapApiMessageToLocal(last));
        }
      } catch (error) {
        console.warn('合并会话失败:', error);
      }
    }
  } catch (error) {
    console.warn('拉取后端会话列表失败:', error);
  }
}

/** 同步讨论区消息到后端 */
export async function syncDiscussionToBackend(message: DiscussionMessage): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await discussionsAPI.create(message.questionId, {
      id: message.id,
      content: message.content,
      refQuestionId: message.refQuestionId,
      refQuestionTitle: message.refQuestionTitle,
      refQuestionModuleId: message.refQuestionModuleId,
      refQuestionDate: message.refQuestionDate,
      refAnswerId: message.refAnswerId,
      refAnswerExcerpt: message.refAnswerExcerpt,
      refAnswerScore: message.refAnswerScore,
      refAnswerIsCorrect: message.refAnswerIsCorrect,
    });
  } catch (error) {
    console.warn('同步讨论区消息到后端失败:', error);
  }
}

/** 把后端讨论区消息合并进本地 */
export async function mergeDiscussionsFromBackend(questionId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    const res = await discussionsAPI.getForQuestion(questionId);
    const existing = await getDiscussionMessagesByQuestion(questionId);
    const existingIds = new Set(existing.map((m) => m.id));
    for (const apiMessage of res.messages || []) {
      if (existingIds.has(apiMessage.id)) continue;
      try {
        await createDiscussionMessage(mapApiDiscussionToLocal(apiMessage));
      } catch (error) {
        console.warn('合并讨论区消息失败:', error);
      }
    }
  } catch (error) {
    console.warn('拉取后端讨论区消息失败:', error);
  }
}

/** 同步删除讨论区消息 */
export async function syncDiscussionDeleteToBackend(messageId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await discussionsAPI.remove(messageId);
  } catch (error) {
    console.warn('同步删除讨论区消息到后端失败:', error);
  }
}

/** 讨论区消息点赞（后端 toggle） */
export async function syncDiscussionLikeToggleToBackend(messageId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await discussionsAPI.toggleLike(messageId);
  } catch (error) {
    console.warn('同步讨论区点赞到后端失败:', error);
  }
}

/** 同步讨论区回复到后端 */
export async function syncDiscussionReplyToBackend(messageId: string, reply: DiscussionReply): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await discussionsAPI.addReply(messageId, {
      id: reply.id,
      content: reply.content,
      replyToNickname: reply.replyToNickname,
    });
  } catch (error) {
    console.warn('同步讨论区回复到后端失败:', error);
  }
}

/** 讨论区回复点赞（后端 toggle） */
export async function syncDiscussionReplyLikeToggleToBackend(replyId: string): Promise<void> {
  if (!hasApiToken()) return;
  try {
    await discussionsAPI.toggleReplyLike(replyId);
  } catch (error) {
    console.warn('同步讨论区回复点赞到后端失败:', error);
  }
}
