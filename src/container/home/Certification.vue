<script setup>
import { reactive } from 'vue';

// import googleLogo from '@/assets/svgs/google.svg';
// import awsLogo from '@/assets/svgs/aws.svg';
// import harvardLogo from '@/assets/svgs/harvard.svg';
// import hackerRankLogo from '@/assets/svgs/vec.svg';
// import ciscoLogo from '@/assets/svgs/cisco.svg';
// import linkedinLogo from '@/assets/svgs/linkedin.svg';
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
        name: 'Harvard University',
        src: HarvardIcon
    },
    {
        name: 'HackerRank',
        src: HackerRankIcon
    },
    {
        name: 'Cisco',
        src: CiscoIcon
    },
    {
        name: 'LinkedIn',
        src: LinkedinIcon
    },
]);
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
                <Button variant="primary" label="See on LinkedIn" />
                <Button label="Github" variant="secondary" />
            </div>

        </div>
    </section>
</template>
