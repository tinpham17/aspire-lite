import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/cards', component: () => import('pages/CardsPage.vue') },
      { path: '/payments', component: () => import('pages/PaymentsPage.vue') },
      { path: '/credit', component: () => import('pages/CreditPage.vue') },
      { path: '/profile', component: () => import('pages/ProfilePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
