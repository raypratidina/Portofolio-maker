import prisma from './prisma';

export async function getUserData() {
  const user = await prisma.user.findFirst({
    orderBy: { updatedAt: 'desc' },
    include: {
      experiences: {
        orderBy: { startDate: 'desc' },
      },
    },
  });
  return user;
}

export async function getProjects() {
  const allProjects = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
    },
    include: {
      media: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return allProjects;
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      media: true,
    },
  });
  return project;
}
