import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { FolderOpen, Eye, Clock, Plus } from 'lucide-react';
import Link from 'next/link';

async function getData() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email! },
    });

    const totalProjects = await prisma.project.count();
    const publishedProjects = await prisma.project.count({
        where: { status: 'PUBLISHED' }
    });
    const draftProjects = await prisma.project.count({
        where: { status: 'DRAFT' }
    });

    const recentProjects = await prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

    return { user, stats: { totalProjects, publishedProjects, draftProjects }, recentProjects };
}

export default async function AdminDashboard() {
    const { user, stats, recentProjects } = await getData();

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {user?.name?.split(' ')[0] || 'Admin'}! 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Here's what's happening with your portfolio today.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="hidden md:flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    New Project
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <FolderOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Projects</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
                </div>

                <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <Eye className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Published</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.publishedProjects}</p>
                </div>

                <div className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Drafts</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.draftProjects}</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Projects</h2>
                    <Link href="/admin/projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All
                    </Link>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentProjects.length > 0 ? (
                        recentProjects.map((project) => (
                            <div key={project.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        {project.thumbnail ? (
                                            <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                                                <FolderOpen className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{project.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'PUBLISHED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                        }`}>
                                        {project.status}
                                    </span>
                                    <Link href={`/admin/projects/${project.id}`} className="text-gray-400 hover:text-gray-600">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No projects yet. Start by creating one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
