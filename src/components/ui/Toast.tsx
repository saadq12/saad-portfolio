import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  variant?: 'success' | 'info';
}

export function Toast({ message, onClose, variant = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-card border border-accent/40 bg-surface-2/95 px-4 py-3 text-text shadow-xl backdrop-blur-md"
        >
          <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent")}>
            {variant === 'info' ? <Info size={14} strokeWidth={2.5} /> : <Check size={14} strokeWidth={2.5} />}
          </div>
          <p className="font-mono text-xs font-medium text-text">{message}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="ml-2 text-text-faint hover:text-text focus:outline-none"
          >
            <X size={14} strokeWidth={1.75} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
