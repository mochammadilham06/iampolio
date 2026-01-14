<script setup lang="ts">
import Footer from "./Footer.vue";
import Navbar from "./Navbar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>