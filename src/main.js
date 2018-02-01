// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from "axios";
import bootstrap from 'bootstrap';
import style from "./assets/vendor/scss/style.scss";

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
