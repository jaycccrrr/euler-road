'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { getAllPosts, createPost } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MessageSquare,
  Heart,
  Plus,
  Upload,
  X,
  Users,
  TrendingUp,
  Clock,
  Search,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { formatRelativeTime, generateId, compressImage } from '@/lib/utils';
import { KNOWLEDGE_MODULES, MODULE_CATEGORIES } from '@/data/modules';
import { Post } from '@/types';
import Link from 'next/link';

export default function CommunityPage() {
  const router = useRouter();
  const { isAuthenticated, user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const allPosts = await getAllPosts();
    setPosts(allPosts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
    setIsLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (const file of Array.from(files).slice(0, 3)) {
      try {
        const compressed = await compressImage(file);
        newImages.push(compressed);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }
    setImages([...images, ...newImages].slice(0, 3));
  };

  const handleSubmit = async () => {
    if (!user || !title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    try {
      const newPost: Post = {
        id: generateId(),
        userId: user.id,
        userNickname: user.nickname,
        userAvatar: user.avatar,
        moduleId: moduleId || 'general',
        title: title.trim(),
        content: content.trim(),
        images,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: [],
      };

      await createPost(newPost);

      // Reset form
      setTitle('');
      setContent('');
      setModuleId('');
      setImages([]);
      setDialogOpen(false);

      // Reload posts
      await loadPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filterPostsByModule = (moduleId: string) => {
    let filtered = posts;
    if (moduleId !== 'all') {
      filtered = posts.filter(p => p.moduleId === moduleId || (moduleId === 'general' && !p.moduleId));
    }
    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.userNickname.toLowerCase().includes(query)
      );
    }
    return filtered;
  };

  const handleToggleFavorite = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push('/login/');
      return;
    }
    if (isFavorite(postId)) {
      await removeFromFavorites(postId);
    } else {
      await addToFavorites(postId);
    }
  };

  const getModuleInfo = (id: string) => {
    if (!id || id === 'general') return { name: '综合讨论', color: 'bg-gray-100 text-gray-700' };
    const module = KNOWLEDGE_MODULES.find(m => m.id === id);
    if (module) {
      return { name: module.name, color: MODULE_CATEGORIES[module.category].color };
    }
    return { name: '其他', color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              社区交流
            </h1>
            <p className="text-gray-500 mt-2">与其他同学一起讨论学习，分享知识</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索帖子、内容或作者..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {isAuthenticated ? (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Plus className="w-4 h-4 mr-2" />
                  发布帖子
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>发布新帖子</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium">选择板块</label>
                    <Select value={moduleId} onValueChange={(value) => setModuleId(value || '')}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择知识模块" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">综合讨论</SelectItem>
                        {KNOWLEDGE_MODULES.map((m) => (
                          <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">标题</label>
                    <Input
                      placeholder="输入帖子标题"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">内容</label>
                    <Textarea
                      placeholder="分享你的想法..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">图片（最多3张）</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={img}
                            alt={`上传 ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {images.length < 3 && (
                        <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            multiple
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!title.trim() || !content.trim() || isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    {isSubmitting ? '发布中...' : '发布'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Link href="/login/">
              <Button>登录后发帖</Button>
            </Link>
          )}
          </div>
        </div>

        {/* Posts List */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              全部
            </TabsTrigger>
            <TabsTrigger value="math" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              数学
            </TabsTrigger>
            <TabsTrigger value="physics" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              物理
            </TabsTrigger>
            <TabsTrigger value="cs" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              计算机
            </TabsTrigger>
          </TabsList>

          {['all', 'math', 'physics', 'cs'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-12">加载中...</div>
                ) : filterPostsByModule(tabValue).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">暂无帖子</div>
                ) : (
                  filterPostsByModule(tabValue).map((post) => {
                    const moduleInfo = getModuleInfo(post.moduleId);
                    return (
                      <Card key={post.id} className="p-6 cartoon-card hover:scale-[1.01] transition-transform">
                        <div className="flex items-start gap-4">
                          <Link href={`/users/${post.userId}`} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg hover:ring-2 hover:ring-purple-400 transition">
                            {post.userAvatar.startsWith('data:') || post.userAvatar.startsWith('http')
                              ? <img src={post.userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                              : post.userAvatar}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{post.userNickname}</span>
                              <Badge className={moduleInfo.color}>{moduleInfo.name}</Badge>
                              <span className="text-xs text-gray-400">{formatRelativeTime(post.createdAt)}</span>
                            </div>
                            <Link href={`/community/post/${post.id}/`}>
                              <h3 className="text-lg font-bold mb-2 hover:text-purple-600 transition-colors">{post.title}</h3>
                            </Link>
                            <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>

                            {post.images.length > 0 && (
                              <div className="flex gap-2 mb-3">
                                {post.images.slice(0, 3).map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt=""
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </button>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {post.comments.length} 评论
                              </span>
                              <button
                                onClick={(e) => handleToggleFavorite(e, post.id)}
                                className={`flex items-center gap-1 transition-colors ${
                                  isFavorite(post.id) ? 'text-yellow-500' : 'hover:text-yellow-500'
                                }`}
                                title={isFavorite(post.id) ? '取消收藏' : '收藏帖子'}
                              >
                                {isFavorite(post.id) ? (
                                  <BookmarkCheck className="w-4 h-4 fill-current" />
                                ) : (
                                  <Bookmark className="w-4 h-4" />
                                )}
                                {isFavorite(post.id) ? '已收藏' : '收藏'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
