<script setup>
import { onMounted, ref } from 'vue';
import { ExperienceService } from '@/service';

const { getExperience } = ExperienceService();
const isLoading = ref(true); // Default true saat mounted agar skeleton muncul dulu

const experiences = ref([]);

const handleGetExperience = async () => {
    isLoading.value = true;
    try {
        const res = await getExperience();
        experiences.value = res?.myportfolio_experience?.map((item) => ({
            ...item,
            status: item?.is_active ? 'ACTIVE' : 'COMPLETED'
        })) || [];
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    handleGetExperience();
});
</script>

<template>
    <div class="min-h-screen text-white p-8 md:py-24 relative overflow-hidden bg-[#050505]">
        <div class="max-w-5xl mx-auto relative z-10">

            <div class="flex flex-col md:flex-row justify-between items-end mb-16 relative">
                <div class="absolute left-0 top-2 bottom-2 w-1 bg-[#FF512F] rounded-full hidden md:block"></div>

                <div class="mx-6 w-full md:w-auto">
                    <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        MY <br />
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">JOURNEY</span>
                    </h2>

                    <div class="flex items-center gap-4 mt-4 text-xs text-gray-400">
                        <div class="flex items-center">
                            <span class="w-2 h-2 rounded-full bg-[#FF512F] mr-2 animate-pulse"></span>
                            BRANCH: MAIN
                        </div>
                        <div>LAST COMMIT: TODAY</div>
                    </div>
                </div>

                <div class="hidden md:flex gap-8 text-right text-sm" v-if="!isLoading">
                    <div>
                        <div class="text-gray-500 text-xs uppercase tracking-widest">Total Exp</div>
                        <div class="text-2xl font-bold">{{ new Date().getFullYear() - 2023 }}+ Years</div>
                    </div>
                    <div>
                        <div class="text-gray-500 text-xs uppercase tracking-widest">Projects</div>
                        <div class="text-2xl font-bold">10+</div>
                    </div>
                </div>
                <div class="hidden md:flex gap-8 text-right text-sm" v-else>
                    <div class="flex flex-col items-end gap-2">
                        <div class="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                        <div class="h-8 w-16 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <div class="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                        <div class="h-8 w-12 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div class="relative">
                <div class="absolute left-4 md:left-0 top-2 bottom-0 w-px bg-white/10"></div>

                <div v-if="isLoading">
                    <div v-for="i in 3" :key="i" class="relative mb-12 ml-12 md:ml-8">
                        <div
                            class="absolute -left-[41px] md:-left-[37px] top-5 w-4 h-4 rounded-full bg-gray-800 border-2 border-[#050505] z-20">
                        </div>
                        <div class="absolute -left-[35px] top-7 w-8 h-px bg-white/10"></div>

                        <div class="relative border border-gray-800 rounded-lg p-6 md:p-8 bg-[#0a0a0a]">

                            <div class="hidden md:flex absolute top-4 right-4 items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-gray-700 animate-pulse"></div>
                                <div class="h-3 w-16 bg-gray-800 rounded animate-pulse"></div>
                            </div>

                            <div class="h-8 w-1/3 bg-gray-800 rounded mb-4 animate-pulse"></div>

                            <div class="flex items-center gap-3 mb-6">
                                <div class="h-4 w-1/4 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-4 w-2 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-4 w-1/4 bg-gray-800 rounded animate-pulse"></div>
                            </div>

                            <div class="space-y-2 mb-8 max-w-3xl">
                                <div class="h-3 w-full bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-3 w-5/6 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-3 w-4/6 bg-gray-800 rounded animate-pulse"></div>
                            </div>

                            <div class="flex flex-wrap gap-2">
                                <div v-for="j in 4" :key="j"
                                    class="h-6 w-16 bg-gray-800 rounded border border-white/5 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div v-for="(exp, index) in experiences" :key="exp.id" class="relative mb-12 ml-12 md:ml-8 group">
                        <div
                            class="absolute -left-[41px] md:-left-[37px] top-5 w-4 h-4 rounded-full bg-[#FF512F] border-2 border-[#050505] z-20 animate-pulse-orange shadow-[0_0_10px_#FF512F70]">
                        </div>
                        <div
                            class="absolute -left-[35px] top-7 w-8 h-px bg-white/10 group-hover:bg-[#FF512F]/50 transition-colors duration-300">
                        </div>

                        <div
                            class="relative border border-gray-400 rounded-lg p-6 md:p-8 transition-all duration-500 ease-out 
                                    group-hover:border-[#FF512F] group-hover:shadow-[0_0_30px_-5px_rgba(255,81,47,0.3)] group-hover:-translate-y-1">

                            <div class="absolute top-4 right-4 font-mono text-[10px] text-[#FF512F] hidden md:block">
                                <div class="flex items-center mt-1">
                                    <span v-if="exp.status === 'ACTIVE'"
                                        class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="w-3 h-3 mr-1">
                                        <path fill-rule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    STATUS: {{ exp.status }}
                                </div>
                            </div>

                            <h3
                                class="text-3xl font-bold mb-2 transition-colors duration-300 group-hover:text-[#FF512F]">
                                {{ exp.company }}
                            </h3>

                            <div class="flex flex-wrap items-center gap-3 text-sm mb-6 uppercase tracking-wider">
                                <span class="text-[#FF512F] font-bold">{{ exp.role }}</span>
                                <span class="text-gray-500">•</span>
                                <span class="text-gray-400">{{ exp.start_date }} - {{ exp.end_date }}</span>
                            </div>

                            <p class="text-gray-400 leading-relaxed mb-8 max-w-3xl">
                                {{ exp.description }}
                            </p>

                            <div class="flex flex-wrap gap-2">
                                <span v-for="tech in exp.tech_stack" :key="tech"
                                    class="px-3 py-1 text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 rounded hover:bg-[#FF512F]/10 hover:text-[#FF512F] hover:border-[#FF512F]/50 transition-colors cursor-default">
                                    {{ tech }}
                                </span>
                            </div>

                            <div
                                class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hidden md:flex items-center text-xs text-[#FF512F] font-bold tracking-widest uppercase cursor-pointer">
                                VIEW DETAILS
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor"
                                    class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes pulse-orange {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 81, 47, 0.7);
    }

    70% {
        box-shadow: 0 0 0 15px rgba(255, 81, 47, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 81, 47, 0);
    }
}

.animate-pulse-orange {
    animation: pulse-orange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>