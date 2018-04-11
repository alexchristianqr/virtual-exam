import Vue       from 'vue'
import Storage   from 'vue-local-storage'
import * as Vuex from 'vuex'
import Axios     from 'axios'
import Env       from '../env'

Vue.use(Vuex)

const PROJECT_SERVICE = new Vuex.Store({
  actions: {
    getProjects({commit}, {self}) {
      Axios.get(Env.endpoint_api_laravel + '/get-projects').then(r => {
        if (r.status === 200) {
          self.selectedProject = r.data[0].id
          self.dataProject = r.data
        }
      }).catch(e => {
        console.error(e.response)
      })
    },
    updateProject({commit}, {self}) {
      Axios.put(Env.endpoint_api_laravel + '/update-project/' +
        Storage.get('data_auth').id, self.params).then(r => {
        if (r.status === 200) {
          const objAuth = Storage.get('data_auth')
          objAuth.project.id = self.newProject.id
          objAuth.project.name = self.newProject.name
          Storage.set('data_auth', objAuth)
          // self.$router.replace('/exams')
          window.location = '/themes'
        }
      }).catch(e => {
        console.error(e.response)
      })
    },
  },
})

export default PROJECT_SERVICE