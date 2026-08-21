import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let cachedJwtSecret: string | null = null;
// 按需加载：仅生成/校验令牌时才需要密钥，避免未配置时拖垮无关接口（如匿名判卷）
function getJwtSecret(): string {
  if (!cachedJwtSecret) {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
      throw new Error('JWT_SECRET 未配置或长度不足 32 字符，请在环境变量中设置后重启服务');
    }
    cachedJwtSecret = secret;
  }
  return cachedJwtSecret;
}
const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}

export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export function getAuthUserId(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader);
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.userId || null;
}
