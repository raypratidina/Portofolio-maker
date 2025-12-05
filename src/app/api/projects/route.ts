import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            include: { media: true }
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const project = await prisma.project.create({
            data: {
                title: json.title,
                slug: json.slug,
                category: json.category,
                thumbnail: json.thumbnail,
                descriptionShort: json.descriptionShort,
                descriptionLong: json.descriptionLong,
                client: json.client,
                role: json.role,
                year: json.year,
                technologies: json.technologies,
                link: json.link,
                status: json.status || 'DRAFT',
                media: {
                    create: json.media?.map((m: any) => ({
                        url: m.url,
                        type: m.type
                    }))
                }
            },
        });
        return NextResponse.json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Error creating project' }, { status: 500 });
    }
}
