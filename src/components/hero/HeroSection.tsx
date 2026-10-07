import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
export function HeroSection() {
  return (
    <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-36 md:pt-44 pb-12 md:pb-16">
      <div className="max-w-5xl">
        <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-muted mb-6">UI/UX Designer · Based in Indonesia</p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05]">Hi. I&apos;m Ray.<br /><span className="text-muted">I make complex<br className="hidden sm:block" /> things feel simple.</span></h1>
        <p className="mt-6 md:mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-muted">I design digital products with a balance of creativity, clear thinking, and an engineering mindset.</p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="#work" className="inline-flex min-h-12 items-center justify-center gap-3 bg-foreground text-background rounded-full px-7 py-3 font-medium hover:opacity-80 transition-opacity">View selected work <ArrowDown size={18} aria-hidden="true" /></Link>
          <Link href="#contact" className="inline-flex min-h-12 items-center justify-center gap-3 border border-foreground/30 rounded-full px-7 py-3 font-medium hover:bg-foreground/5 transition-colors">Get in touch <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="mt-12 md:mt-16 border-t border-border pt-6 flex flex-col sm:flex-row sm:justify-between gap-4 font-mono text-xs tracking-wider uppercase text-muted"><span>Currently at Adira Finance</span><span>Let&apos;s build something great.</span></div>
    </section>
  );
}
