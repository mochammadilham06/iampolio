import type { Directive, DirectiveBinding } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/utils/animations";

gsap.registerPlugin(ScrollTrigger);

export interface RevealOptions {
  /** offset vertikal awal (px) */
  y?: number;
  /** offset horizontal awal (px) */
  x?: number;
  /** scale awal */
  scale?: number;
  /** blur awal (px) */
  blur?: number;
  /** delay antar child (s) */
  stagger?: number;
  /** durasi animasi (s) */
  duration?: number;
  /** delay before the animation starts (s) */
  delay?: number;
  /** easing gsap */
  ease?: string;
  /** custom trigger (CSS selector or element) */
  trigger?: string | Element | null;
  /** posisi start ScrollTrigger */
  start?: string;
  /** animasi hanya sekali */
  once?: boolean;
  /** animasikan elemen itu sendiri, bukan children */
  self?: boolean;
}

type RevealValue = RevealOptions | boolean | undefined;

/** Keep a GSAP context per element so it can be cleaned up on unmount */
const contexts = new WeakMap<Element, gsap.Context>();

function resolveOptions(value: RevealValue): RevealOptions {
  if (value === true || value === undefined) return {};
  if (value === false) return { enabled: false } as unknown as RevealOptions;
  return value;
}

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealValue>) {
    if (prefersReducedMotion()) return;

    const opts = resolveOptions(binding.value);
    if ((opts as unknown as { enabled?: boolean }).enabled === false) return;

    const {
      y = 40,
      x = 0,
      scale = 1,
      blur = 0,
      stagger = 0.08,
      duration = 0.9,
      delay = 0,
      ease = EASE,
      trigger = null,
      start = "top 85%",
      once = true,
      self = false,
    } = opts;

    const triggerEl = typeof trigger === "string" ? el.querySelector(trigger) : trigger || el;
    const targets: gsap.TweenTarget[] = self ? [el] : Array.from(el.children);

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets as Element[],
        {
          opacity: 0,
          y,
          x,
          scale,
          filter: blur ? `blur(${blur}px)` : "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: triggerEl as Element,
            start,
            once,
          },
          // Clear inline styles so CSS hover (translate/scale) keeps working
          ...(once
            ? {
                onComplete: () =>
                  gsap.set(targets, { clearProps: "transform,opacity,filter" }),
              }
            : {}),
        }
      );
    }, el);

    contexts.set(el, ctx);
  },
  unmounted(el: HTMLElement) {
    contexts.get(el)?.revert();
    contexts.delete(el);
  },
};
