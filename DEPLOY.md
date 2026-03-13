# 后端部署指南

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/) 注册/登录
2. 创建新项目
3. 在 Project Settings -> Database 中找到 Connection String
4. 复制 DATABASE_URL

## 2. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
# Supabase Database URL
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# JWT Secret (生成一个随机字符串)
JWT_SECRET="your-random-secret-minimum-32-characters"

# 可选：用于前端 API 调用
NEXT_PUBLIC_API_URL=""
```

## 3. 初始化数据库

```bash
# 安装 Prisma CLI
npm install -g prisma

# 推送数据库 schema 到 Supabase
npx prisma db push

# 生成 Prisma Client
npx prisma generate
```

## 4. 本地开发

```bash
# 启动开发服务器
npm run dev
```

API 将在 `http://localhost:3000/api` 可用

## 5. 部署到 Vercel

### 5.1 准备代码

确保以下文件已正确配置：
- `prisma/schema.prisma` - 数据库模型
- `.env.local` - 环境变量（本地开发）

### 5.2 部署步骤

1. 推送代码到 GitHub/GitLab
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 Vercel 项目设置中添加环境变量：
   - `DATABASE_URL`
   - `JWT_SECRET`
4. 部署

### 5.3 部署后配置

部署后需要在 Vercel Dashboard 中运行数据库迁移：

```bash
# 在本地连接远程数据库并推送 schema
npx prisma db push
```

或在 Vercel Console 中运行 Build Command：
```bash
npx prisma generate && npx prisma db push && next build
```

## 6. API 端点

### 认证
- `POST /api/auth/login` - 登录
- `POST /api/auth/register` - 注册
- `GET /api/auth/me` - 获取当前用户
- `PATCH /api/auth/me` - 更新用户信息

### 每日一题
- `GET /api/questions/today` - 获取今日题目
- `GET /api/questions` - 获取历史题目（分页）
- `GET /api/questions/[id]` - 获取题目详情

### 答题
- `POST /api/answers` - 提交答案
- `GET /api/answers` - 获取答题记录

### 社区
- `GET /api/posts` - 获取帖子列表
- `POST /api/posts` - 创建帖子

### 排行榜
- `GET /api/leaderboard` - 获取排行榜

## 7. 前端迁移

将 IndexedDB 数据迁移到后端 API：

1. 替换 `useAuth` hook 中的本地存储为 API 调用
2. 替换 `useDailyQuestion` hook 中的 IndexedDB 为 API 调用
3. 移除 `lib/db.ts` 中的 IndexedDB 代码

## 8. 性能优化

### 数据库索引
已在 Prisma schema 中定义索引：
- `DailyQuestion.date`
- `DailyQuestion.moduleId`
- `AnswerRecord.userId`
- `AnswerRecord.questionId`
- `Post.moduleId`
- `Post.createdAt`

### 缓存策略
- 使用 Next.js ISR 缓存静态页面
- 使用 React Query 或 SWR 缓存 API 数据
- 考虑添加 Redis 缓存（数据量大时）

## 9. 监控

在 Vercel Dashboard 中可以监控：
- API 响应时间
- 错误率
- 数据库连接数

## 10. 费用估算

**Supabase 免费版：**
- 500MB 数据库
- 2GB 带宽
- 足够支持 1000+ 用户

**Vercel 免费版：**
- 100GB 带宽
- 无服务器函数执行时间限制
- 足够支持中小型应用

当用户量增长时，可考虑升级到付费计划。
