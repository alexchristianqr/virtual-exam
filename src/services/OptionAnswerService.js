import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getOptionsAnswers ({commit}, {self}) {
      Axios.get(Env.API + '/get-options-anwers').then((r) => {
        if (r.status === 200) {
          self.dataOptionAnswer = r.data
        }
      }).catch((e) => {})
    },
    allOptionAnswer ({commit}, {self}) {
      if (this.state.intent != null) window.clearInterval(this.state.intent)
      Axios.get(Env.API + '/all-option-answer', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataOptionAnswer = r.data
        }
      }).catch((e) => {
        self.method = 'allOptionAnswer'
        Util.fnError(e, self, this)
      })
    },
    createOptionAnswer ({commit}, {self}) {
      Axios.post(Env.API + '/create-option-answer', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace('/options-answers')
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
    updateOptionAnswer ({commit}, {self}) {
      Axios.put(Env.API + '/update-option-answer', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace('/options-answers')
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
  },
})


