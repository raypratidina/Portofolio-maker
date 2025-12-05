import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    // Allow public access to GET experiences? Yes, for the frontend.
    // But if we want to filter by user, we might need to know which user.
    // For this single-user portfolio, we can just fetch all experiences or the admin's.
    // Let's fetch all for now, assuming single user.

    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { startDate: 'desc' },
        });
        return NextResponse.json(experiences);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching experiences' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const experience = await prisma.experience.create({
            data: {
                company: json.company,
                role: json.role,
                startDate: new Date(json.startDate),
                endDate: json.endDate ? new Date(json.endDate) : null,
                current: json.current || false,
                description: json.description,
                location: json.location,
                type: json.type,
                logo: json.logo,
                userId: user.id,
            },
        });
        return NextResponse.json(experience);
    } catch (error) {
        console.error('Error creating experience:', error);
        return NextResponse.json({ error: 'Error creating experience' }, { status: 500 });
    }
}
