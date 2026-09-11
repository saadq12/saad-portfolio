import { motion } from 'motion/react';
import { Logo } from '../ui/Logo';
import { SocialRow } from '../ui/SocialRow';
import { profile, socials, services } from '../../data/portfolio';
import { NAV_LINKS } from '../../lib/constants';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border bg-surface/80 backdrop-blur-xl pt-16 pb-10 text-text overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size={36} />
            <p className="text-text-dim text-sm max-w-sm leading-relaxed">
              {profile.tagline} Building responsive interfaces, high-converting WordPress stores, and reliable IT data infrastructure.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-bold text-accent">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                {profile.availability}
              </span>
            </div>
            <div className="pt-2">
              <SocialRow size={18} />
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-text-faint">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-dim hover:text-accent transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services List */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-text-faint">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-text-dim hover:text-accent transition-colors font-medium truncate block"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-text-faint">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href={`mailto:${socials.email}`}
                className="flex items-center gap-2 text-text-dim hover:text-accent transition-colors group"
              >
                <Mail size={14} className="text-accent" />
                <span className="truncate">{socials.email}</span>
              </a>
              <a
                href={`tel:${socials.phoneIntl}`}
                className="flex items-center gap-2 text-text-dim hover:text-accent transition-colors group"
              >
                <Phone size={14} className="text-accent" />
                <span>{socials.phoneIntl}</span>
              </a>
              <div className="flex items-center gap-2 text-text-faint text-xs">
                <MapPin size={14} className="text-accent" />
                <span>{socials.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Terminal Blink */}
          <div className="font-mono text-xs text-text-faint flex items-center gap-2">
            <span className="text-accent font-semibold">$</span>
            <span>echo &quot;Built with React, TypeScript &amp; Tailwind CSS&quot;</span>
            {reduced ? (
              <span className="h-3 w-1.5 bg-accent inline-block" />
            ) : (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="h-3 w-1.5 bg-accent inline-block"
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs font-mono text-text-faint flex items-center gap-1.5">
              <span>© {new Date().getFullYear()} {profile.name}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                Made with <Heart size={11} className="text-rose-400 fill-rose-400 inline" />
              </span>
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg border border-border bg-surface-2 hover:border-accent text-text-dim hover:text-text transition-colors"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
