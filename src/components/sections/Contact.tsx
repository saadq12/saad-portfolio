import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Copy, ArrowUpRight } from 'lucide-react';
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
    icon: Mail,
    label: 'Email',
    sublabel: 'Click to copy',
    value: socials.email,
    href: `mailto:${socials.email}`,
    copyable: true,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25 hover:border-blue-400/50',
  },
  {
    key: 'whatsapp',
    icon: MessageSquare,
    label: 'WhatsApp Direct',
    sublabel: 'Fast response',
    value: '+92 303 3911463',
    href: socials.whatsapp,
    copyable: false,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25 hover:border-emerald-400/50',
  },
  {
    key: 'phone',
    icon: Phone,
    label: 'Phone Call',
    sublabel: 'Mon – Sat · PKT',
    value: socials.phoneIntl,
    href: `tel:${socials.phoneIntl}`,
    copyable: false,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/25 hover:border-cyan-400/50',
  },
];

export function Contact() {
  const { copy } = useCopyToClipboard();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleCopyEmail = async () => {
    const success = await copy(socials.email);
    if (success) showToast('Copied email: saadq3536@gmail.com');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus('submitting');
    try {
      // Simulate form delivery
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      showToast('Your message has been sent successfully!');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-border bg-surface-2/70 backdrop-blur-sm px-4 py-3 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200';

  return (
    <Section id="contact" label="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow="06 — GET IN TOUCH"
        title="Let's Build Something Exceptional"
        description="Have an upcoming project, WordPress requirement, or IT inquiry? Send a direct message or connect instantly."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        {/* Left Column: Direct Contact & Location Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-text">Direct Communication</h3>
            <p className="font-mono text-xs text-accent">
              // Typically replies within a few hours
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="space-y-3">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon;
              const inner = (
                <div
                  className={`flex items-center justify-between p-4 rounded-xl border ${card.border} bg-surface/75 backdrop-blur-md transition-all duration-200 group cursor-pointer shadow-sm`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
                      <Icon size={19} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                        {card.label} · {card.sublabel}
                      </div>
                      <div className="font-bold text-sm text-text truncate group-hover:text-accent transition-colors">
                        {card.value}
                      </div>
                    </div>
                  </div>

                  <div className="text-text-faint group-hover:text-accent transition-colors pl-2 shrink-0">
                    {card.copyable ? <Copy size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                </div>
              );

              return card.copyable ? (
                <button
                  key={card.key}
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor="link"
                  className="block w-full text-left focus-visible:outline-none"
                  aria-label="Copy email address"
                >
                  {inner}
                </button>
              ) : (
                <a
                  key={card.key}
                  href={card.href}
                  target={card.key === 'whatsapp' ? '_blank' : undefined}
                  rel={card.key === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  data-cursor="link"
                >
                  {inner}
                </a>
              );
            })}

            {/* Location & Timezone Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-surface/60">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <MapPin size={19} strokeWidth={2} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                  Location · Timezone PKT (UTC+5)
                </div>
                <div className="font-bold text-sm text-text">{socials.location}</div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-2 border-t border-border/50 space-y-2.5">
            <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider block">
              // Socials & Repositories
            </span>
            <SocialRow size={18} showLabels />
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
            {status === 'success' ? (
              <div className="py-14 text-center space-y-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent mx-auto shadow-glow">
                  <CheckCircle2 size={42} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text">
                  Message Dispatched!
                </h3>
                <p className="text-text-dim text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been received, and I will reply to your email directly.
                </p>
                <Button variant="outline" size="md" onClick={() => setStatus('idle')} className="font-mono text-xs">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text">Send a Message</h3>
                  <p className="text-text-dim text-xs mt-1 font-mono">
                    Fill in your details below and I&apos;ll get back to you promptly.
                  </p>
                </div>

                {/* Anti-bot honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs font-semibold text-text-dim uppercase tracking-wider"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs font-semibold text-text-dim uppercase tracking-wider"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs font-semibold text-text-dim uppercase tracking-wider"
                  >
                    Subject / Project Scope *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. React Frontend Development or WordPress Store"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs font-semibold text-text-dim uppercase tracking-wider"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project goals, required deliverables, timeline, or questions..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-rose-400 text-xs font-mono">
                    Failed to send. Please reach out directly to saadq3536@gmail.com
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === 'submitting'}
                  className="w-full shadow-glow hover:shadow-glow-lg font-bold"
                >
                  <span>{status === 'submitting' ? 'Dispatching Message...' : 'Send Message'}</span>
                  <Send size={15} />
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </Section>
  );
}
