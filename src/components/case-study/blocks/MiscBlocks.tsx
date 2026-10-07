import Image from 'next/image';
import type { 
  ImageBlock, 
  FullWidthImageBlock, 
  TwoColumnBlock, 
  MetricsBlock, 
  QuoteBlock, 
  VideoBlock, 
  ComparisonBlock, 
  ProcessBlock, 
  PrototypeBlock 
} from '@/types/content';

export function SingleImageRenderer({ block }: { block: ImageBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-24">
      <div className="md:col-start-3 md:col-span-8">
        <div className="relative aspect-video w-full bg-muted/5 border border-border/40">
          <Image src={block.url} alt={block.alt} fill className="object-cover" />
        </div>
        {block.caption && (
          <div className="mt-4 font-mono text-xs tracking-widest uppercase text-muted text-center">
            {block.caption}
          </div>
        )}
      </div>
    </div>
  );
}

export function FullWidthImageRenderer({ block }: { block: FullWidthImageBlock }) {
  return (
    <div className="w-full my-16 md:my-32 relative aspect-[21/9] bg-muted/5 border border-border/40">
      <Image src={block.url} alt={block.alt} fill className="object-cover" />
    </div>
  );
}

export function TwoColumnRenderer({ block }: { block: TwoColumnBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-24">
      <div className="md:col-span-6 border-t border-border/40 pt-8">
        <div 
          className="prose prose-lg max-w-none text-foreground prose-headings:font-medium prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.leftContent }} 
        />
      </div>
      <div className="md:col-span-6 border-t md:border-t-0 border-border/40 pt-8 md:pt-0">
        <div 
          className="prose prose-lg max-w-none text-foreground prose-headings:font-medium prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.rightContent }} 
        />
      </div>
    </div>
  );
}

export function MetricsRenderer({ block }: { block: MetricsBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-32">
      <div className="md:col-start-2 md:col-span-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-px bg-border/40 p-px">
          {block.metrics.map((metric, idx) => (
            <div key={idx} className="bg-background p-8 md:p-12 flex flex-col gap-4 text-center items-center justify-center">
              <span className="text-6xl md:text-8xl font-medium tracking-tighter">{metric.value}</span>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QuoteRenderer({ block }: { block: QuoteBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-32">
      <div className="md:col-start-3 md:col-span-8 flex flex-col items-center text-center gap-8 md:gap-12">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
          &quot;{block.quote}&quot;
        </h2>
        {(block.author || block.role) && (
          <div className="flex flex-col gap-2 font-mono text-xs tracking-widest uppercase">
            {block.author && <span className="text-foreground">{block.author}</span>}
            {block.role && <span className="text-muted">{block.role}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export function VideoRenderer({ block }: { block: VideoBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-24">
      <div className="md:col-start-2 md:col-span-10 relative aspect-video w-full bg-muted/10 border border-border/40">
        <iframe
          src={block.url}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export function ComparisonRenderer({ block }: { block: ComparisonBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-24">
      <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 p-px">
        <div className="flex flex-col bg-background">
          <div className="p-4 border-b border-border/40">
            <span className="font-mono text-xs tracking-widest uppercase text-muted">Before</span>
          </div>
          <div className="relative aspect-video w-full bg-muted/5">
            <Image src={block.beforeImage} alt="Before" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col bg-background">
          <div className="p-4 border-b border-border/40">
            <span className="font-mono text-xs tracking-widest uppercase text-muted">After</span>
          </div>
          <div className="relative aspect-video w-full bg-muted/5">
            <Image src={block.afterImage} alt="After" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessRenderer({ block }: { block: ProcessBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-32">
      <div className="md:col-start-2 md:col-span-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {block.steps.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <span className="text-4xl font-medium tracking-tight text-muted/30">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-xs tracking-widest uppercase border-b border-border/40 pb-4">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PrototypeRenderer({ block }: { block: PrototypeBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-16 md:my-24">
      <div className="md:col-start-2 md:col-span-10 relative aspect-[16/10] w-full bg-muted/5 border border-border/40">
        <iframe
          src={block.embedUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
