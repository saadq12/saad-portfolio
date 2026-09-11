import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../ui/Logo';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    // Stop Lenis during preloader
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    const timer = setTimeout(() => {
      setVisible(false);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
      onComplete?.();
    }, reduced ? 200 : 750);

    return () => {
      clearTimeout(timer);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [onComplete, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg text-text"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <Logo size={64} />
            <div className="flex items-center gap-2 font-mono text-xs text-text-faint tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              <span>initializing...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
