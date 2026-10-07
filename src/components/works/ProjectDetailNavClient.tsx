'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/content';

interface ProjectDetailNavClientProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectDetailNavClient({ prevProject, nextProject }: ProjectDetailNavClientProps) {
  return (
    <section className="border-t border-border bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Previous Project */}
        {prevProject ? (
          <Link href={`/works/${prevProject.slug}`} className="group relative flex flex-col justify-center items-start p-12 md:p-24 min-h-[40vh] overflow-hidden bg-background">
            {/* Background Hover Image */}
            {prevProject.heroImage && (
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-in-out">
                <Image
                  src={prevProject.heroImage}
                  alt={prevProject.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
              </div>
            )}

            <div className="relative z-10 flex flex-col gap-6">
              <span className="font-mono text-sm tracking-widest text-muted uppercase flex items-center gap-3">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                Previous Project
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter uppercase group-hover:text-primary transition-colors duration-300 max-w-2xl">
                {prevProject.title}
              </h2>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col justify-center items-start p-12 md:p-24 min-h-[40vh] bg-muted/5">
            <span className="font-mono text-sm tracking-widest text-muted/40 uppercase block mb-6">Beginning</span>
            <span className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter uppercase text-muted/20">No Previous</span>
          </div>
        )}

        {/* Next Project */}
        {nextProject ? (
          <Link href={`/works/${nextProject.slug}`} className="group relative flex flex-col justify-center items-end text-right p-12 md:p-24 min-h-[40vh] overflow-hidden bg-background">
            {/* Background Hover Image */}
            {nextProject.heroImage && (
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-in-out">
                <Image
                  src={nextProject.heroImage}
                  alt={nextProject.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
              </div>
            )}

            <div className="relative z-10 flex flex-col gap-6 items-end">
              <span className="font-mono text-sm tracking-widest text-muted uppercase flex items-center gap-3">
                Next Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter uppercase group-hover:text-primary transition-colors duration-300 max-w-2xl">
                {nextProject.title}
              </h2>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col justify-center items-end text-right p-12 md:p-24 min-h-[40vh] bg-muted/5">
            <span className="font-mono text-sm tracking-widest text-muted/40 uppercase block mb-6">End</span>
            <span className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter uppercase text-muted/20">No Next</span>
          </div>
        )}
      </div>

      {/* Back to all projects bar */}
      <div className="border-t border-border flex justify-center py-8">
        <Link href="/#work" className="font-mono text-xs tracking-widest uppercase hover:text-muted transition-colors border-b border-transparent hover:border-muted pb-1">
          All Projects
        </Link>
      </div>
    </section>
  );
}
