// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'bootstrap';
import './assets/vendor/scss/style.scss';
import Axios from 'axios';

Vue.config.productionTip = false;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
