# 欧拉之路 · Euler Road

以实践驱动数学认知的数学学习平台：每天一道精选数学题，配套结构化讲义、题库笔记与社区交流，让学习保持节奏、步步可循。

在线体验：[https://jaycccrrr.github.io/euler-road/](https://jaycccrrr.github.io/euler-road/)

## 核心功能

- **每日挑战** — 每天 5:00 更新，高中数学、高等数学、线性代数三科题目轮换，当天作答、即时评分
- **知识模块** — 概念、例题、习题层层递进的讲义体系，从基础到进阶有迹可循
- **题库 · 笔记** — 题库按考点索引，支持个人笔记与收藏，把练习沉淀为专属复习路径
- **π 力成长** — 连续作答积累 π 力，称号与头像框见证坚持
- **社区交流** — 分享解法与笔记，让答案因交流而更完整

## 技术栈

- [Next.js](https://nextjs.org/) 16（静态导出 `output: 'export'`）
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 + [shadcn/ui](https://ui.shadcn.com/)
- [KaTeX](https://katex.org/) 数学公式渲染
- [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)（`idb`）本地数据存储
- [Zustand](https://zustand-demo.pmnd.rs/) 状态管理
- [Prisma](https://www.prisma.io/)（schema 已定义，后端 API 暂未启用）

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可。

## 构建

```bash
npm run build
```

静态导出产物输出到 `dist5/`。

## 部署

### 方式一：Vercel（推荐，支持后端 API）

1. 在 [Vercel](https://vercel.com) 导入本仓库（Framework 选 Next.js）
2. 在 Vercel 项目 Settings → Environment Variables 配置：

| 变量 | 说明 |
|---|---|
| `DATABASE_URL` | Supabase Postgres 连接串（Project Settings → Database） |
| `JWT_SECRET` | 至少 32 位随机字符串，用于 API 认证 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目地址（可选，用于客户端直连） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key（可选） |

3. 数据库初始化：在本地或 Vercel 构建环境中执行 `npx prisma migrate deploy`（首次 `prisma db push`）
4. 推送 `main` 分支即自动部署

### 方式二：GitHub Pages（纯静态，无后端）

如需回到静态导出，取消 [next.config.ts](next.config.ts) 中 `output: 'export'` 的注释，并恢复 Pages 部署工作流。

> 在线地址（静态版）：[https://jaycccrrr.github.io/euler-road/](https://jaycccrrr.github.io/euler-road/)

## 数据存储说明

所有学习数据（用户、答题记录、笔记、收藏等）默认保存在浏览器本地（IndexedDB），无需后端即可使用。

后端数据库连接等环境变量说明见 [DEPLOY.md](DEPLOY.md)。

## 目录结构

```
src/app/          页面与路由
src/components/   组件（UI、动画、模块内容等）
src/data/         讲义与题目数据
src/hooks/        状态管理与业务逻辑
src/lib/          工具库（数据层、评分、题目生成等）
public/           静态资源（图片等）
scripts/          数据处理与维护脚本
.github/          GitHub Actions 工作流
```
