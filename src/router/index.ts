import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventDetail from '../views/EventDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/auth/sign-in',
      name: 'sign-in',
      component: () => import('@/views/auth/SignIn.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: EventList,
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: EventDetail,
    },
    {
      path: '/events/:id/pages',
      name: 'event-pages',
      component: () => import('@/views/EventPagesView.vue'),
    },
  ],
});

export default router;
