'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import type { Project } from '@/types/content';

interface ProjectDetailHeroClientProps {
  project: Project;
  projectNumber: string;
}

export function ProjectDetailHeroClient({ project, projectNumber }: ProjectDetailHeroClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-background">
      {/* Immersive Background if Hero Image exists */}
      {project.heroImage && (
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-[80vh] md:h-[90vh] z-0 hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <Image
            src={project.heroImage}
            alt={`${project.title} background`}
            fill
            className="object-cover opacity-20"
            priority
          />
        </motion.div>
      )}

      <div className="relative z-10 pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column - Meta */}
          <motion.div variants={item} className="md:col-span-3 flex flex-col justify-start h-full gap-8 md:gap-12 md:sticky md:top-32">
            <div>
              <span className="text-5xl md:text-6xl font-medium tracking-tight text-foreground/20">
                {projectNumber}
              </span>
            </div>
            <div>
              <Link href="/#work" className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase hover:text-foreground transition-colors text-muted">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                All Projects
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="md:col-span-9 flex flex-col gap-12">
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <div className="px-3 py-1 rounded-full border border-border/50 bg-muted/5 backdrop-blur-md">
                <span className="font-mono text-xs tracking-widest text-foreground/70 uppercase">
                  {project.year || '2026'}
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-border/50 bg-muted/5 backdrop-blur-md">
                <span className="font-mono text-xs tracking-widest text-foreground/70 uppercase">
                  {project.category}
                </span>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-6">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                {`// project.${project.slug}`}
              </span>
              <h1 className="text-[11vw] md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tighter leading-[0.85] uppercase max-w-5xl">
                {project.title}
              </h1>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 pt-8 md:pt-16 mt-8 md:mt-16 border-t border-border/40">
              <div className="lg:col-span-3 xl:col-span-3">
                <p className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-snug text-foreground/90">
                  {project.shortDescription}
                </p>
              </div>
              
              <div className="lg:col-span-2 xl:col-span-2 flex flex-col gap-8 lg:text-right font-mono text-xs tracking-widest uppercase">
                <div className="p-6 rounded-2xl border border-border/40 bg-muted/5 backdrop-blur-md">
                  <span className="text-muted block mb-2">Role</span>
                  <span className="font-medium text-foreground">{project.role}</span>
                </div>
                <div className="p-6 rounded-2xl border border-border/40 bg-muted/5 backdrop-blur-md">
                  <span className="text-muted block mb-2">Company</span>
                  <span className="font-medium text-foreground">{project.company}</span>
                </div>
                {project.externalUrl && (
                  <div className="lg:ml-auto">
                    <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors w-fit font-medium tracking-normal text-sm">
                      Visit Live Site
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hero Image Section below title */}
      {project.heroImage && (
        <div className="px-4 md:px-8 max-w-[1600px] mx-auto mb-24 md:mb-40">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-border/40 bg-muted/10 shadow-2xl"
           >
             <Image
                src={project.heroImage}
                alt={`${project.title} hero visual`}
                fill
                className="object-cover"
                priority
             />
           </motion.div>
        </div>
      )}
    </div>
  );
}
