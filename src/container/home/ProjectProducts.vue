<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tabs from '@/components/tabs/Tabs.vue';
import Button from '@/components/button/Button.vue';
import { useRouter } from 'vue-router';
import { ProjectServices } from '@/service';
import { resolveProjectImages } from '@/service/mock';
import { prefersReducedMotion } from '@/utils/animations';

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  /** 2 screenshot per project: [landing, feature/dashboard] */
  images: string[];
  year: string;
  category: string;
  slug: string;
}

const projectTabs = ref(['All']);
const router = useRouter();

const { getProjects } = ProjectServices();

const rawProjects = ref<Array<Record<string, any>>>([]);
const isLoading = ref(true);
const showcaseRef = ref<HTMLElement | null>(null);
const showcaseMobileRef = ref<HTMLElement | null>(null);

const reducedMotion = prefersReducedMotion();

const formattedProjects = computed<WorkItem[]>(() =>
  rawProjects.value.map((item: any) => {
    const images = resolveProjectImages(item);
    return {
    title: item.title ?? 'Untitled Project',
    description: item.description ?? '',
    year: item.year ? String(item.year).split('-')[0] : '2024',
    category: item.category || 'PROJECT',
    image: images[0],
    images,
    slug:
      (String(item.title ?? 'project')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 18) || 'project') + '.com',
    };
  })
);

const handleChangeTab = (_tab: string) => {
  // Only one tab for now
};

const handleFetch = async () => {
  isLoading.value = true;
  try {
    const res = await getProjects(3);
    rawProjects.value = res.myportfolio_portfolio || res || [];
  } catch (err) {
    console.error('[getProject]: ', err);
  } finally {
    isLoading.value = false;
  }
};

let ctx: gsap.Context | null = null;
let resizeTimer: number | null = null;

/**
 * Build one pinned Apple-style showcase inside a section.
 * `perPanelVh` = how much scroll each project consumes.
 */
const buildShowcase = (section: HTMLElement, perPanelVh: number) => {
  const details = Array.from(section.querySelectorAll<HTMLElement>('.detail-panel'));
  const images = Array.from(section.querySelectorAll<HTMLElement>('.img-panel'));
  const imagesB = Array.from(section.querySelectorAll<HTMLElement>('.img-panel-b'));
  const urls = Array.from(section.querySelectorAll<HTMLElement>('.url-panel'));
  const urlsB = Array.from(section.querySelectorAll<HTMLElement>('.url-panel-b'));
  const hint = section.querySelector('.showcase-hint');
  const n = details.length;
  if (!n) return;

  // Hide every panel first; only the active one is revealed while scrubbing
  // (imagesB / urlsB = second screenshot + its URL, revealed mid-segment)
  gsap.set([...details.slice(1), ...images.slice(1), ...imagesB, ...urls.slice(1), ...urlsB], {
    autoAlpha: 0,
  });
  gsap.set([details[0], images[0], urls[0]], { autoAlpha: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + n * perPanelVh + '%',
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
    },
  });

  details.forEach((detail, i) => {
    const image = images[i];
    const imageB = imagesB[i];
    const url = urls[i];
    const urlB = urlsB[i];

    // Enter project (first screenshot)
    if (i === 0) {
      tl.to(detail, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, 0);
      tl.to(image, { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0);
      tl.to(url, { autoAlpha: 1, duration: 0.5 }, 0.2);
      if (hint) tl.to(hint, { autoAlpha: 0, duration: 0.5 }, 0.5);
    } else {
      tl.to(details[i - 1], { autoAlpha: 0, y: -70, duration: 0.8, ease: 'power2.in' }, '+=0.15');
      tl.to(imagesB[i - 1], { autoAlpha: 0, scale: 0.95, duration: 0.8, ease: 'power2.in' }, '<');
      tl.to(urlsB[i - 1], { autoAlpha: 0, duration: 0.4 }, '<');
      tl.fromTo(
        detail,
        { autoAlpha: 0, y: 70 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '+=0.25'
      );
      tl.fromTo(
        image,
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        '<'
      );
      tl.fromTo(url, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '<');
    }

    // Mid-segment: screenshot 1 (login) → screenshot 2 (dashboard)
    tl.to(image, { autoAlpha: 0, scale: 0.97, duration: 0.7, ease: 'power2.inOut' }, '+=0.7');
    tl.fromTo(
      imageB,
      { autoAlpha: 0, scale: 1.06 },
      { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
      '<'
    );
    tl.to(url, { autoAlpha: 0, duration: 0.4 }, '<');
    tl.fromTo(urlB, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, '<');
  });
};

/** Initialize the showcase for the currently visible breakpoint (desktop vs mobile) */
const initShowcase = () => {
  ctx?.revert();
  ctx = null;
  if (reducedMotion) return;

  // Wait for the DOM to render (v-if refs are not attached during pre-flush watchers)
  nextTick(() => {
    const isDesktop = window.innerWidth >= 1024;
    const section = (isDesktop ? showcaseRef.value : showcaseMobileRef.value) ?? null;
    if (!section) return;

    ctx = gsap.context(() => {
      buildShowcase(section, isDesktop ? 65 : 55);
    }, section);
  });
};

const onResize = () => {
  if (resizeTimer) window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => initShowcase(), 200);
};

watch(isLoading, (v) => {
  if (!v) initShowcase();
});

onMounted(() => {
  handleFetch();
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  if (resizeTimer) window.clearTimeout(resizeTimer);
  ctx?.revert();
});

/** Hide broken images and show the built-in fallback panel */
const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).classList.add('error');
};

