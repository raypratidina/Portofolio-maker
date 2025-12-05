import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                name: true,
                email: true,
                role: true,
                bio: true,
                country: true,
                avatar: true,
                cvUrl: true,
                worksIntro: true,
            } as any
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let json: any = {};
    try {
        json = await request.json();
        console.log('PUT Profile Request Body:', json);

        // Attempt 1: Standard Update
        const user = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: json.name,
                role: json.role,
                bio: json.bio,
                country: json.country,
                avatar: json.avatar,
                cvUrl: json.cvUrl,
                worksIntro: json.worksIntro,
            } as any,
        });
        return NextResponse.json(user);

    } catch (error: any) {
        console.error('Attempt 1 Failed:', error.message);

        // Attempt 2: Self-Healing (Add Column)
        try {
            console.log('Attempting Self-Heal: Adding cvUrl column...');
            // We use a raw query that works for SQLite. 
            // Note: IF NOT EXISTS is not supported for ADD COLUMN in all SQLite versions, but we can try.
            // Actually, just trying ADD COLUMN and ignoring "duplicate column" error is safer.
            await prisma.$executeRawUnsafe('ALTER TABLE User ADD COLUMN cvUrl TEXT').catch(e => console.log('Alter table note:', e.message));

            // Retry Standard Update
            const user = await prisma.user.update({
                where: { email: session.user.email },
                data: {
                    name: json.name,
                    role: json.role,
                    bio: json.bio,
                    country: json.country,
                    avatar: json.avatar,
                    cvUrl: json.cvUrl,
                },
            });
            return NextResponse.json({ ...user, message: 'Profile updated after database patch.' });
        } catch (healError: any) {
            console.error('Attempt 2 (Self-Heal) Failed:', healError.message);
        }

        // Attempt 3: Fallback (Update without CV)
        try {
            console.log('Attempting Fallback: Updating without cvUrl...');
            const user = await prisma.user.update({
                where: { email: session.user.email },
                data: {
                    name: json.name,
                    role: json.role,
                    bio: json.bio,
                    country: json.country,
                    avatar: json.avatar,
                    // cvUrl excluded
                },
            });
            return NextResponse.json({
                ...user,
                warning: 'Profile saved, but CV could not be saved. Please run "npx prisma migrate dev --name add_cv_url" in your terminal.'
            });
        } catch (fallbackError: any) {
            console.error('Attempt 3 (Fallback) Failed:', fallbackError.message);

            // Final Error Return
            return NextResponse.json({
                error: 'Failed to update profile',
                details: fallbackError.message || 'Unknown error',
                originalError: error.message
            }, { status: 500 });
        }
    }
}
