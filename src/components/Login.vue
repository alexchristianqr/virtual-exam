<template>
    <section>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">
                <b>Sign In</b>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label>Email</label>
                        <div class="input-group mb-1">
                            <input name="email" class="form-control" type="text" placeholder="Enter email"
                                   title="Registrar" value="">
                            <div class="input-group-append">
                                <span class="input-group-text">@sapia.com.pe</span>
                            </div>
                        </div>
                        <span v-if="false" class="help-block"><small><strong>Error in email</strong></small></span>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input name="password" class="form-control mb-1" type="password" placeholder="Password">
                        <span v-if="false" class="help-block"><small><strong>Error in password</strong></small></span>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label"><input name="rememberme" class="form-check-input" type="checkbox">Remember Password</label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" @click="doLogin()">Log In</button>
                    <!--<router-link class="btn btn-primary btn-block" :to="{name:'project'}" @click="doLogin()"><span>Log In</span>-->
                    <!--</router-link>-->
                </form>
                <div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <div class="text-left text-nowrap">
                                <a class="small" href="">Register an Account</a>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-right text-nowrap">
                                <a class="small" href="">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ADService from '../services/ADService'

    export default {
        name: "login",
        data: () => ({
            loading: false,
            data: []
        }),
        methods: {
            doLogin() {
                ADService.dispatch("validate",{self:this});
            }
        }
    }
</script>

<style scoped>

</style>