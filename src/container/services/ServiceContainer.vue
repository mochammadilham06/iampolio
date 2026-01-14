<script setup>
import { ref } from 'vue';

const services = ref([
    {
        id: 1,
        title: "Frontend Development",
        description: "Building responsive, performant interfaces with modern frameworks and cutting-edge tooling. Creating seamless user interactions that delight and engage.",
        tags: ["REACT", "TYPESCRIPT", "TAILWIND CSS", "NEXT.JS", "VITE"],
        icon: "code"
    },
    {
        id: 2,
        title: "Backend Development",
        description: "Architecting scalable APIs and microservices with focus on performance and reliability. Designing robust data structures and secure authentication systems.",
        tags: ["NODE.JS", "GO", "POSTGRESQL", "REDIS", "DOCKER"],
        icon: "server"
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Crafting intuitive user experiences through design systems and iterative prototyping. Translating complex requirements into elegant, accessible visual solutions.",
        tags: ["FIGMA", "DESIGN SYSTEMS", "PROTOTYPING", "USER RESEARCH"],
        icon: "palette"
    }
]);
</script>

<template>
    <div class="max-w-7xl mx-auto py-24 px-4 md:px-8">

        <div class="flex flex-col md:flex-row items-start gap-6 mb-16">
            <div class="hidden md:block w-1 h-32 bg-[#FF512F]"></div>

            <div>
                <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                    <span class="text-white">TECHNICAL</span>
                    <br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-700">
                        EXPERTISE
                    </span>
                </h2>

                <div class="flex items-start gap-4">
                    <span class="text-[#FF512F] font-mono mt-1">///</span>
                    <p
                        class="text-gray-400 font-mono text-xs md:text-sm max-w-lg uppercase tracking-wide leading-relaxed">
                        Delivering robust solutions across the full stack. Specialized in scalable architecture and
                        immersive interfaces.
                    </p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div v-for="service in services" :key="service.id"
                class="group relative border border-gray-800 rounded-lg p-8 h-full flex flex-col justify-between hover:border-[#FF512F] transition-colors duration-300">
                <div>
                    <div
                        class="w-12 h-12 rounded-full bg-[#FF512F]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF512F] transition-colors duration-300">
                        <svg v-if="service.icon === 'code'" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6 text-[#FF512F] group-hover:text-white transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                        </svg>

                        <svg v-else-if="service.icon === 'server'" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6 text-[#FF512F] group-hover:text-white transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.75 17.25v-.75a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75v.75m16.5 0c0 .414-.336.75-.75.75h-15a.75.75 0 0 1-.75-.75m16.5 0V12a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 12v5.25m16.5 0a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25m16.5 0v-1.5m0 0V5.25a2.25 2.25 0 0 0-2.25-2.25h-15a2.25 2.25 0 0 0-2.25 2.25v9.75" />
                        </svg>

                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6 text-[#FF512F] group-hover:text-white transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a16.001 16.001 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                        </svg>
                    </div>

                    <h3 class="text-2xl font-bold text-white mb-4">{{ service.title }}</h3>

                    <p class="text-gray-400 text-sm leading-relaxed mb-8">
                        {{ service.description }}
                    </p>
                </div>

                <div>
                    <div class="h-px w-full bg-white/10 mb-4 group-hover:bg-[#FF512F]/30 transition-colors"></div>

                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in service.tags" :key="tag"
                            class="px-2 py-1 text-[10px] font-mono text-gray-500 border border-white/10 uppercase hover:text-white hover:border-[#FF512F] transition-colors cursor-default">
                            {{ tag }}
                        </span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>