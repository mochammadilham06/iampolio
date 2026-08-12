import HomePages from '@/pages/HomePages.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomePages,
    meta: {
      title: 'Creative Developer & Frontend Engineer',
      description:
        'Portfolio of Mochammad Ilham Maulana — creative developer crafting high-performance web experiences, micro-frontends, and scalable interfaces.',
    },
  },
  {
    path: '/works',
    component: () => import('@/pages/works/WorksPage.vue'),
    meta: {
      title: 'Selected Works',
      description:
        'A curated collection of projects spanning fintech, telecom, and corporate platforms — from banking systems and MLOps tools to marketing websites.',
    },
  },
  {
    path: '/experience',
    component: () => import('@/pages/experience/ExperiencePage.vue'),
    meta: {
      title: 'Experience',
      description:
        'Frontend engineering journey across consultancy, fintech, and banking sectors — building enterprise-scale products.',
    },
  },
  {
    path: '/services',
    component: () => import('@/pages/services/ServicePage.vue'),
    meta: {
      title: 'Services',
      description:
        'Frontend development, backend development, and UI/UX design — full-stack delivery with a focus on performance and scalable architecture.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for could not be found.',
    },
  },
  {
    path: '/server-error',
    name: 'ServerError',
    component: () => import('@/pages/ServerError.vue'),
    meta: {
      title: 'Server Error',
      description: 'Something went wrong on the server.',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
