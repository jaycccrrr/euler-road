import DailyQuestionClient from './DailyQuestionClient';

// 为静态导出生成参数
export function generateStaticParams() {
  return [
    { id: 'placeholder' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DailyQuestionPage({ params }: PageProps) {
  const { id } = await params;
  return <DailyQuestionClient questionId={id} />;
}
