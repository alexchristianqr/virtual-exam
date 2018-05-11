import Vue          from 'vue'
import * as Vuex    from 'vuex'
import Axios        from 'axios'
import Env          from '../env'
import Util         from '../util'
import ThemeService from './ThemeService'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    allByUserSurvey ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-by-user-survey', {params: self.params}).then((r) => {
        if (r.status === 200) {
          self.dataSurvey = r.data
          if(self.dataSurvey.length){
            self.params.user_survey_id = self.dataSurvey[0].id
            ThemeService.dispatch('allTheme', {self: self})
          }
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
          if(self.dataSurvey.length) {
            self.params.user_survey_id = self.dataSurvey[0].id
            ThemeService.dispatch('allTheme', {self: self})
          }
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    createSurvey ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-survey', self.params).then((r) => {
        if (r.status === 200) {
          Util.closeModal(self.modalId)
          self.$emit('eventClose')
        }
      }).catch((e) => {
        Util.fnError(e, self)
      })
    },
  }
})