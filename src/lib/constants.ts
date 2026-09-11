export const SITE_DOMAIN = 'saad-portfolio-beige.vercel.app';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Portfolio' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SECTION_IDS = [
  'home',
  'about',
  'services',
  'projects',
  'experience',
  'contact',
] as const;
