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
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Project</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <ProjectForm initialData={project} />
            </div>
        </div>
    );
}
