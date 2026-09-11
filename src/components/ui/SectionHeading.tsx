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
  const formattedEyebrow = eyebrow.startsWith('//') ? eyebrow : `// ${eyebrow}`;

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
        <span>{formattedEyebrow}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-text mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-dim text-base sm:text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
