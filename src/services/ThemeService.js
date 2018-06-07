import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getThemesByUserSurveyTheme ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-themes-by-user-survey-theme', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataTheme = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    getThemesBySurvey ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-themes-by-survey', {params: {survey_id: self.params.survey_id}}).then((r) => {
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
          self.restart()
          Util.closeModal(self.modalId)
          // self.$emit('eventClose')
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createUserSurveyTheme ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-user-survey-theme', self.params).then((r) => {
        if (r.status === 200) {
          self.restart()
          Util.closeModal(self.modalId)
          this.dispatch('getThemesByUserSurveyTheme',{self:self})
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
    getUserHistory ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-user-history', {params: self.params}).then((r) => {
        if (r.status === 200) {
          // self.loadingTable = false
          self.dataUserHistory = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
  }
})