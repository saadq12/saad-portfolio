import { motion } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

type Props = { size?: number; className?: string };

export function Logo({ size = 32, className = '' }: Props) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <a
      href="#home"
      aria-label="Saad Qayyum — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className="text-text transition-colors duration-300 group-hover:text-accent"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          className="transition-[stroke-opacity] duration-300 group-hover:[stroke-opacity:1]"
        />
        <path
          d="M12.5 11.5C12.5 9.843 14.343 9 16 9C17.657 9 19 9.843 19 11.5C19 13.157 17.657 14 16 14C14.343 14 12.5 14.843 12.5 16.5C12.5 18.157 14.343 19 16 19C17.657 19 19 18.157 19 16.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {reduced ? (
          <rect x="21" y="12" width="1.75" height="9" rx="0.875" fill="rgb(var(--accent-rgb))" />
        ) : (
          <motion.rect
            x="21"
            y="12"
            width="1.75"
            height="9"
            rx="0.875"
            fill="rgb(var(--accent-rgb))"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>
      <span className="font-mono text-[0.8125rem] font-medium tracking-[0.08em] text-text-dim transition-colors duration-300 group-hover:text-text">
        saad<span className="text-text-faint group-hover:text-accent">.q</span>
      </span>
    </a>
  );
}
