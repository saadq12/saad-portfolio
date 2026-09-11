import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Code2, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectImage } from '../ui/ProjectImage';
import { TechIcon } from '../ui/TechIcon';
import { TiltCard } from '../ui/TiltCard';
import { Card } from '../ui/Card';
import { projects } from '../../data/portfolio';
import type { ProjectCategory } from '../../types';
import { cn } from '../../lib/utils';

const FILTER_OPTIONS: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'React / TS', value: 'react' },
  { label: 'WordPress & Stores', value: 'wordpress' },
  { label: 'Web Applications', value: 'web' },
  { label: 'Databases & Ops', value: 'database' },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <Section id="projects" label="projects-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <SectionHeading
          id="projects-heading"
          eyebrow="04 — FEATURED PORTFOLIO"
          title="Engineered Projects & Deployments"
          description="A showcase of real-world web applications, production e-commerce stores, and database architectures."
          className="mb-0"
        />

        {/* Filter Tabs & Project Count */}
        <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 bg-surface-2/80 p-1.5 rounded-full border border-border">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-colors duration-200',
                    isActive ? 'text-bg font-bold' : 'text-text-dim hover:text-text'
                  )}
                >
                  <span className="relative z-10">{filter.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-accent rounded-full shadow-glow"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[11px] text-text-faint">
            Displaying {filteredProjects.length} of {projects.length} selected projects
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="sync">
          {filteredProjects.map((project) => {
            const primaryLink = project.links.live || project.links.code || project.links.details || '#';
            return (
              <motion.div
                key={project.id}
                layoutId={project.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(project.featured && 'xl:col-span-2')}
              >
                <TiltCard dataCursor="card" className="h-full">
                  <Card
                    onClick={() => {
                      if (primaryLink && primaryLink !== '#') {
                        window.open(primaryLink, primaryLink.startsWith('http') ? '_blank' : '_self');
                      }
                    }}
                    className="group p-5 sm:p-6 flex flex-col justify-between h-full border-border hover:border-accent/50 transition-all duration-300 cursor-pointer shadow-card"
                  >
                    <div className="space-y-4">
                      {/* Top Header Chrome */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20 font-bold">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full font-bold">
                              <Sparkles size={10} />
                              Featured
                            </span>
                          )}
                          {project.status === 'archived' && (
                            <span className="font-mono text-[10px] text-text-faint bg-surface-2 px-2 py-0.5 rounded-full border border-border">
                              Academic / personal
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-text-faint bg-surface-2 px-2 py-0.5 rounded-md border border-border">
                          {project.year}
                        </span>
                      </div>

                      {/* Project Image Frame */}
                      <ProjectImage
                        src={project.thumbnail.src}
                        alt={project.thumbnail.alt}
                        domain={project.thumbnail.domain}
                        featured={project.featured}
                      />

                      {/* Title & Stack Subtitle */}
                      <div className="space-y-1">
                        <h3 className="font-display text-xl font-bold text-text group-hover:text-accent transition-colors flex items-center gap-2">
                          <span>{project.title}</span>
                          <ArrowUpRight size={17} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent shrink-0" />
                        </h3>
                        <p className="font-mono text-xs text-text-faint">
                          {project.stack.join(' · ')}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-text-dim text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-bg px-3.5 py-1.5 text-xs font-mono font-bold hover:bg-accent/90 transition-all shadow-glow active:scale-[0.98]"
                          >
                            <Globe size={13} />
                            <span>Live Demo</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                        {project.links.code && (
                          <a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-surface-2/60 px-3.5 text-xs font-bold text-text-dim transition-colors hover:border-accent hover:text-accent"
                          >
                            <Code2 size={16} />
                            <span>Source Code</span>
                          </a>
                        )}
                        {project.links.details && (
                          <a
                            href={project.links.details}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
                          >
                            <span>Details</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>

                      {/* Tech Icons Badges */}
                      <div className="flex items-center gap-1.5 text-text-faint">
                        {project.stack.map((tech) => (
                          <TechIcon key={tech} name={tech} size={16} showColor />
                        ))}
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
