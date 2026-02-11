<script setup>
import { ref } from 'vue';
import { LinkedinIcon, FigmaIcon, GithubIcon, GitlabIcon, InstagramIcon, DribbbleIcon } from "@/assets"
import { useRouter } from 'vue-router';

const socialsTop = ref([
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mochilham1006', icon: LinkedinIcon },
    { name: 'Gitlab', url: 'https://gitlab.com/mochilhamz1006', icon: GitlabIcon },
]);

const socialsBottom = ref([
    { name: 'Instagram', url: 'https://www.instagram.com/moch.ilham10?igsh=cGhnZ2x1enZlOWZr', icon: InstagramIcon },
    { name: 'GitHub', url: 'https://github.com/', icon: GithubIcon },
    { name: 'Dribbble', url: 'https://dribbble.com/', icon: DribbbleIcon, customText: '' },
]);

const router = useRouter()

const handleDownloadCV = () => {
    window.open("https://drive.google.com/file/d/18pZ1UrONICWv_xCaMizgYU2DnNS5N3hG/view?usp=sharing", "_blank")
}
</script>

<template>
    <section class="text-white w-full lg:max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div class="container mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">

                <div
                    class="group relative col-span-1 rounded-2xl bg-gradient-to-b from-[#23293B] from-[39.84%] to-transparent flex flex-col justify-between overflow-hidden min-h-[240px]">
                    <div class="p-5 lg:p-6 relative z-10">
                        <p class="text-xs lg:text-sm font-semibold text-slate-400">FAVOURITE</p>
                        <h3 class="text-xl lg:text-2xl font-bold mt-1">Always used Technology</h3>
                    </div>
                    <div class="h-full w-full absolute inset-0 pt-20 lg:pt-0">
                        <img src="@/assets/icon-tech.png" class="w-full h-full overflow-hidden object-cover" />
                    </div>
                    <div
                        class="absolute -top-12 -right-12 w-32 h-32 col-span-3 bg-[#121120] blur-3xl rounded-full transition-all duration-500 group-hover:bg-blue-500/30 group-hover:scale-200">
                    </div>
                </div>

                <div
                    class="group relative rounded-2xl bg-[#121120] col-span-1 lg:col-span-3 overflow-hidden border border-[#313953]">
                    <div class="p-5 lg:p-6">
                        <p class="text-xs lg:text-sm font-semibold text-slate-400">LINKS</p>
                        <h3 class="text-2xl lg:text-3xl font-bold mt-1 text-white">Social Media</h3>
                    </div>

                    <div class="mt-4 lg:mt-8 space-y-4 lg:space-y-8 overflow-hidden w-full pb-6">
                        <div class="group/slider relative">
                            <div class="animate-scroll-left flex w-max">
                                <a v-for="(link, i) in socialsTop" :key="'a-' + i" :href="link.url" target="_blank"
                                    class="mr-3 lg:mr-4 border border-white rounded-xl flex items-center justify-center h-20 lg:h-24 shrink-0 transition-colors py-3 px-4 lg:py-4 lg:px-6 min-w-[160px] lg:min-w-48 bg-[#1C1C2A] hover:bg-white/15 cursor-pointer">
                                    <img :src="link.icon" class="w-auto h-8 lg:h-fit" :alt="link.name" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-sm lg:text-base">{{
                                        link.customText }}</span>
                                </a>
                                <a v-for="(link, i) in socialsTop" :key="'b-' + i" :href="link.url" target="_blank"
                                    class="mr-3 lg:mr-4 border border-white rounded-xl flex items-center justify-center h-20 lg:h-24 shrink-0 transition-colors py-3 px-4 lg:py-4 lg:px-6 min-w-[160px] lg:min-w-48 bg-[#1C1C2A] hover:bg-white/15 cursor-pointer">
                                    <img :src="link.icon" class="w-auto h-8 lg:h-fit" :alt="link.name" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-sm lg:text-base">{{
                                        link.customText }}</span>
                                </a>
                                <a v-for="(link, i) in socialsTop" :key="'c-' + i" :href="link.url" target="_blank"
                                    class="mr-3 lg:mr-4 border border-white rounded-xl flex items-center justify-center h-20 lg:h-24 shrink-0 transition-colors py-3 px-4 lg:py-4 lg:px-6 min-w-[160px] lg:min-w-48 bg-[#1C1C2A] hover:bg-white/15 cursor-pointer">
                                    <img :src="link.icon" class="w-auto h-8 lg:h-fit" :alt="link.name" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-sm lg:text-base">{{
                                        link.customText }}</span>
                                </a>
                            </div>
                        </div>

                        <div class="group/slider relative">
                            <div class="animate-scroll-right flex w-max">
                                <a v-for="(link, i) in socialsBottom" :key="'e-' + i" :href="link.url" target="_blank"
                                    class="mr-3 lg:mr-4 border border-white rounded-xl flex items-center justify-center h-20 lg:h-24 shrink-0 transition-colors py-3 px-4 lg:py-4 lg:px-6 min-w-[160px] lg:min-w-48 bg-[#1C1C2A] hover:bg-white/15 cursor-pointer">
                                    <img :src="link.icon" class="w-auto h-8 lg:h-fit" :alt="link.name" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-sm lg:text-lg">{{
                                        link.customText }}</span>
                                </a>
                                <a v-for="(link, i) in socialsBottom" :key="'f-' + i" :href="link.url" target="_blank"
                                    class="mr-3 lg:mr-4 border border-white rounded-xl flex items-center justify-center h-20 lg:h-24 shrink-0 transition-colors py-3 px-4 lg:py-4 lg:px-6 min-w-[160px] lg:min-w-48 bg-[#1C1C2A] hover:bg-white/15 cursor-pointer">
                                    <img :src="link.icon" class="w-auto h-8 lg:h-fit" :alt="link.name" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-sm lg:text-lg">{{
                                        link.customText }}</span>
                                </a>
                                <a v-for="(link, i) in socialsBottom" :key="'g-' + i" :href="link.url" target="_blank"
                                    class="mr-3 lg:mr-4 border border-white rounded-xl flex items-center justify-center h-20 lg:h-24 shrink-0 transition-colors py-3 px-4 lg:py-4 lg:px-6 min-w-[160px] lg:min-w-48 bg-[#1C1C2A] hover:bg-white/15 cursor-pointer">
                                    <img :src="link.icon" class="w-auto h-8 lg:h-fit" :alt="link.name" />
                                    <span v-if="link.customText" class="ml-3 font-medium text-sm lg:text-lg">{{
                                        link.customText }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4 mt-2 lg:mt-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">

                        <div
                            class="group relative rounded-2xl p-6 lg:p-8 flex flex-col justify-end overflow-hidden bg-slate-900 min-h-[300px] lg:min-h-[300px]">
                            <img src="@/assets/bg-visual.png" alt="Abstract background"
                                class="absolute inset-0 w-full h-full object-cover group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
                            </div>

                            <div class="relative z-10">
                                <p class="text-lg lg:text-xl font-semibold tracking-wider uppercase">The Journey</p>
                                <h3 class="text-2xl lg:text-4xl font-bold mt-2 leading-tight text-white">
                                    From Frontend Specialist to Full-Cycle Engineer
                                </h3>
                                <p
                                    class="mt-4 text-slate-300 text-sm max-w-xs opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                                    Passionate about architecting high-performance web applications and bridging the gap
                                    between UI/UX and backend logic.
                                </p>
                                <p @click="router.push('/experience')"
                                    class="inline-flex items-center mt-6 text-white font-medium hover:text-blue-400 transition-opacity duration-500 lg:group-hover:opacity-100 lg:opacity-0 cursor-pointer">
                                    View Experience
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 ml-2 group-hover/link:translate-x-1 transition-transform"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </p>
                            </div>
                        </div>

                        <div
                            class="lg:row-span-2 group relative rounded-2xl flex flex-col justify-between overflow-hidden min-h-[400px] lg:min-h-full">
                            <img src="@/assets/people.png" alt="Qlola Cash Management"
                                class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                            <div class="relative z-10 p-6 lg:p-10">
                                <h1 class="text-xl lg:text-2xl font-semibold text-slate-300">Last Project</h1>
                                <h3 class="text-4xl lg:text-6xl font-bold mt-1 uppercase leading-none">Banking Ecosystem
                                    Architecture</h3>
                            </div>

                            <div
                                class="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end blur-bg p-6 lg:p-10 gap-4">
                                <div>
                                    <p class="text-xl lg:text-2xl font-semibold">Qlola Cash Management</p>
                                    <p class="text-base lg:text-xl text-slate-400">Fintech / Micro Frontend</p>
                                </div>
                                <a href="https://bricams.bri.co.id" target="_blank" rel="noopener noreferrer"
                                    class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg lg:text-xl font-medium py-2 px-6 rounded-xl shrink-0 transition-colors duration-300 border border-white/20 w-full sm:w-auto text-center">
                                    Visit
                                </a>
                            </div>
                        </div>

                        <div @click="handleDownloadCV"
                            class="group relative rounded-2xl border border-[#2C2A50] p-6 lg:p-8 overflow-hidden min-h-[250px] lg:min-h-[300px]">
                            <div class="relative z-10">
                                <p class="text-2xl font-semibold text-slate-400"></p>
                                <h3 class="text-4xl lg:text-6xl font-bold mt-1 max-w-[80%] lg:max-w-[50%]">Download CV
                                </h3>
                            </div>
                            <div class="absolute inset-0 flex justify-end items-end w-[100%] z-0">
                                <div
                                    class="relative h-fit transition-transform duration-500 group-hover:scale-105 translate-y-4 lg:translate-y-0">
                                    <img src="@/assets/project.png" alt="Portfolio preview"
                                        class="rounded-lg w-[260px] sm:w-[320px] lg:w-[370px]" />
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

@keyframes scrollLeft {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-25%);
    }
}

@keyframes scrollRight {
    0% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(0);
    }
}

.animate-scroll-left {
    display: flex;
    width: max-content;
    animation: scrollLeft 30s linear infinite;
    will-change: transform;
}

.animate-scroll-right {
    display: flex;
    width: max-content;
    animation: scrollRight 30s linear infinite;
    will-change: transform;
}

/* .group\/slider:hover .animate-scroll-left,
.group\/slider:hover .animate-scroll-right {
    animation-play-state: paused;
} */
</style>