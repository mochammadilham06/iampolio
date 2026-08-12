<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layouts from './layout/Layouts.vue';
import Cursor from './components/cursor/Cursor.vue';
import { syncLenisWithScrollTrigger, prefersReducedMotion, refreshScrollTriggers } from './utils/animations';

gsap.registerPlugin(ScrollTrigger);

const lenisRef = ref<Lenis | null>(null);
const progressBar = ref<HTMLElement | null>(null);
const route = useRoute();

let stopLenisSync: (() => void) | null = null;
let progressTween: gsap.core.Tween | null = null;

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReducedMotion(),
  });

  lenisRef.value = lenis;
  stopLenisSync = syncLenisWithScrollTrigger(lenis);

  // Top progress bar (moves with scroll)
  if (progressBar.value) {
    progressTween = gsap.to(progressBar.value, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        scrub: 0.3,
      },
    });
  }
});

onUnmounted(() => {
  stopLenisSync?.();
  progressTween?.scrollTrigger?.kill();
  progressTween?.kill();
  lenisRef.value?.destroy();
});

watch(
  () => route.path,
  () => {
    lenisRef.value?.scrollTo(0, { immediate: true });
    refreshScrollTriggers();
  }
);

provide('lenis', lenisRef);
</script>

<template>
  <Layouts>
    <Cursor />
    <!-- Scroll progress bar -->
    <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div ref="progressBar" class="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#FF512F] to-[#F09819]"></div>
    </div>
    <RouterView v-slot="{ Component, route }">
      <transition name="cinematic" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </Layouts>
</template>

<style>
.cinematic-enter-active,
.cinematic-leave-active {
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.cinematic-enter-from {
  opacity: 0;
  transform: scale(1.02) translateY(20px);
  filter: blur(15px);
}

.cinematic-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(-20px);
  filter: blur(15px);
}

@media (prefers-reduced-motion: reduce) {
  .cinematic-enter-from,
  .cinematic-leave-to {
    opacity: 0;
    transform: none;
    filter: none;
  }
}
</style>