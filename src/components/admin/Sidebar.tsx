'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Settings, LogOut, Plus, ArrowUpRight } from 'lucide-react';
import { signOut } from 'next-auth/react';
import ThemeToggle from '../ThemeToggle';
const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async () => { await signOut({ redirect: false }); router.push('/'); router.refresh(); };
  return (
    <aside className="border-b lg:border-b-0 lg:border-r border-border bg-background lg:sticky lg:top-0 lg:h-dvh lg:w-64 shrink-0 flex flex-col">
      <div className="px-6 py-6 lg:py-10 flex justify-between items-center">
        <Link href="/admin/dashboard" className="text-sm font-medium tracking-tight">RAY PRATIDINA<span className="block mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">Portfolio studio</span></Link>
        <div className="lg:hidden"><ThemeToggle /></div>
      </div>
      <div className="px-4 lg:px-6 pb-4 lg:pb-8"><Link href="/admin/projects/new" className="admin-primary w-full"><Plus size={16} aria-hidden="true" />New project</Link></div>
      <nav aria-label="Admin navigation" className="flex lg:flex-col gap-1 px-4 lg:px-3 pb-4 lg:flex-1">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href || (href === '/admin/projects' && pathname.startsWith(href + '/'));
          return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`flex flex-1 lg:flex-none items-center justify-center lg:justify-start gap-2 lg:gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${active ? 'bg-foreground/7 text-foreground font-medium' : 'text-muted hover:bg-foreground/5 hover:text-foreground'}`}><Icon size={17} aria-hidden="true" />{name}</Link>;
        })}
      </nav>
      <div className="px-6 py-4 lg:py-6 border-t border-border flex lg:flex-col justify-between gap-2">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between gap-3 text-sm text-muted hover:text-foreground">View portfolio<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></Link>
        <div className="hidden lg:block py-2"><ThemeToggle /></div>
        <button onClick={handleSignOut} className="flex min-h-11 items-center gap-3 text-sm text-muted hover:text-foreground"><LogOut size={16} aria-hidden="true" />Sign out</button>
      </div>
    </aside>
  );
}
