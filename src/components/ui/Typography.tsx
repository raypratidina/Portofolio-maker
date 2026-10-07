import React from 'react';
import { cn } from '@/lib/utils';

export function Heading({ 
  children, 
  className, 
  as: Component = 'h2' 
}: { 
  children: React.ReactNode, 
  className?: string, 
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 
}) {
  return (
    <Component className={cn("font-medium tracking-tight text-foreground", className)}>
      {children}
    </Component>
  );
}

export function Text({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={cn("text-muted leading-relaxed", className)}>
      {children}
    </p>
  );
}

export function MonoLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("font-mono text-sm uppercase tracking-wider text-muted", className)}>
      {children}
    </span>
  );
}

export function Quote({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <blockquote className={cn("text-2xl md:text-4xl font-medium tracking-tight text-foreground leading-snug border-l-2 border-accent pl-6 md:pl-10 py-2", className)}>
      {children}
    </blockquote>
  );
}
