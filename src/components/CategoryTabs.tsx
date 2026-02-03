'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    'Finance',
    'ERP',
    'Education',
    'Design System',
    'Landing Page',
    'Marketplace',
    'SaaS',
    'Super App',
    'CRM',
    'Exploration',
];

interface CategoryTabsProps {
    allProjects: any[];
}

export default function CategoryTabs({ allProjects }: CategoryTabsProps) {
    // 1. Compute available categories that actually have projects
    const availableCategories = useMemo(() => {
        return CATEGORIES.filter(cat =>
            allProjects.some(p => p.category && p.category.toLowerCase().includes(cat.toLowerCase()))
        );
    }, [allProjects]);

    // 2. Setup state with the first available category
    const [activeTab, setActiveTab] = useState(availableCategories[0] || 'Finance');

    // 3. Filter projects for active tab
    const activeProjects = useMemo(() => {
        return allProjects.filter(p =>
            p.category && p.category.toLowerCase().includes(activeTab.toLowerCase())
        ).slice(0, 4); // Limit to 4 cards max as per refined request? Or remove slice if they want all. Keeping consistency with logic.
    }, [allProjects, activeTab]);

    if (availableCategories.length === 0) return null;

    return (
        <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white shrink-0">
                    More Works
                </h2>

                {/* Scrollable Tabs Container */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 -mx-2 px-2 md:-mx-0 md:px-0 no-scrollbar gap-2 hide-scrollbar">
                    {availableCategories.map((cat) => {
                        const isActive = activeTab === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`
                                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                                    ${isActive
                                        ? 'text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-600 rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid Content */}
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8"
                    >
                        {activeProjects.map((project: any) => (
                            <Link key={project.id} href={`/works/${project.slug}`} className="group block h-full flex flex-col">
                                {/* Card Image Container - Reusing styles from ProjectSection */}
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
                    </motion.div>
                </AnimatePresence>

                {activeProjects.length === 0 && (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
