<script setup lang="ts">
import { ref } from 'vue';

const tectStack = ref([{
    name: 'Reactjs',
    description: 'A JavaScript library for building user interfaces, maintained by Facebook.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
}, {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development.',
    icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
}, {
    name: 'TypeScript',
    description: 'A superset of JavaScript that adds static typing and other features.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
}, {
    name: 'Node.js',
    description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
}, {
    name: 'Git',
    description: 'A distributed version control system for tracking changes in source code.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
}, {
    name: 'Golang',
    description: 'An open-source programming language that makes it easy to build simple, reliable, and efficient software.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
}])
</script>

<template>
    <div class="py-16 max-w-7xl mx-auto px-4 text-white">
        <div v-reveal="{ y: 40 }">
            <h1 class="text-5xl font-bold text-center tracking-wide">Frameworks & Techs</h1>
            <div class="opacity-70 max-w-3xl text-center mx-auto my-4 text-lg">
                <p>There are the tools and frameworks with which i feel
                    more comfortable without limiting my self to them
                    because i have to worked with react, postgresql, graphql, golang, vue, and many more...
                </p>
                <p>my main stack is :</p>
            </div>
        </div>

        <!-- Ticker tech stack -->
        <div v-reveal="{ y: 30 }" class="marquee-paused relative my-10 overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#121120] to-transparent z-10"></div>
            <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#121120] to-transparent z-10"></div>
            <div class="marquee-track items-center gap-10 py-2">
                <template v-for="n in 2" :key="n">
                    <div v-for="(value, index) in tectStack" :key="index + '-' + n"
                        class="flex items-center gap-3 shrink-0 border border-white/10 rounded-full px-5 py-2.5 bg-white/[0.03] hover:border-[#FF512F]/50 hover:bg-[#FF512F]/10 transition-colors duration-300">
                        <img :src="value.icon" :alt="value.name + ' icon'" class="w-6 h-6" loading="lazy" />
                        <span class="font-medium text-gray-200 text-sm">{{ value.name }}</span>
                    </div>
                </template>
            </div>
        </div>

        <div v-reveal="{ stagger: 0.08, y: 50 }" class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div v-for="(value, index) in tectStack" :key="index"
                class="group border border-gray-800 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-[#FF512F]/50 hover:bg-white/[0.03] hover:-translate-y-1">
                <img :src="value.icon" :alt="value.name + ' icon'"
                    class="w-12 h-12 mb-4 grayscale mix-blend-lighten group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy" />
                <h3 class="text-xl font-bold mb-2">{{ value.name }}</h3>
                <p class="opacity-70 text-sm leading-relaxed">{{ value.description }}</p>
            </div>
        </div>


        <div v-reveal="{ y: 60, delay: 0.1 }" class="flex justify-center items-center mt-16">
            <img src="../../assets/macbook.png" class="mix-blend-lighten" alt="MacBook Preview" loading="lazy" />
        </div>
    </div>

</template>
