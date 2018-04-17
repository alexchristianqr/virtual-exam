<template>
    <div>
        <logo/>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header bg-light">
                <span class="card-title">Inicio de Sesion</span>
            </div>
            <div v-show="Object.keys(dataNotify).length > 0" class="card-header p-0 mb-0">
                <notify v-show="Object.keys(dataNotify).length > 0" :dataNotify="dataNotify" @eventClose="eventClose"/>
            </div>
            <div class="card-body">
                <form @submit.prevent="doLogin()">
                    <div class="form-group">
                        <label>Nombre Usuario</label>
                        <div class="input-group mb-1">
                            <input v-model="params.username" ref="inputUsername" name="username" class="form-control" type="text"
                                   placeholder="username" title="Registrar" required>
                            <div class="input-group-append">
                                <span class="input-group-text bg-white">@sapia.com.pe</span>
                            </div>
                        </div>
                        <span v-if="errors.email !== '' " class="help-block"><small><strong>{{errors.email}}</strong></small></span>
                        <span v-if="errors.login" class="help-block"><small><strong>{{errors.login}}</strong></small></span>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input v-model="params.password" ref="inputPassword" name="password" class="form-control mb-1" type="password"
                               placeholder="password" required>
                        <span v-if="errors.password !== '' " class="help-block"><small><strong>{{errors.password}}</strong></small></span>
                    </div>
                    <template v-if="!loading">
                        <button type="submit" class="btn btn-secondary btn-block">Entrar</button>
                    </template>
                    <template v-else>
                        <button type="submit" class="btn btn-secondary btn-block" disabled>
                            <span>entrando...</span>
                        </button>
                    </template>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import AuthService from '../../services/AuthService'
  import Logo    from '../layouts/Logo'
  import Notify  from '../layouts/Notify'

  export default {
    name: 'Login',
    components: {Notify, Logo},
    data: () => ({
      loading: false,
      validate: null,
      data: [],
      dataNotify:{},
      params: {
        username: 'aquisper',
        password: 'sapia.2018',
      },
      errors: {
        email: '',
        password: '',
      },
    }),
    methods: {
      doLogin() {
        this.loading = true;
        // AuthService.dispatch('doLogin', {self: this})
        AuthService.dispatch('doLoginAD', {self: this})
      },
      eventClose(){
        this.dataNotify = {}
      }
    },
  }
</script>

<style scoped>

</style>