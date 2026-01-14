<script setup>
import { ref } from 'vue';

const awards = ref([
    { title: 'Hackaton', detail: '1er Lugar AI Challenge', tag: 'Nacional' },
    { title: 'Code Challenge', detail: '1re Lugar 2023', tag: 'Regional' },
    { title: 'UISEK Hackaton', detail: 'Finalistas 2022', tag: 'Nacional' },
]);


</script>

<template>
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-evenly items-center p-4">
        <div v-for="award in awards" :key="award.title" class="text-center flex items-center gap-8">
            <img src="../../assets/svgs/premio.svg" alt="Laurel" class="w-8 h-auto opacity-70 transform -scale-x-100" />
            <div>
                <h3 class="font-bold text-lg">{{ award.title }}</h3>
                <p class="text-gray-300">{{ award.detail }}</p>
                <span class="inline-block mt-2 px-2 py-0.5 text-xs bg-gray-700/50 text-gray-300 rounded-md">
                    {{ award.tag }}
                </span>
            </div>
            <img src="../../assets/svgs/premio.svg" alt="Laurel" class="w-8 h-auto opacity-70" />
        </div>
    </div>
</template>