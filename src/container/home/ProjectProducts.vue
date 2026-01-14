<script setup>
import { computed, ref } from 'vue';
import Tabs from '@/components/tabs/Tabs.vue';
import Button from '@/components/button/Button.vue';

const projectTabs = ref(['Semua', 'Unggulan', 'Proyek Sampingan', 'Arsip']);

const handelChangeTab = (tab) => {
    console.log('Tab aktif berubah ke:', tab);
};

const projects = ref([
    {
        title: 'A Visual Journey Through Stories from Around the World',
        description: 'Huma Legends',
        category: 'Unggulan',
        imageUrl: "./src/assets/bg-visual.png"
    },
    {
        title: 'App Web de Aprendizaje para todas las edades...',
        description: 'Memory (MCS)',
        category: 'Proyek Sampingan',
        imageUrl: "./src/assets/bg-visual.png"
    },
    {
        title: 'Ultimos lanzamientos Hola Ultimos lanzamientos',
        description: 'UBRAND',
        category: 'Arsip',
        imageUrl: "./src/assets/bg-visual.png"
    },
    {
        title: 'Project 4',
        description: 'Project CMS',
        category: 'Unggulan',
        imageUrl: "./src/assets/bg-visual.png"
    },
])

const displayProjects = computed(() => {
    return projects.value.slice(0, 3)
})
</script>

<template>
    <section class="my-20 max-w-7xl mx-auto px-4">
        <h1 class="text-5xl font-bold text-center text-white mb-2">Project and Products</h1>
        <h2 class="text-2xl text-[#ADABC7] text-center mb-10">Lista de Product</h2>

        <div class="flex justify-center mb-16">
            <Tabs :tabs="projectTabs" :initialTab="projectTabs[0]" @tab-change="handelChangeTab" />
        </div>

        <div class="flex flex-col gap-24">
            <div v-for="(item, index) in displayProjects" :key="index"
                class="flex flex-col lg:flex-row items-center gap-10"
                :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }">
                <div class="w-full lg:w-1/2">
                    <div class="rounded-3xl overflow-hidden shadow-2xl">
                        <img :src="item.imageUrl" alt="Project Image"
                            class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col justify-center">
                    <img v-if="index % 2 != 0" src="../../assets/svgs/kutip-k.svg" class="w-10 h-10 mb-6 opacity-80"
                        alt="quote" />
                    <img v-if="index % 2 == 0" src="../../assets/svgs/kutip-ki.svg" class="w-10 h-10 mb-6 opacity-80"
                        alt="quote" />

                    <h3 class="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                        {{ item.title }}
                    </h3>
                    <p class="text-gray-400 font-medium text-xl lg:text-2xl">
                        {{ item.description }}
                    </p>
                </div>
            </div>
        </div>

        <div v-if="projects.length > 3" class="flex justify-center mt-20">
            <Button label="See More Projects" variant="secondary" />
        </div>
    </section>
</template>
