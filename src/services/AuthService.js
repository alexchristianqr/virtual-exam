import Vue from 'vue'
import * as Vuex from 'vuex'
import Storage from 'vue-local-storage'
import Axios from 'axios'
import Env from '../env'
import Util from '../util'

Vue.use(Vuex)

const AUTH_SERVICE = new Vuex.Store({
  actions: {
    login ({commit}, {self}) {
      // Axios.post(Env.endpoint_api_laravel + '/login', self.params)
      //   .then(r => {
      //     if (r.status === 200) {
      //       // if (r.data.status === false) {
      //       //   self.errors = 'Credenciales Invalidas...!!'
      //       // } else {
      //   Storage.set('data_auth', r.data.data)
      //       //   this.dispatch('validateIfExist', {self: {self: self, auth_user: r.data.data}})
      //       // }
      Storage.set('data_auth', {
        name: 'Alex Christian',
        username: 'aquisper',
        email: 'aquisper@sapia.com.pe',
        isAdmin: true,
        id: 2,
        project: {id: null, name: null,}
      })
      // Storage.set('data_auth', {
      //   name: 'Luz Velarde',
      //   username: 'lvelarde',
      //   email: 'lvelarde@sapia.com.pe',
      //   isAdmin: false,
      //   id: 5,
      //   project: {id: null, name: null,}
      // })
      self.$router.push('/project')

      //     }
      //   })
      //   .catch(e => Util.fnError(e))
    },
    doLogin ({commit}, {self}) {
      Storage.set('data_auth', undefined)
      self.validate = null
      self.errors = ''
      if (self.params.username ===
        '') return self.errors = 'El campo username no puede estar vacio!'
      if (self.params.password ===
        '') return self.errors = 'El campo password no puede estar vacio!'

      Axios.post(Env.endpoint_auth + '/api/authenticate/examenes', self.params).then(r => {
        if (r.status === 200) {
          if (r.data.status === false) {
            self.errors = 'Credenciales Invalidas...!!'
          } else {
            Storage.set('data_auth', r.data.data)
            this.dispatch('validateIfExist',
              {self: {self: self, auth_user: r.data.data}})
          }
        }
      }).catch(e => Util.fnError(e))
    },
    doLogout ({commit}, {self}) {
      Storage.set('data_auth', undefined)
      doAuth(self)
    },
    validateIfExist ({commit}, {self}) {
      Axios.get(Env.endpoint_api_laravel + '/user/validateIfExist',
        self.auth_user).then(r => {
        if (r.status === 200) {
          //validar hacia donde navegar o listar proyectos o listar examenes
          Storage.set('data_auth', r.data[0])
          if (r.data[0].proyect_id.id === 1) self.self.$router.replace(
            '/project')
          else self.self.$router.replace('/exams')
        }

        if (r.status === 201) {
          Storage.set('data_auth', r.data[0])
          self.self.$router.replace('/project')
        }
      }).catch(e => Util.fnError(e))
    },
  },
})

function doAuth (self) {
  if (Storage.get('data_auth') != undefined) self.$router.replace('/project')
  else self.$router.replace('/login')
}

export default AUTH_SERVICE