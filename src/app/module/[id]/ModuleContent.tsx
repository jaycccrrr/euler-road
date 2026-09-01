'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import { KnowledgeModule, Topic } from '@/types';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MathRenderer } from '@/components/math/MathRenderer';
import {
  ChevronRight,
  FileText,
  ArrowLeft,
  Sparkles,
  X,
} from 'lucide-react';

interface ModuleContentProps {
  module: KnowledgeModule | undefined;
  moduleId: string;
}

export default function ModuleContent({ module: initialModule, moduleId }: ModuleContentProps) {
  const mod = initialModule ?? KNOWLEDGE_MODULES.find(m => m.id === moduleId);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsDialogOpen(true);
  };

  if (!mod) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/courses">
            <Button>所有课程</Button>
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
        <Link href="/courses">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            所有课程
          </Button>
        </Link>

        {/* Module Header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-white p-8 md:p-12 mb-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${mod.color}`} />
          <div className="pointer-events-none absolute inset-0 bg-pattern-dots opacity-20" />
          <div className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${mod.color} opacity-20 blur-3xl`} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className={`w-24 h-24 bg-gradient-to-br ${mod.color} rounded-2xl flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/70`}>
              {mod.icon}
            </div>
            <div className="text-center md:text-left">
              <Badge className="border border-slate-200 bg-white/80 text-slate-500 shadow-sm mb-2">数学</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">{mod.name}</h1>
              <p className="text-slate-500 max-w-xl leading-relaxed">{mod.description}</p>
            </div>
          </div>
        </div>

        {/* 课程内容：小章节卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mod.topics.map((topic) => (
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
