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

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Vue 3 (`<script setup>`, TypeScript) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animations | GSAP + ScrollTrigger, Lenis |
| Router | Vue Router 4 |
| HTTP | Axios |

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

## ⚙️ Environment Variables

Create a `.env` file in the project root (see `.env.example` if available):

```env
VITE_APP_API_URL=https://your-api.example.com
VITE_APP_API_KEY=your-secret-key
```

- If `VITE_APP_API_URL` is **not set** or the API call **fails**, the app automatically falls back to the local mock data in `src/mock/`.
- Expected API responses:
  - `GET /projects?limit=10` → `{ "myportfolio_portfolio": [...] }`
  - `GET /experiences` → `{ "myportfolio_experience": [...] }`

## 🖼 Screenshots & Data

The home showcase and the Works grid resolve project images through `resolveProjectImages()` in `src/service/mock.ts`, which maps project titles to local screenshots:

```ts
const LOCAL_SCREENSHOTS = {
  'ML Ops Telkomsel': ['/img/mlops-login.png', '/img/mlops-dashboard.png'],
  'Qlola Cash Management': ['/img/qlola-login.png', '/img/qlola-dashboard.png'],
  'IFG Life Corporate Website': ['/img/ifg-login.png', '/img/ifg-dashboard.png'],
};
```

- **`images[0]`** = first screenshot (landing/login view)
- **`images[1]`** = second screenshot (dashboard/feature view)

To add screenshots for other projects, drop the files into `public/img/` and register them in the map. Any image that fails to load shows a styled "Screenshot unavailable" fallback panel instead of a broken icon.

## 🏆 Certifications

`src/container/home/Certification.vue` contains a `certifications` array. The AWS card supports a real badge image:

```ts
const AWS_BADGE_IMAGE = ''; // ← paste your Credly badge image URL here
```

To promote a certification from **Ongoing** to **Verified**, set `status: 'verified'` and add its credential `url`.

## ♿ Accessibility

- All scroll animations respect `prefers-reduced-motion` (animations disabled, static fallbacks shown).
- Semantically correct headings, `aria` labels on interactive elements, visible focus rings.
- Ongoing certification cards are not links (no fake verification links).

## 📄 License

© Mochammad Ilham Maulana. All rights reserved.
