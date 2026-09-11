import { motion, useScroll, useSpring } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function ScrollProgress() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-0.5">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full bg-accent relative"
      >
        <div className="absolute top-0 right-0 h-full w-24 bg-accent blur-sm opacity-50" />
      </motion.div>
    </div>
  );
}
