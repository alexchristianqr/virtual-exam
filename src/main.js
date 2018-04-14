// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue     from 'vue'
import App     from './App'
import router  from './router'
import Axios   from 'axios'
import Sbadmin from './assets/js/sb-admin'

Vue.config.productionTip = false
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

new Vue({
  el: '#app',
  router,
  beforeCreate () {
    Sbadmin.init()
    console.log('Sbadmin reload!')
  },
  components: {App},
  template: '<App/>'
})

