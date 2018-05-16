import Vue from 'vue'
import * as Vuex from 'vuex'
import Storage from 'vue-local-storage'
import Axios from 'axios'
import Env from '../env'
import Util from '../util'

Vue.use(Vuex, Storage)

export default new Vuex.Store({
  actions: {
    loadExam({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/load-exam',
        {params: {theme_id: self.theme_id}}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataExam = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createExam({commit}, {self}) {
      let formData = new FormData()
      formData.append('image', self.params.image)
      formData.append('theme_id', self.params.theme_id)
      formData.append('name', self.params.name)
      formData.append('option_answer_ids',
        JSON.stringify(self.params.option_answer_ids))
      formData.append('level', self.params.level)
      formData.append('status', self.params.status)
      Axios.post(Env.API_LARAVEL + '/create-exam', formData,
        {headers: {'Content-Type': 'multipart/form-data'}}).then((r) => {
        if (r.status === 200) {
          self.$router.replace({name: 'themes'})
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    updateExam({commit}, {self}) {
      Axios.put(Env.API_LARAVEL + '/update-exam', self.params).then((r) => {
        if (r.status === 200) {
          Util.closeModal('#modalQueryExam')
          self.$router.replace('/themes')
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    updateExamAutomatic({commit}, {self}) {
      Axios.put(Env.API_LARAVEL + '/update-exam', self.params).then((r) => {
        if (r.status === 200) {console.log(r.statusText)}
      }).catch((e) => {
        console.error(e)
      })
    },
    loadExamSolution({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/load-exam-solution', {params: self.params}).
      then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataExamSolution = r.data.dataExamSolution
        }
      }).
      catch((e) => {
        console.error(e)
      })
    },
    verifyExamSolution({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/verify-exam-solution',
        {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.$router.replace({
            name: 'exam-solution',
            params: {user_survey_theme_id: self.params.user_survey_theme_id},
          })
        }
      }).catch((e) => {
        self.dataExamSolution = e.response.data
        Util.openModal(self.document, '#modalQueryExamSolution')
        console.error(e)
      })

    },
  },
})