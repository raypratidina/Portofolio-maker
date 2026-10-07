import React from 'react';
import { cn } from '@/lib/utils';

export function Section({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-6 md:px-12", className)}>
      {children}
    </div>
  );
}

export function Grid({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12", className)}>
      {children}
    </div>
  );
}
