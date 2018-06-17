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
    console.log('Sbadmin load!')
  },
  components: {App},
  template: '<App/>'
})

// Mapeo de Seguridad Storage en la computadora Cliente Chrome:
// cookie_storage_app_user_authenticated = co-stg-a-u-au
// cookie_file_storage_app_user_authenticated = co-f-stg-a-u-au
// storage_user_sapia = s-u-$4p14

