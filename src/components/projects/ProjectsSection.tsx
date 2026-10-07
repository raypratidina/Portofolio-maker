import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/content';
import { ArrowRight } from 'lucide-react';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  // Keep featured work first without mutating the content layer's array.
  const displayProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order).slice(0, 4);

  return (
    <section id="work" className="py-16 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
        <div className="md:col-span-3">
          <span className="font-mono text-xs tracking-widest uppercase text-muted">01 / Selected Work</span>
        </div>
        <div className="md:col-span-9 flex justify-end">
          <Link href="/works" className="font-mono text-xs tracking-widest uppercase hover:text-muted transition-colors border-b border-transparent hover:border-muted pb-1">
            View All Projects
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {displayProjects.map((project, index) => {
          const number = String(index + 1).padStart(2, '0');
          
          return (
            <div key={project.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start group">
              <div className="md:col-span-4 flex flex-col order-2 md:order-1">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-xs tracking-widest text-muted">{number}</span>
                  <div className="h-px w-8 bg-border"></div>
                  <span className="font-mono text-xs tracking-widest text-muted uppercase">{project.year}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 uppercase">
                  {project.title}
                </h3>
                
                <p className="text-base md:text-lg leading-relaxed text-muted mb-6 max-w-prose">
                  {project.shortDescription}
                </p>
                
                {project.caseStudyBlocks.filter(block => block.type === 'metrics').slice(0, 1).map(block => block.type === 'metrics' ? (
                  <dl key={block.id} className="grid grid-cols-2 gap-4 mb-6">
                    {block.metrics.slice(0, 2).map(metric => <div key={metric.label}><dt className="text-sm text-muted">{metric.label}</dt><dd className="text-2xl font-medium mt-1">{metric.value}</dd></div>)}
                  </dl>
                ) : null)}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6 border-t border-border pt-6">
                  <div>
                    <span className="font-mono text-xs tracking-widest uppercase text-muted block mb-2">Category</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs tracking-widest uppercase text-muted block mb-2">Role</span>
                    <span className="font-medium">{project.role}</span>
                  </div>
                </div>
                
                <Link href={`/works/${project.slug}`} className="inline-flex items-center gap-2 min-h-11 font-mono text-xs tracking-widest uppercase border-b border-foreground py-2 hover:text-muted hover:border-muted transition-colors w-fit">
                  View Case Study
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="md:col-span-8 order-1 md:order-2">
                <Link href={`/works/${project.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-muted/10 group-hover:opacity-95 transition-opacity">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1440px) 860px, (min-width: 768px) 62vw, 100vw"
                      className="object-contain p-3 md:p-5 transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted uppercase tracking-widest">
                      {project.title}
                    </div>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


