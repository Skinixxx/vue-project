import { createRouter, createWebHistory } from 'vue-router'

const BASE_URL = 'http://localhost:3001/api'

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/components/ClientDashboard.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router