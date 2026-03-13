-- 创建关注表
CREATE TABLE IF NOT EXISTS "Follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Follow_followerId_followingId_key" UNIQUE ("followerId", "followingId")
);

-- 添加索引
CREATE INDEX IF NOT EXISTS "Follow_followerId_idx" ON "Follow"("followerId");
CREATE INDEX IF NOT EXISTS "Follow_followingId_idx" ON "Follow"("followingId");

-- 添加外键（先检查是否存在）
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'Follow_followerId_fkey'
    ) THEN
        ALTER TABLE "Follow"
        ADD CONSTRAINT "Follow_followerId_fkey"
        FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'Follow_followingId_fkey'
    ) THEN
        ALTER TABLE "Follow"
        ADD CONSTRAINT "Follow_followingId_fkey"
        FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 添加关注计数字段
ALTER TABLE "User"
    ADD COLUMN IF NOT EXISTS "followingCount" INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "followerCount" INTEGER DEFAULT 0;
