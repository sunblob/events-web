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
          name: 'users',
          component: () => import('@/views/UsersView.vue'),
        },
        {
          path: 'conferences',
          name: 'conferences',
          component: () => import('@/views/ConferencesView.vue'),
        },
        {
          path: 'conferences/:year/edit',
          name: 'conference-details',
          component: () => import('@/views/ConferenceDetails.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'events',
      component: () => import('@/views/EventList.vue'),
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: () => import('@/views/EventDetail.vue'),
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