const pad = (n: number) => String(n).padStart(2, '0');
</script>

<template>
  <section class="my-20 max-w-7xl mx-auto px-4 overflow-x-clip">
    <!-- Header -->
    <div v-reveal="{ y: 40 }">
      <h1 class="text-5xl font-bold text-center text-white mb-2">Project and Products</h1>
      <h2 class="text-2xl text-[#ADABC7] text-center mb-8">Project List</h2>
      <div class="flex justify-center mb-10">
        <Tabs :tabs="projectTabs" :initialTab="projectTabs[0]" @tab-change="handleChangeTab" />
      </div>
    </div>

    <!-- Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="m in 3" :key="m" class="h-72 rounded-2xl bg-white/[0.05] border border-white/5 animate-pulse"></div>
    </div>

    <!-- ===== Desktop showcase (pinned, Apple-style) ===== -->
    <section
      v-if="!isLoading && !reducedMotion && formattedProjects.length"
      ref="showcaseRef"
      class="hidden lg:block h-screen relative overflow-hidden"
    >
      <div class="w-full h-full max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center px-4">
        <!-- Left: project details (change while scrolling) -->
        <div class="relative h-[420px] xl:h-[480px]">
          <div
            v-for="(p, i) in formattedProjects"
            :key="'d-' + (p.id ?? i)"
            class="detail-panel absolute inset-0 flex flex-col justify-center"
          >
            <span class="font-mono text-sm text-[#FF512F]">
              {{ pad(i + 1) }} / {{ pad(formattedProjects.length) }}
            </span>
            <span class="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              {{ p.category }}
            </span>
            <h3 class="mt-3 text-4xl xl:text-6xl font-black tracking-tight leading-[0.95] text-white">
              {{ p.title }}
            </h3>
            <p class="mt-5 text-gray-400 leading-relaxed max-w-md line-clamp-4">
              {{ p.description }}
            </p>
            <div class="mt-7 flex items-center gap-3">
              <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                {{ p.year }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: browser mockup (frame stays, screenshots crossfade) -->
        <div class="relative">
          <div
            class="rounded-2xl border border-white/10 bg-[#0f0e1e] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <div class="flex items-center gap-1.5 px-4 py-3 bg-white/[0.04] border-b border-white/10">
              <span class="w-3 h-3 rounded-full bg-[#FF5F57]"></span>
              <span class="w-3 h-3 rounded-full bg-[#FEBC2E]"></span>
              <span class="w-3 h-3 rounded-full bg-[#28C840]"></span>
              <div class="ml-3 flex-1 h-6 rounded-md bg-white/[0.06] text-xs text-gray-500 font-mono relative overflow-hidden">
                <div
                  v-for="(p, i) in formattedProjects"
                  :key="'u-' + (p.id ?? i)"
                  class="url-panel absolute inset-0 flex items-center px-3"
                >
                  https://{{ p.slug }}
                </div>
                <div
                  v-for="(p, i) in formattedProjects"
                  :key="'v-' + (p.id ?? i)"
                  class="url-panel-b absolute inset-0 flex items-center px-3"
                >
                  https://{{ p.slug }}/dashboard
                </div>
              </div>
            </div>

            <div class="relative h-[50vh] xl:h-[56vh] bg-[#0f0e1e]">
              <!-- Screenshot 1 (login) -->
              <div v-for="(p, i) in formattedProjects" :key="'i-' + (p.id ?? i)" class="img-panel absolute inset-0">
                <span
                  class="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest text-white/85"
                >
                  Login
                </span>
                <img
                  :src="p.images[0]"
                  :alt="p.title + ' - login view'"
                  loading="lazy"
                  class="work-img w-full h-full object-cover object-top"
                  @error="onImgError"
                />
                <div
                  class="img-fallback absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1c1a38] to-[#121120]"
                >
                  <div class="w-12 h-12 rounded-full border border-[#FF512F]/30 bg-[#FF512F]/10 flex items-center justify-center">
                    <svg class="w-6 h-6 text-[#FF512F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <span class="text-lg font-bold text-white/85">{{ p.title }}</span>
                  <span class="text-xs text-gray-500">Screenshot unavailable</span>
                </div>
              </div>

              <!-- Screenshot 2 (dashboard), revealed mid-segment -->
              <div v-for="(p, i) in formattedProjects" :key="'j-' + (p.id ?? i)" class="img-panel-b absolute inset-0">
                <span
                  class="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest text-[#FF512F]"
                >
                  Dashboard
                </span>
                <img
                  :src="p.images[1]"
                  :alt="p.title + ' - dashboard view'"
                  loading="lazy"
                  class="work-img w-full h-full object-cover object-top"
                  @error="onImgError"
                />
                <div
                  class="img-fallback absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1c1a38] to-[#121120]"
                >
                  <div class="w-12 h-12 rounded-full border border-[#FF512F]/30 bg-[#FF512F]/10 flex items-center justify-center">
                    <svg class="w-6 h-6 text-[#FF512F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <span class="text-lg font-bold text-white/85">{{ p.title }}</span>
                  <span class="text-xs text-gray-500">Screenshot unavailable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="showcase-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span class="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
        <div class="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div class="w-1 h-1.5 rounded-full bg-[#FF512F] animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- ===== Mobile showcase (stacked, pinned) ===== -->
    <section
      v-if="!isLoading && !reducedMotion && formattedProjects.length"
      ref="showcaseMobileRef"
      class="lg:hidden h-screen relative overflow-hidden"
    >
      <div class="w-full h-full max-w-md mx-auto flex flex-col justify-center gap-7 px-5">
        <!-- Details -->
        <div class="relative h-[240px]">
          <div
            v-for="(p, i) in formattedProjects"
            :key="'md-' + (p.id ?? i)"
            class="detail-panel absolute inset-0 flex flex-col justify-center"
          >
            <span class="font-mono text-xs text-[#FF512F]">
              {{ pad(i + 1) }} / {{ pad(formattedProjects.length) }}
            </span>
            <span class="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              {{ p.category }}
            </span>
            <h3 class="mt-2 text-3xl font-black tracking-tight leading-[0.95] text-white">{{ p.title }}</h3>
            <p class="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-3">{{ p.description }}</p>
            <span
              class="mt-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 self-start"
            >
              {{ p.year }}
            </span>
          </div>
        </div>

        <!-- Browser mockup -->
        <div class="rounded-2xl border border-white/10 bg-[#0f0e1e] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] overflow-hidden">
          <div class="flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.04] border-b border-white/10">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
            <div class="ml-2 flex-1 h-5 rounded-md bg-white/[0.06] text-[10px] text-gray-500 font-mono relative overflow-hidden">
              <div v-for="(p, i) in formattedProjects" :key="'mu-' + (p.id ?? i)" class="url-panel absolute inset-0 flex items-center px-2">
                https://{{ p.slug }}
              </div>
              <div v-for="(p, i) in formattedProjects" :key="'mv-' + (p.id ?? i)" class="url-panel-b absolute inset-0 flex items-center px-2">
                https://{{ p.slug }}/dashboard
              </div>
            </div>
          </div>

          <div class="relative h-[38vh] bg-[#0f0e1e]">
            <!-- Screenshot 1 (login) -->
            <div v-for="(p, i) in formattedProjects" :key="'mi-' + (p.id ?? i)" class="img-panel absolute inset-0">
              <span
                class="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-white/85"
              >
                Login
              </span>
              <img
                :src="p.images[0]"
                :alt="p.title + ' - login view'"
                loading="lazy"
                class="work-img w-full h-full object-cover object-top"
                @error="onImgError"
              />
              <div
                class="img-fallback absolute inset-0 flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1c1a38] to-[#121120]"
              >
                <span class="text-lg font-bold text-white/85 px-4 text-center">{{ p.title }}</span>
                <span class="text-xs text-gray-500">Screenshot unavailable</span>
              </div>
            </div>

            <!-- Screenshot 2 (dashboard) -->
            <div v-for="(p, i) in formattedProjects" :key="'mj-' + (p.id ?? i)" class="img-panel-b absolute inset-0">
              <span
                class="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-sm text-[9px] font-mono uppercase tracking-widest text-[#FF512F]"
              >
                Dashboard
              </span>
              <img
                :src="p.images[1]"
                :alt="p.title + ' - dashboard view'"
                loading="lazy"
                class="work-img w-full h-full object-cover object-top"
                @error="onImgError"
              />
              <div
                class="img-fallback absolute inset-0 flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1c1a38] to-[#121120]"
              >
                <span class="text-lg font-bold text-white/85 px-4 text-center">{{ p.title }}</span>
                <span class="text-xs text-gray-500">Screenshot unavailable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="showcase-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span class="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
        <div class="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div class="w-1 h-1.5 rounded-full bg-[#FF512F] animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- ===== Static list (only for reduced-motion users or empty data) ===== -->
    <div v-if="!isLoading && (reducedMotion || !formattedProjects.length)" class="flex flex-col gap-12">
      <div
        v-for="(item, index) in formattedProjects"
        :key="item.id ?? index"
        v-reveal="{ self: true, y: 50, delay: (index % 2) * 0.12 }"
        class="flex flex-col lg:flex-row items-center gap-10"
        :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }"
      >
        <div class="w-full lg:w-1/2">
          <div class="rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-[#1c1a38] to-[#121120]">
            <img
              :src="item.image"
              alt="Project Image"
              loading="lazy"
              @error="onImgError"
              class="work-img w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
            <div class="img-fallback absolute inset-0 flex flex-col items-center justify-center gap-2 py-20">
              <span class="text-2xl font-bold text-white/80 text-center px-6">{{ item.title }}</span>
              <span class="text-xs text-gray-500">Screenshot unavailable</span>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/2 flex flex-col justify-center">
          <h3 class="text-4xl font-bold text-white leading-tight mb-4">{{ item.title }}</h3>
          <p class="text-gray-400 font-medium text-xl">{{ item.description }}</p>
          <span class="mt-4 inline-flex items-center gap-3 text-sm text-gray-500">
            <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5">{{ item.year }}</span>
          </span>
        </div>
      </div>
    </div>

    <div v-if="formattedProjects.length > 3" class="flex justify-center mt-20">
      <Button label="See More Projects" variant="secondary" @click="router.push('/works')" />
    </div>
  </section>
</template>

<style scoped>
/* URL di browser bar ikut berganti per project (visibilitas diatur GSAP) */
.url-panel {
  white-space: nowrap;
  overflow: hidden;
}
</style>
