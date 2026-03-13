'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { KnowledgeModule, Topic } from '@/types';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MathRenderer } from '@/components/math/MathRenderer';
import {
  BookOpen,
  Target,
  ChevronRight,
  FileText,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  X,
} from 'lucide-react';

interface ModuleContentProps {
  module: KnowledgeModule | undefined;
  moduleId: string;
}

export default function ModuleContent({ module: initialModule, moduleId }: ModuleContentProps) {
  const [module, setModule] = useState<KnowledgeModule | undefined>(initialModule);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // 如果 props 中没有 module，尝试从数据中查找
    if (!module && moduleId) {
      const foundModule = KNOWLEDGE_MODULES.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }
    }
  }, [module, moduleId]);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsDialogOpen(true);
  };

  if (!module) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/">
            <Button>返回首页</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        {/* Module Header */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${module.color} p-8 md:p-12 mb-8`}>
          <div className="absolute inset-0 bg-pattern-dots opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
              {module.icon}
            </div>
            <div className="text-center md:text-left text-white">
              <Badge className="bg-white/20 text-white mb-2">
                {module.category === 'math' ? '数学' : module.category === 'physics' ? '物理' : '计算机'}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{module.name}</h1>
              <p className="text-white/90 max-w-xl">{module.description}</p>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="advanced" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              提高篇
            </TabsTrigger>
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              基础篇
            </TabsTrigger>
          </TabsList>

          {/* Advanced Section */}
          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {module.topics.map((topic) => (
                <Card key={topic.id} className="p-6 cartoon-card hover:scale-[1.02] transition-transform cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold group-hover:text-purple-600 transition-colors">
                          {topic.title}
                        </h3>
                        <Badge variant={topic.difficulty > 3 ? 'destructive' : topic.difficulty > 2 ? 'default' : 'secondary'}>
                          {'★'.repeat(topic.difficulty)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        包含常见易错点和经典例题
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-purple-50"
                        onClick={() => handleTopicClick(topic)}
                      >
                        开始学习
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Basic Section */}
          <TabsContent value="basic">
            <Card className="p-8 cartoon-card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">基础篇教材</h2>
                <p className="text-gray-500">系统学习{module.name}的基础知识</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.topics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors cursor-pointer group"
                    onClick={() => handleTopicClick(topic)}
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-purple-600 shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-purple-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-400">基础概念与公式</p>
                    </div>
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-blue-700 mb-2">推荐学习路径</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-600">
                  <li>按顺序阅读基础教材</li>
                  <li>完成每个章节的练习题</li>
                  <li>进入提高篇挑战难题</li>
                  <li>参与每日一题巩固知识</li>
                </ol>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Topic Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                {selectedTopic?.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Badge variant={selectedTopic?.difficulty && selectedTopic.difficulty > 3 ? 'destructive' : selectedTopic?.difficulty && selectedTopic.difficulty > 2 ? 'default' : 'secondary'}>
                  {'★'.repeat(selectedTopic?.difficulty || 0)}
                </Badge>
                <span className="text-gray-500">难度等级</span>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 prose prose-purple max-w-none">
              {selectedTopic?.content ? (
                <MathRenderer className="text-gray-700">
                  {selectedTopic.content}
                </MathRenderer>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>该知识点暂无详细内容</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setIsDialogOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                关闭
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
