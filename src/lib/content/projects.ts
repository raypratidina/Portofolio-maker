import prisma from '../prisma';
import type { Project, CaseStudyBlock } from '@/types/content';

// Mapper to convert Prisma project to the new Project interface
function mapProject(prismaProject: any): Project {
  // Map Prisma fields to our CMS-agnostic types.
  // In the future, this mapping will simply map from Sanity documents.
  
  // We'll synthesize some case study blocks from the existing descriptions for now
  const caseStudyBlocks: CaseStudyBlock[] = [];
  
  if (prismaProject.descriptionLong) {
    caseStudyBlocks.push({
      id: 'desc-' + prismaProject.id,
      type: 'richText',
      order: 1,
      content: prismaProject.descriptionLong,
    });
  }

  // If there are media items attached, let's turn them into image gallery or image blocks
  if (prismaProject.media && prismaProject.media.length > 0) {
    const images = prismaProject.media
      .filter((m: any) => m.type === 'IMAGE')
      .map((m: any) => ({
        url: m.url,
        alt: prismaProject.title + ' Image',
      }));

    if (images.length > 1) {
      caseStudyBlocks.push({
        id: 'gallery-' + prismaProject.id,
        type: 'imageGallery',
        order: 2,
        images,
      });
    } else if (images.length === 1) {
      caseStudyBlocks.push({
        id: 'image-' + prismaProject.id,
        type: 'image',
        order: 2,
        url: images[0].url,
        alt: images[0].alt,
      });
    }
  }

  return {
    id: prismaProject.id,
    title: prismaProject.title,
    slug: prismaProject.slug,
    year: prismaProject.year || '',
    role: prismaProject.role || '',
    company: prismaProject.client || '', // Assuming client maps to company
    category: prismaProject.category || '',
    featured: prismaProject.featured || false,
    order: 0, // Order might need to be added to Prisma schema later
    shortDescription: prismaProject.descriptionShort || '',
    thumbnail: prismaProject.thumbnail || undefined,
    heroImage: prismaProject.thumbnail || undefined, // Using thumbnail as hero for now
    tags: prismaProject.technologies ? prismaProject.technologies.split(',').map((t: string) => t.trim()) : [],
    tools: [],
    externalUrl: prismaProject.link || undefined,
    caseStudyBlocks,
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
    },
    include: {
      media: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  
  return projects.map(mapProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: {
      status: 'PUBLISHED',
      featured: true,
    },
    include: {
      media: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
  
  return projects.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      media: true,
    },
  });
  
  if (!project) return null;
  return mapProject(project);
}
