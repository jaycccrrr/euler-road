'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Download } from 'lucide-react';
import { CoverflowCarousel, type CoverflowSlide } from '@/components/ui/coverflow-carousel';
import { TEXTBOOKS } from '@/data/textbooks';
import { Button } from '@/components/ui/button';
import { assetPath } from '@/lib/asset';

const SLIDES: CoverflowSlide[] = TEXTBOOKS.map((book) => ({
  src: assetPath(book.cover),
  alt: book.name,
  title: book.name,
  subtitle: book.author,
  meta: [{ label: '简介', value: book.note }],
}));

/** 常用教材区：封面 3D 轮播 + 当前选中教材的在线阅读/下载入口 */
export function TextbookSection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TEXTBOOKS[activeIndex];
  const downloadUrl = `https://github.com/jaycccrrr/euler-road/releases/download/textbooks/${encodeURIComponent(active.file)}`;

  return (
    <div>
      <CoverflowCarousel
        slides={SLIDES}
        showCaption
        showPagination
        label="常用教材封面轮播"
        onSelectedChange={setActiveIndex}
        onSlideClick={(index) => {
          const book = TEXTBOOKS[index];
          if (book) router.push(`/textbook/?file=${encodeURIComponent(book.file)}`);
        }}
      />
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm text-slate-500 max-w-md text-center leading-relaxed">
          {active.note}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={`/textbook/?file=${encodeURIComponent(active.file)}`}>
            <Button className="rounded-xl px-7">
              <BookOpen className="w-4 h-4 mr-2" /> 在线阅读
            </Button>
          </Link>
          <a href={downloadUrl} download>
            <Button variant="outline" className="rounded-xl px-7">
              <Download className="w-4 h-4 mr-2" /> 下载
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
