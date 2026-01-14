<script setup>
import { ref } from 'vue';
import { LinkedinIcon, FigmaIcon, TwitterIcon, GithubIcon, DribbbleIcon } from "@/assets"

const socialsTop = ref([
    { name: 'Empty', isEmpty: true },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/',
        icon: LinkedinIcon,
    },
    {
        name: 'Figma',
        url: 'https://www.figma.com/',
        icon: FigmaIcon,
    },
]);

const socialsBottom = ref([
    {
        name: 'Twitter',
        url: 'https://twitter.com/',
        icon: TwitterIcon,
    },
    {
        name: 'GitHub',
        url: 'https://github.com/',
        icon: GithubIcon,
    },
    {
        name: 'Dribbble',
        url: 'https://dribbble.com/',
        icon: DribbbleIcon,
        customText: ''
    },
    { name: 'Empty', isEmpty: true },
]);
</script>

<template>
    <section class="text-white max-w-7xl mx-auto px-4 py-16">
        <div class="container mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div
                    class="group relative col-span-1 rounded-2xl bg-gradient-to-b from-[#23293B] from-[39.84%] to-transparent flex flex-col justify-between overflow-hidden">
                    <div class="p-6">
                        <p class="text-sm font-semibold text-slate-400">FAVOURITE</p>
                        <h3 class="text-2xl font-bold mt-1">Always used Technology</h3>
                    </div>
                    <img src="../../assets/icon-tech.png" class="w-full h-full overflow-hidden" />
                    <div
                        class="absolute -top-12 -right-12 w-32 h-32 col-span-3 bg-[#121120] blur-3xl rounded-full transition-all duration-500 group-hover:bg-blue-500/30 group-hover:scale-200">
                    </div>
                </div>

                <div class="group relative rounded-2xl bg-[#121120] col-span-3 overflow-hidden border border-[#313953]">
                    <div class="p-6">
                        <p class="text-sm font-semibold text-slate-400">LINKS</p>
                        <h3 class="text-3xl font-bold mt-1 text-white">Social Media</h3>
                    </div>

                    <div class="mt-8 space-y-4">
                        <div class="flex w-full items-center justify-center gap-4 -translate-x-16">
                            <a v-for="(link, i) in socialsTop" :key="i" :href="link.url" target="_blank"
                                class="border border-white rounded-xl flex items-center justify-center h-24 shrink-0 transition-colors"
                                :class="[link.isEmpty ? 'w-1/3 bg-transparent border-white/10 ' : 'py-4 px-6 min-w-1/3 bg-[#1C1C2A] hover:cursor-pointer hover:bg-white/15']">
                                <template v-if="!link.isEmpty">
                                    <img :src="link.icon" class="w-fit h-fit" :alt=link.name />
                                    <span v-if="link.customText" class="ml-3 font-medium">
                                        {{ link.customText }}
                                    </span>
                                </template>
                            </a>
                        </div>

                        <div class="flex w-full items-center justify-center gap-4 translate-x-16">
                            <a v-for="link in socialsBottom" :key="link.name" :href="link.url" target="_blank"
                                class="border rounded-xl border-white flex items-center justify-center h-24 shrink-0 transition-colors"
                                :class="[link.isEmpty ? 'w-48 bg-transparent border-white/10' : 'py-4 px-6 min-w-1/4 bg-[#1C1C2A] hover:cursor-pointer hover:bg-white/15']">
                                <template v-if="!link.isEmpty">
                                    <img :src="link.icon" class="w-fit h-fit" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-lg">
                                        {{ link.customText }}
                                    </span>
                                </template>
                            </a>
                        </div>

                    </div>
                </div>

                <div class="lg:col-span-4 mt-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div
                            class="group relative rounded-2xl p-8 flex flex-col justify-end overflow-hidden bg-slate-900 min-h-[300px]">

                            <img src="../../assets/bg-visual.png" alt="Abstract background"
                                class="absolute inset-0 w-full h-full object-cover group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />

                            <div class="absolute inset-0 linear-bg"></div>

                            <div class="relative z-10">
                                <p class="text-2xl font-semibold text-slate-300">ABOUT ME</p>
                                <h3 class="text-5xl font-bold mt-1">My Story</h3>
                            </div>

                        </div>

                        <div
                            class="lg:row-span-2 group relative rounded-2xl flex flex-col justify-between overflow-hidden min-h-[500px] lg:min-h-full">
                            <img src="../../assets/people.png" alt="People photo"
                                class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                            <div class="relative z-10 p-10">
                                <h1 class="text-2xl font-semibold text-slate-300">APP</h1>
                                <h3 class="text-6xl font-bold mt-1">LAST PRODUCT IN PORTFOLIO</h3>
                            </div>
                            <div class="relative z-10 flex justify-between items-end blur-bg p-10">
                                <div>
                                    <p class="text-2xl font-semibold">Memory ClickSt...</p>
                                    <p class="text-xl text-slate-400">PRODUCT</p>
                                </div>
                                <a href="#" class="text-white text-xl font-medium py-2 px-4 rounded-lg shrink-0">
                                    Visitar
                                </a>
                            </div>
                        </div>

                        <div
                            class="group relative rounded-2xl border border-[#2C2A50] p-8 overflow-hidden min-h-[300px]">
                            <div class="relative z-10">
                                <p class="text-2xl font-semibold text-slate-400">FIGMA</p>
                                <h3 class="text-6xl font-bold mt-1 max-w-[50%]">Download Portfolio</h3>
                            </div>

                            <div class="absolute inset-0 flex justify-end items-end w-[100%] z-0">
                                <div class="relative h-fit transition-transform duration-500 group-hover:scale-105">
                                    <img src="../../assets/project.png" alt="Portfolio preview"
                                        class="rounded-lg w-[370px]" />
                                    <div class="absolute inset-0 rounded-lg linear-project"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>
<style scoped>
.linear-bg {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.69) 100%);
}

.linear-project {
    background: linear-gradient(90deg, #55555f 0%, rgba(0, 0, 0, 0) 100%);

}

.blur-bg {
    background: rgba(0, 0, 0, 0.69);
    backdrop-filter: blur(7px);
}

/* Note: backdrop-filter has minimal browser support */
</style>
