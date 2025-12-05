import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

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

        // Remove empty strings for optional dates to avoid Prisma errors
        if (json.endDate === '') json.endDate = null;

        const experience = await prisma.experience.update({
            where: { id },
            data: {
                company: json.company,
                role: json.role,
                startDate: new Date(json.startDate),
                endDate: json.endDate ? new Date(json.endDate) : null,
                current: json.current,
                description: json.description,
                location: json.location,
                type: json.type,
                logo: json.logo,
            }
        });
        return NextResponse.json(experience);
    } catch (error) {
        console.error('Error updating experience:', error);
        return NextResponse.json({ error: 'Error updating experience' }, { status: 500 });
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
        await prisma.experience.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting experience' }, { status: 500 });
    }
}
