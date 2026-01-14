<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <div
        class="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#121120] text-white px-4">
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF512F] opacity-10 rounded-full blur-[120px] pointer-events-none">
        </div>
        <div class="relative z-10 text-center">
            <h1
                class="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-2xl">
                404
            </h1>
            <h2 class="mt-4 text-2xl md:text-4xl font-bold">
                Oops! Page Not Found
            </h2>

            <p class="mt-4 text-gray-400 max-w-md mx-auto text-sm md:text-base">
                It seems like you're lost in a digital vacuum. The page you're looking for can't be found or has been
                moved.
            </p>
            <div class="mt-10">
                <RouterLink to="/"
                    class="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-[#FF512F] rounded-full hover:bg-[#ff6b4f] hover:shadow-[0_0_20px_rgba(255,81,47,0.5)] active:scale-95">
                    <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </RouterLink>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* Opsional: Animasi halus agar angka 404 sedikit melayang */
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

h1 {
    animation: float 6s ease-in-out infinite;
}
</style>