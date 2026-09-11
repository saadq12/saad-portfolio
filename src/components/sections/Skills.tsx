import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon } from '../ui/TechIcon';
import { skills, learning } from '../../data/portfolio';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

type SkillCategory = keyof typeof skills;
const CATEGORIES = Object.keys(skills) as SkillCategory[];

const PROFICIENCY_METRICS = [
  { name: 'Front-End Architecture', percent: 92, tag: 'React, TS, Tailwind' },
  { name: 'WordPress & WooCommerce', percent: 95, tag: 'E-commerce & Custom Themes' },
  { name: 'Technical SEO & Performance', percent: 90, tag: 'Core Web Vitals 95+' },
  { name: 'Database & Data Ops', percent: 88, tag: 'SQL, Reports, 90+ WPM' },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Frontend');

  return (
    <Section id="skills" label="skills-heading">
      <SectionHeading
        id="skills-heading"
        eyebrow="// 03 — TECHNICAL PROFICIENCIES"
        title="Skills, Tools & Technologies"
        description="Comprehensive technical toolkit spanning modern front-end frameworks, CMS platforms, and data pipelines."
      />

      {/* Proficiency Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {PROFICIENCY_METRICS.map((metric) => (
          <div
            key={metric.name}
            className="glass-card rounded-2xl p-5 border border-border hover:border-accent/40 transition-all duration-300 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xs sm:text-sm font-bold text-text truncate">
                {metric.name}
              </span>
              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {metric.percent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden border border-border/50">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${metric.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-400"
              />
            </div>

            <p className="font-mono text-[11px] text-text-faint truncate">
              {metric.tag}
            </p>
          </div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-border pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'relative px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 font-mono',
                isActive ? 'text-bg font-extrabold' : 'text-text-dim hover:text-text'
              )}
            >
              <span className="relative z-10">{cat}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 bg-accent rounded-full shadow-glow"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10"
        >
          {skills[activeCategory].map((skillName) => (
            <div
              key={skillName}
              className="group flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/75 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 cursor-default shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 flex-shrink-0 border border-border group-hover:border-accent/30 transition-colors">
                <TechIcon name={skillName} size={18} showColor />
              </div>
              <span className="font-semibold text-xs text-text group-hover:text-accent transition-colors truncate">
                {skillName}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Currently Expanding / AI Engineering Section */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent flex-shrink-0 shadow-glow">
            <Sparkles size={20} strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-display text-sm sm:text-base font-bold text-text flex items-center gap-2">
              <span>Next-Gen Engineering & AI Workflows</span>
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider bg-accent/15 px-2 py-0.5 rounded-full font-bold">R&D</span>
            </h4>
            <p className="text-text-dim text-xs mt-0.5">Integrating autonomous agentic coding, MCP protocols, and TypeScript design patterns.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {learning.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-accent/30 px-3.5 py-1.5 text-xs font-bold text-text shadow-sm"
            >
              <CheckCircle2 size={13} className="text-accent" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
