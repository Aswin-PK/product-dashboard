import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { store } from './store'
import VueRouter from 'vue-router';
import { Routes } from './routes'

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Allow navigation to route if authenticated
    }
  } else {
    next(); // Allow navigation to non-authenticated routes
  }
});

Vue.use(ElementUI);
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
