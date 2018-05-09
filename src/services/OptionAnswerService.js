import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getOptionsAnswers ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-options-anwers').then((r) => {
        if (r.status === 200) {
          self.dataOptionAnswer = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    allOptionAnswer ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-option-answer', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataOptionAnswer = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createOptionAnswer ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-option-answer', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace('/options-answers')
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    updateOptionAnswer ({commit}, {self}) {
      Axios.put(Env.API_LARAVEL + '/update-option-answer', self.params).then((r) => {
        if (r.status === 200) {
          self.$router.replace('/options-answers')
        }
      }).catch((e) => {
        console.error(e)
      })
    },
  },
})


