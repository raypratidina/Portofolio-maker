import React from 'react';

export function WorksHeader() {
  return (
    <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-32 md:pt-48 mb-24 md:mb-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4 font-mono text-xs tracking-widest text-muted uppercase">
            <span>01</span>
            <span>{`// page.works`}</span>
          </div>
        </div>
        
        <div className="md:col-span-9 flex flex-col gap-12">
          <h1 className="text-[12vw] md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.85] uppercase">
            WORK
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-2xl md:text-3xl font-medium tracking-tight leading-tight mb-8">
              A collection of digital products, interfaces and experiments I&apos;ve designed across different contexts.
            </p>
            <div className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-muted border border-border/40 px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              AVAILABLE FOR SELECT PROJECTS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
