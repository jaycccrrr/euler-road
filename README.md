# 欧拉之路 · Euler Road

以实践驱动数学认知的数学学习平台：每天一道精选数学题，配套结构化讲义、题库笔记与社区交流，让学习保持节奏、步步可循。

在线体验：[https://euler-road.vercel.app](https://euler-road.vercel.app)

## 核心功能

- **每日挑战** — 每天 5:00 更新，高中数学、高等数学、线性代数三科题目轮换，当天作答、即时评分
- **AI 判卷** — 答题由 DeepSeek 自动批改并给出分数与中文评语（未配置 API Key 时自动降级为本地判分）
- **知识模块** — 概念、例题、习题层层递进的讲义体系，从基础到进阶有迹可循
- **题库 · 笔记** — 题库按考点索引，支持个人笔记、题目收藏与帖子收藏
- **π 力成长** — 连续作答积累 π 力，称号与头像框见证坚持
- **社区交流** — 发帖、评论、点赞、关注、私信与每日一题讨论区，让答案因交流而更完整
- **账号云同步** — 注册登录后，答题记录、帖子、评论、私信等数据同步至云端，跨设备可用（本地数据自动兜底）

## 技术栈

- [Next.js](https://nextjs.org/) 16（App Router + API Routes，部署于 Vercel）
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 + [shadcn/ui](https://ui.shadcn.com/)
- [KaTeX](https://katex.org/) 数学公式渲染
- [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)（`idb`）本地优先存储，写入后自动同步云端
- [Zustand](https://zustand-demo.pmnd.rs/) 状态管理
- [Prisma](https://www.prisma.io/) + [Supabase](https://supabase.com/) PostgreSQL
- JWT + bcrypt 用户认证
- DeepSeek AI 判卷（服务端调用）

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可。

## 环境变量

复制 `.env.example` 为 `.env.local` 并填入实际值（本地运行需要，`.env*` 已被 git 忽略，不会上传）：

| 变量 | 必填 | 说明 |
|---|---|---|
| `DATABASE_URL` | 是 | Supabase Postgres 连接串（建议使用会话连接池，见下方说明） |
| `JWT_SECRET` | 是 | 至少 32 位随机字符串，用于 API 认证签名 |
| `DEEPSEEK_API_KEY` | 否 | DeepSeek API Key，用于 AI 判卷（缺失时自动降级本地判分） |
| `VISION_API_KEY` | 否 | 阿里云百炼 API Key，用于识图判卷（识别手写图片作答；为空则自动降级为文本判卷） |
| `VISION_MODEL` | 否 | 识图判卷模型，默认 `qwen-vl-plus`（Qwen3-VL-Plus） |
| `NEXT_PUBLIC_SUPABASE_URL` | 否 | Supabase 项目地址（客户端直连/云同步用） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 否 | Supabase anon key（客户端直连/云同步用） |

> 数据库连接串建议使用 Supabase **会话连接池（Session pooler，端口 5432）**：
> `postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1`
> 直连域名（`db.<ref>.supabase.co`）可能仅提供 IPv6，导致部分网络无法连接。

## 数据库初始化

首次部署前需在本地初始化数据库表结构：

```bash
npx prisma db push
```

每次修改 `prisma/schema.prisma` 后重新执行该命令即可（本地与线上共用同一个 Supabase 数据库，改动直接生效）。

## 构建与部署

```bash
npm run build   # 本地构建验证
```

线上部署使用 **Vercel**（支持 API Routes）：

1. 在 [Vercel](https://vercel.com) 导入本仓库（Framework 选 Next.js）
2. 在 Vercel 项目 Settings → Environment Variables 配置上表环境变量（至少 `DATABASE_URL`、`JWT_SECRET`）
3. 推送 `main` 分支即自动构建部署

> 提示：如果你的网络直连 GitHub 不稳定，可以为本机 git 配置代理后推送，例如
> `git -c http.proxy=http://127.0.0.1:7897 push origin main`。

## 后端 API 一览

接口位于 `src/app/api/`，主要分组：

- `/api/auth/*` — 注册、登录、当前用户、资料更新
- `/api/answers*` — 答题提交（AI 判卷）、答题记录、修改/删除、答案评论与点赞
- `/api/posts*` — 帖子列表/发布/编辑/删除、帖子评论与点赞
- `/api/messages*` — 私信发送、聊天记录、会话列表
- `/api/questions*` — 题目查询与每日一题、题目讨论区
- `/api/users/*` — 用户信息、关注/粉丝、用户搜索
- `/api/health` — 健康检查（数据库连通性）

## 数据存储说明

采用「本地优先 + 云端同步」架构：所有数据先写入浏览器 IndexedDB 保证即时可用，登录态下写入后自动同步到 Supabase；打开相关页面时再从云端拉取并合并，实现跨设备数据一致。未登录或后端不可用时，网站仍可完全本地使用。

## 目录结构

```
src/app/          页面与路由（含 src/app/api 后端接口）
src/components/   组件（UI、动画、模块内容等）
src/data/         讲义与题目数据
src/hooks/        状态管理与业务逻辑
src/lib/          工具库（数据层、API 客户端、云端同步、评分等）
prisma/           Prisma schema（数据库模型）
public/           静态资源（图片等）
scripts/          数据处理与维护脚本
```
