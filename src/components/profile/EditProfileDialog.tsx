'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, Image as ImageIcon, Smile, RotateCw, Check, X, ZoomIn, ZoomOut, Move, Trash2 } from 'lucide-react';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentNickname: string;
  currentAvatar: string;
  currentBio?: string;
  currentCoverImage?: string;
  onSave: (data: {
    nickname: string;
    avatar: string;
    bio?: string;
    coverImage?: string;
  }) => Promise<void>;
}

const AVATAR_OPTIONS = ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '👨‍🏫', '👩‍🏫', '🦉', '🦊', '🐱', '🐶', '🦁', '🐯', '🐼', '🐰', '🐸', '🦄', '🐙', '🦋', '🌟', '🔥', '💡', '🎯', '🚀', '⚡'];

// 封面裁剪画幅（3:1）与输出尺寸
const COVER_FRAME = { w: 360, h: 120 };
const COVER_OUT = { w: 1200, h: 400 };

export function EditProfileDialog({
  open,
  onOpenChange,
  currentNickname,
  currentAvatar,
  currentBio = '',
  currentCoverImage = '',
  onSave,
}: EditProfileDialogProps) {
  const [nickname, setNickname] = useState(currentNickname);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [bio, setBio] = useState(currentBio);
  const [coverImage, setCoverImage] = useState(currentCoverImage);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarTab, setAvatarTab] = useState(() =>
    currentAvatar.startsWith('data:') || currentAvatar.startsWith('http') ? 'upload' : 'emoji'
  );
  const [previewUrl, setPreviewUrl] = useState(() =>
    currentAvatar.startsWith('data:') || currentAvatar.startsWith('http') ? currentAvatar : ''
  );

  // 重置状态
  useEffect(() => {
    if (open) {
      setNickname(currentNickname);
      setAvatar(currentAvatar);
      setBio(currentBio);
      setCoverImage(currentCoverImage);
      setAvatarTab(currentAvatar.startsWith('data:') || currentAvatar.startsWith('http') ? 'upload' : 'emoji');
      setPreviewUrl(currentAvatar.startsWith('data:') || currentAvatar.startsWith('http') ? currentAvatar : '');
    }
  }, [open, currentNickname, currentAvatar, currentBio, currentCoverImage]);

  // 裁剪相关状态
  const [cropImage, setCropImage] = useState<string>('');
  const [isCropping, setIsCropping] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // ===== 封面裁剪（固定 3:1 画幅，可拖动 + 缩放） =====
  const [isCoverCropping, setIsCoverCropping] = useState(false);
  const [coverScale, setCoverScale] = useState(1);
  const [coverPos, setCoverPos] = useState({ x: 0, y: 0 });
  const [coverDragging, setCoverDragging] = useState(false);
  const coverDragStart = useRef({ x: 0, y: 0 });
  const coverCanvasRef = useRef<HTMLCanvasElement>(null);
  const coverImgRef = useRef<HTMLImageElement | null>(null);

  // 封面图选择：加载后进入裁剪模式
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        coverImgRef.current = img;
        setIsCoverCropping(true);
        setCoverScale(1);
        setCoverPos({ x: 0, y: 0 });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // 封面铺满画幅的基础缩放（background-size: cover 语义）
  const getCoverBaseScale = useCallback(() => {
    const img = coverImgRef.current;
    if (!img) return 1;
    return Math.max(COVER_FRAME.w / img.width, COVER_FRAME.h / img.height);
  }, []);

  // 绘制裁剪预览
  const drawCoverPreview = useCallback(() => {
    const canvas = coverCanvasRef.current;
    const img = coverImgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { w, h } = COVER_FRAME;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    const base = getCoverBaseScale();
    const dw = img.width * base * coverScale;
    const dh = img.height * base * coverScale;
    ctx.drawImage(img, w / 2 + coverPos.x - dw / 2, h / 2 + coverPos.y - dh / 2, dw, dh);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
  }, [coverScale, coverPos, getCoverBaseScale]);

  useEffect(() => {
    if (isCoverCropping) drawCoverPreview();
  }, [isCoverCropping, drawCoverPreview]);

  // 封面拖拽（限制图片始终铺满画幅）
  const handleCoverMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    coverDragStart.current = { x: clientX - coverPos.x, y: clientY - coverPos.y };
    setCoverDragging(true);
  };

  useEffect(() => {
    if (!coverDragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const img = coverImgRef.current;
      let nx = clientX - coverDragStart.current.x;
      let ny = clientY - coverDragStart.current.y;
      if (img) {
        const base = getCoverBaseScale();
        const dw = img.width * base * coverScale;
        const dh = img.height * base * coverScale;
        const maxX = Math.max(0, (dw - COVER_FRAME.w) / 2);
        const maxY = Math.max(0, (dh - COVER_FRAME.h) / 2);
        nx = Math.max(-maxX, Math.min(maxX, nx));
        ny = Math.max(-maxY, Math.min(maxY, ny));
      }
      setCoverPos({ x: nx, y: ny });
    };
    const handleUp = () => setCoverDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [coverDragging, coverScale, getCoverBaseScale]);

  // 缩放变化时收敛位置，避免露出边缘
  useEffect(() => {
    const img = coverImgRef.current;
    if (!img || !isCoverCropping) return;
    const base = getCoverBaseScale();
    const dw = img.width * base * coverScale;
    const dh = img.height * base * coverScale;
    const maxX = Math.max(0, (dw - COVER_FRAME.w) / 2);
    const maxY = Math.max(0, (dh - COVER_FRAME.h) / 2);
    setCoverPos((p) => ({
      x: Math.max(-maxX, Math.min(maxX, p.x)),
      y: Math.max(-maxY, Math.min(maxY, p.y)),
    }));
  }, [coverScale, isCoverCropping, getCoverBaseScale]);

  // 确认封面裁剪：输出 1200x400 JPEG
  const handleCoverCropConfirm = () => {
    const img = coverImgRef.current;
    if (!img) return;
    const f = COVER_OUT.w / COVER_FRAME.w;
    const canvas = document.createElement('canvas');
    canvas.width = COVER_OUT.w;
    canvas.height = COVER_OUT.h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const base = getCoverBaseScale();
    const dw = img.width * base * coverScale * f;
    const dh = img.height * base * coverScale * f;
    ctx.drawImage(
      img,
      COVER_OUT.w / 2 + coverPos.x * f - dw / 2,
      COVER_OUT.h / 2 + coverPos.y * f - dh / 2,
      dw,
      dh
    );
    setCoverImage(canvas.toDataURL('image/jpeg', 0.85));
    setIsCoverCropping(false);
    setCoverScale(1);
    setCoverPos({ x: 0, y: 0 });
  };

  const handleCoverCropCancel = () => {
    setIsCoverCropping(false);
    setCoverScale(1);
    setCoverPos({ x: 0, y: 0 });
  };

  // 处理文件选择 - 进入裁剪模式
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setCropImage(reader.result as string);
        setIsCropping(true);
        // 重置缩放和位置
        setScale(1);
        setPosition({ x: 0, y: 0 });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 绘制裁剪预览
  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 280;
    canvas.width = size;
    canvas.height = size;

    // 清空画布
    ctx.clearRect(0, 0, size, size);

    // 绘制半透明背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, size, size);

    // 计算图片绘制参数
    const imgSize = Math.min(img.width, img.height);
    const drawSize = size * scale;
    const centerX = size / 2 + position.x;
    const centerY = size / 2 + position.y;

    // 保存上下文
    ctx.save();

    // 创建圆形裁剪区域
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    // 清除圆形区域内的背景
    ctx.clearRect(0, 0, size, size);

    // 绘制图片
    ctx.drawImage(
      img,
      (img.width - imgSize) / 2,
      (img.height - imgSize) / 2,
      imgSize,
      imgSize,
      centerX - drawSize / 2,
      centerY - drawSize / 2,
      drawSize,
      drawSize
    );

    ctx.restore();

    // 绘制边框
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * Math.PI);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [scale, position]);

  // 当参数变化时重绘
  useEffect(() => {
    if (isCropping && cropImage) {
      drawPreview();
    }
  }, [isCropping, cropImage, drawPreview]);

  // 处理鼠标/触摸事件
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 添加/移除全局事件监听
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 缩放控制
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  // 确认裁剪
  const handleCropConfirm = useCallback(() => {
    const img = imageRef.current;
    if (!img) {
      alert('图片未加载');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const size = 200;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        alert('无法创建画布');
        return;
      }

      // 创建圆形裁剪
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      // 计算绘制参数
      const imgSize = Math.min(img.width, img.height);
      const drawSize = size * scale;
      const centerX = size / 2 + position.x * (size / 280);
      const centerY = size / 2 + position.y * (size / 280);

      // 绘制图片
      ctx.drawImage(
        img,
        (img.width - imgSize) / 2,
        (img.height - imgSize) / 2,
        imgSize,
        imgSize,
        centerX - drawSize / 2,
        centerY - drawSize / 2,
        drawSize,
        drawSize
      );

      // 转换为 base64
      const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
      setPreviewUrl(croppedUrl);
      setAvatar(croppedUrl);
      setIsCropping(false);
      setCropImage('');
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } catch (error) {
      console.error('Crop error:', error);
      alert('裁剪失败，请重试');
    }
  }, [scale, position]);

  // 取消裁剪
  const handleCropCancel = () => {
    setIsCropping(false);
    setCropImage('');
    setScale(1);
    setPosition({ x: 0, y: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 触发文件选择
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 重新选择图片
  const handleReselect = () => {
    setPreviewUrl('');
    setAvatar('');
    triggerFileInput();
  };

  // 选择 emoji
  const handleEmojiSelect = (emoji: string) => {
    setAvatar(emoji);
    setPreviewUrl('');
  };

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert('昵称不能为空');
      return;
    }
    if (nickname.length > 20) {
      alert('昵称不能超过20个字符');
      return;
    }
    if (bio.length > 200) {
      alert('个性签名不能超过200个字符');
      return;
    }
    setIsSaving(true);
    try {
      await onSave({
        nickname: nickname.trim(),
        avatar,
        bio: bio.trim(),
        coverImage,
      });
      onOpenChange(false);
    } catch (error) {
      alert('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>编辑个人资料</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
            {/* 头像选择 */}
            <div>
              <label className="text-sm font-medium mb-3 block">选择头像</label>
              <Tabs value={avatarTab} onValueChange={setAvatarTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="emoji" className="flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  表情
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  上传图片
                </TabsTrigger>
              </TabsList>

              <TabsContent value="emoji" className="mt-3">
                <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiSelect(emoji)}
                      className={`w-10 h-10 text-2xl rounded-lg transition-all ${
                        avatar === emoji && !avatar.startsWith('data:') && !avatar.startsWith('http')
                          ? 'bg-purple-100 ring-2 ring-purple-500 scale-110'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-3">
                <div className="space-y-4">
                  {/* 隐藏的文件输入 */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* 裁剪界面 */}
                  {isCropping && cropImage ? (
                    <div className="space-y-3">
                      {/* 裁剪画布 */}
                      <div
                        ref={containerRef}
                        className="relative h-[280px] w-[280px] mx-auto bg-gray-100 rounded-full overflow-hidden cursor-move select-none"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                        style={{ touchAction: 'none' }}
                      >
                        <canvas
                          ref={canvasRef}
                          width={280}
                          height={280}
                          className="w-full h-full"
                        />
                        {/* 拖动提示 */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded-full pointer-events-none">
                          <Move className="w-3 h-3" />
                          拖动移动
                        </div>
                      </div>

                      {/* 缩放控制 */}
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleZoomOut}
                          className="h-9 w-9 p-0"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-gray-600 min-w-[60px] text-center">
                          {Math.round(scale * 100)}%
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleZoomIn}
                          className="h-9 w-9 p-0"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={handleCropCancel}
                        >
                          <X className="w-4 h-4 mr-1" />
                          取消
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                          onClick={handleCropConfirm}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          确认裁剪
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* 上传区域 */}
                      {!previewUrl ? (
                        <div
                          onClick={triggerFileInput}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <ImageIcon className="w-10 h-10 text-gray-400" />
                            <span className="text-sm text-gray-500">点击选择图片</span>
                            <span className="text-xs text-gray-400">支持 JPG、PNG，最大 5MB</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex flex-col items-center gap-3">
                            <img
                              src={previewUrl}
                              alt="预览"
                              className="w-24 h-24 rounded-full object-cover ring-2 ring-purple-500"
                            />
                            <span className="text-sm text-gray-500">头像预览</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={handleReselect}
                            >
                              <RotateCw className="w-4 h-4 mr-1" />
                              重新选择
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 昵称输入 */}
          <div>
            <label className="text-sm font-medium mb-2 block">昵称</label>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入昵称"
              maxLength={20}
            />
            <p className="text-xs text-gray-500 mt-1">{nickname.length}/20</p>
          </div>

          {/* 个性签名 */}
          <div>
            <label className="text-sm font-medium mb-2 block">个性签名</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="写点什么来介绍自己..."
              maxLength={200}
              className="w-full px-3 py-2 border rounded-md text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">{bio.length}/200</p>
          </div>

          {/* 封面背景图 */}
          <div>
            <label className="text-sm font-medium mb-2 block">主页封面</label>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverFileChange}
              className="hidden"
            />
            {isCoverCropping ? (
              <div className="space-y-3">
                {/* 固定画幅裁剪框：拖动调整位置 */}
                <div
                  className="relative mx-auto bg-gray-100 rounded-lg overflow-hidden cursor-move select-none"
                  style={{ width: COVER_FRAME.w, height: COVER_FRAME.h, maxWidth: '100%' }}
                  onMouseDown={handleCoverMouseDown}
                  onTouchStart={handleCoverMouseDown}
                >
                  <canvas ref={coverCanvasRef} className="w-full h-full" />
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 text-white text-[11px] bg-black/50 px-2 py-0.5 rounded-full pointer-events-none">
                    <Move className="w-3 h-3" />
                    拖动调整位置
                  </div>
                </div>

                {/* 缩放控制 */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCoverScale((s) => Math.max(1, +(s - 0.1).toFixed(2)))}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600 min-w-[56px] text-center">
                    {Math.round(coverScale * 100)}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCoverScale((s) => Math.min(3, +(s + 0.1).toFixed(2)))}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleCoverCropCancel}
                  >
                    <X className="w-4 h-4 mr-1" />
                    取消
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                    onClick={handleCoverCropConfirm}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    使用封面
                  </Button>
                </div>
              </div>
            ) : coverImage ? (
              <div className="space-y-2">
                <img
                  src={coverImage}
                  alt="封面预览"
                  className="w-full h-24 object-cover rounded-lg ring-1 ring-slate-200"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    <RotateCw className="w-4 h-4 mr-1" />
                    更换封面
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setCoverImage('')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => coverInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">点击上传封面图</span>
                  <span className="text-xs text-gray-400">展示在你的个人简介页顶部，可拖动缩放调整画面</span>
                </div>
              </div>
            )}
          </div>

          {/* 预览 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">预览</p>
            <div className="flex items-center gap-3">
              {avatar.startsWith('data:') || avatar.startsWith('http') ? (
                <img
                  src={avatar}
                  alt="头像"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl">
                  {avatar}
                </div>
              )}
              <div>
                <span className="font-bold text-lg">{nickname || '未填写'}</span>
                {bio && <p className="text-xs text-gray-500 mt-0.5">{bio}</p>}
              </div>
            </div>
          </div>
        </div>

          {/* 按钮 */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isSaving || isCropping || isCoverCropping}
            >
              取消
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={handleSave}
              disabled={isSaving || isCropping || isCoverCropping}
            >
              {isSaving ? '保存中...' : '保存'}
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}
