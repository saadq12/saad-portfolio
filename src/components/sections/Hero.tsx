import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { SocialRow } from '../ui/SocialRow';
import { profile, stats } from '../../data/portfolio';

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[720px] items-center overflow-hidden pb-16 pt-32 sm:pt-36 lg:min-h-screen lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden="true" />

      <div className="container relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-2 text-xs font-semibold text-accent">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <MapPin size={14} aria-hidden="true" />
            <span className="truncate">{profile.location} · {profile.availability}</span>
          </div>

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true">// </span>Front-end developer & IT specialist
          </p>
          <h1 id="hero-title" className="max-w-3xl text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[0.98] tracking-tight text-text">
            Digital work that is clear, fast, and built to last.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-text-dim sm:text-lg">
            I build responsive React interfaces and reliable WordPress experiences for teams that need their digital presence to work harder.
            I pair thoughtful UX with technical SEO, performance, and dependable day-to-day delivery.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#projects" variant="primary" size="lg" className="min-h-12 w-full sm:w-auto">
              <span>View My Work</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" size="lg" className="min-h-12 w-full sm:w-auto">
              <span>Hire Me</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/70 pt-5">
            <SocialRow size={18} />
            <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
            <span className="text-sm text-text-dim">Open to freelance and full-time roles</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent/50 pl-3">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-text-faint">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2rem] border border-accent/20 bg-accent/5" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-2xl">
            <img src="/images/profile-mirror.jpg" alt="Saad Qayyum, front-end developer" className="aspect-[4/5] w-full object-cover object-top grayscale-[15%]" loading="eager" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent px-5 pb-5 pt-20">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Currently building</p>
              <p className="mt-1 text-lg font-semibold text-text">Useful interfaces for real people.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-text-faint transition-colors hover:text-accent sm:block">
        <ArrowDown size={20} aria-hidden="true" />
      </a>
    </section>
  );
}
