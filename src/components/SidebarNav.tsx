'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function SidebarNav() {
    const pathname = usePathname();
    const navItems = [
        { name: 'About', href: '/' },
        { name: 'Works', href: '/works' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                            'relative block text-lg font-medium py-2 px-4 -mx-4 rounded-lg transition-colors duration-200',
                            isActive
                                ? 'text-sky-600 dark:text-white'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                        )}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="active-nav-pill"
                                className="absolute inset-0 bg-blue-50 dark:bg-white/10 rounded-lg -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </Link>
                );
            })}

            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 mt-8">
                <Link
                    href="/admin/login"
                    className="block text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-600 dark:hover:text-gray-400 transition-colors uppercase tracking-wider"
                >
                    Log in as Admin
                </Link>
            </div>
        </nav>
    );
}
