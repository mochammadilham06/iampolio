<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const cursorRef = ref(null);

const glowSize = 400;

const onMouseMove = (e) => {
    if (!cursorRef.value) return;
    const x = e.clientX - (glowSize / 2);
    const y = e.clientY - (glowSize / 2);

    cursorRef.value.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove);
});
</script>

<template>
    <div ref="cursorRef" class="cursor-glow"></div>
</template>

<style scoped>
.cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle,
            rgba(255, 81, 47, 0.25) 0%,
            rgba(255, 81, 47, 0.05) 40%,
            transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    filter: blur(20px);
    will-change: transform;
}
</style>