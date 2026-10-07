import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { FolderOpen, Eye, Clock, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getData() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/admin/login");
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
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
    const cards = [
        { label: 'Total projects', value: stats.totalProjects, icon: FolderOpen, detail: 'Your body of work' },
        { label: 'Published', value: stats.publishedProjects, icon: Eye, detail: 'Live on your portfolio' },
        { label: 'Drafts', value: stats.draftProjects, icon: Clock, detail: 'Ready for your next edit' },
    ];
    return (
        <div>
            <header className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                <div><p className="admin-eyebrow mb-4">01 / Overview</p><h1 className="text-4xl md:text-5xl">Welcome back, {user?.name?.split(' ')[0] || 'Admin'}.</h1><p className="text-muted mt-4 leading-relaxed">A little space to shape your next great piece of work.</p></div>
                <Link href="/admin/projects/new" className="admin-primary shrink-0 w-fit"><Plus size={16} aria-hidden="true" />New project</Link>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-border rounded-xl overflow-hidden mb-12">
                {cards.map(({ label, value, icon: Icon, detail }, index) => <div key={label} className={`p-6 lg:p-8 ${index ? 'border-t sm:border-t-0 sm:border-l border-border' : ''}`}><div className="flex justify-between items-center gap-4 mb-8"><span className="admin-eyebrow">{label}</span><Icon size={18} className="text-muted" aria-hidden="true" /></div><p className="text-5xl lg:text-6xl font-medium tracking-tighter">{String(value).padStart(2, '0')}</p><p className="text-sm text-muted mt-3">{detail}</p></div>)}
            </div>
            <section>
                <div className="flex justify-between items-center gap-4 border-b border-border pb-5"><h2 className="text-2xl">Recent projects</h2><Link href="/admin/projects" className="text-sm underline underline-offset-4 py-3">View all projects</Link></div>
                <div className="divide-y divide-border">
                    {recentProjects.length ? recentProjects.map(project => <div key={project.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0"><div className="w-16 h-16 bg-foreground/5 rounded-lg overflow-hidden shrink-0">{project.thumbnail ? <img src={project.thumbnail} alt="" className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center"><FolderOpen size={20} className="text-muted" /></div>}</div><div className="min-w-0"><h3 className="font-medium break-words">{project.title}</h3><p className="text-sm text-muted mt-1">{project.category}</p></div></div>
                        <div className="flex items-center justify-between sm:justify-end gap-5"><span className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${project.status === 'PUBLISHED' ? 'bg-foreground text-background' : 'border border-border text-muted'}`}>{project.status}</span><Link href={`/admin/projects/${project.id}`} aria-label={`Edit ${project.title}`} className="admin-secondary">Edit</Link></div>
                    </div>) : <div className="py-16 text-center"><p className="text-xl mb-2">Your next project starts here.</p><p className="text-muted mb-6">Add a case study to start building your portfolio.</p><Link href="/admin/projects/new" className="admin-primary">Create your first project</Link></div>}
                </div>
            </section>
        </div>
    );
}

