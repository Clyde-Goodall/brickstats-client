import { createRouter, createWebHistory } from 'vue-router';
import AvailableMidleware from '../middleware/available';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ChartView from '../views/subviews/ChartView.vue';
import DetailView from '../views/subviews/DetailView.vue';
import SecretView from '../views/SecretView.vue';

// Most of this is self explanatory
// Import route component -> make route entry -> point it to the component. You SHOULD be able to add middlewares in here too but fuck me I guess
// the this.$router object is available in all vue components 

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
    {
      path: '/topsecret',
      name: 'Top Secret',
      component: SecretView,
      props: true
    }
  ]
})

export default router
