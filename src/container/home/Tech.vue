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
        <h1 class="text-5xl font-bold text-center tracking-wide shadow-2xl">Frameworks & Techs</h1>
        <div class="opacity-70 max-w-3xl text-center mx-auto my-4 text-lg">
            <p>There are the tools and frameworks with which i feel
                more comfortable without limiting my self to them
                because i have to worked with react, postgresql, graphql, golang, vue, and many more...
            </p>
            <p>my main stack is :</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div v-for="(value, index) in tectStack" :key="index"
                class="group border border-gray-800 rounded-xl p-6 flex flex-col transition-all hover:border-gray-600">
                <img :src="value.icon" :alt="value.name + ' icon'" class="w-12 h-12 mb-4 grayscale mix-blend-lighten" />
                <h3 class="text-xl font-bold mb-2">{{ value.name }}</h3>
                <p class="opacity-70 text-sm leading-relaxed">{{ value.description }}</p>
            </div>
        </div>


        <div class="flex justify-center items-center mt-16">
            <img src="../../assets/macbook.png" class="mix-blend-lighten" alt="MacBook Preview" />
        </div>
    </div>

</template>
