export const SITE_DOMAIN = 'saadq-portfolio.vercel.app';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SECTION_IDS = [
  'home',
  'about',
  'services',
  'skills',
  'projects',
  'experience',
  'testimonials',
  'contact',
] as const;
