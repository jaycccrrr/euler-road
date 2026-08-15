'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  HelpCircle,
  FileText,
  MessageSquare,
  Lightbulb,
  Hash,
  X,
  Image as ImageIcon,
  MapPin,
  Smile,
  BarChart3,
  AtSign,
  Bold,
  Italic,
  Quote,
  Code,
  List,
  ListOrdered,
  Heading2,
  Calculator,
  ChevronDown,
  Eye,
  Loader2,
  Save,
  Send,
  Clock,
  Users,
  Lock,
  Globe,
  Search,
  Type,
  Palette,
  ChevronUp,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { PostType, CommentPermission, Poll, Post } from '@/types';
import { HOT_TOPICS, searchTopics, getRecommendedTopics } from '@/lib/topics';
import { generateId } from '@/lib/utils';
import { compressImageToBlob, revokeImageUrl } from '@/lib/image';
import { uploadImage, isStorageAvailable } from '@/lib/storage';
import { PollCreator } from './PollCreator';
import { TopicSelector } from './TopicSelector';

interface PendingImage {
  blob: Blob;
  previewUrl: string;
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

interface PostEditorProps {
  user: {
    id: string;
    nickname: string;
    avatar: string;
  };
  onSubmit: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'likedBy' | 'comments'>) => void;
  onSaveDraft?: (draft: Partial<Post>) => void;
  initialType?: PostType;
}

const POST_TYPE_CONFIG: Record<PostType, {
  icon: React.ReactNode;
  label: string;
  titlePlaceholder: string;
  contentPlaceholder: string;
  showTitle: boolean;
  showTopics: boolean;
  showPoll: boolean;
}> = {
  question: {
    icon: <HelpCircle className="w-4 h-4" />,
    label: '提问题',
    titlePlaceholder: '写下你的问题，准确地描述问题更容易得到解答',
    contentPlaceholder: '补充问题细节...\n\n• 问题的背景是什么？\n• 你已经尝试过哪些方法？\n• 你期望的结果是什么？',
    showTitle: true,
    showTopics: true,
    showPoll: true,
  },
  article: {
    icon: <FileText className="w-4 h-4" />,
    label: '写文章',
    titlePlaceholder: '请输入标题（最多 100 字）',
    contentPlaceholder: '开始创作你的文章...\n\n支持 Markdown 格式：\n- 使用 **粗体** 或 *斜体*\n- 插入代码块和公式\n- 添加图片',
    showTitle: true,
    showTopics: true,
    showPoll: false,
  },
  answer: {
    icon: <MessageSquare className="w-4 h-4" />,
    label: '写回答',
    titlePlaceholder: '回答标题',
    contentPlaceholder: '写下你的回答...\n\n• 提供清晰的解释\n• 可以包含公式推导\n• 适当配图说明',
    showTitle: false,
    showTopics: false,
    showPoll: false,
  },
  thought: {
    icon: <Lightbulb className="w-4 h-4" />,
    label: '发想法',
    titlePlaceholder: '添加标题（可选）',
    contentPlaceholder: '分享你的灵感、思考或见闻...\n\n想法可以是：\n- 学习心得\n- 数学趣闻\n- 问题讨论\n- 资源分享',
    showTitle: true,
    showTopics: true,
    showPoll: true,
  },
};

const EMOJIS = ['😀', '😂', '🤔', '👍', '👎', '❤️', '🎉', '😍', '😭', '😡', '🤯', '💡', '📚', '✅', '❌', '⭐', '🔥', '💯'];

// 字体颜色选项
const TEXT_COLORS = [
  { name: '默认', value: '', class: 'text-gray-900' },
  { name: '红色', value: '#ef4444', class: 'text-red-500' },
  { name: '橙色', value: '#f97316', class: 'text-orange-500' },
  { name: '黄色', value: '#eab308', class: 'text-yellow-500' },
  { name: '绿色', value: '#22c55e', class: 'text-green-500' },
  { name: '蓝色', value: '#3b82f6', class: 'text-blue-500' },
  { name: '紫色', value: '#a855f7', class: 'text-purple-500' },
  { name: '粉色', value: '#ec4899', class: 'text-pink-500' },
];

// 字体大小选项
const FONT_SIZES = [
  { name: '正常', value: '', tag: '' },
  { name: '大', value: 'text-lg', tag: 'large' },
  { name: '超大', value: 'text-xl', tag: 'xlarge' },
  { name: '标题', value: 'text-2xl', tag: 'heading' },
];

