<script setup lang="ts">
import { RouterLink } from "vue-router";

const reloadPage = () => {
    window.location.reload();
};
</script>

<template>
    <div
        class="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#121120] text-white px-4">

        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#FF512F] opacity-15 rounded-full blur-[100px] pointer-events-none animate-pulse">
        </div>

        <div class="relative z-10 text-center">
            <h1
                class="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-2xl">
                500
            </h1>

            <h2 class="mt-4 text-2xl md:text-4xl font-bold">
                Internal Server Error
            </h2>

            <p class="mt-4 text-gray-400 max-w-md mx-auto text-sm md:text-base">
                There's a technical issue on our end. The server is experiencing issues. Please try reloading the page
                or come back later.
            </p>

            <div class="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center">

                <button @click="reloadPage"
                    class="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-[#FF512F] rounded-full hover:bg-[#ff6b4f] hover:shadow-[0_0_20px_rgba(255,81,47,0.5)] active:scale-95 cursor-pointer">
                    <svg class="w-5 h-5 mr-2 transition-transform group-hover:rotate-180" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Again
                </button>

                <RouterLink to="/"
                    class="px-8 py-3 font-medium text-gray-300 hover:text-white transition-colors duration-200 border border-transparent hover:border-white/20 rounded-full">
                    Back to Home
                </RouterLink>

            </div>
        </div>

    </div>
</template>

<style scoped>
/* Animasi lambat untuk background glow agar terasa seperti 'warning' */
.animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.1;
    }

    50% {
        opacity: 0.2;
    }
}

/* Animasi float untuk angka */
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