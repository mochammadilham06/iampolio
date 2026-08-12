# IAM POLIO — Creative Developer Portfolio

A modern, animation-driven portfolio built with **Vue 3 + TypeScript + Vite**. Features an Apple-style pinned project showcase, Lenis smooth scrolling, GSAP scroll animations, a certifications badge grid, and a fully responsive layout — all kept lightweight.

## ✨ Features

- **Apple-style project showcase** — on the home page, project details crossfade on scroll while a browser mockup stays pinned to the viewport. Each project cycles 2 screenshots (login → dashboard) with a view badge and a URL bar that updates per project.
- **Lenis smooth scrolling** — synced with GSAP ScrollTrigger; automatically disabled for `prefers-reduced-motion` users.
- **GSAP scroll animations** — reusable `v-reveal` directive (stagger, blur, custom easing), hero line-mask intro, scroll progress bar.
- **Verified badge grid** — AWS certification shown as **Verified** (Credly link + badge image slot); other platforms shown as **Ongoing** with a pulsing amber chip.
- **Resilient data layer** — local mock fallbacks when the API is unreachable, plus `resolveProjectImages()` so real local screenshots always win over broken remote URLs.
- **Fully responsive** — natural mobile cards on the Works page (image + content below, descriptions always visible), stacked pinned showcase on mobile, mobile hamburger overlay menu.
- **Lightweight** — no heavy image dependencies; decorative backgrounds are pure CSS (grid, glows, gradients).

## 🔍 SEO

- Per-route `<title>`, description, Open Graph, Twitter card, and canonical are set client-side (`src/utils/seo.ts` + route `meta`).
- Canonical/OG URLs are derived from `window.location.origin`, so they stay correct on any domain.
- **Before deploying, replace the `iampolio.com` placeholder in these static files** with the real domain:
  - `index.html` — canonical, `og:url`, `og:image`, JSON-LD (`Person` + `WebSite`)
  - `public/sitemap.xml`
  - `public/robots.txt`

## 🛠 Tech Stack

| Layer      | Tech                                 |
| ---------- | ------------------------------------ |
| Framework  | Vue 3 (`<script setup>`, TypeScript) |
| Build tool | Vite 6                               |
| Styling    | Tailwind CSS 4                       |
| Animations | GSAP + ScrollTrigger, Lenis          |
| Router     | Vue Router 4                         |
| HTTP       | Axios                                |

## 📁 Project Structure

```
src/
├── assets/            # SVGs & logo assets
├── components/        # Reusable UI (Button, Tabs, Cursor)
├── configs/           # axios instance, router
├── container/         # Page sections:
│   ├── home/          #   About, Certifications, Showcase, Tech, Window
│   ├── works/         #   Works grid (bento on desktop, natural cards on mobile)
│   ├── experience/    #   Career timeline
│   └── services/      #   Service cards
├── directives/        # v-reveal scroll directive (GSAP)
├── layout/            # Navbar, Hero, Footer
├── mock/              # Local fallback data (works, experience)
├── pages/             # Route pages + 404 / 500
├── service/           # API services + mock helpers
└── utils/             # animations (Lenis sync), constants
public/
└── img/               # Local project screenshots
```

## 🚀 Getting Started

```bash
# Install dependencies
yarn install

# Start the dev server
yarn dev

# Production build (type-check + bundle)
yarn build

# Preview the production build
yarn preview
```

## 📄 License

© Mochammad Ilham Maulana. All rights reserved.
