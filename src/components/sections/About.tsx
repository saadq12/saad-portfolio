import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee } from '../ui/Marquee';
import { TechIcon } from '../ui/TechIcon';
import { SocialRow } from '../ui/SocialRow';
import { profile, stats } from '../../data/portfolio';
import { MapPin, GraduationCap, Briefcase, Zap, Download, Clock, ShieldCheck, Cpu, Coffee } from 'lucide-react';
import {
  SiHtml5,
  SiReact,
  SiWordpress,
  SiMysql,
} from 'react-icons/si';

const TECH_ITEMS = [
  'React.js', 'TypeScript', 'Tailwind CSS', 'WordPress',
  'WooCommerce', 'Technical SEO', 'PHP', 'MySQL',
  'MongoDB', 'Vite', 'Git', 'Linux', 'REST APIs', 'Canva'
];

const QUICK_FACTS = [
  { icon: MapPin,         label: 'Location',    value: 'Gujranwala, Punjab, Pakistan' },
  { icon: GraduationCap,  label: 'Education',   value: 'DAE CIT (2024–2027)' },
  { icon: Briefcase,      label: 'Work Status', value: 'Freelance & Full-Time Open' },
  { icon: Zap,            label: 'Typing Speed',value: '90+ WPM (High Accuracy)' },
];

/* Small tech icons floating on the coding photo */
const PHOTO_BADGES = [
  { icon: SiHtml5,    color: '#E34F26', pos: 'top-4 -left-5',    delay: 0   },
  { icon: SiReact,    color: '#61DAFB', pos: 'top-4 -right-5',   delay: 0.7 },
  { icon: SiWordpress,color: '#21759B', pos: 'bottom-16 -left-5',delay: 1.4 },
  { icon: SiMysql,    color: '#4479A1', pos: 'bottom-16 -right-5',delay: 0.4},
];

export function About() {
  const [pakistanTime, setPakistanTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setPakistanTime(timeString);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section id="about" label="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow="01 — ABOUT THE DEVELOPER"
        title="Engineering Precision & Digital Strategy"
        description="Bridging front-end engineering, high-converting WordPress development, and data accuracy."
      />

      {/* ── Main Two-Column Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">

        {/* ── Left: Coding Photo — big, immersive ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          {/* Deep glow behind photo */}
          <div
            className="absolute inset-0 -m-8 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.3) 0%, rgba(56,189,248,0.12) 55%, transparent 80%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Photo frame */}
          <div className="relative w-full max-w-md rounded-2xl p-[3px] bg-gradient-to-tr from-accent via-cyan-400 to-emerald-300 shadow-[0_0_50px_rgba(16,185,129,0.3),0_0_100px_rgba(56,189,248,0.12)]">
            <div className="rounded-[14px] overflow-hidden bg-surface-2">
              <img
                src="/images/about-coding.jpg"
                alt="Saad Qayyum coding at laptop"
                className="w-full object-cover object-center"
                style={{ aspectRatio: '4/5', maxHeight: '520px' }}
                loading="lazy"
              />
              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface/70 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating icon-only badges */}
          {PHOTO_BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.color}
                animate={{ y: [0, -8, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
                className={`absolute ${b.pos} z-20 flex items-center justify-center h-10 w-10 rounded-xl bg-surface/90 backdrop-blur-md border border-border/80 shadow-lg`}
                title={b.color}
              >
                <Icon size={20} style={{ color: b.color }} />
              </motion.div>
            );
          })}

          {/* Stat badges pinned to photo */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            <div className="flex items-center gap-1.5 bg-surface/95 backdrop-blur-md border border-accent/30 rounded-full px-3 py-1.5 shadow-glow">
              <Coffee size={13} className="text-accent" />
              <span className="font-mono text-[10px] font-bold text-accent">Open to Work</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Info Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Stat badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 text-center border border-border hover:border-accent/30 transition-colors"
              >
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-accent mb-0.5">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-border space-y-4">
            <h4 className="font-display text-lg font-bold text-text flex items-center gap-2">
              <Cpu size={18} className="text-accent" />
              <span>Building Scalable Systems & High-Converting Experiences</span>
            </h4>
            <div className="space-y-3 text-text-dim text-sm sm:text-base leading-relaxed">
              <p>
                I am a <strong className="text-text font-semibold">DAE Computer Information Technology</strong> student at the Institute of Leather Technology in Gujranwala, Pakistan. My passion lies at the intersection of frontend architecture, automated digital operations, and full-funnel optimization.
              </p>
              <p>
                Whether it&apos;s crafting <strong className="text-text font-medium">reactive SPAs with React and TypeScript</strong>, optimizing complex WooCommerce catalogs, or auditing technical SEO to achieve 95+ Core Web Vitals scores, I focus on performance, reliability, and clean execution.
              </p>
              <p className="text-xs sm:text-sm font-mono text-text-faint pt-1 border-t border-border/40">
                &ldquo;{profile.bio}&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_FACTS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-2/60 border border-border hover:border-accent/40 transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-text-faint uppercase tracking-wider">{label}</div>
                  <div className="font-semibold text-xs sm:text-sm text-text truncate">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Live time + location + download */}
          <div className="glass-card rounded-xl p-4 border border-border space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-text-dim">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-accent" />
                <span>PKT: <strong className="text-text">{pakistanTime || 'Loading...'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-text-faint">
                <MapPin size={13} className="text-accent" />
                <span>{profile.location}</span>
              </div>
            </div>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent text-bg px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all duration-200 shadow-glow active:scale-[0.98]"
            >
              <Download size={14} strokeWidth={2.5} />
              <span>Download Full CV</span>
            </a>
          </div>

          {/* Socials */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs font-mono text-text-faint">
              <ShieldCheck size={14} className="text-accent" />
              <span>Verified credentials & active GitHub repositories</span>
            </div>
            <SocialRow size={18} />
          </div>
        </motion.div>
      </div>

      {/* Tech Marquee Ribbon */}
      <div className="pt-6 border-t border-border/50">
        <span className="font-mono text-[10px] text-text-faint block mb-4 uppercase tracking-widest text-center">
          // Core Tech Stack & Tooling
        </span>
        <Marquee speed={32}>
          {TECH_ITEMS.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2.5 rounded-full border border-border bg-surface/85 px-4 py-2 text-xs font-semibold text-text-dim hover:text-accent hover:border-accent/40 transition-all duration-200 backdrop-blur-md shadow-sm"
            >
              <TechIcon name={tech} size={16} showColor />
              <span className="font-mono">{tech}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
