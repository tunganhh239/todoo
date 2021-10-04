import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import Home from '../views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import Dashboard from '@/views/Dashboard.vue';

import user from '@/services/user.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: { auth: false },

  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: { auth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { auth: true },
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _from, next) => {
  const isSignedIn = user.isSignedIn();

  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (!isSignedIn) {
        router.push({ name: 'SignIn' });
      } else {
        next();
      }
    } else if (!isSignedIn) {
      next();
    } else if (isSignedIn) {
      // next({ path: '/dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
  next();
  if (to.meta.auth) {
    const userProfile = user.userData(); // vẫn phải dùng tạm localstorage
    store.commit('UPDATE_AUTHENTICATE_EMAIL', userProfile);

    const token = user.userAuthToken();
    console.log(token);
    store.commit('UPDATE_TOKEN', token);
  }
});

export default router;
