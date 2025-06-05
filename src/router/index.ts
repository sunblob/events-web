import { createRouter, createWebHistory } from 'vue-router';

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
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'users',
          name: 'dashboard-users',
          component: () => import('@/views/dashboard/UsersList.vue'),
        },
        {
          path: 'events',
          name: 'dashboard-events',
          component: () => import('@/views/dashboard/EventList.vue'),
        },
        {
          path: 'events/:year/edit',
          name: 'dashboard-event-details',
          component: () => import('@/views/dashboard/EventDetails.vue'),
        },
        {
          path: 'events/:year/pages/:pageId/edit',
          name: 'dashboard-event-page-details',
          component: () => import('@/views/dashboard/EventPageDetails.vue'),
        },
        {
          path: 'events/:year/pages/create',
          name: 'dashboard-event-page-create',
          component: () => import('@/views/dashboard/EventPageCreate.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'events',
      component: () => import('@/views/EventList.vue'),
    },
    {
      path: '/events/:year',
      name: 'event-detail',
      component: () => import('@/views/EventDetail.vue'),
      children: [
        {
          path: ':slug',
          name: 'event-page',
          component: () => import('@/views/EventPage.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next({ name: 'sign-in' });
  } else {
    next();
  }
});

export default router;
