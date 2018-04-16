import Vue from 'vue'
import * as Vuex from 'vuex'
import Storage from 'vue-local-storage'
import Axios from 'axios'
import Env from '../env'
import Util from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    doLogin ({commit}, {self}) {
      // Storage.set('data_auth', {role: {id:5,name: 'guest'}})
      Axios.post(Env.API + '/login', self.params).then((r) => {
        if (r.status === 200) {
          self.dataNotify = {}
          Util.setCookie('cookie_data_auth',r.data,1)
          // console.log(Util.getCookie('cookie_data_auth'))
          // Storage.set('data_auth', r.data)
          this.dispatch('validateIfExist',{self:self})
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
      Axios.post(Env.API + '/if-exist-user',self.params).then((r) => {
        switch (r.status){
          case 201:
            Storage.set("data_auth",r.data)
            self.$router.push("/project")
            break
          default://200
            // Storage.set('data_auth', r.data)
            //  (Storage.get('data_auth').project.id === 1) ? self.$router.replace('/project') : self.$router.replace('/themes')
             if(Util.getCookie('cookie_data_auth').project.id === 1) {
               self.$router.replace('/project')
             } else{
               Storage.set("data_auth",Util.getCookie('cookie_data_auth'))
               self.$router.replace('/themes')
             }
            break
        }
      }).catch(e => console.error(e))
    },
  },
})