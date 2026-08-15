'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MapPin, LocateFixed } from 'lucide-react';
import { PROVINCES, Province } from '@/lib/gamification';
import { useAuth } from '@/hooks/useAuth';

interface LocationSettingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationSettingDialog({ open, onOpenChange }: LocationSettingDialogProps) {
  const { user, updateUserLocation } = useAuth();
  const [selectedProvince, setSelectedProvince] = useState<Province>('北京');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.location?.province) {
      setSelectedProvince(user.location.province as Province);
    }
  }, [user, open]);

  // 自动检测位置
  const detectLocation = async () => {
    setIsDetecting(true);
    setDetectError(null);

    if (!navigator.geolocation) {
      setDetectError('您的浏览器不支持地理定位');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // 使用百度地图API或其他地理编码服务
          // 这里使用简单的模拟，实际项目中应该调用真实的地理编码API
          const { latitude, longitude } = position.coords;

          // 模拟：根据经纬度获取省份（实际应该调用API）
          // 这里简单地随机选择一个省份作为演示
          const detectedProvince = await reverseGeocode(latitude, longitude);

          if (detectedProvince) {
            setSelectedProvince(detectedProvince);
          } else {
            setDetectError('无法识别您的位置，请手动选择');
          }
        } catch (error) {
          setDetectError('定位失败，请手动选择');
        }
        setIsDetecting(false);
      },
      (error) => {
        setDetectError('获取位置失败，请手动选择');
        setIsDetecting(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // 逆地理编码（模拟）
  const reverseGeocode = async (lat: number, lng: number): Promise<Province | null> => {
    // 实际项目中应该调用百度地图或高德地图API
    // 例如：http://api.map.baidu.com/reverse_geocoding/v3/?ak=YOUR_AK&output=json&coordtype=wgs84ll&location=lat,lng

    // 这里模拟返回一个省份
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟根据经纬度返回省份（实际应该根据API返回）
        resolve('北京');
      }, 1000);
    });
  };

  const handleSave = async () => {
    await updateUserLocation(selectedProvince);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            设置你的位置
          </DialogTitle>
          <DialogDescription>
            设置位置后可以参与全省π力排行榜，争夺「XX欧拉」称号
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* 自动定位按钮 */}
          <Button
            variant="outline"
            className="w-full"
            onClick={detectLocation}
            disabled={isDetecting}
          >
            <LocateFixed className="w-4 h-4 mr-2" />
            {isDetecting ? '定位中...' : '自动定位'}
          </Button>

          {detectError && (
            <p className="text-sm text-red-500 text-center">{detectError}</p>
          )}

          <div className="text-sm text-slate-500 text-center">或手动选择</div>

          {/* 省份选择 */}
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-2">
            {PROVINCES.map((province) => (
              <Button
                key={province}
                variant={selectedProvince === province ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedProvince(province)}
                className="text-xs"
              >
                {province}
              </Button>
            ))}
          </div>

          {/* 当前选择 */}
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-sm text-slate-500 mb-1">已选择</div>
            <div className="text-xl font-bold text-purple-600">{selectedProvince}</div>
          </div>

          {/* 保存按钮 */}
          <Button onClick={handleSave} className="w-full">
            保存位置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
