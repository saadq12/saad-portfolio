import type { ReactNode } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

export interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export function Marquee({ children, speed = 25, direction = 'left', className }: MarqueeProps) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (reduced) {
    return (
      <div className={cn('flex flex-wrap justify-center gap-6 py-4', className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 gap-8 py-4 items-center animate-marquee group-hover:[animation-play-state:paused]',
          direction === 'right' && 'animate-marquee-reverse'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'flex min-w-full shrink-0 gap-8 py-4 items-center animate-marquee group-hover:[animation-play-state:paused]',
          direction === 'right' && 'animate-marquee-reverse'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
