import { motion } from 'motion/react';
import {
  Code2,
  ShoppingCart,
  TrendingUp,
  Palette,
  Database,
  Wrench,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { services } from '../../data/portfolio';

const serviceIcons = {
  Code2,
  ShoppingCart,
  TrendingUp,
  Palette,
  Database,
  Wrench,
} as const;

const SERVICE_HIGHLIGHTS: Record<string, string[]> = {
  'Web Development': ['React.js & TypeScript', 'Tailwind CSS Styling', 'REST API Integration', 'Responsive Mobile-First'],
  'WordPress & E-Commerce': ['WooCommerce Setup', 'Custom Theme Edits', 'Payment Gateway Integration', 'Product Catalog Cleanups'],
  'SEO & Optimization': ['Core Web Vitals 95+', 'Technical SEO Audits', 'Structured Data / Schema', 'Speed & Asset Minification'],
  'Graphic Design': ['Canva Creatives & Banners', 'Brand Identity Assets', 'Social Media Graphics', 'Video Content Editing'],
  'Data Management': ['MS Excel & Access Queries', '90+ WPM Typing Accuracy', 'Database Normalization', 'Automated Record Keeping'],
  'IT Support & Networking': ['Windows & Linux Configs', 'Hardware Troubleshooting', 'System Diagnostics', 'Network & Security Setup'],
};

export function Services() {
  return (
    <Section id="services" label="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow="02 — WHAT I DELIVER"
        title="Solutions & Client Services"
        description="Comprehensive engineering services designed for business growth, lightning performance, and operational excellence."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Code2;
          const highlights = SERVICE_HIGHLIGHTS[service.title] || [];

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div
                data-cursor="card"
                className="group relative h-full rounded-2xl border border-border bg-surface/70 backdrop-blur-md p-6 flex flex-col justify-between hover:border-accent/45 transition-all duration-300 shadow-card overflow-hidden cursor-default"
              >
                {/* Ambient top right glow */}
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/15 transition-all pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Line: Icon & Number */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20 group-hover:scale-105 group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <span className="font-mono text-xs text-text-faint font-bold bg-surface-2 px-2.5 py-1 rounded-full border border-border">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-text group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-text-dim text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Deliverable Highlights */}
                  {highlights.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-border/40">
                      {highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-text-dim font-medium">
                          <CheckCircle2 size={13} className="text-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer Action Line */}
                <div className="pt-4 mt-5 border-t border-border/50 flex items-center justify-between text-xs font-bold text-accent relative z-10">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>Request this service</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider">Fast Turnaround</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
