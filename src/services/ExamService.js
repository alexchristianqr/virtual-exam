import Vue       from 'vue'
import * as Vuex from 'vuex'
import Storage   from 'vue-local-storage'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'
import $         from 'jquery'

Vue.use(Vuex, Storage)

export default new Vuex.Store({
  state: {
    intent: null,
  },
  actions: {
    getExam ({commit}, {self}) {
      if (this.state.intent != null) window.clearInterval(this.state.intent)
      Axios.get(Env.API + '/load-exam', {params: {theme_id: self.theme_id}}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataExam = r.data
        }
      }).catch((e) => {
        self.method = 'loadExam'
        Util.fnError(e, self, this)
      })
    },
    createExam ({commit}, {self}) {
      Axios.post(Env.API + '/create-exam', self.params).then((r) => {
        if (r.status === 200) {
          console.log(r)
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
    updateExam ({commit}, {self}) {
      Axios.put(Env.API + '/update-exam', self.params).then((r) => {
        if (r.status === 200) {
          $('#modalQueryExam').modal('hide')
          self.$router.replace('/themes')
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    updateExamAutomatic ({commit}, {self}) {
      Axios.put(Env.API + '/update-exam', self.params).then((r) => {
        if (r.status === 200) {console.log(r.statusText)}
      }).catch((e) => {
        console.error(e)
      })
    },
  }
})