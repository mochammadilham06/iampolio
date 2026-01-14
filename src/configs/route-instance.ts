import HomePages from '@/pages/HomePages.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomePages },
  { path: '/works', component: () => import('@/pages/works/WorksPage.vue') },
  {
    path: '/experience',
    component: () => import('@/pages/experience/ExperiencePage.vue'),
  },
  {
    path: '/services',
    component: () => import('@/pages/services/ServicePage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: () => import('@/pages/NotFound.vue'),
  },
  {
    path: '/server-error',
    name: 'ServerError',
    component: () => import('@/pages/ServerError.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
