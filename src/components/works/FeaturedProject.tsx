import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types/content';

interface FeaturedProjectProps {
  project: Project;
  index: number;
}

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const projectNumber = String(index + 1).padStart(2, '0');
  
  // Alternate layout based on index for editorial feel
  const isEven = index % 2 === 0;

  return (
    <Link href={`/works/${project.slug}`} className="group block mb-32 md:mb-48">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Metadata Column (2-3 cols) */}
        <div className={`md:col-span-3 flex flex-col gap-8 ${!isEven ? 'md:order-2' : ''}`}>
          <div className="font-mono text-xs tracking-widest text-muted uppercase">
            <span className="block mb-4 text-foreground text-lg">{projectNumber}</span>
            <div className="flex flex-col gap-2">
              <span>{project.year || '2026'}</span>
              <span>{project.category}</span>
              {project.role && <span>{project.role}</span>}
            </div>
          </div>
        </div>

        {/* Content Column (4-5 cols) */}
        <div className={`md:col-span-4 flex flex-col justify-between h-full gap-8 md:gap-12 ${!isEven ? 'md:order-1' : ''}`}>
          <div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase mb-6 group-hover:text-muted transition-colors">
              {project.title}
            </h3>
            <p className="text-xl text-muted leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground border-b border-foreground pb-1 w-fit group-hover:text-muted group-hover:border-muted transition-colors">
            VIEW CASE STUDY
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Visual Column (5 cols) */}
        <div className={`md:col-span-5 ${!isEven ? 'md:order-3' : ''}`}>
          {project.thumbnail ? (
            <div className="relative aspect-[4/5] w-full bg-muted/5 overflow-hidden border border-border/40">
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="relative aspect-[4/5] w-full bg-muted/5 border border-border/40 flex items-center justify-center">
              <span className="font-mono text-xs tracking-widest text-muted/50 uppercase">No Image</span>
            </div>
          )}
        </div>

      </div>
    </Link>
  );
}
