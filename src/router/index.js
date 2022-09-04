import { createRouter, createWebHistory } from 'vue-router';
import Api from '../util/api';
const inst = new Api();

// views
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ChartView from '../views/subviews/ChartView.vue';
import CollectionsView from '../views/subviews/CollectionsView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import SecretView from '../views/SecretView.vue';
import PreferenceView from '../views/subviews/PreferencesView.vue'
import SavedApiView from '../views/subviews/SavedApiView.vue';
import QueryBuilderView from '../views/subviews/QueryBuilderView.vue';


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

    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,

    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,

    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      // sub-views don't need a slash prepending the path
      props: true,
      children: [
        {
          path: 'apis',
          name: 'Saved Apis',
          component: SavedApiView
        },
        {
          path: 'query',
          name: 'Query Builder',
          component: QueryBuilderView,
        },
        {
          path: 'charts',
          name: 'Charts',
          component: ChartView,

        },
        {
          path: 'collections',
          name: 'Collections',
          component: CollectionsView,

        },
        {
          path: 'preferences',
          name: 'Preferences',
          component: PreferenceView,
        }
      ]
    },
    {
      path: '/topsecret',
      name: 'Top Secret',
      component: SecretView,
      props: true,
    }
  ]
})

//This should really be in a separate file beause it might get long in the tooth

router.beforeEach(async (to, from, next) => {
  console.log(`to: ${to.path}, from: ${from.path}`)
  // requires auth
  const auth = await inst.getAuth({'token': $cookies.get('token'), 'username': $cookies.get('username')});
  // no auth and attempting to access protected routes
  if(!auth && !['/ip', '/register', '/', '/login'].includes(to.path)) {
    return next({path: '/login'});
  } else {
  // should fix this elsewhere - /dashboard is simply a base view, must have /charts or details etc... should hopefully be edge case
  if(to.path == '/dashboard/' || to.path == '/dashboard') {
    console.log('To grandmother\'s dashboard we go');
    return next({path: '/dashboard/query'});
  }

  if(['/ip', '/register', '/', '/login'].includes(to.path) && auth) {
    return next({path: '/dashboard/query'});
  }
  // user is not authenicated and is trying to acces  s protected route
  return next();
  }
});

export default router
