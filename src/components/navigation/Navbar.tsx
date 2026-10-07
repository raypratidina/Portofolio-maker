'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
const links = [ ['/#work', 'Work'], ['/#about', 'About'], ['/#experience', 'Experience'], ['/#contact', 'Contact'] ];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia('(min-width: 768px)');
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    media.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      media.removeEventListener('change', onResize);
    };
  }, [open]);
  return (
    <nav ref={navRef} aria-label="Main navigation" className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
        <Link href="/" onClick={() => setOpen(false)} className="min-h-11 flex flex-col justify-center text-sm font-medium tracking-tight">RAY PRATIDINA<span className="text-muted text-xs mt-1">UI/UX DESIGNER</span></Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
          {links.map(([href, label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center hover:text-muted transition-colors">{label}</Link>)}
        </div>
        <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="md:hidden inline-flex min-h-11 items-center gap-2 px-2 font-mono text-xs uppercase tracking-widest">
          {open ? 'Close' : 'Menu'}{open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-navigation" hidden={!open} className="md:hidden border-t border-border px-6 py-4 max-h-[calc(100dvh-5rem)] overflow-y-auto">
        {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center py-3 text-lg font-medium hover:text-muted">{label}</Link>)}
      </div>
    </nav>
  );
}
