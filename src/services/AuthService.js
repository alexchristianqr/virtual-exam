import Vue          from 'vue'
import * as Vuex    from 'vuex'
import Storage      from 'vue-local-storage'
import Axios        from 'axios'
import Env          from '../env'
import Util         from '../util'
import JsonDataAuth from '../api/file_data_auth.json'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {

    /*doLogin ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/login', self.params).then((r) => {
        if (r.status === 200) {
          self.dataNotify = {}
          Storage.set('s-u-$4p14', r.data)
          Util.setCookie('co-stg-a-u-au', r.data, 1)
          this.dispatch('validateIfExist',
            {self: {self, new_data_auth: r.data}})
          self.loading = false
        }
      }).catch((e) => {
        self.dataNotify = e.response
        self.dataNotify.classAlert = 'alert alert-dark alert-dismissible fade show mb-0 border-0 '
        self.dataNotify.style = 'border-radius:0'
        self.params.username = ''
        self.params.password = ''
        self.$refs.inputUsername.focus()
        self.loading = false
      })
    },*/

    doLoginAD ({commit}, {self}) {
      Axios.post(Env.API_NODEJS + '/api/exam/authenticate', self.params).then((r) => {
        if (r.status === 200) {
          const new_data_auth = {
            email: null,
            id: null,
            name: r.data.name_complet,
            project: {id: null, name: null, status: null},
            role: {id: null, name: null, status: null},
            status: null,
            phone: r.data.phone_number,
            username: r.data.username,
          }
          self.dataNotify = {}
          Storage.set('s-u-$4p14', new_data_auth)
          Util.setCookie('co-stg-a-u-au', new_data_auth, 1)
          this.dispatch('validateIfExist', {self: {self, new_data_auth: new_data_auth}})
        }
      }).catch((e) => {
        if (e.response != undefined) {
          self.dataNotify = e.response
          self.dataNotify.classAlert = 'alert alert-danger alert-dismissible fade show mb-0 border-0 '
          self.dataNotify.style = 'border-radius:0'
          self.params.username = ''
          self.params.password = ''
          self.$refs.inputUsername.focus()
          self.loading.btn = false
        } else {
          self.modal.show = true
          Util.openModal(document, self.modalId)
        }
      })
    },
    validateIfExist ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/if-exist-user', self.new_data_auth).then((r) => {
        switch (r.status) {
          case 201:
            Util.setCookie('co-stg-a-u-au', r.data, 1)
            Storage.set('s-u-$4p14', Util.getCookie('co-stg-a-u-au'))
            self.self.$router.push('/project')
            self.self.loading.btn = false
            break
          default://200
            Util.setCookie('co-stg-a-u-au', r.data, 1)
            if (Util.getCookie('co-stg-a-u-au').project.id === 1) {
              self.self.$router.replace('/project')
            } else {
              //crear storage s-u-$4p14
              Storage.set('s-u-$4p14', Util.getCookie('co-stg-a-u-au'))
              //crear cookie de configuracion de toda la app
              Util.setCookie('co-f-stg-a-u-au', Util.getCookie('co-stg-a-u-au'), 1)
              self.self.$router.replace('/themes')
              self.self.loading.btn = false
            }
            break
        }
      }).catch((e) => {
        console.error(e)
        self.self.modal.show = true
        Util.openModal(document, self.self.modalId)
      })
    },
    doLogout ({commit}, {self}) {
      JsonDataAuth.json = {}
      Storage.remove('s-u-$4p14')
      self.$router.replace('/login')
    },
    getConfig ({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/u-object-rest-apis-application', {username: Util.getCookie('co-f-stg-a-u-au').username}).then((r) => {
        if (r.status === 200) {
          Object.assign(JsonDataAuth.json, r.data)
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    getUsers ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/get-users').then((r) => {
        if (r.status === 200) {
          self.dataUsers = r.data
        }
      }).catch((e) => {
        console.error(e)
      })
    },
    allUser ({commit}, {self}) {
      Axios.get(Env.API_LARAVEL + '/all-user', {params: self.params}).
      then((r) => {
        if (r.status === 200) {
          self.dataUsers = r.data
        }
      }).
      catch((e) => {
        console.error(e)
      })
    },
  },
})