// IP定位服务 - 免费方案
// 使用 ipapi.co 免费服务 (无需API key，有速率限制)

import { updateUser } from './db';
import { User } from '@/types';

export interface IPLocation {
  ip: string;
  city: string;
  region: string; // 省份
  country_name: string;
  latitude: number;
  longitude: number;
}

// 省份映射表 (将API返回的省份名称映射到系统内的标准名称)
const PROVINCE_MAP: Record<string, string> = {
  'Beijing': '北京',
  'Shanghai': '上海',
  'Tianjin': '天津',
  'Chongqing': '重庆',
  'Guangdong': '广东',
  'Jiangsu': '江苏',
  'Zhejiang': '浙江',
  'Shandong': '山东',
  'Henan': '河南',
  'Sichuan': '四川',
  'Hubei': '湖北',
  'Hunan': '湖南',
  'Hebei': '河北',
  'Fujian': '福建',
  'Anhui': '安徽',
  'Jiangxi': '江西',
  'Shaanxi': '陕西',
  'Liaoning': '辽宁',
  'Heilongjiang': '黑龙江',
  'Jilin': '吉林',
  'Yunnan': '云南',
  'Guizhou': '贵州',
  'Gansu': '甘肃',
  'Hainan': '海南',
  'Taiwan': '台湾',
  'Hong Kong': '香港',
  'Macao': '澳门',
  'Inner Mongolia': '内蒙古',
  'Guangxi': '广西',
  'Tibet': '西藏',
  'Ningxia': '宁夏',
  'Xinjiang': '新疆',
  'Qinghai': '青海',
  'Shanxi': '山西',
};

// 获取IP定位信息
export async function getLocationByIP(): Promise<IPLocation | null> {
  try {
    // 使用 ipapi.co (免费，无需key，每月15000次请求)
    const response = await fetch('https://ipapi.co/json/');

    if (!response.ok) {
      throw new Error('IP定位请求失败');
    }

    const data = await response.json();

    // 检查是否在中国
    if (data.country_code !== 'CN') {
      console.log('检测到非中国IP，使用默认位置');
      return {
        ip: data.ip,
        city: data.city || '北京',
        region: '北京',
        country_name: data.country_name,
        latitude: data.latitude || 39.9,
        longitude: data.longitude || 116.4,
      };
    }

    // 映射省份名称
    const region = PROVINCE_MAP[data.region] || data.region || '北京';

    return {
      ip: data.ip,
      city: data.city,
      region: region,
      country_name: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('IP定位失败:', error);
    return null;
  }
}

// 备用方案：使用 ipinfo.io
export async function getLocationByIPBackup(): Promise<IPLocation | null> {
  try {
    const response = await fetch('https://ipinfo.io/json');

    if (!response.ok) {
      throw new Error('备用IP定位请求失败');
    }

    const data = await response.json();

    // ipinfo.io 返回的 region 是省份缩写，需要处理
    const regionName = data.region || '';
    const mappedRegion = PROVINCE_MAP[regionName] || regionName || '北京';

    return {
      ip: data.ip,
      city: data.city || '未知',
      region: mappedRegion,
      country_name: data.country || 'China',
      latitude: 0,
      longitude: 0,
    };
  } catch (error) {
    console.error('备用IP定位失败:', error);
    return null;
  }
}

// 更新用户位置到数据库
export async function updateUserLocationToDB(
  user: User,
  location: { province: string; city?: string; lat?: number; lng?: number }
): Promise<boolean> {
  try {
    const updatedUser = {
      ...user,
      location: {
        province: location.province,
        city: location.city,
        updatedAt: new Date().toISOString(),
      },
    };

    await updateUser(updatedUser);
    return true;
  } catch (error) {
    console.error('更新用户位置失败:', error);
    return false;
  }
}

// 客户端检测并更新位置
export async function detectAndUpdateLocation(
  user: User,
  updateUserLocation: (province: string, city?: string) => Promise<void>
): Promise<{ province: string; isUpdated: boolean } | null> {
  // 如果已有位置信息，不强制更新
  if (user.location?.province && user.location.province !== '未知') {
    return { province: user.location.province, isUpdated: false };
  }

  // 获取IP定位
  let location = await getLocationByIP();

  // 如果主要方案失败，尝试备用方案
  if (!location) {
    location = await getLocationByIPBackup();
  }

  if (!location) {
    return null;
  }

  // 更新到数据库
  try {
    await updateUserLocation(location.region, location.city);
    return {
      province: location.region,
      isUpdated: true,
    };
  } catch (error) {
    console.error('更新位置失败:', error);
    return null;
  }
}
