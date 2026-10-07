import type { SiteSettings } from '@/types/content';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
export function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const candidate = settings?.email?.trim() || '';
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) && !/@example\.(com|org|net)$/i.test(candidate) ? candidate : null;
  const socialLinks = (settings?.socialLinks || []).filter(link => /^https?:\/\//i.test(link.url));
  const phone = settings?.phone?.trim();
  const contactHref = email ? `mailto:${email}` : socialLinks[0]?.url;
  return (
    <section id="contact" className="bg-[#0a0a0a] text-white py-16 md:pt-24 md:pb-10 px-6 md:px-12">
      <div className="max-w-[1344px] mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-white/70 mb-6">Let&apos;s connect</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] max-w-3xl">Got a project in mind?<br />Let&apos;s make it happen.</h2>
          {contactHref ? <a href={contactHref} className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 bg-white text-black px-7 py-3 rounded-full font-medium hover:bg-white/85 transition-colors">Get in touch <ArrowUpRight size={18} aria-hidden="true" /></a> : <p className="text-white/70 max-w-xs leading-relaxed">Contact details will be available soon.</p>}
        </div>
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between gap-8 border-t border-white/20 pt-6 text-sm">
          <div className="flex flex-col gap-3 min-w-0">
            {email && <div><p className="font-mono text-xs uppercase tracking-widest text-white/60">Email</p><a href={`mailto:${email}`} className="inline-flex min-h-11 items-center break-all text-white/80 hover:text-white">{email}</a></div>}
            {phone && <div><p className="font-mono text-xs uppercase tracking-widest text-white/60">Phone</p><a href={`tel:${phone.replace(/[\s()-]/g, '')}`} className="inline-flex min-h-11 items-center text-white/80 hover:text-white">{phone}</a></div>}
            <div className="flex gap-5 flex-wrap">{socialLinks.map(link => <a key={`${link.platform}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-white/80 hover:text-white">{link.platform}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div>
          </div>
          <div className="flex flex-wrap gap-6 text-white/80">{[['/', 'Home'], ['/#work', 'Work'], ['/#about', 'About']].map(([href, label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center hover:text-white">{label}</Link>)}</div>
        </div>
      </div>
    </section>
  );
}
