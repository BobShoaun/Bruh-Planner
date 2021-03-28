import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard/calendar'
  },
  {
    path: '/dashboard/',
    component: Dashboard,
    children: [
      {
        path: '',
        redirect: '/dashboard/calendar'
      },
      {
        path: 'calendar',
        component: () => import('@/views/Calendar.vue')
      },
      {
        path: 'list',
        component: () => import('@/views/List.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
