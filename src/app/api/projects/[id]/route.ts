import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const project = await prisma.project.findUnique({
            where: { id },
            include: { media: true }
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching project' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    try {
        const json = await request.json();

        // Handle media updates separately if needed, for now simple update
        // If media is passed, we might want to delete old and create new, or update existing.
        // For simplicity, let's assume we replace media if provided.

        const updateData: any = { ...json };
        delete updateData.media; // Handle media relation separately

        let updatedProject;

        if (json.media) {
            // Transaction to update project and replace media
            [updatedProject] = await prisma.$transaction([
                prisma.project.update({
                    where: { id },
                    data: {
                        ...updateData,
                        media: {
                            deleteMany: {},
                            create: json.media.map((m: any) => ({
                                url: m.url,
                                type: m.type
                            }))
                        }
                    },
                    include: { media: true }
                })
            ]);
        } else {
            updatedProject = await prisma.project.update({
                where: { id },
                data: updateData,
                include: { media: true }
            });
        }

        // Clear cache
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/');
        revalidatePath('/works');

        return NextResponse.json(updatedProject);

    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Error updating project' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    try {
        await prisma.project.delete({
            where: { id }
        });

        // Clear cache
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/');
        revalidatePath('/works');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting project' }, { status: 500 });
    }
}
