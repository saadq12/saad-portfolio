import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SocialRow } from '../ui/SocialRow';
import { NAV_LINKS, SECTION_IDS } from '../../lib/constants';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onOpenPalette?: () => void;
}

export function Navbar({ onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const activeId = useScrollSpy(SECTION_IDS, 120);

  useLockBodyScroll(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetEl, { offset: -60 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'py-2.5' : 'py-4 sm:py-5'
      )}
    >
      <div className="container mx-auto px-3.5 sm:px-6 max-w-6xl">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl transition-all duration-300 px-3.5 sm:px-5',
            scrolled
              ? 'bg-surface/85 backdrop-blur-xl border border-border shadow-card py-2.5 sm:py-3'
              : 'bg-surface/30 backdrop-blur-md border border-border/50 py-2 sm:py-2.5'
          )}
        >
          {/* Logo */}
          <Logo size={32} />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-1 bg-surface-2/60 border border-border/80 rounded-full px-2 py-1.5 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.replace('#', '');
                return (
                  <li key={link.href} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      data-cursor="link"
                      className={cn(
                        'relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 block z-10 rounded-full',
                        isActive ? 'text-bg font-bold' : 'text-text-dim hover:text-text'
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navPill"
                          className="absolute inset-0 bg-accent rounded-full shadow-glow"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Open Command Palette (Cmd+K)"
                className="h-8 px-2.5 rounded-lg border border-border bg-surface-2/70 text-text-faint text-xs font-mono hover:text-text hover:border-accent/40 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Terminal size={12} className="text-accent" />
                <span className="text-[11px] font-medium">Search</span>
                <kbd className="text-[10px] bg-bg/80 border border-border px-1 py-0.5 rounded text-text-dim">⌘K</kbd>
              </button>
            )}

            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              data-cursor="link"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent text-bg px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all duration-200 shadow-glow hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile Trigger & Theme */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Quick search"
                className="p-2 text-text-dim hover:text-text rounded-xl border border-border bg-surface-2/70 focus:outline-none"
              >
                <Terminal size={17} className="text-accent" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 text-text rounded-xl border border-border bg-surface-2/80 backdrop-blur-sm focus:outline-none transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} strokeWidth={2.2} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} strokeWidth={2.2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-20 bg-bg/70 backdrop-blur-md md:hidden"
            />

            {/* Floating Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3.5 top-16 z-30 max-h-[85vh] overflow-y-auto rounded-2xl bg-surface/95 backdrop-blur-2xl border border-border shadow-2xl p-5 md:hidden"
            >
              {/* Status Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span>Available for work</span>
                </div>
                <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider">PKT (UTC+5)</span>
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col gap-1 mb-5">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = activeId === link.href.replace('#', '');
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                          'flex items-center justify-between text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-all duration-150',
                          isActive
                            ? 'text-bg bg-accent font-bold shadow-glow'
                            : 'text-text hover:bg-surface-2 hover:text-accent'
                        )}
                      >
                        <span>{link.label}</span>
                        <span className={cn('font-mono text-xs', isActive ? 'text-bg/80' : 'text-text-faint')}>
                          0{idx + 1}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer Bottom Actions */}
              <div className="flex flex-col gap-3 pt-3.5 border-t border-border">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent text-bg py-3 font-bold text-xs uppercase tracking-wider shadow-glow active:scale-[0.98]"
                >
                  <Sparkles size={14} />
                  <span>Start a Project · Hire Me</span>
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>

                <div className="pt-2">
                  <span className="font-mono text-[10px] text-text-faint block text-center mb-2 uppercase tracking-wider">
                    // Connect on Socials
                  </span>
                  <SocialRow size={19} className="justify-center" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
