import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
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
    allTheme ({commit}, {self}) {
      if (this.state.intent != null) window.clearInterval(this.state.intent)
      Axios.get(Env.API + '/all-theme', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataTheme = r.data
        }
      }).catch((e) => {
        self.method = 'allTheme'
        Util.fnError(e, self, this)
      })
    },
    createTheme ({commit}, {self}) {
      Axios.post(Env.API + '/create-theme', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace('/themes')
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
    updateTheme ({commit}, {self}) {
      Axios.put(Env.API + '/update-theme', self.params).then((r) => {
        if (r.status === 200) {
          console.log(r)
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
  }
})