import Vue       from 'vue'
import * as Vuex from 'vuex'
import Storage   from 'vue-local-storage'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex, Storage)

export default new Vuex.Store({
  state: {
    intent: null,
  },
  actions: {
    loadExams({commit}, {self}) {
      // if (this.state.intent != null) window.clearInterval(this.state.intent)
      // Axios.get(Env.endpoint_exam + '/exam/listExamUser/' +
      //   Storage.get('data_auth').id).then(r => {
      //   if (r.status === 200) {
      //     self.loadingTable = false
      //     self.data = r.data
      //   }
      // }).catch(e => {
      //   self.method = 'loadExams'
      //   Util.fnError(e, self, this)
      // })
    },
    loadExam({commit}, {self}) {
      if (this.state.intent != null) window.clearInterval(this.state.intent)
      Axios.get(Env.endpoint_exam + '/exam/takeExam/' + self.exam_id).
      then(r => {
        if (r.status === 200) {
          self.msg = undefined
          if (r.data.message === undefined) {
            self.loadingTable = false
            self.data = r.data
            self.timer()
          } else {
            self.msg = r.data.message
          }
        }
      }).
      catch(e => {
        self.method = 'loadExam'
        Util.fnError(e, self, this)
      })
    },
    loadExamSolution({commit}, {self}) {
      if (this.state.intent != null) window.clearInterval(this.state.intent)
      let parameters = {
        user_id: Storage.get('data_auth').id,
        exam_id: self.params.exam_id,
      }
      Axios.post(Env.endpoint_exam + '/exam/seeExamSolution/', parameters).
      then(r => {
        if (r.status === 200) {
          self.msg = undefined
          if (r.data.message === undefined) {
            self.data_exam_solution = r.data
          } else {
            self.msg = r.data.message
          }
        }
      }).
      catch(e => {
        self.method = 'loadExamSolution'
        Util.fnError(e, self, this)
      })
    },
    saveExam({commit}, {self}) {
      Axios.post(Env.endpoint_exam + '/exam/recordExamResponse', self.params).
      then(r => {
        if (r.status === 200) {
          self.showLoading = false
          self.message = r.data
        }
      }).
      catch(e => {
        self.showLoading = false
        self.message = e.response.data
        Util.fnError(e)
      })
    },
    updateStatusExam({commit}, {self}) {
      Axios.patch(Env.endpoint_exam + '/exam/updateExamState', self.params).
      then(r => {
        //Si es que no tiene permiso
        if (r.status === 200) {
          self.msg_validate = r.data.message
        }
        //si es que tiene permiso
        if (r.status === 204) {
          self.openedModal()
        }
      }).
      catch(e => {
        self.showLoading = false
        self.message = e.response.data
        Util.fnError(e)
      })
    },
  },
})