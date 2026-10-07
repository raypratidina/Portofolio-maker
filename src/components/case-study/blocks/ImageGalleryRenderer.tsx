import Image from 'next/image';
import type { ImageGalleryBlock } from '@/types/content';

export function ImageGalleryRenderer({ block }: { block: ImageGalleryBlock }) {
  const imageCount = block.images.length;
  
  // Decide layout based on image count
  let gridClass = "grid-cols-1 md:grid-cols-2";
  if (imageCount === 1) gridClass = "grid-cols-1";
  else if (imageCount === 3) gridClass = "grid-cols-1 md:grid-cols-3";
  else if (imageCount >= 4) gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-24">
      <div className="md:col-span-12">
        <div className={`grid ${gridClass} gap-px bg-border/40 p-px border border-border/40`}>
          {block.images.map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] bg-background w-full overflow-hidden group">
              <Image
                src={img.url}
                alt={img.alt || `Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 border-t border-border/40 font-mono text-xs tracking-widest uppercase text-muted backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
