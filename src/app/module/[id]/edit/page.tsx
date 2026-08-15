import { KNOWLEDGE_MODULES } from '@/data/modules';
import EditableAdvancedMathContent from '../EditableAdvancedMathContent';
import {
  allLinearAlgebraLessons,
  linearAlgebraChapters,
} from '@/data/linearAlgebraBlocks';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [
    { id: 'advanced-math' },
    { id: 'linear-algebra' },
  ];
}

export default async function EditModulePage({ params }: PageProps) {
  const { id } = await params;
  const module = KNOWLEDGE_MODULES.find((m) => m.id === id);

  if (id === 'advanced-math') {
    // 动态导入避免循环依赖
    const { allLessons, basicChapters } = await import('@/data/advancedMathBlocks');

    const allLessonsList = [
      ...(allLessons['am-1'] || []),
      ...(allLessons['am-2'] || []),
      ...(allLessons['am-3'] || []),
      ...(allLessons['am-4'] || []),
      ...(allLessons['am-5'] || []),
      ...(allLessons['am-6'] || []),
    ];

    return (
      <EditableAdvancedMathContent
        module={module}
        moduleId={id}
        initialLessons={allLessonsList}
        basicChapters={basicChapters}
      />
    );
  }

  if (id === 'linear-algebra') {
    return (
      <EditableAdvancedMathContent
        module={module}
        moduleId={id}
        initialLessons={allLinearAlgebraLessons}
        basicChapters={linearAlgebraChapters}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">暂不支持编辑此模块</h1>
        <p className="text-slate-500">目前仅支持高等数学和线性代数的编辑</p>
      </div>
    </div>
  );
}
