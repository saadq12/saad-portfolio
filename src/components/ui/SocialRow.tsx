import { SiGithub, SiWhatsapp, SiInstagram, SiFacebook } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { socials } from '../../data/portfolio';
import { cn } from '../../lib/utils';

export interface SocialRowProps {
  size?: number;
  className?: string;
  itemClassName?: string;
  showLabels?: boolean;
}

export function SocialRow({
  size = 18,
  className = '',
  itemClassName = '',
  showLabels = false,
}: SocialRowProps) {
  const links = [
    {
      name: 'GitHub',
      href: socials.github,
      icon: SiGithub,
      hoverColor: 'hover:text-white dark:hover:text-white hover:bg-neutral-900/80 hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]',
    },
    {
      name: 'LinkedIn',
      href: socials.linkedin,
      icon: FaLinkedin,
      hoverColor: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 hover:shadow-[0_0_15px_rgba(10,102,194,0.3)]',
    },
    {
      name: 'WhatsApp',
      href: socials.whatsapp,
      icon: SiWhatsapp,
      hoverColor: 'hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]',
    },
    {
      name: 'Instagram',
      href: socials.instagram,
      icon: SiInstagram,
      hoverColor: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/40 hover:shadow-[0_0_15px_rgba(228,64,95,0.3)]',
    },
    {
      name: 'Facebook',
      href: socials.facebook,
      icon: SiFacebook,
      hoverColor: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 hover:shadow-[0_0_15px_rgba(24,119,242,0.3)]',
    },
    {
      name: 'Email',
      href: `mailto:${socials.email}`,
      icon: Mail,
      isLucide: true,
      hoverColor: 'hover:text-accent hover:bg-accent/10 hover:border-accent/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    },
  ];

  return (
    <div className={cn('flex items-center gap-2.5 flex-wrap', className)}>
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target={item.name === 'Email' ? undefined : '_blank'}
            rel={item.name === 'Email' ? undefined : 'noopener noreferrer'}
            aria-label={`Visit Saad Qayyum on ${item.name}`}
            data-cursor="link"
            className={cn(
              'group relative inline-flex items-center gap-2 rounded-xl p-2.5 sm:p-2.5 text-text-dim bg-surface-2/70 backdrop-blur-md border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              item.hoverColor,
              itemClassName
            )}
          >
            {item.isLucide ? (
              <Icon size={size} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <Icon size={size} className="transition-transform duration-300 group-hover:scale-110" />
            )}
            {showLabels && <span className="text-xs font-mono font-medium">{item.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
