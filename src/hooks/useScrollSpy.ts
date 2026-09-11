import { useState, useEffect } from 'react';

export function useScrollSpy(ids: readonly string[], offset = 100): string {
  const [activeId, setActiveId] = useState<string>(ids[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}
