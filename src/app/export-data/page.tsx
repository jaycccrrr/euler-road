'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'highschool-advanced-topics';
const QUESTION_BANK_KEY = 'highschool-question-bank';

export default function ExportDataPage() {
  const [topicsData, setTopicsData] = useState<string>('');
  const [questionBankData, setQuestionBankData] = useState<string>('');
  const [copied, setCopied] = useState<'topics' | 'questions' | null>(null);

  useEffect(() => {
    // 加载知识点数据
    const topics = localStorage.getItem(STORAGE_KEY);
    if (topics) {
      try {
        const parsed = JSON.parse(topics);
        setTopicsData(JSON.stringify(parsed, null, 2));
      } catch (e) {
        setTopicsData('// 数据解析错误: ' + e);
      }
    } else {
      setTopicsData('// 未找到知识点数据');
    }

    // 加载题库数据
    const questions = localStorage.getItem(QUESTION_BANK_KEY);
    if (questions) {
      try {
        const parsed = JSON.parse(questions);
        setQuestionBankData(JSON.stringify(parsed, null, 2));
      } catch (e) {
        setQuestionBankData('// 数据解析错误: ' + e);
      }
    } else {
      setQuestionBankData('// 未找到题库数据');
    }
  }, []);

  const handleCopy = (type: 'topics' | 'questions') => {
    const data = type === 'topics' ? topicsData : questionBankData;
    navigator.clipboard.writeText(data);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (type: 'topics' | 'questions') => {
    const data = type === 'topics' ? topicsData : questionBankData;
    const filename = type === 'topics' ? 'topics-data.json' : 'question-bank-data.json';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = (type: 'topics' | 'questions') => {
    if (!confirm(`确定要清空${type === 'topics' ? '知识点' : '题库'}数据吗？此操作不可恢复。`)) {
      return;
    }
    if (type === 'topics') {
      localStorage.removeItem(STORAGE_KEY);
      setTopicsData('// 数据已清空');
    } else {
      localStorage.removeItem(QUESTION_BANK_KEY);
      setQuestionBankData('// 数据已清空');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">数据导出工具</h1>
        <p className="text-slate-600 mb-8">
          将 localStorage 中的高中数学提高篇数据导出，用于写入静态文件
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 知识点数据 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">知识点数据</h2>
                <p className="text-sm text-slate-500">Storage Key: {STORAGE_KEY}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy('topics')}
                >
                  {copied === 'topics' ? '已复制!' : <Copy className="w-4 h-4 mr-1" />}
                  {copied !== 'topics' && '复制'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload('topics')}
                >
                  <Download className="w-4 h-4 mr-1" />
                  下载
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleClear('topics')}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={topicsData}
              readOnly
              className="font-mono text-xs h-[500px] bg-slate-50"
            />
          </Card>

          {/* 题库数据 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">精编题库数据</h2>
                <p className="text-sm text-slate-500">Storage Key: {QUESTION_BANK_KEY}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy('questions')}
                >
                  {copied === 'questions' ? '已复制!' : <Copy className="w-4 h-4 mr-1" />}
                  {copied !== 'questions' && '复制'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload('questions')}
                >
                  <Download className="w-4 h-4 mr-1" />
                  下载
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleClear('questions')}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={questionBankData}
              readOnly
              className="font-mono text-xs h-[500px] bg-slate-50"
            />
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h3 className="font-bold text-slate-800 mb-2">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
            <li>确认上方显示了你要导出的数据（不是&quot;// 未找到数据&quot;）</li>
            <li>点击&quot;复制&quot;按钮复制 JSON 数据，或点击&quot;下载"保存为文件</li>
            <li>将数据提供给 Claude，Claude 会帮你写入 static 文件</li>
            <li>数据导出后，可以清空 localStorage 中的临时数据（可选）</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
