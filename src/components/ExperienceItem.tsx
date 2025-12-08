'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceItemProps {
    exp: any;
}

function formatDate(date: string) {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(date));
}

export default function ExperienceItem({ exp }: ExperienceItemProps) {
    const [isOpen, setIsOpen] = useState(true); // Default open for readability

    return (
        <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 last:border-0">
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 ring-4 ring-white dark:ring-[#111]" />

            {/* Clickable Header Region */}
            <div
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <div className="flex items-center gap-3">
                        {exp.logo && (
                            <div className="relative w-8 h-8 rounded-md overflow-hidden border border-gray-100 dark:border-gray-800 shrink-0">
                                <Image
                                    src={exp.logo}
                                    alt={exp.company}
                                    fill
                                    className="object-cover"
                                    sizes="32px"
                                />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {exp.role}
                                </h3>
                                {isOpen ? (
                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
                        </div>
                    </div>
                </div>

                <span className="text-xs font-medium text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md mt-2 sm:mt-0 w-fit ml-11 sm:ml-0">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '')}
                </span>
            </div>

            {/* Collapsible Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}
            >
                <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed space-y-1 ml-11 sm:ml-0">
                    {exp.description.match(/[-•]/) || exp.description.includes('\n') ? (
                        <ul className="list-none space-y-1.5 list-inside">
                            {/* Regex split logic for formatting */}
                            {exp.description
                                .split(/(?:^|[\r\n]+)\s*[-•]\s*|(?:\.\s+)[-•]\s*|(?:\s+)-/)
                                .filter((item: string) => item.trim().length > 2)
                                .map((item: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-400 rounded-full shrink-0 block" />
                                        <span>{item.trim().replace(/^-/, '')}</span>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p>{exp.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
