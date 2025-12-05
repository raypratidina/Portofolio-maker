'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Settings, LogOut, PlusCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import ThemeToggle from '../ThemeToggle';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Add Project', href: '/admin/projects/new', icon: PlusCircle },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
        router.refresh();
    };

    return (
        <div className="flex flex-col w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen border-r border-gray-200 dark:border-transparent">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Portfolio CMS</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'flex items-center px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                            )}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <div className="px-4">
                    <ThemeToggle />
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
