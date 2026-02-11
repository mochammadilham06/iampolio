<script setup>
import { onMounted, ref, computed } from 'vue';
import { ProjectServices } from '@/service';

const { getProjects } = ProjectServices();

const rawProjects = ref([]);
const isLoading = ref(true);

const formattedProjects = computed(() => {
    return rawProjects.value.map(item => ({
        ...item,
        year: item.year ? item.year.split('-')[0] : '2024',
        category: item.category || 'PROJECT',
        image: item.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853'
    }));
});

const handleFetch = async () => {
    isLoading.value = true;
    try {
        const res = await getProjects();
        rawProjects.value = res.myportfolio_portfolio || res || [];
    } catch (err) {
        console.error("[getProject]: ", err);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    handleFetch();
})
</script>

<template>
    <div class="text-white min-h-screen p-8 bg-black">
        <div class="my-20 max-w-7xl mx-auto">

            <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 relative">
                <div class="absolute left-0 top-2 bottom-2 w-1 bg-[#FF512F] rounded-full hidden md:block"></div>

                <div class="md:pl-8">
                    <div v-if="isLoading" class="animate-pulse">
                        <div class="h-16 md:h-24 w-64 bg-gray-800 rounded mb-2"></div>
                        <div class="h-16 md:h-24 w-48 bg-gray-800 rounded"></div>
                    </div>
                    <h2 v-else class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                        SELECTED <br />
                        <span class="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-700">
                            WORKS
                        </span>
                    </h2>
                </div>

                <div
                    class="mt-6 md:mt-0 md:max-w-xs text-xs md:text-sm text-gray-400 font-mono tracking-widest uppercase">
                    <div v-if="isLoading" class="space-y-2 animate-pulse w-48 md:w-64">
                        <div class="h-2 bg-gray-800 rounded w-full"></div>
                        <div class="h-2 bg-gray-800 rounded w-2/3"></div>
                    </div>
                    <p v-else>A curated collection of digital experiences, brand identities, and cinematic interfaces.
                    </p>
                </div>
            </div>

            <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                <div
                    class="lg:col-span-2 lg:row-span-2 h-[624px] md:h-[624px] relative overflow-hidden rounded-xl bg-gray-900 border border-white/5 animate-pulse">
                    <div class="absolute inset-0 bg-gray-800/50"></div>
                    <div class="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                        <div class="flex justify-between w-full">
                            <div class="h-6 w-20 bg-gray-700 rounded"></div>
                            <div class="h-6 w-12 bg-gray-700 rounded"></div>
                        </div>
                        <div>
                            <div class="h-12 w-2/3 bg-gray-700 rounded mb-4"></div>
                            <div class="space-y-2">
                                <div class="h-3 w-full bg-gray-700 rounded"></div>
                                <div class="h-3 w-5/6 bg-gray-700 rounded"></div>
                                <div class="h-3 w-4/6 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for="n in 4" :key="n"
                    class="col-span-1 h-[300px] relative overflow-hidden rounded-xl bg-gray-900 border border-white/5 animate-pulse">
                    <div class="absolute inset-0 bg-gray-800/50"></div>
                    <div class="absolute inset-0 p-6 flex flex-col justify-between">
                        <div class="flex justify-between w-full">
                            <div class="h-5 w-16 bg-gray-700 rounded"></div>
                            <div class="h-5 w-10 bg-gray-700 rounded"></div>
                        </div>
                        <div class="h-8 w-3/4 bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                <div v-for="(project, index) in formattedProjects" :key="project.id"
                    class="relative group overflow-hidden rounded-xl bg-gray-900 border border-white/10" :class="{
                        'lg:col-span-2 lg:row-span-2 h-[624px] md:h-[624px]': index === 0,
                        'col-span-1 h-[300px]': index !== 0
                    }">

                    <img :src="project.image" alt="Project Cover"
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />

                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                    <div class="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                        <div
                            class="flex justify-between items-start text-[10px] md:text-xs font-mono tracking-widest text-orange-500">
                            <span class="bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{{ project.category }}</span>
                            <span class="bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{{ project.year }}</span>
                        </div>

                        <div>
                            <h3 class="font-bold uppercase tracking-tight text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                                :class="index === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'">
                                {{ project.title }}
                            </h3>

                            <p v-if="index === 0"
                                class="text-gray-300 text-sm line-clamp-3 md:line-clamp-none mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {{ project.description }}
                            </p>
                            <p v-else @click="router.push('/experience')"
                                class="inline-flex items-center text-white font-medium hover:text-blue-400 transition-opacity duration-500 lg:group-hover:opacity-100 lg:opacity-0 cursor-pointer">
                                View
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </p>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>