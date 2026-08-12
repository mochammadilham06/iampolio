<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navPath = ref([
  { name: "Services", path: "/services" },
  { name: "Experience", path: "/experience" },
  { name: "Works", path: "/works" },
]);

const scrolled = ref(false);
const hidden = ref(false);
const menuOpen = ref(false);

let lastScrollY = 0;

const handleRedirect = () => {
  window.open("https://www.linkedin.com/in/mochilham1006/", "_blank");
};

const onScroll = () => {
  const y = window.scrollY;
  scrolled.value = y > 40;
  hidden.value = y > lastScrollY && y > 240 && !menuOpen.value;
  lastScrollY = y;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const goTo = (path: string) => {
  menuOpen.value = false;
  if (route.path === path) return;
  router.push(path);
};
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full px-3 py-3 transition-all duration-500"
    :class="[hidden ? '-translate-y-[110%]' : 'translate-y-0', scrolled ? 'py-2.5' : 'py-3']"
  >
    <div class="w-full max-w-4xl mx-auto">
      <div
        class="bg-white/85 backdrop-blur-xl w-full mx-auto px-3 py-3 flex max-h-16 justify-between items-center text-[#121120] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-all duration-500"
        :class="scrolled ? 'max-h-14 py-2' : 'max-h-16'"
      >
        <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 cursor-pointer" @click="goTo('/')">
          <img src="@/assets/logo.png" alt="Logo" class="w-full h-full object-cover rounded-full" loading="eager" fetchpriority="high" />
        </div>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-1 items-center font-medium bg-[#121120]/5 rounded-full p-1">
          <RouterLink
            v-for="(path, index) in navPath"
            :key="index"
            :to="path.path"
            class="px-4 py-1.5 rounded-full text-sm transition-all duration-300 hover:text-[#FF512F]"
            :class="route.path === path.path ? 'bg-[#FF512F] text-white shadow-[0_4px_14px_rgba(255,81,47,0.4)]' : 'text-gray-600 hover:bg-[#121120]/5'"
          >
            {{ path.name }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-2">
          <Button
            variant="ghost"
            label="LinkedIn"
            size="sm"
            type="button"
            class="!rounded-full hidden sm:inline-flex"
            @click="handleRedirect"
          />
          <!-- Hamburger mobile -->
          <button
            class="md:hidden w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] bg-[#121120] hover:bg-[#FF512F] transition-colors duration-300 cursor-pointer"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            <span class="block w-5 h-[2px] bg-white rounded transition-all duration-300" :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"></span>
            <span class="block w-5 h-[2px] bg-white rounded transition-all duration-300" :class="menuOpen ? 'opacity-0' : ''"></span>
            <span class="block w-5 h-[2px] bg-white rounded transition-all duration-300" :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile overlay menu -->
    <transition name="menu">
      <div v-if="menuOpen" class="md:hidden fixed inset-0 z-[-1] bg-[#121120]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <div class="hero-glow w-[400px] h-[400px] bg-[#FF512F]/15 top-0 right-0"></div>
        <RouterLink
          v-for="(path, index) in [{ name: 'Home', path: '/' }, ...navPath]"
          :key="path.path"
          :to="path.path"
          class="menu-item text-5xl font-black tracking-tight text-white/90 transition-colors duration-300 hover:text-[#FF512F] focus-visible:text-[#FF512F]"
          :class="route.path === path.path ? 'text-[#FF512F]' : ''"
          :style="{ transitionDelay: `${index * 60}ms` }"
          @click="menuOpen = false"
        >
          {{ path.name }}
        </RouterLink>
        <Button variant="primary" label="LinkedIn" size="lg" class="!rounded-full menu-item" @click="handleRedirect" />
      </div>
    </transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-active .menu-item {
  animation: menuIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes menuIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
