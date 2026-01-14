<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Lenis from 'lenis';
import Layouts from './layout/Layouts.vue';
import Cursor from './components/cursor/Cursor.vue';

const lenisRef = ref<Lenis | null>(null);
const route = useRoute();

onMounted(() => {
  const lenis = new Lenis({
    duration: 2.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenisRef.value = lenis;

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});

onUnmounted(() => {
  lenisRef.value?.destroy();
});

watch(
  () => route.path,
  () => {
    lenisRef.value?.scrollTo(0, { immediate: true });
  }
);

provide('lenis', lenisRef);
</script>

<template>
  <Layouts>
    <Cursor />
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
</style>