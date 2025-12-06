import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import PublicSidebar from '@/components/PublicSidebar';
import MobileNavbar from '@/components/MobileNavbar';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds (better than force-dynamic)

async function getPublishedProjects() {
    return await prisma.project.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' }
    });
}

async function getAdminProfile() {
    return await prisma.user.findFirst({
        orderBy: { updatedAt: 'desc' }
    });
}

export async function generateMetadata(): Promise<Metadata> {
    const admin = await getAdminProfile();
    return {
        title: `${admin?.name || 'Portfolio'} | Works`,
        description: admin?.worksIntro || 'Check out my latest projects and designs.',
    };
}

export default async function WorksPage() {
    const projects = await getPublishedProjects();
    const admin = await getAdminProfile();

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-black pb-20 md:pb-0">
            <PublicSidebar />
            <MobileNavbar />

            {/* Mobile Header */}
            <div className="md:hidden p-4 bg-white dark:bg-[#111] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image
                            src={admin?.avatar || "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"}
                            alt="Profile"
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm">{admin?.name || 'Portfolio'}</h1>
                        <p className="text-xs text-gray-500 text-left">{admin?.role || 'Portfolio Owner'}</p>
                    </div>
                </div>
            </div>

            <main className="md:ml-64 p-6 md:p-12 lg:p-16">
                <div className="max-w-8xl mx-auto">
                    {/* Header Section */}
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent mb-8 w-fit">Works</h1>

                    <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-12">
                        <p className="text-gray-700 dark:text-gray-300 font-medium text-lg flex items-center gap-2">
                            {(admin as any)?.worksIntro || (
                                <>
                                    Welcome to my design gallery, where ideas meet impact! <span className="text-2xl">👋</span> Dive in and explore the work behind meaningful, user-centered design.
                                </>
                            )}
                        </p>
                    </div>


                    {/* Professional Works Section */}
                    <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Professional works</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                            {projects.map((project) => (
                                <Link key={project.id} href={`/works/${project.slug}`} className="group block">
                                    {/* Card Image Container */}
                                    <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative mb-4">
                                        {project.thumbnail ? (
                                            <Image
                                                src={project.thumbnail}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-black/75 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <span className="text-xs font-medium">View detail</span>
                                                <div className="bg-white/20 rounded-full p-1">
                                                    <ArrowRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div>
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                                                {project.client || project.category}
                                            </span>
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                                                {project.year || new Date(project.createdAt).getFullYear()}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                                            {project.descriptionShort || project.descriptionLong || 'No description available.'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {projects.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-500 dark:text-gray-400">No projects published yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
