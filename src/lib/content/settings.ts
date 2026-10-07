import type { SiteSettings } from '@/types/content';

export async function getSiteSettings(): Promise<SiteSettings> {
  // Hardcoded for now until Sanity is integrated
  return {
    siteTitle: 'Ray Pratidina | UI/UX Designer',
    siteDescription: 'I design digital products that make complex things feel simple.',
    heroHeadline: 'RAY PRATIDINA',
    heroDescription: 'I design digital products that make complex things feel simple.',
    availability: 'Open to opportunities',
    email: 'Rayzp642@gmail.com',
    phone: '+6281384015563',
    socialLinks: [
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Dribbble', url: '#' },
    ],
    seoTitle: 'Ray Pratidina',
    seoDescription: 'Portfolio of Ray Pratidina',
  };
}
