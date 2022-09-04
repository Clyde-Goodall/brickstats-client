import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import {store} from '../store/index.js'
import router from './router/index.js'
import VueRellax from 'vue-rellax'
import './main.css';

const app = createApp(App);
app.use(VueRellax)
app.use(store);
app.use(router);
app.use(VueCookies, {expires: '7d'});
app.mount('#app')
