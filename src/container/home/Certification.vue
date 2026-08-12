<script setup>
import { reactive } from 'vue';

import Button from '@/components/button/Button.vue';

import { GoogleIcon, AwsIcon, HarvardIcon, HackerRankIcon, CiscoIcon, LinkedinIcon } from "@/assets/svgs"

/**
 * ✨ PASTE YOUR AWS BADGE IMAGE URL HERE
 * On your Credly page: right-click the badge → "Copy image address"
 * e.g. "https://images.credly.com/images/xxxx/aws-badge.png"
 */
const AWS_BADGE_IMAGE = '';

const certifications = reactive([
    {
        name: 'AWS Certified',
        issuer: 'Amazon Web Services',
        logo: AwsIcon,
        badge: AWS_BADGE_IMAGE,
        url: 'https://www.credly.com/earner/earned/badge/c00a9955-a6bd-4dcb-a874-b103cd0937c0',
        status: 'verified',
    },
    {
        name: 'Cloud & Engineering',
        issuer: 'Google',
        logo: GoogleIcon,
        badge: '',
        url: '',
        status: 'ongoing',
    },
    {
        name: 'Problem Solving',
        issuer: 'HackerRank',
        logo: HackerRankIcon,
        badge: '',
        url: '',
        status: 'ongoing',
    },
    {
        name: 'Professional Skills',
        issuer: 'LinkedIn Learning',
        logo: LinkedinIcon,
        badge: '',
        url: '',
        status: 'ongoing',
    },
    {
        name: 'Networking Fundamentals',
        issuer: 'Cisco',
        logo: CiscoIcon,
        badge: '',
        url: '',
        status: 'ongoing',
    },
    {
        name: 'Data & Web Science',
        issuer: 'Harvard',
        logo: HarvardIcon,
        badge: '',
        url: '',
        status: 'ongoing',
    },
]);

const handleRedirect = (url) => {
    window.open(url, "_blank")
}
</script>

<template>
    <section class="py-16">
        <div class="container mx-auto px-4">

            <div v-reveal="{ y: 40 }">
                <h2 class="text-3xl font-bold text-white opacity-70 text-center uppercase tracking-widest mb-4">
                    Certifications
                </h2>
                <p class="text-center text-gray-400 mb-12 text-sm max-w-md mx-auto">
                    Continuously learning — certified across cloud, engineering, and design platforms.
                </p>
            </div>

            <!-- Badge grid: Verified vs Ongoing -->
            <div
                v-reveal="{ y: 30, stagger: 0.08 }"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mb-12"
            >
                <a
                    v-for="cert in certifications"
                    :key="cert.name"
                    :href="cert.url || undefined"
                    :target="cert.url ? '_blank' : undefined"
                    :rel="cert.url ? 'noopener noreferrer' : undefined"
                    :class="[
                        'group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 transition-all duration-300',
                        cert.url
                            ? 'cursor-pointer hover:-translate-y-1.5 hover:border-[#FF512F]/50 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-15px_rgba(255,81,47,0.25)]'
                            : 'cursor-default hover:bg-white/[0.05]',
                    ]"
                >
                    <!-- Status chip -->
                    <span
                        v-if="cert.status === 'verified'"
                        class="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300"
                    >
                        <svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" />
                        </svg>
                        Verified
                    </span>
                    <span
                        v-else
                        class="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full border border-[#F09819]/40 bg-[#F09819]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F09819]"
                    >
                        <span class="relative flex h-1.5 w-1.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F09819] opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F09819]"></span>
                        </span>
                        Ongoing
                    </span>

                    <!-- Badge / logo -->
                    <div
                        class="mb-4 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl border border-white/10 bg-white/10 p-2.5 transition-transform duration-300"
                        :class="cert.url ? 'group-hover:scale-110' : ''"
                    >
                        <img
                            v-if="cert.badge"
                            :src="cert.badge"
                            :alt="cert.name"
                            class="h-full w-full object-contain"
                            loading="lazy"
                        />
                        <img
                            v-else
                            :src="cert.logo"
                            :alt="cert.name"
                            class="h-full w-full object-contain grayscale transition-all duration-300"
                            :class="cert.status === 'ongoing' ? 'opacity-60' : 'opacity-80 group-hover:opacity-100 group-hover:grayscale-0'"
                            loading="lazy"
                        />
                    </div>

                    <h3 class="text-base font-semibold text-white">{{ cert.name }}</h3>
                    <p class="mt-0.5 text-sm text-gray-400">{{ cert.issuer }}</p>

                    <!-- Footer per status -->
                    <span
                        v-if="cert.status === 'verified'"
                        class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#F09819] transition-colors duration-300 group-hover:text-[#FF512F]"
                    >
                        Verify credential
                        <svg class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    <span
                        v-else
                        class="mt-4 text-xs text-gray-500"
                    >
                        In progress
                    </span>
                </a>
            </div>

            <div v-reveal="{ y: 30, stagger: 0.1 }" class="flex justify-center items-center gap-4 mb-12">
                <Button variant="primary" label="See on LinkedIn"
                    @click="handleRedirect('https://www.linkedin.com/in/mochilham1006/')" />
                <Button label="Github" variant="secondary"
                    @click="handleRedirect('https://github.com/mochammadilham06')" />
            </div>

        </div>
    </section>
</template>
