import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'glass';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', ...props }, ref) => {
    const baseStyles =
      'rounded-card border border-border bg-surface text-text shadow-card transition-colors duration-300';

    const variants = {
      default: 'bg-surface border-border',
      elevated: 'bg-bg-elev border-border-strong',
      glass: 'bg-surface/80 backdrop-blur-md border-border',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
