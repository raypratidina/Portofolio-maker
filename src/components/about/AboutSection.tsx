import type { AboutContent } from '@/types/content';
import { ArrowRight } from 'lucide-react';

export function AboutSection({ about }: { about: AboutContent | null }) {
  const bio = about?.biography || "I'm Ray, a UI/UX Designer with a background in Informatics Engineering.\n\nMy technical background helps me understand both sides of the product — how it should work for users and how it can actually be built.\n\nCurrently designing digital products at Adira Finance.";

  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <span className="font-mono text-xs tracking-widest uppercase text-muted">02 / About</span>
        </div>
        
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7 flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Designer + Engineer.</h2>
            
            <div className="text-lg text-muted leading-relaxed space-y-6">
              {bio.split('\n').map((paragraph, idx) => (
                paragraph ? <p key={idx}>{paragraph}</p> : null
              ))}
            </div>

            {about?.cvUrl && (
              <div className="pt-4">
                <a href={about.cvUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border-b border-foreground pb-1 hover:text-muted hover:border-muted transition-colors">
                  Download Resume
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>
          
          <div className="md:col-span-5 flex flex-col gap-8 mt-12 md:mt-0 pt-12 md:pt-0 border-t md:border-t-0 border-border md:border-l md:pl-12">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-medium">2+</span>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">Years in Design</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-medium uppercase tracking-tight">Informatics<br/>Engineering</span>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">Educational Background</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-lg font-medium leading-tight">Fintech · SaaS<br/>ERP · EdTech</span>
              <span className="font-mono text-xs tracking-widest uppercase text-muted">Industry Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

