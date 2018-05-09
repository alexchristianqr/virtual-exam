import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    allTheme ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-theme', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataTheme = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createTheme ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-theme', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace('/themes')
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    updateTheme ({commit}, {self}) {
      Axios.put(Env.API_LARAVEL + '/update-theme', self.params).then((r) => {
        if (r.status === 200) {
          console.log(r)
        }
      }).catch((e) => {
        console.error(e)
      })
    },
  }
})