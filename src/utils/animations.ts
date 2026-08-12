import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Easing khas Apple / eksponensial-out */
export const EASE = "expo.out";

/** Cek preferensi pengguna terhadap animasi (aksesibilitas) */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Keep Lenis and ScrollTrigger in sync (official pattern from the Lenis docs) */
export function syncLenisWithScrollTrigger(lenis: Lenis): () => void {
  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
  };
}

/** Refresh ScrollTrigger after the next render (useful when the route changes) */
export function refreshScrollTriggers(): void {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}
