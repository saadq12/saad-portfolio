import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Sun, Moon, Copy, ExternalLink, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../providers/ToastProvider';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { socials } from '../../data/portfolio';
import { NAV_LINKS } from '../../lib/constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { copy } = useCopyToClipboard();

  useLockBodyScroll(isOpen);

  const actions = useMemo(() => {
    return [
      ...NAV_LINKS.map((link) => ({
        id: `nav-${link.href}`,
        category: 'Navigation',
        title: `Go to ${link.label}`,
        icon: Compass,
        perform: () => {
          onClose();
          const targetEl = document.getElementById(link.href.replace('#', ''));
          if (targetEl) {
            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(targetEl);
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        },
      })),
      {
        id: 'action-theme',
        category: 'Preferences',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        icon: theme === 'dark' ? Sun : Moon,
        perform: () => {
          toggleTheme();
          onClose();
          showToast(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
        },
      },
      {
        id: 'action-copy-email',
        category: 'Actions',
        title: 'Copy Email Address',
        icon: Copy,
        perform: async () => {
          const success = await copy(socials.email);
          onClose();
          if (success) showToast('Copied email to clipboard!');
        },
      },
      {
        id: 'social-github',
        category: 'Socials',
        title: 'Open GitHub Profile',
        icon: ExternalLink,
        perform: () => {
          window.open(socials.github, '_blank');
          onClose();
        },
      },
      {
        id: 'social-linkedin',
        category: 'Socials',
        title: 'Open LinkedIn Profile',
        icon: ExternalLink,
        perform: () => {
          window.open(socials.linkedin, '_blank');
          onClose();
        },
      },
      {
        id: 'social-whatsapp',
        category: 'Socials',
        title: 'Chat on WhatsApp',
        icon: ExternalLink,
        perform: () => {
          window.open(socials.whatsapp, '_blank');
          onClose();
        },
      },
      {
        id: 'social-instagram',
        category: 'Socials',
        title: 'Open Instagram',
        icon: ExternalLink,
        perform: () => {
          window.open(socials.instagram, '_blank');
          onClose();
        },
      },
      {
        id: 'social-facebook',
        category: 'Socials',
        title: 'Open Facebook',
        icon: ExternalLink,
        perform: () => {
          window.open(socials.facebook, '_blank');
          onClose();
        },
      },
    ];
  }, [theme, toggleTheme, copy, showToast, onClose]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    return actions.filter(
      (action) =>
        action.title.toLowerCase().includes(query.toLowerCase()) ||
        action.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].perform();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [isOpen, filteredActions, selectedIndex, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl overflow-hidden rounded-card border border-border bg-surface shadow-2xl z-10"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-surface-2/50">
              <Search size={18} strokeWidth={1.75} className="text-text-faint" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-text placeholder-text-faint focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={onClose}
                className="text-text-faint hover:text-text focus:outline-none"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 custom-scrollbar">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-text-faint">
                  No matching commands found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredActions.map((action, idx) => {
                    const Icon = action.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={action.perform}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between rounded-btn px-3 py-2.5 text-left text-xs font-mono transition-colors ${
                          isSelected
                            ? 'bg-accent/15 text-accent border border-accent/30'
                            : 'text-text-dim hover:bg-surface-2 hover:text-text border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} strokeWidth={1.75} className={isSelected ? 'text-accent' : 'text-text-faint'} />
                          <span>{action.title}</span>
                        </div>
                        <span className="text-[10px] text-text-faint uppercase tracking-wider">
                          {action.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between border-t border-border bg-bg-elev px-4 py-2 text-[10px] font-mono text-text-faint">
              <div className="flex items-center gap-2">
                <span><kbd className="bg-surface px-1 py-0.5 rounded border border-border">↑↓</kbd> navigate</span>
                <span><kbd className="bg-surface px-1 py-0.5 rounded border border-border">↵</kbd> select</span>
                <span><kbd className="bg-surface px-1 py-0.5 rounded border border-border">esc</kbd> close</span>
              </div>
              <span>Saad Qayyum Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
