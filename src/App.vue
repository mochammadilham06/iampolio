<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Lenis from 'lenis';
import Layouts from './layout/Layouts.vue';
import Cursor from './components/cursor/Cursor.vue';
import { syncLenisWithScrollTrigger, prefersReducedMotion, refreshScrollTriggers } from './utils/animations';
import { setPageMeta } from './utils/seo';

const lenisRef = ref<Lenis | null>(null);
const progressBar = ref<HTMLElement | null>(null);
const route = useRoute();

let stopLenisSync: (() => void) | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReducedMotion(),
  });

  lenisRef.value = lenis;
  stopLenisSync = syncLenisWithScrollTrigger(lenis);

  // Per-route SEO head (title, description, OG, canonical)
  setPageMeta(route.meta as { title?: string; description?: string } | undefined);

  // Top progress bar: driven by live Lenis scroll so it always reaches 100% at
  // the bottom of ANY page (no stale ScrollTrigger end after route changes).
  lenis.on('scroll', (e) => {
    if (!progressBar.value) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, e.scroll / max) : 0;
    progressBar.value.style.transform = `scaleX(${p})`;
  });
});

onUnmounted(() => {
  if (refreshTimer) clearTimeout(refreshTimer);
  stopLenisSync?.();
  lenisRef.value?.destroy();
});

watch(
  () => route.path,
  () => {
    setPageMeta(route.meta as { title?: string; description?: string } | undefined);
    lenisRef.value?.scrollTo(0, { immediate: true });
    refreshScrollTriggers();
    // The cinematic transition (0.7s) swaps pages, so re-measure ScrollTriggers
    // again once the new page is fully mounted.
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshScrollTriggers, 800);
  }
);

provide('lenis', lenisRef);
</script>

<template>
  <Layouts>
    <Cursor />
    <!-- Scroll progress bar -->
    <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div ref="progressBar" style="transform: scaleX(0)" class="h-full w-full origin-left bg-gradient-to-r from-[#FF512F] to-[#F09819]"></div>
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