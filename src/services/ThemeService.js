import Vue       from 'vue'
import Storage   from 'vue-local-storage'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'

Vue.use(Vuex)

const THEME_SERVICE = new Vuex.Store({
  actions: {
    getThemes ({commit}, {self}) {
      Axios.get(Env.endpoint_api_laravel + '/get-themes').then(r => {
        if (r.status === 200) {
          self.dataTheme = r.data
        }
      }).catch(e => {
        console.error(e.response)
      })
    },
  }
})

export default THEME_SERVICE