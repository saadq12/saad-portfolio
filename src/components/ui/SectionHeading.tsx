import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  const formattedEyebrow = eyebrow.startsWith('//') ? eyebrow.slice(2).trim() : eyebrow;

  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        className
      )}
    >
      <div
        id={id}
        className="font-mono text-xs font-medium tracking-[0.18em] uppercase text-accent mb-3 flex items-center gap-2"
      >
        <span aria-hidden="true">//</span>
        <span>{formattedEyebrow}</span>
      </div>
      <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] text-text mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-dim text-base sm:text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
