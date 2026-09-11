import type { Variants, Transition } from 'motion/react';

export const defaultEase = [0.22, 1, 0.36, 1];

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

export const cursorSpringTransition: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 18,
  mass: 0.4,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: defaultEase },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEase },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: defaultEase },
  },
};
