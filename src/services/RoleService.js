import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Role      from '../role'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    allRole ({commit}, {self}) {
      Axios.get(Env.API + '/all-role').then((r) => {
        if (r.status === 200) {
          let dataRoles = r.data
          dataRoles.forEach((v, k) => {
            if (k != dataRoles.length - 1) {
              Role[v.name] = v.id
              Role['TODOS'][k] = v.id
            } else {
              return false
            }
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
  },
})