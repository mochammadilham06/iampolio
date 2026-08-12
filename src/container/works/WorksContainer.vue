<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ProjectServices } from '@/service';
import { resolveProjectImages } from '@/service/mock';

interface WorkItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  year: string;
  category: string;
}

const { getProjects } = ProjectServices();

const rawProjects = ref<Array<Record<string, any>>>([]);
const isLoading = ref(true);

const formattedProjects = computed<WorkItem[]>(() =>
  rawProjects.value.map((item: any) => ({
    title: item.title ?? 'Untitled Project',
    description: item.description ?? '',
    year: item.year ? String(item.year).split('-')[0] : '2024',
    category: item.category || 'PROJECT',
    image: resolveProjectImages(item)[0],
  }))
);

const handleFetch = async () => {
  isLoading.value = true;
  try {
    const res = await getProjects();
    rawProjects.value = res.myportfolio_portfolio || res || [];
  } catch (err) {
    console.error('[getProject]: ', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  handleFetch();
});

/** Hide broken images and show the built-in fallback panel */
const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).classList.add('error');
};
</script>

<template>
  <div class="text-white min-h-screen px-4 py-8 md:p-8 bg-[#121120] relative overflow-x-clip">
    <div class="hero-glow w-[500px] h-[500px] bg-[#FF512F]/10 -top-40 -right-40"></div>
    <div class="hero-glow w-[420px] h-[420px] bg-[#F09819]/[0.06] -bottom-32 -left-32"></div>

    <div class="relative z-10 my-12 md:my-20 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 relative">
        <div class="absolute left-0 top-2 bottom-2 w-1 bg-[#FF512F] rounded-full hidden md:block"></div>

        <div class="md:pl-8">
          <div v-if="isLoading" class="animate-pulse">
            <div class="h-16 md:h-24 w-64 bg-gray-800 rounded mb-2"></div>
            <div class="h-16 md:h-24 w-48 bg-gray-800 rounded"></div>
          </div>
          <h2 v-else class="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            SELECTED <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-700">WORKS</span>
          </h2>
        </div>

        <div class="mt-6 md:mt-0 md:max-w-xs text-xs md:text-sm text-gray-400 font-mono tracking-widest uppercase">
          <div v-if="isLoading" class="space-y-2 animate-pulse w-48 md:w-64">
            <div class="h-2 bg-gray-800 rounded w-full"></div>
            <div class="h-2 bg-gray-800 rounded w-2/3"></div>
          </div>
          <p v-else>A curated collection of digital experiences, brand identities, and cinematic interfaces.</p>
        </div>
      </div>

      <!-- Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px]">
        <div
          v-for="m in 5"
          :key="m"
          class="relative rounded-xl bg-white/[0.05] border border-white/5 animate-pulse overflow-hidden flex flex-col md:block"
          :class="{ 'md:col-span-2 md:row-span-2 md:h-[624px]': m === 1, 'md:h-[300px]': m !== 1 }"
        >
          <div class="w-full aspect-[16/10] md:aspect-auto md:absolute md:inset-0 bg-gray-800/50"></div>
          <div class="p-5 space-y-3 md:hidden">
            <div class="h-3 w-24 bg-gray-800 rounded"></div>
            <div class="h-4 w-40 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Project grid: mobile = natural card (image + content below), desktop = bento overlay -->
      <div v-else v-reveal="{ stagger: 0.1, y: 60 }" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px]">
        <div
          v-for="(project, index) in formattedProjects"
          :key="project.id ?? index"
          class="relative group overflow-hidden rounded-xl bg-white/[0.04] border border-white/10 flex flex-col md:block"
          :class="{
            'md:col-span-2 md:row-span-2 md:h-[624px]': index === 0,
            'md:col-span-1 md:h-[300px]': index !== 0,
          }"
        >
          <!-- Gambar: mobile = in-flow dengan aspect ratio; desktop = absolute cover -->
          <div class="relative w-full overflow-hidden md:absolute md:inset-0">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="work-img w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-105 md:absolute md:inset-0 md:h-full md:aspect-auto md:opacity-80 md:group-hover:opacity-100"
              @error="onImgError"
            />
            <div
              class="img-fallback absolute inset-0 z-[1] flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1c1a38] to-[#121120]"
            >
              <span class="text-lg font-bold text-white/80 px-6 text-center">{{ project.title }}</span>
              <span class="text-xs text-gray-500">Screenshot unavailable</span>
            </div>

            <!-- Chips (kategori + tahun) -->
            <div
              class="absolute top-3 left-3 right-3 flex justify-between items-start text-[10px] md:text-xs font-mono tracking-widest text-orange-500"
            >
              <span class="bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{{ project.category }}</span>
              <span class="bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{{ project.year }}</span>
            </div>

            <!-- Gradient hanya di desktop (mobile punya konten di bawah gambar) -->
            <div class="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          </div>

          <!-- Konten: mobile = di bawah gambar; desktop = overlay bawah -->
          <div class="relative flex flex-col p-5 md:absolute md:inset-0 md:p-8">
            <div class="mt-auto">
              <h3
                class="font-bold uppercase tracking-tight text-white md:translate-y-4 md:group-hover:translate-y-0 md:transition-transform md:duration-500"
                :class="index === 0 ? 'text-2xl md:text-5xl' : 'text-xl md:text-3xl'"
              >
                {{ project.title }}
              </h3>
              <p
                v-if="index === 0"
                class="text-gray-300 text-sm mt-2 line-clamp-3 md:line-clamp-none md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-500 md:delay-100"
              >
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
