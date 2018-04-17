import Vue       from 'vue'
import Storage   from 'vue-local-storage'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'


Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getProjects({commit}, {self}) {
      Axios.get(Env.API + '/all-project').then(r => {
        if (r.status === 200) {
          self.selectedProject = r.data[0].id
          self.dataProject = r.data
        }
      }).catch(e => {
        console.error(e.response)
      })
    },
    updateProject({commit}, {self}) {
      Axios.put(Env.API + '/update-project/' + Util.getCookie('cookie_data_auth').id, self.params).then(r => {
        if (r.status === 200) {
          const objAuth = Util.getCookie('cookie_data_auth')
          objAuth.project.id = self.newProject.id
          objAuth.project.name = self.newProject.name
          Storage.set('data_auth', objAuth)
          self.$router.replace('/themes')
        }
      }).catch(e => {
        console.error(e.response)
      })
    },
  },
})