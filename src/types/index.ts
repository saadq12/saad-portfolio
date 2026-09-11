export type Theme = 'dark' | 'light';

export type CursorKind = 'default' | 'link' | 'card' | 'text' | 'drag';

export type ProjectCategory = 'all' | 'wordpress' | 'react' | 'web' | 'database';

export interface ProjectThumbnail {
  src: string;
  alt: string;
  domain: string;
}

export interface ProjectLinks {
  live?: string;
  code?: string;
  details?: string;
}

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  featured?: boolean;
  description: string;
  stack: readonly string[];
  thumbnail: ProjectThumbnail;
  links: ProjectLinks;
  year: string;
  status: 'live' | 'archived' | 'in-progress';
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
}

export interface CertificationItem {
  title: string;
  org: string;
  period: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: 'Code2' | 'ShoppingCart' | 'TrendingUp' | 'Palette' | 'Database' | 'Wrench';
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface StatItem {
  value: string;
  label: string;
}
