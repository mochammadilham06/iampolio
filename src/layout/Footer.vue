<script setup lang="ts">
const dateNow = new Date().getFullYear();

const handleStart = () => {
  window.open('https://www.linkedin.com/in/mochilham1006/', '_blank');
};
</script>

<template>
  <footer class="relative overflow-hidden mt-10">
    <!-- CTA besar -->
    <section
      v-reveal="{ stagger: 0.1, y: 50 }"
      class="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center relative"
    >
      <div class="hero-glow w-[500px] h-[500px] bg-[#FF512F]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <p class="text-sm uppercase tracking-[0.35em] text-gray-400 font-medium">Have an idea?</p>
      <h2 class="mt-6 text-5xl md:text-8xl font-black tracking-tight leading-[0.95] text-white">
        Let's build something
        <span class="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">amazing</span>
      </h2>

      <div class="mt-10 flex justify-center">
        <button
          @click="handleStart"
          class="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF512F] to-[#F09819] px-10 py-4 font-semibold text-white text-lg shadow-[0_10px_40px_rgba(255,81,47,0.4)] transition-all duration-300 hover:shadow-[0_10px_50px_rgba(255,81,47,0.6)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          Start a Project
          <svg class="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Baris bawah -->
    <section v-reveal="{ stagger: 0.08, y: 30 }" class="relative flex flex-col items-center gap-y-6 pb-10 px-6">
      <div class="w-14 h-14 rounded-full flex justify-center items-center overflow-hidden border-2 border-white/10">
        <img src="../assets/logo.png" alt="logo" class="w-full h-full object-cover" loading="lazy" />
      </div>

      <div
        class="max-w-full px-6 py-3 rounded-full border border-white/10
      bg-[linear-gradient(160.33deg,rgba(61,238,132,0.04)_13.17%,rgba(58,255,137,0.02)_97.91%)]
      shadow-[0px_4px_20px_rgba(47,24,108,0.1),0px_4px_20px_-1px_rgba(0,0,0,0.25)]
      backdrop-blur-[20px]
      flex items-center gap-2 text-gray-300 font-medium text-sm md:text-base"
      >
        <span>Cooked with love in</span>
        <img src="https://flagcdn.com/id.svg" alt="Indonesia" class="w-5 h-auto rounded-sm shadow-sm" loading="lazy" />
        <span>with</span>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" class="w-5 h-5" loading="lazy" />
        <span>&</span>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue" class="w-5 h-5" loading="lazy" />
      </div>

      <p class="opacity-30 text-sm text-white">©moch.ilham10 @{{ dateNow }}</p>
    </section>
  </footer>
</template>
