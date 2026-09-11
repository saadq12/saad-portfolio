import { techIcons, techColors, FallbackIcon } from '../../lib/techIcons';
import { normalizeKey } from '../../lib/utils';

export interface TechIconProps {
  name: string;
  size?: number | string;
  className?: string;
  showColor?: boolean;
  showTooltip?: boolean;
}

export function TechIcon({ name, size = 18, className = '', showColor = false, showTooltip = false }: TechIconProps) {
  const normalized = normalizeKey(name);
  const IconComponent = techIcons[normalized] || FallbackIcon;
  const color = showColor ? (techColors[normalized] || undefined) : undefined;

  if (showTooltip) {
    return (
      <span className="relative group/tip inline-flex" style={color ? { color } : undefined}>
        <IconComponent size={size} className={className} />
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-[10px] font-mono bg-surface border border-border text-text-dim opacity-0 group-hover/tip:opacity-100 transition-opacity z-50 shadow-lg">
          {name}
        </span>
      </span>
    );
  }

  return (
    <span className={className} style={color ? { color } : undefined} aria-hidden="true">
      <IconComponent size={size} />
    </span>
  );
}
