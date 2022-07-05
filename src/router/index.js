import { createRouter, createWebHistory } from 'vue-router';
import AvailableMidleware from '../middleware/available';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ChartView from '../views/subviews/ChartView.vue';
import DetailView from '../views/subviews/DetailView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        middleware: [AvailableMidleware]
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        middleware: [AvailableMidleware]
      },
      props: true,
      children: [
        {
          path: 'charts',
          name: 'Charts',
          component: ChartView,
          emta: {
            transition: 'slide-right'
          }
        },
        {
          path: 'details',
          name: 'Details',
          component: DetailView,
          meta: {
            transition: 'slide-left',
          }
        }
      ]
    },
  ]
})

export default router
