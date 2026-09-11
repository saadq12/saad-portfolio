import { useEffect, useRef, useState } from 'react';

const FALLBACK =
  'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1600&q=80&auto=format&fit=crop';

type Props = { src: string; alt: string; domain: string; featured?: boolean };

export function ProjectImage({ src, alt, domain, featured }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className="group/frame flex flex-col overflow-hidden rounded-xl border border-border bg-surface-2"
      style={{ aspectRatio: featured ? '16 / 9' : '16 / 10' }}
    >
      <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-border bg-bg-elev px-3">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]/70" />
        <div className="ml-3 flex-1 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] text-text-faint opacity-60 transition-opacity duration-300 group-hover/frame:opacity-100">
          {domain}
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        {!loaded && !errored && (
          <div className="absolute inset-0 animate-pulse bg-surface-2" aria-hidden="true" />
        )}
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (errored) return; // guard: no infinite fallback loop
            setErrored(true);
            e.currentTarget.src = FALLBACK;
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]"
          style={{ filter: 'saturate(0.92) contrast(1.02)' }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-b-xl ring-1 ring-inset ring-white/5" />
      </div>
    </div>
  );
}
