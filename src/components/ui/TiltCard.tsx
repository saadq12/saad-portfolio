import { useState, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  dataCursor?: string;
}

export function TiltCard({ children, className = '', maxTilt = 4, dataCursor }: TiltCardProps) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isTouch = useMediaQuery('(pointer: coarse)');
  const ref = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 25 });
  const y = useSpring(0, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reduced || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (!reduced && !isTouch) setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  if (reduced || isTouch) {
    return (
      <div className={className} data-cursor={dataCursor}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
