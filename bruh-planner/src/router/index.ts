import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard/calendar'
  },
  {
    path: '/dashboard/',
    component: Tabs,
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
      {
        path: 'test',
        component: () => import('@/views/Test.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
