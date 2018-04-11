<template>
    <div>
        <logo/>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header bg-light">
                <span class="card-title">Sign In</span>
            </div>
            <div v-show="Object.keys(dataNotify).length > 0" class="card-header p-0 mb-0">
                <notify v-show="Object.keys(dataNotify).length > 0" :dataNotify="dataNotify" @eventClose="eventClose"/>
            </div>
            <div class="card-body">
                <form @submit.prevent="doLogin()">
                    <div class="form-group">
                        <label>Username</label>
                        <div class="input-group mb-1">
                            <input v-model="params.username" name="username" class="form-control" type="text"
                                   placeholder="Enter username" title="Registrar" required>
                            <div class="input-group-append">
                                <span class="input-group-text bg-white">@sapia.com.pe</span>
                            </div>
                        </div>
                        <span v-if="errors.email !== '' " class="help-block"><small><strong>{{errors.email}}</strong></small></span>
                        <span v-if="errors.login" class="help-block"><small><strong>{{errors.login}}</strong></small></span>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="params.password" name="password" class="form-control mb-1" type="password"
                               placeholder="Password" required>
                        <span v-if="errors.password !== '' " class="help-block"><small><strong>{{errors.password}}</strong></small></span>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label"><input name="rememberme" class="form-check-input"
                                                                   type="checkbox">Remember Password</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-secondary btn-block">Log In</button>
                </form>
                <div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <div class="text-left text-nowrap">
                                <a class="small text-muted" href="#">Register an Account</a>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-right text-nowrap">
                                <a class="small text-muted" href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import SERVICE from '../api/ApiService'
  import Logo    from './layouts/Logo'
  import Notify  from './layouts/Notify'

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
        password: 'secret',
      },
      errors: {
        email: '',
        password: '',
      },
    }),
    methods: {
      doLogin() {
        SERVICE.dispatch('doLogin', {self: this})
      },
      eventClose(){
        this.dataNotify = {}
      }
    },
  }
</script>

<style scoped>

</style>