import React from 'react';
import type { Project } from '@/types/content';
import { FeaturedProject } from './FeaturedProject';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-24 md:mb-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4 font-mono text-xs tracking-widest text-muted uppercase">
            <span>02</span>
            <span>{`// section.featured`}</span>
          </div>
        </div>
        <div className="md:col-span-9">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase">
            FEATURED PROJECTS
          </h2>
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <FeaturedProject key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