export function PostEditor({ user, onSubmit, onSaveDraft, initialType = 'question' }: PostEditorProps) {
  const [postType, setPostType] = useState<PostType>(initialType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [images, setImages] = useState<PendingImage[]>([]);
  const [poll, setPoll] = useState<Poll | undefined>();
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [commentPermission, setCommentPermission] = useState<CommentPermission>('all');
  const [isPublic, setIsPublic] = useState(true);
  const [location, setLocation] = useState<{ province: string; city?: string } | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [moduleId, setModuleId] = useState('general');

  // 编辑器折叠状态
  const [isEditorExpanded, setIsEditorExpanded] = useState(true);
  const [currentColor, setCurrentColor] = useState('');
  const [currentFontSize, setCurrentFontSize] = useState('');

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const config = POST_TYPE_CONFIG[postType];

  // 字数统计
  const charCount = content.length;
  const maxCharCount = 20000;

  // 处理图片上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: PendingImage[] = [];
    for (const file of Array.from(files).slice(0, 9 - images.length)) {
      try {
        const compressed = await compressImageToBlob(file, { maxWidth: 1200, quality: 0.8 });
        newImages.push({ blob: compressed.blob, previewUrl: compressed.previewUrl });
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }
    setImages((prev) => [...prev, ...newImages]);
  };

  // 删除图片
  const removeImage = (index: number) => {
    const removed = images[index];
    if (removed) revokeImageUrl(removed.previewUrl);
    setImages(images.filter((_, i) => i !== index));
  };

  // 插入格式
  const insertFormat = (format: string, value?: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText = '';
    switch (format) {
      case 'bold':
        newText = `**${selectedText || '粗体文字'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || '斜体文字'}*`;
        break;
      case 'heading':
        newText = `\n## ${selectedText || '标题'}\n`;
        break;
      case 'quote':
        newText = `\n> ${selectedText || '引用内容'}\n`;
        break;
      case 'code':
        newText = `\n\`\`\`\n${selectedText || '代码块'}\n\`\`\`\n`;
        break;
      case 'list':
        newText = `\n- ${selectedText || '列表项'}\n- 列表项\n- 列表项\n`;
        break;
      case 'ordered':
        newText = `\n1. ${selectedText || '列表项'}\n2. 列表项\n3. 列表项\n`;
        break;
      case 'formula':
        newText = `$${selectedText || 'E=mc^2'}$`;
        break;
      case 'color':
        newText = `<span style="color:${value}">${selectedText || '彩色文字'}</span>`;
        break;
      case 'size':
        const sizeMap: Record<string, string> = {
          'text-lg': '<big>大字体文字</big>',
          'text-xl': '<span style="font-size:1.25em">超大字体</span>',
          'text-2xl': '<h3>标题文字</h3>',
        };
        newText = sizeMap[value || ''] || selectedText;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + newText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 处理@提及
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursor = e.target.selectionStart;
    setContent(value);
    setCursorPosition(cursor);

    // 检测@符号
    const lastChar = value.substring(cursor - 1, cursor);
    if (lastChar === '@') {
      setShowMentionPopover(true);
      setMentionSearch('');
    } else if (showMentionPopover) {
      // 检查是否还在@范围内
      const beforeCursor = value.substring(0, cursor);
      const lastAtIndex = beforeCursor.lastIndexOf('@');
      if (lastAtIndex === -1) {
        setShowMentionPopover(false);
      } else {
        const search = beforeCursor.substring(lastAtIndex + 1);
        if (search.includes(' ') || search.includes('\n')) {
          setShowMentionPopover(false);
        } else {
          setMentionSearch(search);
        }
      }
    }
  };

  // 插入提及
  const insertMention = (nickname: string) => {
    const beforeCursor = content.substring(0, cursorPosition);
    const lastAtIndex = beforeCursor.lastIndexOf('@');
    const newContent =
      content.substring(0, lastAtIndex) +
      `@${nickname} ` +
      content.substring(cursorPosition);
    setContent(newContent);
    setShowMentionPopover(false);
  };

  // 插入表情
  const insertEmoji = (emoji: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newContent = content.substring(0, start) + emoji + content.substring(start);
    setContent(newContent);
  };

  // 处理发布
  const handleSubmit = async () => {
    if (isSubmitting) return;

    // 验证
    if (!title.trim() && config.showTitle) {
      return;
    }
    if (!content.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 上传图片到云存储（或降级为 base64）
      let imageUrls: string[] = [];
      if (images.length > 0) {
        if (isStorageAvailable()) {
          imageUrls = await Promise.all(
            images.map((img) => uploadImage(img.blob, 'posts'))
          );
        } else {
          imageUrls = await Promise.all(
            images.map((img) => blobToBase64(img.blob))
          );
        }
      }

      const post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'likedBy' | 'comments'> = {
        userId: user.id,
        userNickname: user.nickname,
        userAvatar: user.avatar,
        moduleId,
        postType,
        title: title.trim(),
        content: content.trim(),
        topics: config.showTopics ? topics : [],
        images: imageUrls,
        location,
        commentPermission,
        poll: config.showPoll ? poll : undefined,
        mentions: [],
      };

      await onSubmit(post);

      // 清理预览 URL
      images.forEach((img) => revokeImageUrl(img.previewUrl));

      // 重置表单
      setTitle('');
      setContent('');
      setTopics([]);
      setImages([]);
      setPoll(undefined);
      setShowPollCreator(false);
      setLocation(undefined);
    } catch (err) {
      console.error('发布帖子失败:', err);
      setSubmitError('发布失败，请重试。若多次失败可尝试刷新页面');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 保存草稿
  const handleSaveDraft = () => {
    onSaveDraft?.({
      postType,
      title: title.trim(),
      content: content.trim(),
      topics,
      images: images.map((img) => img.previewUrl),
      poll,
      location,
    });
  };

  // 是否可以提交
  const canSubmit = content.trim().length > 0 && (!config.showTitle || title.trim().length > 0);

  return (
    <div className="bg-white rounded-lg border shadow-sm relative max-w-6xl mx-auto">
      {/* 提交加载遮罩 */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-lg">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
          <p className="text-gray-600 font-medium">正在发布...</p>
          <p className="text-gray-400 text-sm mt-1">请稍候</p>
        </div>
      )}

      {/* 类型切换标签 */}
      <div className="border-b px-4 py-3">
        <Tabs value={postType} onValueChange={(v) => setPostType(v as PostType)}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            {(Object.keys(POST_TYPE_CONFIG) as PostType[]).map((type) => (
              <TabsTrigger key={type} value={type} className="flex items-center gap-1.5">
                {POST_TYPE_CONFIG[type].icon}
                <span className="hidden sm:inline">{POST_TYPE_CONFIG[type].label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 space-y-4">
        {/* 模块选择 */}
        <div className="flex items-center gap-2">
          <Select value={moduleId} onValueChange={(v) => setModuleId(v || '')}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择板块" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">综合讨论</SelectItem>
              <SelectItem value="highschool-math">高中数学</SelectItem>
              <SelectItem value="advanced-math">高等数学</SelectItem>
              <SelectItem value="linear-algebra">线性代数</SelectItem>
              <SelectItem value="probability">概率统计</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 话题选择 */}
        {config.showTopics && (
          <TopicSelector
            selectedTopics={topics}
            onTopicsChange={setTopics}
            maxTopics={5}
          />
        )}

        {/* 标题输入 */}
        {config.showTitle && (
          <Input
            placeholder={config.titlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0 placeholder:text-gray-400"
            maxLength={100}
          />
        )}

        {/* 富文本编辑区 */}
        <div className="relative">
          {/* 编辑器折叠按钮 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Type className="w-4 h-4" />
              <span>内容编辑</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => setIsEditorExpanded(!isEditorExpanded)}
            >
              {isEditorExpanded ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  收起编辑器
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  展开编辑器
                </>
              )}
            </Button>
          </div>

          {/* 工具栏 - 可折叠 */}
          <div className={`overflow-hidden transition-all duration-300 ${isEditorExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-wrap items-center gap-1 p-2 border rounded-t-lg bg-gray-50">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('bold')}
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>粗体</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('italic')}
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>斜体</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="w-px h-4 bg-gray-300 mx-1" />

              {/* 字体颜色选择器 */}
              <Popover>
                <PopoverTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Palette className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>文字颜色</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {TEXT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => insertFormat('color', color.value)}
                        className={`w-8 h-8 rounded flex items-center justify-center hover:bg-gray-100 ${color.class}`}
                        title={color.name}
                      >
                        A
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* 字体大小选择器 */}
              <Popover>
                <PopoverTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs font-bold"
                        >
                          Aa
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>字体大小</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-1">
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => insertFormat('size', size.value)}
                      className="w-full px-3 py-1.5 text-left hover:bg-gray-100 rounded text-sm"
                    >
                      <span className={size.value}>{size.name}</span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>

              <div className="w-px h-4 bg-gray-300 mx-1" />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('heading')}
                    >
                      <Heading2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>标题</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('quote')}
                    >
                      <Quote className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>引用</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('code')}
                    >
                      <Code className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>代码块</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('formula')}
                    >
                      <Calculator className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>插入公式</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="w-px h-4 bg-gray-300 mx-1" />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>无序列表</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertFormat('ordered')}
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>有序列表</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex-1" />

              {/* 表情选择 */}
              <Popover>
                <PopoverTrigger>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Smile className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-6 gap-1">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => insertEmoji(emoji)}
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <span className={`text-xs ${charCount > maxCharCount ? 'text-red-500' : 'text-gray-400'}`}>
                {charCount}/{maxCharCount}
              </span>
            </div>
          </div>

          {/* 文本输入区 */}
          <div className="relative">
            <Textarea
              ref={contentRef}
              placeholder={config.contentPlaceholder}
              value={content}
              onChange={handleContentChange}
              className={`${isEditorExpanded ? 'rounded-t-none border-t-0' : 'rounded-lg'} min-h-[300px] resize-none transition-all duration-300`}
              maxLength={maxCharCount}
            />

            {/* @提及弹窗 */}
            {showMentionPopover && (
              <div className="absolute left-4 bottom-4 w-64 bg-white border rounded-lg shadow-lg p-2 z-10 origin-bottom-left animate-popover-in">
                <div className="text-xs text-gray-500 mb-2 px-2">输入用户名</div>
                <div className="text-sm text-gray-400 px-2 py-4 text-center">
                  功能开发中...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 图片预览 */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.previewUrl}
                  alt={`图片 ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 投票组件 */}
        {config.showPoll && (
          <PollCreator
            poll={poll}
            onChange={setPoll}
            onRemove={() => {
              setPoll(undefined);
            }}
            showCreator={showPollCreator}
            setShowCreator={setShowPollCreator}
          />
        )}

        {/* 底部工具栏 */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => fileInputRef.current?.click()}
            disabled={images.length >= 9}
          >
            <ImageIcon className="w-4 h-4" />
            图片
            {images.length > 0 && <span className="text-xs">({images.length}/9)</span>}
          </Button>

          {config.showPoll && !showPollCreator && !poll && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowPollCreator(true)}
            >
              <BarChart3 className="w-4 h-4" />
              投票
            </Button>
          )}

          <Popover>
            <PopoverTrigger>
              <Button type="button" variant="outline" size="sm" className="gap-1.5">
                <MapPin className="w-4 h-4" />
                {location ? location.province : '位置'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <div className="text-sm font-medium">添加位置</div>
                <Input
                  placeholder="省份"
                  value={location?.province || ''}
                  onChange={(e) => setLocation({ province: e.target.value, city: location?.city })}
                />
                <Input
                  placeholder="城市（可选）"
                  value={location?.city || ''}
                  onChange={(e) => setLocation({ province: location?.province || '', city: e.target.value })}
                />
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex-1" />

          {/* 高级设置 */}
          <Popover open={showAdvancedSettings} onOpenChange={setShowAdvancedSettings}>
            <PopoverTrigger>
              <Button type="button" variant="ghost" size="sm" className="gap-1.5">
                高级设置
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                {/* 评论权限 */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    评论权限
                  </Label>
                  <Select
                    value={commentPermission}
                    onValueChange={(v) => setCommentPermission(v as CommentPermission)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          所有人可评论
                        </div>
                      </SelectItem>
                      <SelectItem value="followers">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          仅关注者可评论
                        </div>
                      </SelectItem>
                      <SelectItem value="none">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          关闭评论
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 可见性 */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    公开发布
                  </Label>
                  <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {submitError && (
            <span className="text-xs text-rose-500 mr-auto">{submitError}</span>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={!canSubmit || isSubmitting}
            className="gap-1.5"
          >
            <Save className="w-4 h-4" />
            保存草稿
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 min-w-[100px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                发布中
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                发布
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
