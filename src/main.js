import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

import App from './App.vue';

import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.defaults.baseURL = 'https://mockup-api.herokuapp.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
