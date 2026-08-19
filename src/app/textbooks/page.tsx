'use client';

import Header from '@/components/layout/Header';
import { TEXTBOOK_GROUPS } from '@/data/mathmaster/textbooks';
import { assetPath } from '@/lib/asset';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TextbooksPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">电子教材库</h1>
          <p className="text-slate-500 mt-2">导入的开源电子教材（LaTeX 讲义与习题 PDF），可直接在线阅读或下载。</p>
        </div>
        {TEXTBOOK_GROUPS.map((group) => (
          <section key={group.moduleId} className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>{group.icon}</span> {group.subject}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.books.map((book) => (
                <Card key={book.file} className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{book.chapter}</h3>
                      <p className="text-xs text-slate-500">{book.label}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href={assetPath(book.file)} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> 在线阅读
                      </Button>
                    </a>
                    <a href={assetPath(book.file)} download className="flex-1">
                      <Button size="sm" className="w-full">
                        <Download className="w-3.5 h-3.5 mr-1.5" /> 下载
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}