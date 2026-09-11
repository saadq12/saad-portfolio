import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps {
  id: string;
  label?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, label, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={label ? `${id}-label` : undefined}
      className={cn('scroll-mt-24 py-20 lg:py-28 relative', className)}
    >
      <div className="container mx-auto px-6 max-w-6xl">{children}</div>
    </section>
  );
}
