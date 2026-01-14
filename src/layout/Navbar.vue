<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";


const router = useRoute()
const routerNav = useRouter()

const navPath = ref([
  { name: "Services", path: "/services" },
  { name: "Experience", path: "/experience" },
  { name: "Works", path: "/works" },
]);

const handleRedirect = () => {
  window.open("https://www.linkedin.com/in/mochilham1006/", "blank")
}
</script>

<template>
  <header class="w-full fixed top-0 z-50 px-3 py-3">
    <div class="w-full max-w-4xl mx-auto">
      <div
        class="bg-white/80 backdrop-blur-sm w-full mx-auto px-3 py-3 flex max-h-16 justify-between items-center text-[#121120] rounded-full shadow-sm">
        <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" v-on:click="routerNav.push('/')">
          <img src="@/assets/logo.png" alt="Logo" class="w-full h-full object-cover p-1 rounded-full" />
        </div>

        <nav class="hidden sm:flex gap-5 items-center font-medium">
          <RouterLink v-for="(path, index) in navPath" :key="index" :to="path.path"
            class="hover:cursor-pointer hover:text-[#FF512F] transition-colors"
            :class="router.path === path.path ? 'text-[#FF512F]' : 'text-gray-700'">
            {{ path.name }}</RouterLink>

        </nav>

        <Button variant="ghost" label="Linkedin" size="lg" type="button" class="!rounded-3xl" @click="handleRedirect" />
      </div>
    </div>
  </header>
</template>