// src/data/portfolio.ts
import type { Project } from '../types';

export const profile = {
  name: 'Saad Qayyum',
  handle: 'saad.q',
  location: 'Gujranwala, Pakistan',
  role: 'Front-End Developer & IT Specialist',
  tagline: 'I build fast websites and keep digital operations running smoothly.',
  availability: 'Available for freelance & full-time',
  bio: `I'm a DAE Computer Information Technology student who works across web development, WordPress, SEO, design and IT operations. I like the unglamorous parts — keeping a store's products accurate, fixing the SEO issues nobody noticed, making sure the data is clean.`,
} as const;

export const socials = {
  email: 'saadq3536@gmail.com',
  phone: '0303-3911463',
  phoneIntl: '+92 303 3911463',
  location: 'Gujranwala, Pakistan',
  github: 'https://github.com/saadq12',
  linkedin: 'https://www.linkedin.com/in/saad-qayyum-055965374/',
  whatsapp: 'https://wa.me/923033911463',
  instagram: 'https://www.instagram.com/saadq3536/',
  facebook: 'https://www.facebook.com/profile.php?id=100094138366344',
} as const;

export const stats = [
  { value: '2+', label: 'Years experience' },
  { value: '6+', label: 'Projects shipped' },
  { value: '2', label: 'Certifications' },
  { value: '90+', label: 'WPM typing speed' },
] as const;

export const services = [
  {
    title: 'Web Development',
    description: 'React, TypeScript and responsive front-ends built with clean, maintainable code.',
    icon: 'Code2',
  },
  {
    title: 'WordPress & E-Commerce',
    description: 'Store setup, WooCommerce, product management, themes and plugins.',
    icon: 'ShoppingCart',
  },
  {
    title: 'SEO & Optimization',
    description: 'Technical audits, on-page fixes, speed and Core Web Vitals.',
    icon: 'TrendingUp',
  },
  {
    title: 'Graphic Design',
    description: 'Canva creatives, social content, brand visuals and video editing.',
    icon: 'Palette',
  },
  {
    title: 'Data Management',
    description: 'Records, reports, spreadsheets and database systems with high accuracy.',
    icon: 'Database',
  },
  {
    title: 'IT Support & Networking',
    description: 'Windows/Linux troubleshooting, hardware basics and network setup.',
    icon: 'Wrench',
  },
] as const;

export const skills = {
  Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Tailwind CSS', 'Vite'],
  'Backend & Data': ['PHP', 'MySQL', 'MongoDB', 'MS Access', 'REST APIs'],
  'CMS & SEO': ['WordPress', 'WooCommerce', 'Technical SEO', 'Elementor'],
  'Tools & Other': ['Git', 'GitHub', 'Canva', 'InPage', 'MS Office', 'Video Editing', 'Windows', 'Linux', 'GenAI'],
} as const;

export const learning = ['Agentic AI', 'TypeScript advanced patterns'] as const;

export const projects: Project[] = [
  {
    id: 'ibrahim-shopping',
    title: 'Ibrahim Shopping',
    category: 'wordpress',
    featured: true,
    description: 'Managed a live WooCommerce catalog, product operations, customer queries, and search visibility for a growing store.',
    stack: ['WordPress', 'WooCommerce', 'SEO'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80&auto=format&fit=crop',
      alt: 'Online store interface on a laptop screen',
      domain: 'ibrahimshopping.com',
    },
    links: { live: 'https://ibrahimshopping.com' },
    year: '2024',
    status: 'live',
  },
  {
    id: 'react-image-gallery',
    title: 'React Image Gallery',
    category: 'react',
    description: 'Built a responsive image search experience with dynamic API results and a focused mobile-first browsing flow.',
    stack: ['React.js', 'JavaScript', 'CSS', 'REST API'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
      alt: 'Grid of photographs in a gallery layout',
      domain: 'gallery.saad.dev',
    },
    links: { code: 'https://github.com/saadq12' },
    year: '2024',
    status: 'live',
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    category: 'web',
    description: 'Created a fast utility that converts currencies from live exchange-rate data with clear error and loading states.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Currency API'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&auto=format&fit=crop',
      alt: 'Financial data and currency exchange concept',
      domain: 'convert.saad.dev',
    },
    links: { code: 'https://github.com/saadq12' },
    year: '2024',
    status: 'live',
  },
  {
    id: 'todo-app',
    title: 'Todo App',
    category: 'react',
    description: 'Shipped a compact React task manager with predictable state updates and a responsive, distraction-free interface.',
    stack: ['React.js', 'JavaScript', 'CSS3'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&q=80&auto=format&fit=crop',
      alt: 'Minimal desk workspace with task notes',
      domain: 'todo.saad.dev',
    },
    links: { code: 'https://github.com/saadq12' },
    year: '2024',
    status: 'live',
  },
  {
    id: 'school-db',
    title: 'School Management Database',
    category: 'database',
    description: 'Academic database project covering student records, fees, attendance, staff workflows, queries, and reports.',
    stack: ['MySQL', 'MongoDB', 'MS Access'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80&auto=format&fit=crop',
      alt: 'University campus building',
      domain: 'school-db.local',
    },
    links: { details: '#school-db' },
    year: '2024',
    status: 'archived',
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    category: 'web',
    description: 'Personal C++ exercise implementing trigonometry, logarithms, powers, factorials, and menu-driven interaction.',
    stack: ['C++'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&auto=format&fit=crop',
      alt: 'Mathematical equations and calculator concept',
      domain: 'calc.cpp',
    },
    links: { code: 'https://github.com/saadq12' },
    year: '2023',
    status: 'archived',
  },
] as const;

export const experience = [
  {
    role: 'Computer Operator',
    company: 'Vissel V',
    period: 'Jan 2024 – Aug 2024',
    desc: 'Managed company data, records and reports in MS Office. Typed English & Urdu at 90+ WPM with organized, accurate filing.',
  },
  {
    role: 'Digital Media & IT Assistant',
    company: 'Ibrahim Corporation',
    period: '2023 – 2025',
    desc: 'Managed e-commerce operations, product listings and customer queries. Created social media content and maintained the WordPress website.',
  },
  {
    role: 'SEO & WordPress Developer',
    company: 'MindSpire',
    period: '3 months',
    desc: 'Audited and fixed WordPress SEO issues and built 2 WordPress websites.',
  },
] as const;

export const education = [
  { title: 'DAE — Computer Information Technology', org: 'Institute of Leather Technology', period: '2024 – 2027' },
  { title: 'Matriculation', org: 'The Leader School System', period: '2021 – 2023' },
] as const;

export const certifications = [
  { title: 'CCA — Certificate in Computer Applications', org: 'TEVTA', period: '2023 · 6 months' },
  { title: 'Graphic Designing', org: 'Soft Solution', period: '2023 · 3 months' },
] as const;

// TODO: replace with real testimonials
export const testimonials = [
  {
    quote: 'Saad handled our store listings and SEO cleanup end to end. Reliable and detail-oriented.',
    author: 'Client Name',
    role: 'Ibrahim Corporation',
  },
  {
    quote: 'Fast turnaround, clean React code, and he actually communicates. Rare combination.',
    author: 'Client Name',
    role: 'Freelance project',
  },
  {
    quote: 'Our WordPress site finally loads fast after his audit. Worth every rupee.',
    author: 'Client Name',
    role: 'Small business',
  },
] as const;
