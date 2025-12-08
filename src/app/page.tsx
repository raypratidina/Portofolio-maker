import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import PublicSidebar from '@/components/PublicSidebar';
import MobileNavbar from '@/components/MobileNavbar';
import ExperienceItem from '@/components/ExperienceItem';
import { MapPin, Calendar, Download, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = 60; // Instant load, updates every 60s

export async function generateMetadata(): Promise<Metadata> {
  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: 'desc' }
  });
  return {
    title: user?.name || 'Portfolio',
    description: user?.bio || 'Check out my creative portfolio.',
  };
}

async function getData() {
  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: 'desc' },
    include: {
      experiences: {
        orderBy: { startDate: 'desc' }
      }
    }
  });

  const featuredProjects = await prisma.project.findMany({
    where: {
      featured: true,
      status: 'PUBLISHED'
    } as any,
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  return { user, featuredProjects };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

export default async function AboutPage() {
  const { user, featuredProjects } = await getData();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-black pb-20 md:pb-0">
      <PublicSidebar user={user} />
      <MobileNavbar />

      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-white dark:bg-[#111] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
            <Image
              src={user.avatar || "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"}
              alt="Profile"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <h1 className="font-bold text-sm">{user.name}</h1>
            <p className="font-medium text-xs bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent text-left">{user.role || 'Portfolio Owner'}</p>
          </div>
        </div>
      </div>

      <main className="md:ml-64 p-6 md:p-12 lg:p-16">
        <div className="w-full">

          {/* Top Section: Intro & Experience Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* Left Column: Intro Section */}
            <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 h-full">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Hello, Im {user.name}</h1>
              <p className="bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent mb-8 w-fit font-semibold">{user.role || 'Creative Professional'}</p>
              <p className="text-[14px] leading-[21px] text-[#4B4D50] dark:text-gray-400 leading-relaxed mb-6">
                {user.bio || 'No bio available yet.'}
              </p>
              {user.cvUrl && (
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <a
                    href={user.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:shadow-lg group dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  >
                    Get the CV
                  </a>
                </div>
              )}
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

          {/* Bottom Section: Selected Works */}
          {featuredProjects.length > 0 && (
            <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Selected Works</h2>
                <Link href="/works" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                {featuredProjects.map((project) => (
                  <Link key={project.id} href={`/works/${project.slug}`} className="group block">
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
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                          {project.client || project.category}
                        </span>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                          {project.year || new Date(project.createdAt).getFullYear()}
                        </span>
                      </div>

                      <h3 className="text-[15px] leading-tight font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                        {project.descriptionShort || project.descriptionLong || 'No description available.'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          )}
        </div>
      </main>
    </div>
  );
}


