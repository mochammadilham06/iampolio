<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'vue-router';
import { EASE, prefersReducedMotion } from '@/utils/animations';

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref<HTMLElement | null>(null);
const router = useRouter();

let ctx: gsap.Context | null = null;

onMounted(() => {
  if (prefersReducedMotion() || !heroRef.value) return;

  ctx = gsap.context(() => {
    // Intro: garis teks naik satu per satu (mask reveal)
    gsap.from('.hero-line', {
      yPercent: 115,
      duration: 1.2,
      stagger: 0.14,
      ease: EASE,
      delay: 0.2,
    });

    // Intro: elemen lain fade-in bertahap
    gsap.from('.hero-fade', {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.14,
      ease: 'power3.out',
      delay: 0.7,
    });

    // Scroll: content rises + fades out while scrolling (signature Apple effect)
    gsap.to('.hero-content', {
      yPercent: -14,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Scroll: glow bergerak paralaks (lambat vs cepat)
    gsap.to('.hero-glow-1', {
      yPercent: 45,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
    gsap.to('.hero-glow-2', {
      yPercent: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }, heroRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});

const handleTalk = () => {
  window.open('https://www.linkedin.com/in/mochilham1006/', '_blank');
};
</script>

<template>
  <section
    ref="heroRef"
    class="hero-section relative flex flex-col items-center justify-center overflow-hidden select-none"
  >
    <!-- Background: grid + glow (ringan, tanpa gambar berat) -->
    <div class="absolute inset-0 bg-grid"></div>
    <div class="hero-glow hero-glow-1 w-[520px] h-[520px] bg-[#FF512F]/25 -top-40 -left-40"></div>
    <div class="hero-glow hero-glow-2 w-[460px] h-[460px] bg-[#F09819]/15 -bottom-32 -right-32"></div>
    <div class="hero-glow w-[300px] h-[300px] bg-[#7C4DFF]/10 top-1/3 right-[15%]"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-[#121120]/40 via-transparent to-[#121120]"></div>

    <div class="hero-content relative z-10 text-center px-4 pt-32 pb-44 max-w-5xl mx-auto w-full">
      <!-- Badge -->
      <div class="hero-fade inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-gray-300 mb-10">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        Available for projects
      </div>

      <h1 class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-white">
        <span class="block overflow-hidden pb-1"><span class="hero-line block">CREATIVE</span></span>
        <span class="block overflow-hidden pb-1">
          <span class="hero-line block text-stroke hover:text-transparent">DEVELOPER</span>
        </span>
        <span class="block overflow-hidden pb-2">
          <span class="hero-line block">
            SINCE&nbsp;<span class="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">2023</span>
          </span>
        </span>
      </h1>

      <div class="space-y-3 mt-10">
        <p class="hero-fade text-xl md:text-2xl font-bold text-gray-100">
          Over the last 2 years, I've empowered <span class="text-[#FF512F]">4+ companies</span>
        </p>
        <p class="hero-fade text-lg md:text-xl font-light text-gray-400 max-w-2xl mx-auto">
          Developing user-centric interfaces, scalable micro-frontends, and high-performance web experiences.
        </p>
      </div>

      <!-- CTA -->
      <div class="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <button
          @click="router.push('/works')"
          class="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF512F] to-[#F09819] px-8 py-3.5 font-semibold text-white shadow-[0_8px_30px_rgba(255,81,47,0.35)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,81,47,0.55)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          View My Work
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button
          @click="handleTalk"
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          Let's Talk
        </button>
      </div>
    </div>

    <!-- Indikator scroll -->
    <div class="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
      <span class="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
      <div class="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
        <div class="w-1 h-2 rounded-full bg-[#FF512F] animate-bounce"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
}
</style>
