<script lang="ts" setup>
const dateNow = new Date().getFullYear();
</script>

<template>
  <footer class="my-10 mx-auto flex flex-col items-center gap-y-6">
    <div class="w-16 h-16 rounded-full flex justify-center items-center overflow-hidden border-2 border-white/10">
      <img src="../assets/logo.png" alt="logo" class="w-full h-full object-cover" />
    </div>

    <div class="max-w-full px-6 py-3 rounded-full border border-white/10
      bg-[linear-gradient(160.33deg,rgba(61,238,132,0.04)_13.17%,rgba(58,255,137,0.02)_97.91%)] 
      shadow-[0px_4px_20px_rgba(47,24,108,0.1),0px_4px_20px_-1px_rgba(0,0,0,0.25)] 
      backdrop-blur-[20px] 
      flex items-center gap-2 text-gray-300 font-medium text-sm md:text-base">

      <span>Cooked with love in</span>

      <img src="https://flagcdn.com/id.svg" alt="Indonesia" class="w-5 h-auto rounded-sm shadow-sm" />

      <span>with</span>

      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma"
        class="w-5 h-5" />

      <span>&</span>

      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue"
        class="w-5 h-5" />

    </div>

    <p class="opacity-30 text-sm text-white">©moch.ilham10 @{{ dateNow }}</p>
  </footer>
</template>