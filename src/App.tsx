import { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Lenis from 'lenis';
import { ToastProvider } from './components/providers/ToastProvider';
import { CursorProvider } from './components/providers/CursorProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { CustomCursor } from './components/layout/CustomCursor';
import { Preloader } from './components/layout/Preloader';
import { CommandPalette } from './components/layout/CommandPalette';

import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Button } from './components/ui/Button';
import { Logo } from './components/ui/Logo';

export function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Global Cmd+K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track SPA route changes
  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Handle 404 unknown route panel
  if (pathname !== '/' && pathname !== '/index.html' && pathname !== '') {
    return (
      <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full rounded-card border border-border bg-surface p-8 space-y-6 shadow-2xl">
          <Logo size={48} className="justify-center" />
          <div className="space-y-2">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">// 404 ERROR</span>
            <h1 className="font-display text-3xl font-semibold text-text">Path Not Found</h1>
            <p className="text-text-dim text-sm font-mono">
              The requested path <code className="text-accent bg-surface-2 px-2 py-0.5 rounded">{pathname}</code> does not exist in this terminal.
            </p>
          </div>
          <Button href="/" variant="primary" size="md" className="w-full">
            Return to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <CursorProvider>
          <div className="min-h-screen bg-bg text-text relative selection:bg-accent/20 selection:text-accent">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            {/* Grain Overlay */}
            <div className="bg-grain fixed inset-0 z-30 pointer-events-none opacity-60" aria-hidden="true" />

            <Preloader />
            <ScrollProgress />
            <CustomCursor />

            <Navbar onOpenPalette={() => setIsPaletteOpen(true)} />

            <main id="main-content" tabIndex={-1}>
              <Hero />
              <About />
              <Services />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>

            <Footer />
            <BackToTop />

            <CommandPalette
              isOpen={isPaletteOpen}
              onClose={() => setIsPaletteOpen(false)}
            />
          </div>
        </CursorProvider>
      </ToastProvider>
    </MotionConfig>
  );
}

export default App;
