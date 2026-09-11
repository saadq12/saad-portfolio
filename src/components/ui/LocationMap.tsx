import { useState, useEffect } from 'react';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

export function LocationMap() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const pkt = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(pkt);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border shadow-glass">
      {/* Google Map Embed */}
      <div className="relative h-64 sm:h-80 w-full">
        <iframe
          title="Saad Qayyum Location — Gujranwala, Pakistan"
          src="https://maps.google.com/maps?q=Gujranwala,+Punjab,+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full grayscale contrast-110 opacity-90 dark:opacity-60 dark:grayscale dark:brightness-75"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        {/* Dark overlay for dark mode */}
        <div className="absolute inset-0 bg-bg/0 dark:bg-bg/30 pointer-events-none" />
      </div>

      {/* Info Bar */}
      <div className="glass-card border-t border-border px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent flex-shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider">Current Location</div>
            <div className="font-bold text-sm text-text">Gujranwala, Punjab, Pakistan 🇵🇰</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Live clock */}
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-accent" />
            <div>
              <div className="font-mono text-[10px] text-text-faint uppercase">PKT (UTC+5)</div>
              <div className="font-mono text-sm font-bold text-text tabular-nums">{time || '--:--:-- --'}</div>
            </div>
          </div>

          {/* Open in Maps */}
          <a
            href="https://maps.google.com/?q=Gujranwala,+Punjab,+Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs font-bold text-text-dim hover:text-accent hover:border-accent/40 transition-colors"
          >
            <ExternalLink size={12} />
            Open Maps
          </a>
        </div>
      </div>
    </div>
  );
}
