import prisma from '../prisma';
import type { Experience } from '@/types/content';

function mapExperience(prismaExp: any): Experience {
  return {
    id: prismaExp.id,
    company: prismaExp.company,
    position: prismaExp.role,
    startDate: prismaExp.startDate.toISOString(),
    endDate: prismaExp.endDate ? prismaExp.endDate.toISOString() : null,
    description: prismaExp.description || '',
    companyLogo: prismaExp.logo || undefined,
    featured: true, // Prisma model doesn't have featured, assume true
    order: 0,
  };
}

export async function getExperience(): Promise<Experience[]> {
  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: 'desc' },
    include: {
      experiences: {
        orderBy: { startDate: 'desc' },
      },
    },
  });

  if (!user || !user.experiences) {
    return [];
  }

  return user.experiences.map(mapExperience);
}
