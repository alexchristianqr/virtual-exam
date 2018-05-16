import Vue          from 'vue'
import * as Vuex    from 'vuex'
import Axios        from 'axios'
import Env          from '../env'
import Util         from '../util'
import ThemeService from './ThemeService'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getSurveysByUserSurvey ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-surveys-by-user-survey', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.dataSurvey = r.data
          if(self.isViewTheme){
            if(self.dataSurvey.length) {
              ThemeService.dispatch('getThemesByUserSurveyTheme', {self: self})
              self.params.user_survey_id = self.dataSurvey[0].id
            }
          }
        }
      }).catch((e) => {
        Util.fnError(e, self, this)
      })
    },
    getSurveys ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-surveys',(self.isViewTheme)?{params:{status:'A'}}:{params:self.params}).then((r) => {
        if (r.status === 200) {
          self.loadingTable = false
          self.dataSurvey = r.data
          if(self.isViewTheme){
            if(self.dataSurvey.length) {
              ThemeService.dispatch('getThemesByUserSurveyTheme', {self: self})
              self.params.user_survey_id = self.dataSurvey[0].id
            }
          }
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createSurvey ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-survey', self.params).then((r) => {
        if (r.status === 200) {
          // Util.closeModal(self.modalId)
          // self.restart()
          // self.$emit('eventClose')
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
  }
})