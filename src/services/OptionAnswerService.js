import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'

Vue.use(Vuex)

export default Vuex.Store({
  actions: {
    getOptionsAnswers({commit}, {self}) {
      Axios.get(Env.API + '/get-options-anwers').then((r) => {
        if(r.status === 200){
          self.dataOptionAnswer = r.data
        }
      }).catch((e) => {})
    },
  },
})


