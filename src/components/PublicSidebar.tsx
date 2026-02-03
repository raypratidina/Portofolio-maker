import prisma from '@/lib/prisma';
import SidebarNav from './SidebarNav';
import { unstable_noStore as noStore } from 'next/cache';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';

async function getAdminProfile() {
    // Removed noStore() to allow caching (controlled by page revalidate)
    return await prisma.user.findFirst({
        orderBy: { updatedAt: 'desc' }
    });
}

interface PublicSidebarProps {
    user?: any;
}

export default async function PublicSidebar({ user }: PublicSidebarProps) {
    const admin = user || await getAdminProfile();

    return (
        <aside className="fixed top-0 left-0 w-72 h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex flex-col p-8 z-50 hidden md:flex border-r border-zinc-200 dark:border-transparent transition-colors duration-300">

            {/* Profile Section */}
            <div className="mb-12">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-sky-500 to-indigo-400 mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                        <Image
                            src={admin?.avatar || "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"}
                            alt="Profile"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">{admin?.name || 'Admin'}</h1>
                <p className="text-sm bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent mb-4 w-fit mt-2 font-semibold tracking-wide uppercase">{admin?.role || 'Portfolio Owner'}</p>

                <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {admin?.country && (
                        <div className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-2 opacity-70" />
                            {admin.country}
                        </div>
                    )}
                    <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-70" />
                        {new Date().getFullYear()} Available
                    </div>
                </div>


            </div>

            <SidebarNav />

            <div className="mt-auto mb-4">
                <ThemeToggle />
            </div>

            {/* Footer/Copyright */}
            <div className="text-xs text-gray-600 font-medium">
                &copy; {new Date().getFullYear()} Ray Pratidina
            </div>
        </aside>
    );
}
