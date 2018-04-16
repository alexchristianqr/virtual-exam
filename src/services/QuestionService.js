import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  allQuestion ({commit}, {self}) {
    if (this.state.intent != null) window.clearInterval(this.state.intent)
    Axios.get(Env.API + '/all-question', {params: self.params}).then((r) => {
      if (r.status === 200) {
        self.loadingTable = false
        self.dataQuestion = r.data
      }
    }).catch((e) => {
      self.method = 'allQuestion'
      Util.fnError(e, self, this)
    })
  },
  createQuestion ({commit}, {self}) {
    Axios.post(Env.API + '/create-question', self.params).then((r) => {
      if (r.status === 200) {
        self.$router.replace('/questions')
      }
    }).catch((e) => {
      Util.fnError(e, self)
    })
  },
  updateQuestion ({commit}, {self}) {
    Axios.put(Env.API + '/update-question/' + self.question_id, self.params).then((r) => {
      if (r.status === 200) {
        self.$router.replace('/questions')
      }
    }).catch((e) => {
      Util.fnError(e, self)
    })
  },
})