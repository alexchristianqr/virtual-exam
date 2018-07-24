<template>
    <div>
        <logo/>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header bg-light">
                <div class="row">
                    <div class="col-9 my-auto">
                        <span class="card-title my-auto">Inicio de Sesion</span>
                    </div>
                    <div class="col-3 text-right">
                        <button class="btn btn-light" :disabled="loading.btn ? true : false" title="Click! para autogenerar token manualmente." @click.prevent="beforeGenereateToken(1)"><i class="fa fa-refresh text-secondary"></i></button>
                    </div>
                </div>
            </div>
            <div v-show="Object.keys(dataNotify).length > 0" class="card-header p-0 mb-0">
                <notify v-show="Object.keys(dataNotify).length > 0" :dataNotify="dataNotify" @eventClose="eventClose"/>
            </div>
            <div class="card-body">
                <form @submit.prevent="doLogin()" autocomplete="off">
                    <div class="form-group">
                        <label>Nombre Usuario</label>
                        <div class="input-group mb-1">
                            <input v-model="params.username" ref="inputUsername" name="username" class="form-control"
                                   type="text" placeholder="username" title="Registrar" required autofocus>
                            <div class="input-group-append">
                                <span class="input-group-text bg-white">@sapia.com.pe</span>
                            </div>
                        </div>
                        <span v-if="errors.email !== '' " class="help-block"><small><strong>{{errors.email}}</strong></small></span>
                        <span v-if="errors.login" class="help-block"><small><strong>{{errors.login}}</strong></small></span>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input v-model="params.password" ref="inputPassword" name="password" class="form-control mb-1"
                               type="password" placeholder="password" required>
                        <span v-if="errors.password !== '' " class="help-block"><small><strong>{{errors.password}}</strong></small></span>
                    </div>
                    <template v-if="loading.btn">
                        <button type="submit" class="btn btn-secondary btn-block" disabled>
                            <span>entrando...</span>
                        </button>
                    </template>
                    <template v-else>
                        <button type="submit" class="btn btn-secondary btn-block">Entrar</button>
                    </template>
                </form>
            </div>
        </div>

        <modal-error-login v-if="modal.show" :data-props="{loading,params,dataError}"/>

    </div>
</template>

<script>
  import AuthService     from '../../services/AuthService'
  import Logo            from '../layouts/Logo'
  import Notify          from '../layouts/Notify'
  import ModalErrorLogin from '../layouts/ModalErrorLogin'
  import Storage         from 'vue-local-storage'

  export default {
    name: 'Login',
    components: {ModalErrorLogin, Notify, Logo},
    data: () => ({
      loading: {btn: false},
      validate: null,
      modalId: '#modalErrorLogin',
      data: [],
      dataError: '',
      dataNotify: {},
      params: {
        username: '',
        password: '',
      },
      errors: {
        email: '',
        password: '',
      },
      modal: {
        show: true,
      },
      enabledFunction: true,
      countClicks: 0,
      itvlLogin: null,
      intervalBeforeClick: undefined,
    }),
    created () {
      //Al cabo de 1.85 minuto vuelve a re-generar el token
      if (Storage.get('data_token') === null) {
        this.reGenereateToken()
        if(Storage.get('data_token') !== undefined) {
          window.datainterval = setInterval(() => {
            this.reGenereateToken()
          }, 110000)
        }
      } else {
        window.datainterval = setInterval(() => {
          this.reGenereateToken()
        }, 110000)
      }
    },
    methods: {
      beforeGenereateToken(click){
        if(this.enabledFunction){
          this.reGenereateToken(click)
        } else {
          this.stopGenerateToken()
        }
      },
      reGenereateToken (click) {
        let itvlLogin = null
        if(click !== undefined) {
          this.countClicks += parseInt(click)
          console.log(this.countClicks)

          if(this.enabledFunction) {
            if(this.countClicks < 4) {
              AuthService.dispatch('generateToken', {self: this})
            }
          }

          if(this.countClicks >= 3){
            if(itvlLogin == null){
                itvlLogin = setInterval(()=>{
                  this.countClicks = 0;
                  this.enabledFunction = true
                  clearInterval(itvlLogin)
                },10000)
            }
            return this.enabledFunction = false
          } else {
            this.enabledFunction = true
          }

        } else {
          this.countClicks = 0
          AuthService.dispatch('generateToken', {self: this})
        }
      },
      stopGenerateToken(){
        console.error('Usted ah exedido el limite maximo de intentos(3 veces seguidos), intentelo nuevamente dentro de 10 segundos.')
        alert('Usted ah exedido el limite maximo de intentos(3 veces seguidos), intentelo nuevamente dentro de 10 segundos.')
        return false
      },
      doLogin () {
        this.loading.btn = true
        AuthService.dispatch('doLoginAD', {self: this})
      },
      eventClose () {
        this.dataNotify = {}
      },
    },
  }
</script>

<style scoped>

</style>