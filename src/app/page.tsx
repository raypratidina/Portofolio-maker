'use client';

import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import PublicSidebar from '@/components/PublicSidebar';
import MobileNavbar from '@/components/MobileNavbar';
import ExperienceItem from '@/components/ExperienceItem';
import ProjectSection from '@/components/ProjectSection';
import { MapPin, Calendar, Download, ArrowRight } from 'lucide-react';

// export const revalidate = 60; // Instant load, updates every 60s
// Since we are using client components in imports (ProjectSection), we might need to be careful with 'use client'
// But wait, page.tsx is a Server Component by default in App Router.
// We cannot import 'use client' components directly if they are not default exported or handled correctly? 
// Actually ProjectSection is 'use client'. page.tsx can be Server Component.
// The issue is I removed specific imports or structure.
// Let's rewrite the FULL file to be sure.

async function getData() {
  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: 'desc' },
    include: {
      experiences: {
        orderBy: { startDate: 'desc' }
      }
    }
  });

  const allProjects = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED'
    } as any,
    orderBy: { createdAt: 'desc' }
  });

  return { user, allProjects };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

export default async function AboutPage() {
  const { user, allProjects } = await getData();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Filter projects by category
  const featuredProjects = allProjects.filter((p: any) => p.featured).slice(0, 4);
  const designShotProjects = allProjects.filter((p: any) => p.category && p.category.includes('Exploration')).slice(0, 6);

  const categorySections = [
    { title: 'Finance', keyword: 'Finance' },
    { title: 'ERP', keyword: 'ERP' },
    { title: 'Education', keyword: 'Education' },
    { title: 'Design System', keyword: 'Design System' },
    { title: 'Landing Page', keyword: 'Landing Page' },
    { title: 'Marketplace', keyword: 'Marketplace' },
    { title: 'SaaS', keyword: 'SaaS' },
    { title: 'Super App', keyword: 'Super App' },
    { title: 'CRM', keyword: 'CRM' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <PublicSidebar />
      <MobileNavbar />

      <main className="md:ml-72 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

          {/* Header */}
          <header className="mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              {user.name} <span className="text-gray-400 dark:text-gray-600 font-light">({user.title})</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              {user.bio}
            </p>

            <div className="flex flex-wrap gap-6 mt-8">
              {user.location && (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  {user.location}
                </div>
              )}
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date().getFullYear()} Available
              </div>
            </div>

            <div className="mt-8">
              {user.cvUrl ? (
                <a
                  href={user.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  Get the CV
                </a>
              ) : (
                <button disabled className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-400 font-medium rounded-full cursor-not-allowed">
                  CV Not Available
                </button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Left Column: Stats or Intro */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-50 dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  About Me
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  <p>{user.about}</p>
                </div>

                {/* Tech Stack Chips (Example from user input) */}
                {user.skills && user.skills.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Experience Section */}
            <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 h-full">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent mb-8 w-fit mb-6 flex items-center justify-between">
                Experience
              </h2>

              <div className="space-y-8">
                {user.experiences.length > 0 ? (
                  user.experiences.map((exp: any) => (
                    <ExperienceItem key={exp.id} exp={exp} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">No experience added yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Selected Works Section */}
          <ProjectSection
            title="Selected Works"
            projects={featuredProjects}
            viewAllLink="/works"
          />

          {/* Design Shot Exploration Section */}
          <ProjectSection
            title="My Design Shot Exploration"
            projects={designShotProjects}
          />

          {/* Dynamic Categories Sections */}
          {categorySections.map((section) => {
            // Filter projects case-insensitively
            const categoryProjects = allProjects.filter((p: any) =>
              p.category && p.category.toLowerCase().includes(section.keyword.toLowerCase())
            ).slice(0, 4);

            return (
              <ProjectSection
                key={section.title}
                title={section.title}
                projects={categoryProjects}
              />
            );
          })}

        </div>
      </main>
    </div>
  );
}
