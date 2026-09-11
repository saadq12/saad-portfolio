import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'subtle';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200';

  const variants = {
    default: 'bg-surface-2 text-text-dim border border-border',
    accent: 'bg-accent-glow text-accent border border-accent/30',
    outline: 'border border-border-strong text-text-dim',
    subtle: 'bg-bg text-text-faint border border-border/50',
  };

  return <span className={cn(baseStyles, variants[variant], className)}>{children}</span>;
}
