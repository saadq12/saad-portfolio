import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-btn border border-border bg-surface text-text-dim transition-colors duration-200 hover:border-border-strong hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={1.75} className="text-accent transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon size={18} strokeWidth={1.75} className="text-accent transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
