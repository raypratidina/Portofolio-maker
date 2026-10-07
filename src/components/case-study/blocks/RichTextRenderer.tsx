import type { RichTextBlock } from '@/types/content';

export function RichTextRenderer({ block }: { block: RichTextBlock }) {
  // We want the rich text to feel editorial and readable, not like a standard blog post.
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-start-2 md:col-span-10">
        <div 
          className="prose prose-lg md:prose-xl max-w-none text-foreground prose-headings:font-medium prose-headings:tracking-tight prose-headings:uppercase prose-p:leading-relaxed prose-a:border-b prose-a:border-foreground prose-a:pb-1 prose-a:no-underline hover:prose-a:text-muted hover:prose-a:border-muted prose-img:border prose-img:border-border/40 prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: block.content }} 
        />
      </div>
    </div>
  );
}
