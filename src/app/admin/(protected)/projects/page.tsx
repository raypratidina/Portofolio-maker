import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Plus, Edit } from 'lucide-react';

import DeleteProjectButton from '@/components/admin/DeleteProjectButton'; // Client component

import ToggleFeaturedButton from '@/components/admin/ToggleFeaturedButton';

async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-10">
                <div><p className="admin-eyebrow mb-4">02 / Projects</p><h1 className="text-4xl md:text-5xl">Selected work, in progress.</h1><p className="mt-4 text-muted">Manage your case studies, drafts, and featured projects.</p></div>
                <Link
                    href="/admin/projects/new"
                    className="admin-primary shrink-0 w-fit"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Project
                </Link>
            </div>

            <div className="bg-background rounded-xl shadow-none border border-border overflow-x-auto">
                <table className="w-full min-w-[760px] divide-y divide-border">
                    <thead className="bg-foreground/3">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-muted uppercase tracking-wider">Featured</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                        {projects.length === 0 && <tr><td colSpan={6} className="px-6 py-16 text-center text-muted">No projects yet. Add your first project to get started.</td></tr>}
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-foreground/3 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {project.thumbnail && (
                                            <img src={project.thumbnail} alt="" className="h-10 w-10 rounded object-cover mr-3" />
                                        )}
                                        <div className="text-sm font-medium text-foreground">{project.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-foreground/5 text-foreground">
                                        {project.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === 'PUBLISHED'
                                        ? 'bg-foreground text-background'
                                        : 'border border-border text-muted'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <ToggleFeaturedButton id={project.id} initialFeatured={project.featured} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                                    {/* formatDate(project.createdAt) */}
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-3">
                                        <Link href={`/admin/projects/${project.id}`} aria-label={`Edit ${project.title}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground hover:bg-foreground/5">
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <DeleteProjectButton id={project.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
