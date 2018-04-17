import Vue       from 'vue'
import * as Vuex from 'vuex'
import Storage   from 'vue-local-storage'
import Axios     from 'axios'
import Env       from '../env'
import Util      from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    doLogin ({commit}, {self}) {
      Axios.post(Env.API + '/login', self.params).then((r) => {
        if (r.status === 200) {
          self.dataNotify = {}
          Util.setCookie('cookie_data_auth', r.data, 1)
          this.dispatch('validateIfExist', {self: self})
        }
      }).catch((e) => {
        self.dataNotify = e.response
        self.dataNotify.classAlert = 'alert alert-dark alert-dismissible fade show mb-0 border-0 '
        self.dataNotify.style = 'border-radius:0'
        self.params.username = ''
        self.params.password = ''
        self.$refs.inputUsername.focus()
      }).finally(() => {
        self.loading = false
      })
    },
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
          Util.setCookie('cookie_data_auth', new_data_auth, 1)
          this.dispatch('validateIfExist', {self:{self, new_data_auth: new_data_auth}})
        }
      }).catch((e) => {
        self.dataNotify = e.response
        self.dataNotify.classAlert = 'alert alert-dark alert-dismissible fade show mb-0 border-0 '
        self.dataNotify.style = 'border-radius:0'
        self.params.username = ''
        self.params.password = ''
        self.$refs.inputUsername.focus()
      }).finally(() => {
        self.loading = false
      })
    },
    doLogout ({commit}, {self}) {
      Storage.remove('data_auth')
      self.$router.replace('/login')
    },
    validateIfExist ({commit}, {self}) {
      Axios.post(Env.API + '/if-exist-user', self.new_data_auth).then((r) => {
        switch (r.status) {
          case 201:
            Util.setCookie('cookie_data_auth', r.data, 1)
            Storage.set('data_auth', Util.getCookie('cookie_data_auth'))
            self.self.$router.push('/project')
            break
          default://200
            Util.setCookie('cookie_data_auth', r.data, 1)
            if (Util.getCookie('cookie_data_auth').project.id === 1) {
              self.self.$router.replace('/project')
            } else {
              Storage.set('data_auth', Util.getCookie('cookie_data_auth'))
              self.self.$router.replace('/themes')
            }
            break
        }
      }).catch((e) => {
        console.error(e)
      })
    },
  },
})