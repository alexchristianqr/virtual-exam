import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    allByUserSurvey ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-by-user-survey', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.dataSurvey = r.data
        }
      }).catch((e) => {
        Util.fnError(e, self, this)
      })
    },
    allSurvey ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-survey', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataSurvey = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createSurvey ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-survey', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace({name: 'categories'})
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
  }
})