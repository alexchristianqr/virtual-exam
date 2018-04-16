import Vue       from 'vue'
import Storage   from 'vue-local-storage'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    allByUserSurvey ({commit}, {self}) {
      Axios.get(Env.API + '/all-by-user-survey', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.dataSurvey = r.data
        }
      }).catch((e) => {
        Util.fnError(e, self, this)
      })
    },
    allSurvey ({commit}, {self}) {
      Axios.get(Env.API + '/all-survey').then((r) => {
        if (r.status === 200) {
          self.dataSurvey = r.data
        }
      }).catch((e) => {
        Util.fnError(e, self, this)
      })
    },
  }
})