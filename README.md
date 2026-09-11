# Saad Qayyum — Portfolio (v2)

Production-ready single-page portfolio for **Saad Qayyum**, Front-End Developer & IT Specialist based in Gujranwala, Pakistan.

Built with a **Terminal Meets Editorial** aesthetic, featuring custom SVG signatures, Lenis smooth scrolling, strict TypeScript, Tailwind CSS, and Framer Motion animations.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 18 + Vite 5 + TypeScript (Strict)
- **Styling**: Tailwind CSS v3.4.17 with space-separated RGB channel design tokens
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React + React Icons (`react-icons/si`, `react-icons/tb`)
- **Scroll Engine**: Lenis (`lenis`)
- **Carousel**: Embla Carousel React + Autoplay (`embla-carousel-react`, `embla-carousel-autoplay`)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Icon Imports & Dependencies
Verify that all brand and tech icons in `src/lib/techIcons.ts` resolve cleanly:
```bash
npm ls react-icons
```
*Note*: Icon lookup uses `normalizeKey()` fallback handling so missing keys will gracefully render `FallbackIcon` (`Globe`) without runtime errors.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📸 Social Share Image (OG Image) Export

The repository includes `public/og-image.svg` (1200×630). To generate the raster PNG for social platforms:

```bash
npx svgexport public/og-image.svg public/og-image.png 1200:630
```

---

## 📄 Curriculum Vitae Replacement

A placeholder PDF is located at `public/cv.pdf`. Replace this file with your updated PDF resume before deploying to production.

---

## 🌐 Vercel Deployment

The project includes `vercel.json` pre-configured with SPA route rewrites and immutable asset caching headers.

### Deploying via Vercel CLI:
```bash
npx vercel
```
Production Domain Target: `saadq-portfolio.vercel.app`

---

## ⚡ Key Architecture & Features

- **Custom Logo Mark (`S//Q`)**: Terminal monogram with animated accent caret (`Logo.tsx`). Static fallback under `prefers-reduced-motion`.
- **Command Palette (`Cmd+K`)**: Keyboard-driven modal dialog allowing instant navigation across sections, theme toggling, copying email address, and opening social channels.
- **Custom Cursor**: Motion-driven ring + dot cursor responding to `data-cursor` attributes (`link`, `card`, `text`, `drag`). Disabled on touch devices and under `prefers-reduced-motion`.
- **Bento Grid Work Section**: Bento grid layout with interactive category filters (`All`, `Web`, `React`, `WordPress`, `Database`) using Framer Motion `AnimatePresence`.
- **Preloader**: Custom entrance preloader with automated Lenis scroll pause and resume.
