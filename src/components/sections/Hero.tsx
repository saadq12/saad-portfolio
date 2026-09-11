import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  MapPin,
  Zap,
  ArrowDown,
  ArrowUpRight
} from 'lucide-react';
import {
  SiHtml5,
  SiCss,
  SiReact,
  SiMysql,
  SiMongodb,
  SiWordpress,
  SiTypescript,
  SiTailwindcss,
} from 'react-icons/si';
import { Button } from '../ui/Button';
import { SocialRow } from '../ui/SocialRow';
import { profile, stats } from '../../data/portfolio';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const PHRASES = [
  'Front-End Developer',
  'WordPress & E-Commerce Pro',
  'Technical SEO & Speed Optimizer',
  'IT Operations & Data Specialist',
];

/*
 * Icons placed at equal angles around the circle (8 icons = 45° apart).
 * We'll animate them with orbit + individual jiggle/glitch effects.
 */
const ORBIT_ICONS = [
  { icon: SiHtml5,      color: '#E34F26', label: 'HTML5',      angle: 0   },
  { icon: SiCss,        color: '#1572B6', label: 'CSS3',       angle: 45  },
  { icon: SiReact,      color: '#61DAFB', label: 'React',      angle: 90  },
  { icon: SiTypescript, color: '#3178C6', label: 'TypeScript', angle: 135 },
  { icon: SiMysql,      color: '#4479A1', label: 'MySQL',      angle: 180 },
  { icon: SiMongodb,    color: '#47A248', label: 'MongoDB',    angle: 225 },
  { icon: SiWordpress,  color: '#21759B', label: 'WordPress',  angle: 270 },
  { icon: SiTailwindcss,color: '#06B6D4', label: 'Tailwind',  angle: 315 },
];

/* Convert polar angle + radius to x/y offset from centre */
function polarToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: radius * Math.cos(rad), y: radius * Math.sin(rad) };
}

