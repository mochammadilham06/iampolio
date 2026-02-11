<script setup>
import { reactive } from 'vue';

import Button from '@/components/button/Button.vue';

import { GoogleIcon, AwsIcon, HarvardIcon, HackerRankIcon, CiscoIcon, LinkedinIcon } from "@/assets/svgs"

const certifications = reactive([
    {
        name: 'Google',
        src: GoogleIcon
    },
    {
        name: 'AWS',
        src: AwsIcon
    },
    {
        name: 'HackerRank',
        src: HackerRankIcon
    },
    {
        name: 'LinkedIn',
        src: LinkedinIcon
    },
]);

const handleRedirect = (url) => {
    window.open(url, "_blank")
}
</script>

<template>
    <section class="py-16">
        <div class="container mx-auto px-4">

            <h2 class="text-3xl font-bold text-white opacity-70 text-center uppercase tracking-widest mb-12">
                Certifications
            </h2>

            <div class="flex justify-center items-center flex-wrap gap-10 md:gap-16 mb-12">
                <div v-for="cert in certifications" :key="cert.name">
                    <img :src="cert.src" :alt="cert.name"
                        class="h-10 md:h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            <div class="flex justify-center items-center gap-4 mb-12">
                <Button variant="primary" label="See on LinkedIn"
                    @click="handleRedirect('https://www.linkedin.com/in/mochilham1006/')" />
                <Button label="Github" variant="secondary"
                    @click="handleRedirect('https://github.com/mochammadilham06')" />
            </div>

        </div>
    </section>
</template>
