import prisma from '../prisma';
import type { AboutContent } from '@/types/content';

export async function getAbout(): Promise<AboutContent | null> {
  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: 'desc' },
  });

  if (!user) return null;

  return {
    name: user.name || 'Ray Pratidina',
    role: user.role || 'UI/UX Designer',
    location: user.country || 'Indonesia',
    biography: user.bio || '',
    background: '', // To be filled from Sanity later
    philosophy: '', // To be filled from Sanity later
    education: '', // To be filled from Sanity later
    cvUrl: user.cvUrl || undefined,
  };
}
