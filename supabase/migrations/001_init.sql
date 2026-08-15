-- 欧拉之路 Supabase 初始化迁移
-- 在 Supabase Dashboard → SQL Editor 中执行本文件
--
-- 设计说明：采用 jsonb 镜像表结构，每张表 = id 主键 + 少量索引列 + data(jsonb 完整文档)。
-- 与前端 IndexedDB 的对象仓库一一对应，TypeScript 类型零改动。
--
-- 安全说明：当前应用使用自定义昵称+密码认证（非 Supabase Auth），
-- 因此 RLS 策略为完全放开。任何持有 anon key 的人都能读写全部数据。
-- 后续迁移到 Supabase Auth 后，应收紧为按用户隔离的策略。

-- ============ 用户 ============
create table if not exists users (
  id text primary key,
  nickname text unique,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- ============ 每日一题 ============
create table if not exists daily_questions (
  id text primary key,
  date text,
  module_id text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_daily_questions_date on daily_questions (date);

-- ============ 答题记录 ============
create table if not exists answer_records (
  id text primary key,
  user_id text,
  question_id text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_answer_records_user on answer_records (user_id);
create index if not exists idx_answer_records_question on answer_records (question_id);

-- ============ 社区帖子 ============
create table if not exists posts (
  id text primary key,
  user_id text,
  module_id text,
  created_at text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_posts_created_at on posts (created_at desc);

-- ============ 帖子评论 ============
create table if not exists comments (
  id text primary key,
  post_id text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_comments_post on comments (post_id);

-- ============ 私信 ============
create table if not exists messages (
  id text primary key,
  sender_id text,
  receiver_id text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_messages_receiver on messages (receiver_id);

-- ============ 笔记 ============
create table if not exists notes (
  id text primary key,
  user_id text,
  module_id text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_notes_user on notes (user_id);

-- ============ 导入课时 ============
create table if not exists custom_lessons (
  id text primary key,
  module_id text,
  status text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- ============ RLS：全部放开（自定义认证下的权宜方案） ============
alter table users enable row level security;
alter table daily_questions enable row level security;
alter table answer_records enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table messages enable row level security;
alter table notes enable row level security;
alter table custom_lessons enable row level security;

create policy "public all" on users for all using (true) with check (true);
create policy "public all" on daily_questions for all using (true) with check (true);
create policy "public all" on answer_records for all using (true) with check (true);
create policy "public all" on posts for all using (true) with check (true);
create policy "public all" on comments for all using (true) with check (true);
create policy "public all" on messages for all using (true) with check (true);
create policy "public all" on notes for all using (true) with check (true);
create policy "public all" on custom_lessons for all using (true) with check (true);

-- ============ Realtime：为私信开启（好友聊天用） ============
alter publication supabase_realtime add table messages;
