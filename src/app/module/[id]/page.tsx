import { KNOWLEDGE_MODULES } from '@/data/modules';
import ModuleContent from './ModuleContent';
import AdvancedModuleContent from './AdvancedModuleContent';
import HighSchoolMathContent from './HighSchoolMathContent';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return KNOWLEDGE_MODULES.map((module) => ({
    id: module.id,
  }));
}

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  // 直接在服务端查找模块
  const module = KNOWLEDGE_MODULES.find(m => m.id === id);

  // 高中数学使用专门的组件
  if (id === 'highschool-math') {
    return <HighSchoolMathContent module={module} moduleId={id} />;
  }

  // 高等数学和线性代数使用新的高级布局
  const useAdvancedLayout = ['advanced-math', 'linear-algebra', 'probability'].includes(id);

  if (useAdvancedLayout) {
    return <AdvancedModuleContent module={module} moduleId={id} />;
  }

  return <ModuleContent module={module} moduleId={id} />;
}
