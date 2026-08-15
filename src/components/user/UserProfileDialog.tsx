'use client';

import { User as UserType, Post } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { initModuleData, getModuleTitles, getPrimaryFrame } from '@/lib/gamification';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/LazyImage';
import { formatRelativeTime } from '@/lib/utils';
import { navigateTo } from '@/lib/asset';
import {
  MapPin,
  Crown,
  Calendar,
  MessageSquare,
  Heart,
  ChevronRight,
  Award,
} from 'lucide-react';

interface UserProfileDialogProps {
  user: UserType;
  posts: Post[];
  isOpen: boolean;
  onClose: () => void;
}

/** 用户详情弹窗（排行榜 / 个人页 / 社区共用） */
export function UserProfileDialog({ user, posts, isOpen, onClose }: UserProfileDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[90vw] !h-[90vh] !max-w-none p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shrink-0">
          <DialogTitle className="text-left text-white">
            <div className="flex items-center gap-4">
              {(() => {
                const frame = getPrimaryFrame(user.moduleData || initModuleData(), user.displayCategory);
                return (
                  <div className={`w-20 h-20 avatar-frame avatar-frame-${frame} p-[3px]`}>
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl overflow-hidden">
                      {user.avatar?.startsWith('data:') || user.avatar?.startsWith('http')
                          ? <LazyImage src={user.avatar} alt={user.nickname} className="w-full h-full object-cover" />
                          : (user.avatar || '👤')
                      }
                    </div>
                  </div>
                );
              })()}
              <div>
                <h2 className="text-2xl font-bold">{user.nickname}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {(() => {
                    const moduleData = user.moduleData || initModuleData();
                    const titles = getModuleTitles('math');
                    return (
                      <>
                        <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {titles[`level${moduleData.math.level}` as keyof typeof titles]}
                        </Badge>
                        <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Lv.{moduleData.math.level}
                        </Badge>
                        {user.isAdmin && (
                          <Badge className="bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            <Crown className="w-3 h-3 mr-1" />管理员
                          </Badge>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card className="p-6 text-center bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {user.piPower?.monthlyPi || 0}π
                </div>
                <div className="text-sm text-amber-700 font-medium">本月π力</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {user.piPower?.currentPi || 0}π
                </div>
                <div className="text-sm text-purple-700 font-medium">累计π力</div>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5 h-fit">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  其他信息
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">位置</div>
                      <div className="font-medium text-slate-900">
                        {user.location?.province || '未设置'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">加入时间</div>
                      <div className="font-medium text-slate-900">
                        {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Award className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">发布帖子</div>
                      <div className="font-medium text-slate-900">
                        {posts.length} 篇
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  发布的帖子
                </h3>
                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {posts.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>暂无帖子</p>
                    </div>
                  ) : (
                    posts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                        onClick={() => {
                          onClose();
                          navigateTo(`/community/post/#id=${p.id}`);
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {p.title}
                            </h4>
                            <p className="text-sm text-slate-500 line-clamp-1 mt-1">
                              {p.content}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                              <span>{formatRelativeTime(p.createdAt)}</span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {p.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {p.comments.length}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={onClose}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
