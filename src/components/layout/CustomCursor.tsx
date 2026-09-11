import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursorContext } from '../../hooks/useCursorContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function CustomCursor() {
  const { cursorKind } = useCursorContext();
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isTouch = useMediaQuery('(pointer: coarse)');
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (reduced || isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, reduced, isTouch]);

  if (reduced || isTouch) return null;

  const isLink = cursorKind === 'link';
  const isCard = cursorKind === 'card';
  const isText = cursorKind === 'text';
  const isDrag = cursorKind === 'drag';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Dot */}
      {!isLink && !isText && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        />
      )}

      {/* Lagging Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: clicked ? 0.85 : 1,
        }}
        animate={{
          width: isLink ? 56 : isCard ? 80 : isText ? 2 : isDrag ? 48 : 32,
          height: isLink ? 56 : isCard ? 80 : isText ? 20 : isDrag ? 48 : 32,
          borderRadius: isText ? 2 : 999,
          backgroundColor: isCard
            ? 'rgba(var(--accent-rgb), 0.08)'
            : 'transparent',
          borderColor: isLink
            ? 'rgb(var(--accent-rgb))'
            : isDrag
            ? 'rgb(var(--accent-rgb))'
            : 'rgb(var(--border-strong-rgb) / 0.4)',
        }}
        transition={{ duration: 0.2 }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 border transition-colors duration-150"
      >
        {isDrag && (
          <div className="flex h-full w-full items-center justify-between px-2 text-[10px] font-mono text-accent">
            <span>&larr;</span>
            <span>&rarr;</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