export function Hero() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reduced]);

  /* ─── Circular Hero Photo with orbiting icons & chaos animations ─── */
  const renderHeroPhoto = (orbitRadius = 160, circleSize = 260) => (
    <div
      className="relative flex items-center justify-center"
      style={{ width: circleSize + orbitRadius * 2 + 20, height: circleSize + orbitRadius * 2 + 20 }}
    >
      {/* ── Expanding / shrinking ambient glow blobs ── */}
      <motion.div
        animate={!reduced ? {
          scale: [1, 1.4, 0.9, 1.25, 1],
          opacity: [0.35, 0.6, 0.25, 0.5, 0.35],
          x: [0, 12, -8, 5, 0],
          y: [0, -10, 6, -4, 0],
        } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.55) 0%, rgba(56,189,248,0.25) 50%, transparent 75%)',
          filter: 'blur(52px)',
        }}
      />
      <motion.div
        animate={!reduced ? {
          scale: [1.1, 0.8, 1.3, 0.95, 1.1],
          opacity: [0.2, 0.4, 0.15, 0.35, 0.2],
          x: [0, -15, 10, -6, 0],
          y: [0, 8, -12, 4, 0],
        } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 35%, rgba(56,189,248,0.45) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Glitching outer ring ── */}
      {!reduced && (
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.04, 0.97, 1.02, 1],
            opacity: [0.5, 0.9, 0.4, 0.8, 0.5],
            x: [0, 3, -3, 1, 0],
          }}
          transition={{
            rotate: { duration: 22, repeat: Infinity, ease: 'linear' },
            scale:  { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
            opacity:{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            x:      { duration: 0.15, repeat: Infinity, repeatType: 'mirror' },
          }}
          className="absolute rounded-full border-2 border-dashed border-accent/40 pointer-events-none"
          style={{
            width: circleSize + 36,
            height: circleSize + 36,
          }}
        />
      )}
      {/* ── Counter-rotating glitch ring ── */}
      {!reduced && (
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.96, 1.05, 0.98, 1],
            opacity: [0.3, 0.7, 0.2, 0.6, 0.3],
          }}
          transition={{
            rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
            scale:  { duration: 4,   repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            opacity:{ duration: 2,   repeat: Infinity, ease: 'easeInOut', delay: 1 },
          }}
          className="absolute rounded-full border border-cyan-400/30 pointer-events-none"
          style={{
            width: circleSize + 18,
            height: circleSize + 18,
            borderStyle: 'dotted',
          }}
        />
      )}

      {/* ── Circular profile image ── */}
      <motion.div
        animate={!reduced ? {
          scale: [1, 1.015, 0.99, 1.008, 1],
        } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 rounded-full"
        style={{
          width: circleSize,
          height: circleSize,
          padding: 3,
          background: 'linear-gradient(135deg, #10b981, #22d3ee, #34d399)',
          boxShadow: '0 0 50px rgba(16,185,129,0.5), 0 0 100px rgba(56,189,248,0.2), inset 0 0 30px rgba(16,185,129,0.1)',
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-surface-2">
          <img
            src="/images/profile-mirror.jpg"
            alt="Saad Qayyum"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>

        {/* Glitch colour overlay — flickers on top of photo */}
        {!reduced && (
          <motion.div
            animate={{
              opacity: [0, 0, 0.08, 0, 0, 0.05, 0],
              x: [0, 0, 3, 0, -2, 0, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.6), rgba(16,185,129,0.4))' }}
          />
        )}
      </motion.div>

      {/* ── Orbiting icon-only badges ── */}
      {ORBIT_ICONS.map((badge, i) => {
        const Icon = badge.icon;
        const { x, y } = polarToXY(badge.angle, orbitRadius);
        return (
          <motion.div
            key={badge.label}
            /* jiggle + blur glitch */
            animate={!reduced ? {
              x: [x, x + 4, x - 3, x + 1.5, x],
              y: [y, y - 5, y + 3, y - 2, y],
              scale: [1, 1.12, 0.92, 1.06, 1],
              filter: [
                'blur(0px)',
                'blur(1.5px)',
                'blur(0px)',
                'blur(0.5px)',
                'blur(0px)',
              ],
            } : { x, y }}
            transition={{
              duration: 2.5 + i * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.28,
            }}
            style={{ position: 'absolute', zIndex: 20 }}
            title={badge.label}
            aria-label={badge.label}
            className="flex items-center justify-center h-11 w-11 rounded-xl bg-surface/90 backdrop-blur-md border border-border/80 shadow-lg hover:scale-125 hover:border-accent/60 transition-transform duration-150 cursor-default"
          >
            <motion.div
              /* individual icon colour-flicker glitch */
              animate={!reduced ? {
                opacity: [1, 1, 0.5, 1, 1],
                filter: [
                  `drop-shadow(0 0 0px ${badge.color})`,
                  `drop-shadow(0 0 6px ${badge.color})`,
                  `drop-shadow(0 0 2px ${badge.color})`,
                  `drop-shadow(0 0 8px ${badge.color})`,
                  `drop-shadow(0 0 0px ${badge.color})`,
                ],
              } : {}}
              transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <Icon size={22} style={{ color: badge.color }} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* ── "Available" status pill ── */}
      <div
        className="absolute z-30 flex items-center gap-1.5 bg-surface/95 backdrop-blur-md border border-accent/30 rounded-full px-4 py-1.5 shadow-glow whitespace-nowrap"
        style={{ bottom: orbitRadius - 18 }}
      >
        <span className="relative flex h-2 w-2">
          {!reduced && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="font-mono text-[11px] font-bold text-accent">{profile.availability}</span>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Ambient Glow Orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 sm:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left Column: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 text-left order-2 lg:order-1"
          >
            {/* Mobile photo (above name) */}
            <div className="flex lg:hidden justify-center pb-4">
              <div className="scale-75 origin-top">
                {renderHeroPhoto(110, 200)}
              </div>
            </div>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent backdrop-blur-md shadow-sm">
              <MapPin size={12} className="opacity-80" />
              <span className="font-mono">{profile.location}</span>
              <span className="text-accent/40">|</span>
              <span className="font-mono">{profile.availability}</span>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <span className="font-mono text-xs sm:text-sm tracking-[0.18em] text-text-dim block uppercase font-medium">
                // Hello, I am
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text leading-[1.04]">
                {profile.name}
              </h1>

              {/* Animated role phrase */}
              <div className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center pt-1">
                {reduced ? (
                  <span className="font-mono text-lg sm:text-2xl text-accent font-bold">{PHRASES[0]}</span>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span className="font-mono text-lg sm:text-2xl lg:text-3xl text-gradient-accent font-bold">
                        {PHRASES[index]}
                      </span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.75, repeat: Infinity }}
                        className="h-6 sm:h-7 w-0.5 bg-accent inline-block"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Tagline */}
            <p className="text-text-dim text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              I build fast, responsive web applications and managed WordPress stores with clean code, technical SEO precision, and robust IT data architecture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button href="#projects" variant="primary" size="lg" data-cursor="link" className="shadow-glow hover:shadow-glow-lg font-bold">
                <span>View Selected Work</span>
                <Code size={17} />
              </Button>
              <Button href="#contact" variant="secondary" size="lg" data-cursor="link" className="font-semibold">
                <span>Get In Touch</span>
                <ArrowUpRight size={17} />
              </Button>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-text-faint block mb-2 uppercase tracking-widest">// Find me online</span>
                <SocialRow size={19} />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface-2/60 text-xs font-mono text-text-dim">
                <Zap size={13} className="text-accent" />
                <span>Typing Speed: <strong className="text-text font-bold">90+ WPM</strong></span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-3 border border-border">
                  <div className="font-display text-2xl font-bold text-gradient-accent">{stat.value}</div>
                  <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column: Circular Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center order-1 lg:order-2"
          >
            {renderHeroPhoto(140, 280)}
          </motion.div>

        </div>
      </div>

      {/* Scroll Down */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-faint hover:text-accent transition-colors hidden sm:block"
      >
        <motion.div
          animate={!reduced ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} strokeWidth={2} />
        </motion.div>
      </a>
    </section>
  );
}
