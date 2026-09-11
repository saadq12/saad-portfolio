import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon } from '../ui/TechIcon';
import { skills, learning } from '../../data/portfolio';
import { CheckCircle2, Sparkles } from 'lucide-react';

type SkillCategory = keyof typeof skills;
const CATEGORY_LABELS: Record<SkillCategory, string> = {
  Frontend: 'Front-End',
  'Backend & Data': 'Data',
  'CMS & SEO': 'CMS & SEO',
  'Tools & Other': 'IT Support',
};

export function Skills() {
  return (
    <Section id="skills" label="skills-heading">
      <SectionHeading
        id="skills-heading"
        eyebrow="03 — SKILLS & TOOLKIT"
        title="The tools behind the work"
        description="A practical toolkit for building, improving, and supporting digital products across the front end and day-to-day operations."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {(Object.keys(skills) as SkillCategory[]).map((category) => (
          <div key={category} className="rounded-2xl border border-border bg-surface/70 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/70 pb-4">
              <h3 className="text-xl font-bold text-text">{CATEGORY_LABELS[category]}</h3>
              <span className="font-mono text-xs uppercase tracking-wider text-accent" aria-hidden="true">{String(skills[category].length).padStart(2, '0')} tools</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills[category].map((skillName) => (
                <span key={skillName} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface-2 px-3.5 py-2 text-sm font-medium text-text transition-colors hover:border-accent/50 hover:text-accent">
                  <TechIcon name={skillName} size={17} showColor />
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden="true" />
          <div>
            <h3 className="font-bold text-text">Currently learning</h3>
            <p className="mt-1 text-sm text-text-dim">Keeping the toolkit current with focused, hands-on study.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {learning.map((item) => (
            <span key={item} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/30 bg-surface px-3.5 py-2 text-sm font-semibold text-text">
              <CheckCircle2 size={15} className="text-accent" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
