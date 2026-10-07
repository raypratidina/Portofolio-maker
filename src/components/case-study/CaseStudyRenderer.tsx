import type { CaseStudyBlock } from '@/types/content';
import { RichTextRenderer } from './blocks/RichTextRenderer';
import { ImageGalleryRenderer } from './blocks/ImageGalleryRenderer';
import {
  SingleImageRenderer,
  FullWidthImageRenderer,
  TwoColumnRenderer,
  MetricsRenderer,
  QuoteRenderer,
  VideoRenderer,
  ComparisonRenderer,
  ProcessRenderer,
  PrototypeRenderer
} from './blocks/MiscBlocks';

interface CaseStudyRendererProps {
  blocks: CaseStudyBlock[];
}

export function CaseStudyRenderer({ blocks }: CaseStudyRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        switch (block.type) {
          case 'richText':
            return <RichTextRenderer key={block.id} block={block} />;
          case 'imageGallery':
            return <ImageGalleryRenderer key={block.id} block={block} />;
          case 'image':
            return <SingleImageRenderer key={block.id} block={block} />;
          case 'fullWidthImage':
            return <FullWidthImageRenderer key={block.id} block={block} />;
          case 'twoColumn':
            return <TwoColumnRenderer key={block.id} block={block} />;
          case 'metrics':
            return <MetricsRenderer key={block.id} block={block} />;
          case 'quote':
            return <QuoteRenderer key={block.id} block={block} />;
          case 'video':
            return <VideoRenderer key={block.id} block={block} />;
          case 'comparison':
            return <ComparisonRenderer key={block.id} block={block} />;
          case 'process':
            return <ProcessRenderer key={block.id} block={block} />;
          case 'prototype':
            return <PrototypeRenderer key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
