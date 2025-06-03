import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventDetail from '../views/EventDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/RegistrationView.vue'),
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
      path: '/',
      name: 'events',
      component: EventList,
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: EventDetail,
    }
  ],
});

export default router;
