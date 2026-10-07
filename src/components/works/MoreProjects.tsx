import React from 'react';
import type { Project } from '@/types/content';
import { ProjectListItem } from './ProjectListItem';

interface MoreProjectsProps {
  projects: Project[];
}

export function MoreProjects({ projects }: MoreProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-24 md:mb-40 pt-24 border-t border-border/20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4 font-mono text-xs tracking-widest text-muted uppercase">
            <span>03</span>
            <span>{`// section.more`}</span>
          </div>
        </div>
        <div className="md:col-span-9">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase">
            MORE PROJECTS
          </h2>
        </div>
      </div>

      <div className="flex flex-col border-t border-border/20 pt-8">
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
