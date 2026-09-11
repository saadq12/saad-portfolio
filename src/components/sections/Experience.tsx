import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { experience, education, certifications } from '../../data/portfolio';
import { GraduationCap, BadgeCheck, Building2, Calendar, Award } from 'lucide-react';

export function Experience() {
  return (
    <Section id="experience" label="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow="// 05 — CAREER & ACADEMICS"
        title="Experience, Education & Credentials"
        description="A timeline of industry roles, academic training in Computer Information Technology, and certified skills."
      />

      {/* Experience Timeline */}
      <div className="relative mb-16 max-w-4xl mx-auto">
        {/* Left continuous timeline line */}
        <div className="absolute top-4 bottom-4 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-accent via-accent/30 to-transparent" />

        <div className="space-y-8">
          {experience.map((item, idx) => (
            <div
              key={`${item.company}-${item.role}-${idx}`}
              className="relative pl-12 sm:pl-16 group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 sm:left-6 -translate-x-1/2 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-surface border-2 border-accent shadow-glow z-10 group-hover:scale-110 transition-transform">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              </div>

              {/* Experience Card */}
              <div className="glass-card rounded-2xl border border-border p-5 sm:p-6 space-y-3 hover:border-accent/45 transition-all duration-300 shadow-card">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="font-display text-base sm:text-lg font-bold text-text group-hover:text-accent transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-accent font-semibold text-xs sm:text-sm">
                      <Building2 size={13} />
                      <span>{item.company}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-faint bg-surface-2 px-3 py-1 rounded-full border border-border self-start sm:self-center">
                    <Calendar size={11} />
                    {item.period}
                  </span>
                </div>

                <p className="text-text-dim text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">

        {/* Education Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-text">Education</h3>
              <p className="font-mono text-xs text-text-faint">Academic Qualifications</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {education.map((edu) => (
              <div
                key={edu.title}
                className="glass-card rounded-xl p-4 sm:p-5 border border-border hover:border-blue-400/35 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-sm sm:text-base font-bold text-text leading-snug">
                    {edu.title}
                  </h4>
                  <span className="font-mono text-[10px] text-text-faint flex-shrink-0 bg-surface-2 px-2.5 py-1 rounded-md border border-border">
                    {edu.period}
                  </span>
                </div>
                <p className="font-mono text-xs text-text-dim flex items-center gap-1.5">
                  <Building2 size={12} className="text-blue-400" />
                  <span>{edu.org}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-text">Certifications</h3>
              <p className="font-mono text-xs text-text-faint">Verified Credentials</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="glass-card rounded-xl p-4 sm:p-5 border border-border hover:border-emerald-400/35 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-sm sm:text-base font-bold text-text flex items-center gap-1.5 leading-snug">
                    <BadgeCheck size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>{cert.title}</span>
                  </h4>
                  <span className="font-mono text-[10px] text-text-faint flex-shrink-0 bg-surface-2 px-2.5 py-1 rounded-md border border-border">
                    {cert.period}
                  </span>
                </div>
                <p className="font-mono text-xs text-text-dim">
                  Issuing Authority: <strong className="text-text font-semibold">{cert.org}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
