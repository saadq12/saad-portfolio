import { useState, useEffect, type ReactNode } from 'react';
import { CursorContext } from '../../hooks/useCursorContext';
import type { CursorKind } from '../../types';

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorKind, setCursorKind] = useState<CursorKind>('default');

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        const kind = target.getAttribute('data-cursor') as CursorKind;
        if (kind) setCursorKind(kind);
      } else {
        setCursorKind('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorKind, setCursor: setCursorKind }}>
      {children}
    </CursorContext.Provider>
  );
}
