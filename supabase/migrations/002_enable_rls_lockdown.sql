-- 欧拉之路 Supabase 安全收紧迁移
-- 在 Supabase Dashboard → SQL Editor 中执行本文件
--
-- 背景：Supabase 会将 public schema 的所有表通过 PostgREST 暴露给
-- anon key（公开在前端 JS 中）。Prisma 通过 db push 创建的表默认不启用
-- RLS，存在被 anon key 直接读写业务数据（用户、私信等）的风险。
--
-- 本迁移对 public schema 的所有业务表启用 RLS（不创建任何策略 =
-- anon/authenticated 角色全拒），并收回表级权限作为双保险。
--
-- 不影响 Next.js API 后端：Prisma 使用 DATABASE_URL 中的 postgres
-- 角色（表所有者，绕过 RLS），只有公开的 anon 访问会被拒。
--
-- 注意：Storage 桶 math-images（帖子/头像图片上传）不受影响，
-- 其访问由 Storage 自身的 bucket 策略控制。

-- 1. 对所有业务表启用 RLS（无策略 = 拒绝 anon/authenticated 的一切访问）
do $$
declare t record;
begin
  for t in select tablename from pg_tables
           where schemaname = 'public'
             and tablename <> '_prisma_migrations'
  loop
    execute format('alter table public.%I enable row level security', t.tablename);
  end loop;
end $$;

-- 2. 显式收回 anon / authenticated 角色的表级权限（RLS 之外的双保险）
revoke all on all tables in schema public from anon, authenticated;

-- 3. 验证：所有业务表 rowsecurity 应为 t
select tablename, rowsecurity from pg_tables where schemaname = 'public';
