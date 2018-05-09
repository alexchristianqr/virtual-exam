import Vue       from 'vue'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Role      from '../role'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    allRole ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-role').then((r) => {
        if (r.status === 200) {
          let dataRoles = r.data
          //Recorremos el arreglo de roles desde la base de datos y creamos las constantes en el archivo role.js
          dataRoles.forEach((v, k) => {
            if (k != dataRoles.length) {
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