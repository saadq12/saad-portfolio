import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        'bg-elev': 'rgb(var(--bg-elev-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2-rgb) / <alpha-value>)',
        text: 'rgb(var(--text-rgb) / <alpha-value>)',
        'text-dim': 'rgb(var(--text-dim-rgb) / <alpha-value>)',
        'text-faint': 'rgb(var(--text-faint-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-glow': 'rgb(var(--accent-glow-rgb) / <alpha-value>)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
        'border-strong': 'rgb(var(--border-strong-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.06) inset, 0 16px 40px -16px rgba(0,0,0,0.5), 0 4px 12px -4px rgba(0,0,0,0.3)',
        glow: '0 0 32px -4px rgb(var(--accent-rgb) / 0.35)',
        'glow-lg': '0 0 50px -5px rgb(var(--accent-rgb) / 0.45)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
} satisfies Config;
