<script setup>
import { ref } from 'vue';

const projects = ref([
    {
        id: 1,
        title: 'NEON GENESIS',
        category: 'IMMERSIVE WEB EXPERIENCE',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop', // Gambar Abstract/Gradient
        size: 'large'
    },
    {
        id: 2,
        title: 'CYBER DYNAMICS',
        category: 'BRAND IDENTITY',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop', // Gambar Purple Gradient
        size: 'small'
    },
    {
        id: 3,
        title: 'VOID WALKER',
        category: 'ART DIRECTION',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop', // Gambar Space/Stars
        size: 'small'
    },
    {
        id: 4,
        title: 'SONIC ARCHITECT',
        category: 'SOUND DESIGN',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop', // Gambar Studio/Dark
        size: 'small'
    }
]);
</script>

<template>
    <div class="text-white min-h-screen p-8">

        <div class="my-20 max-w-7xl mx-auto">

            <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 relative">
                <div class="absolute left-0 top-2 bottom-2 w-1 bg-[#FF512F] rounded-full hidden md:block"></div>

                <div class="md:pl-8">
                    <h2 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                        SELECTED <br />
                        <span class="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-700">
                            WORKS
                        </span>
                    </h2>
                </div>

                <div
                    class="mt-6 md:mt-0 md:max-w-xs text-xs md:text-sm text-gray-400 font-mono tracking-widest uppercase">
                    <p>A curated collection of digital experiences, brand identities, and cinematic interfaces.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[800px]">

                <div
                    class="relative group overflow-hidden rounded-xl h-[500px] lg:h-full w-full bg-gray-900 border border-white/10">
                    <img :src="projects[0].image" alt="Project Cover"
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>

                    <div class="absolute inset-0 p-8 flex flex-col justify-between">
                        <div
                            class="flex justify-between items-start text-[10px] md:text-xs font-mono tracking-widest text-orange-500">
                            <span>{{ projects[0].category }}</span>
                            <span>{{ projects[0].year }}</span>
                        </div>
                        <div>
                            <h3
                                class="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {{ projects[0].title }}
                            </h3>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-6 h-full">
                    <div v-for="(project, index) in projects.slice(1)" :key="project.id"
                        class="relative group overflow-hidden rounded-xl flex-1 bg-gray-900 border border-white/10 min-h-[250px]">
                        <img :src="project.image" alt="Project Cover"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10"></div>

                        <div class="absolute inset-0 p-6 flex flex-col justify-between">
                            <div
                                class="flex justify-between items-start text-[10px] font-mono tracking-widest text-orange-500">
                                <span>{{ project.category }}</span>
                                <span>{{ project.year }}</span>
                            </div>
                            <div>
                                <h3
                                    class="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    {{ project.title }}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>