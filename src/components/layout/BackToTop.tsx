import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > window.innerHeight * 0.8);
      if (height > 0) {
        setProgress(Math.min(1, Math.max(0, scrollY / height)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo('#home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll back to top of page"
          data-cursor="link"
          className={cn(
            'fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-2/90 text-text shadow-lg backdrop-blur-md transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
          )}
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-border"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-accent transition-all duration-150"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <ArrowUp size={18} strokeWidth={1.75} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
