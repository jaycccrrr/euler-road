import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BCRYPT_SALT_ROUNDS = 10;

/**
 * 使用 bcryptjs 对密码进行哈希。
 * 注意：此应用在浏览器端使用 IndexedDB，没有真正的服务端。
 * 在浏览器内做哈希只能防止存储明文密码，无法替代服务端认证。
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * 使用 bcryptjs 比较明文密码和存储的哈希。
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * 判断字符串是否为 bcrypt 哈希格式。
 */
export function isBcryptHash(hash: string): boolean {
  return typeof hash === 'string' && hash.startsWith('$2') && hash.length >= 59;
}

/**
 * 旧的弱哈希函数（仅用于一次性迁移）。
 * 新代码不应使用此函数存储密码。
 */
function legacyWeakHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

/**
 * 兼容旧用户数据的一次性校验。
 * 如果密码以明文或旧弱哈希存储，则视为匹配（随后会重新哈希）。
 */
export function legacyComparePassword(password: string, storedHash: string): boolean {
  return storedHash === password || storedHash === legacyWeakHash(password);
}

/**
 * 校验密码强度。
 * 要求至少 8 位，且包含字母和数字。
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  message: string;
} {
  if (password.length < 8) {
    return { valid: false, message: '密码长度至少为8位' };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, message: '密码需同时包含字母和数字' };
  }
  return { valid: true, message: '' };
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  return formatDate(dateString)
}

// 本地日期格式化（YYYY-MM-DD）。不要用 toISOString().split('T')[0]——
// 那是 UTC 日期，北京时间 00:00–08:00 会错算成前一天。
export function formatLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Get today's date string (YYYY-MM-DD)
export function getTodayString(): string {
  return formatLocalDate(new Date())
}

// Check if it's past 5 AM
export function isPastFiveAM(): boolean {
  const now = new Date()
  return now.getHours() >= 5
}

// Get current date's 5 AM timestamp
export function getTodayFiveAM(): Date {
  const date = new Date()
  date.setHours(5, 0, 0, 0)
  return date
}

// Compress image
export async function compressImage(file: File, maxSize: number = 500): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions
        const maxDimension = 1200
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension
            width = maxDimension
          } else {
            width = (width / height) * maxDimension
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        // Compress to JPEG with quality adjustment
        let quality = 0.8
        let dataUrl = canvas.toDataURL('image/jpeg', quality)

        // Reduce quality if still too large
        while (dataUrl.length > maxSize * 1024 && quality > 0.3) {
          quality -= 0.1
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }

        resolve(dataUrl)
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
