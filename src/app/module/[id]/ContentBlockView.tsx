import { ContentBlock } from '@/data/highschoolMath';
import { MathRenderer, InlineMath } from '@/components/math/MathRenderer';
import { assetPath } from '@/lib/asset';

interface ContentBlockViewProps {
  block: ContentBlock;
}

export function ContentBlockView({ block }: ContentBlockViewProps) {
  switch (block.type) {
    case 'image':
      return (
        <div className="my-4">
          <img
            src={assetPath(block.content)}
            alt="图片"
            loading="lazy"
            className="rounded-lg border"
            style={{
              width: block.width ? `${block.width}px` : 'auto',
              height: block.height ? `${block.height}px` : 'auto',
              maxWidth: '100%',
            }}
          />
        </div>
      );
    case 'formula':
      return (
        <div className="my-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <InlineMath>{block.content}</InlineMath>
        </div>
      );
    case 'text':
    default:
      return (
        <div className="my-4 text-slate-700 leading-relaxed">
          <MathRenderer>{block.content}</MathRenderer>
        </div>
      );
  }
}
