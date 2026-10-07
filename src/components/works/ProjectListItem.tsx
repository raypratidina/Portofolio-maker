import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types/content';

export function ProjectListItem({ project }: { project: Project }) {
  return (
    <Link href={`/works/${project.slug}`} className="group block border-t border-border/20 py-8 first:border-t-0 hover:bg-muted/5 transition-colors -mx-6 px-6 md:mx-0 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
        <div className="md:col-span-2">
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            {project.year || '2026'}
          </span>
        </div>
        
        <div className="md:col-span-4">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight uppercase group-hover:text-muted transition-colors">
            {project.title}
          </h3>
        </div>
        
        <div className="md:col-span-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            {project.category}
          </span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-border"></span>
          <span className="font-mono text-xs tracking-widest text-foreground uppercase">
            {project.role}
          </span>
        </div>

        <div className="hidden md:flex md:col-span-1 justify-end">
          <ArrowRight className="w-5 h-5 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
