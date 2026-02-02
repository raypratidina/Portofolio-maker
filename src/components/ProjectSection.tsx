'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProjectSectionProps {
    title: string;
    projects: any[];
    viewAllLink?: string;
}

export default function ProjectSection({ title, projects, viewAllLink }: ProjectSectionProps) {
    if (!projects || projects.length === 0) return null;

    return (
        <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {title}
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        {projects.length}
                    </span>
                </h2>
                {viewAllLink && (
                    <Link href={viewAllLink} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center transition-colors">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                {projects.map((project: any) => (
                    <Link key={project.id} href={`/works/${project.slug}`} className="group block h-full flex flex-col">
                        {/* Card Image Container */}
                        <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative mb-3">
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-[10px] font-medium">View detail</span>
                                    <div className="bg-white/20 rounded-full p-0.5">
                                        <ArrowRight className="w-2.5 h-2.5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 flex flex-col">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                                    {project.category || 'Portfolio'}
                                </span>
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                                    {project.year || new Date(project.createdAt).getFullYear()}
                                </span>
                            </div>

                            <h3 className="text-[15px] leading-tight font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2 mt-auto">
                                {project.descriptionShort || project.descriptionLong || 'No description available.'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
