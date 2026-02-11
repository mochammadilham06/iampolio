<script setup>
import { computed, onMounted, ref } from 'vue';
import Tabs from '@/components/tabs/Tabs.vue';
import Button from '@/components/button/Button.vue';
import { useRouter } from 'vue-router';
import { ProjectServices } from '@/service';

// const projectTabs = ref(['Semua', 'Unggulan', 'Proyek Sampingan']);
const projectTabs = ref(['Semua']);
const router = useRouter()

const { getProjects } = ProjectServices();

const rawProjects = ref([]);
const isLoading = ref(false)

const displayedProjects = computed(() => {
    return rawProjects.value.map(item => ({
        ...item,
        year: item.year ? item.year.split('-')[0] : '2024',
        category: item.category || 'PROJECT',
        image: item.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853'
    }));
});

const handleFetch = async () => {
    isLoading.value = true
    try {
        const res = await getProjects(3);
        rawProjects.value = res.myportfolio_portfolio || res || [];
    }
    catch (err) {
        console.error("[getProject]: ", err);
    }
    finally {
        isLoading.value = false
    }
}

onMounted(() => {
    handleFetch();
})

</script>

<template>
    <section class="my-20 max-w-7xl mx-auto px-4">
        <h1 class="text-5xl font-bold text-center text-white mb-2">Project and Products</h1>
        <h2 class="text-2xl text-[#ADABC7] text-center mb-10">Project List</h2>

        <div class="flex justify-center mb-16">
            <Tabs :tabs="projectTabs" :initialTab="projectTabs[0]" @tab-change="handelChangeTab" />
        </div>

        <div class="flex flex-col gap-24">
            <div v-for="(item, index) in displayedProjects" :key="index"
                class="flex flex-col lg:flex-row items-center gap-10"
                :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }">
                <div class="w-full lg:w-1/2">
                    <div class="rounded-3xl overflow-hidden shadow-2xl">
                        <img :src="item.image" alt="Project Image"
                            class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col justify-center">
                    <img v-if="index % 2 != 0" src="../../assets/svgs/kutip-k.svg" class="w-10 h-10 mb-6 opacity-80"
                        alt="quote" />
                    <img v-if="index % 2 == 0" src="../../assets/svgs/kutip-ki.svg" class="w-10 h-10 mb-6 opacity-80"
                        alt="quote" />

                    <h3 class="text-4xl font-bold text-white leading-tight mb-4">
                        {{ item.title }}
                    </h3>
                    <p class="text-gray-400 font-medium text-xl">
                        {{ item.description }}
                    </p>
                </div>
            </div>
        </div>

        <div v-if="displayedProjects.length > 3" class="flex justify-center mt-20">
            <Button label="See More Projects" variant="secondary" @click="router.push('/works')" />
        </div>
    </section>
</template>
