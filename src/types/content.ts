// Future Sanity Content Models - Interfaces

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  heroHeadline: string;
  heroDescription: string;
  availability: string;
  email: string;
  socialLinks: { platform: string; url: string }[];
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
}

export interface AboutContent {
  name: string;
  role: string;
  location: string;
  biography: string;
  background: string;
  philosophy: string;
  education: string;
  cvUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string; // ISO string
  endDate?: string | null; // ISO string or null for Present
  description: string;
  responsibilities?: string[];
  skills?: string[];
  companyLogo?: string;
  featured: boolean;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  year: string;
  role: string;
  company: string;
  category: string;
  featured: boolean;
  order: number;
  shortDescription: string;
  thumbnail?: string;
  heroImage?: string;
  tags?: string[];
  tools?: string[];
  externalUrl?: string;
  caseStudyBlocks: CaseStudyBlock[];
}

export type CaseStudyBlock =
  | RichTextBlock
  | ImageBlock
  | ImageGalleryBlock
  | FullWidthImageBlock
  | TwoColumnBlock
  | MetricsBlock
  | QuoteBlock
  | VideoBlock
  | ComparisonBlock
  | ProcessBlock
  | PrototypeBlock;

export interface BaseBlock {
  id: string;
  type: string;
  order: number;
}

export interface RichTextBlock extends BaseBlock {
  type: 'richText';
  content: string; // HTML or Markdown
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface ImageGalleryBlock extends BaseBlock {
  type: 'imageGallery';
  images: { url: string; alt: string; caption?: string }[];
}

export interface FullWidthImageBlock extends BaseBlock {
  type: 'fullWidthImage';
  url: string;
  alt: string;
}

export interface TwoColumnBlock extends BaseBlock {
  type: 'twoColumn';
  leftContent: string;
  rightContent: string;
}

export interface MetricsBlock extends BaseBlock {
  type: 'metrics';
  metrics: { label: string; value: string }[];
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  quote: string;
  author?: string;
  role?: string;
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  url: string; // YouTube/Vimeo or direct URL
  autoPlay?: boolean;
}

export interface ComparisonBlock extends BaseBlock {
  type: 'comparison';
  beforeImage: string;
  afterImage: string;
}

export interface ProcessBlock extends BaseBlock {
  type: 'process';
  steps: { title: string; description: string }[];
}

export interface PrototypeBlock extends BaseBlock {
  type: 'prototype';
  embedUrl: string;
}
