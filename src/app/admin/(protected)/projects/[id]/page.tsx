import prisma from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id },
        include: { media: true }
    });

    if (!project) {
        notFound();
    }

    return (
        <div>
            <p className="admin-eyebrow mb-4">02 / Project editor</p>
            <h1 className="text-4xl md:text-5xl font-medium mb-8 text-foreground">Edit Project</h1>
            <div className="bg-background p-6 rounded-xl shadow-none border border-border">
                <ProjectForm initialData={project} />
            </div>
        </div>
    );
}
