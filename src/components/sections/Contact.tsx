import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, CheckCircle2, Copy, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { SocialRow } from '../ui/SocialRow';
import { socials } from '../../data/portfolio';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useToast } from '../providers/ToastProvider';

const CONTACT_CARDS = [
  {
    key: 'email',
    label: 'Email me',
    detail: socials.email,
    hint: 'Best for project briefs',
    href: `mailto:${socials.email}`,
    icon: Mail,
    iconClass: 'bg-sky-400/10 text-sky-300 border-sky-400/20',
  },
  {
    key: 'phone',
    label: 'Call me',
    detail: socials.phoneIntl,
    hint: 'Mon - Sat · PKT',
    href: `tel:${socials.phoneIntl}`,
    icon: Phone,
    iconClass: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    detail: 'Start a quick chat',
    hint: 'Fast response',
    href: socials.whatsapp,
    icon: SiWhatsapp,
    iconClass: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  },
] as const;

export function Contact() {
  const { copy } = useCopyToClipboard();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleCopyEmail = async () => {
    const success = await copy(socials.email);
    if (!success) return;
    setCopied(true);
    showToast('Email copied to clipboard');
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData.honeypot) return;
    setStatus('submitting');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      showToast('Your message has been sent successfully');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full rounded-xl border border-border bg-bg/70 px-4 py-3.5 text-sm text-text placeholder:text-text-faint transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25';
  const labelClass = 'block text-xs font-bold uppercase tracking-[0.14em] text-text-dim';

  return (
    <Section id="contact" label="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow="// 07 — GET IN TOUCH"
        title="Let's turn a good idea into useful work."
        description="Tell me what you are building, fixing, or improving. I'll respond with a clear next step."
      />

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CONTACT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="group flex min-h-[232px] flex-col rounded-2xl border border-border bg-surface/75 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${card.iconClass}`}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg/40 text-text-faint transition-colors group-hover:border-accent/40 group-hover:text-accent" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </div>
              <a
                href={card.href}
                target={card.key === 'whatsapp' ? '_blank' : undefined}
                rel={card.key === 'whatsapp' ? 'noopener noreferrer' : undefined}
                aria-label={`${card.label}: ${card.detail}`}
                className="block flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
              >
                <span className="block text-lg font-bold text-text transition-colors group-hover:text-accent">{card.label}</span>
                <span className="mt-2 block truncate text-sm font-medium text-text-dim">{card.detail}</span>
                <span className="mt-2 block text-xs text-text-faint">{card.hint}</span>
              </a>
              {card.key === 'email' && (
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-2 px-3 py-2.5 text-xs font-bold text-text transition-all hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  <span>{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface/55 p-6 sm:p-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <MessageCircle size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text">Let's talk</h3>
                <p className="font-mono text-xs text-accent"><span aria-hidden="true">// </span>Usually replies within a few hours</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-text-dim">
              Whether you need a sharper front end, a better WordPress store, or help getting digital operations under control, send the details and I'll take it from there.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-bg/50 p-4">
              <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs uppercase tracking-wider text-text-faint">Based in</p>
                <p className="mt-1 text-sm font-semibold text-text">{socials.location} · PKT (UTC+5)</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border/70 pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-text-faint">Find me online</p>
            <SocialRow size={18} showLabels />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-card sm:p-8">
          {status === 'success' ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center space-y-5 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent shadow-glow">
                <CheckCircle2 size={42} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-text sm:text-3xl">Message sent.</h3>
              <p className="max-w-md text-sm leading-7 text-text-dim">Thanks for reaching out. I'll review your message and reply directly to your email.</p>
              <Button variant="outline" size="md" onClick={() => setStatus('idle')} className="min-h-11">
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" aria-busy={status === 'submitting'}>
              <div className="mb-1">
                <h3 className="text-xl font-bold text-text sm:text-2xl">Send a project brief</h3>
                <p className="mt-1 text-sm text-text-dim">A few details help me give you a useful first reply.</p>
              </div>

              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(event) => setFormData({ ...formData, honeypot: event.target.value })}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className={labelClass}>Your name <span className="text-accent">*</span></label>
                  <input id="contact-name" type="text" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Alex Morgan" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className={labelClass}>Your email <span className="text-accent">*</span></label>
                  <input id="contact-email" type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="alex@example.com" className={inputClass} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className={labelClass}>Project or subject <span className="text-accent">*</span></label>
                <input id="contact-subject" type="text" required value={formData.subject} onChange={(event) => setFormData({ ...formData, subject: event.target.value })} placeholder="React frontend, WordPress store, or IT support" className={inputClass} />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className={labelClass}>What can I help with? <span className="text-accent">*</span></label>
                <textarea id="contact-message" required rows={5} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="Share your goals, deliverables, timeline, or questions..." className={`${inputClass} resize-y`} />
              </div>

              {status === 'error' && <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-medium text-rose-300">Something went wrong. Please email {socials.email} directly.</p>}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-bg shadow-glow transition-all hover:bg-accent/90 hover:shadow-glow-lg active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
              >
                <span>{status === 'submitting' ? 'Sending message...' : 'Send message'}</span>
                {status === 'submitting' ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" aria-label="Loading" /> : <Send size={17} aria-hidden="true" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
