'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Home, Briefcase, Mail } from 'lucide-react';

export default function MobileNavbar() {
    const pathname = usePathname();
    const navItems = [
        { name: 'About', href: '/', icon: Home },
        { name: 'Works', href: '/works', icon: Briefcase },
        { name: 'Contact', href: '/contact', icon: Mail },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 md:hidden z-50 pb-safe">
            <nav className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200',
                                isActive
                                    ? 'text-sky-600 dark:text-sky-400'
                                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                            )}
                        >
                            <Icon className={clsx("w-6 h-6", isActive ? "fill-current" : "stroke-current")} strokeWidth={isActive ? 0 : 2} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
