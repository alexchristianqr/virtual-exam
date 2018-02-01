/**
 * Created by aquispe on 01/02/2018.
 **/

import Vue from 'vue';
import * as Vuex from "vuex";
import AUTH from "./Auth";

Vue.use(Vuex);


const ADSERVICE = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        doLogin({commit}, {self}) {
            self.errors.email = "";
            self.errors.password = "";
            self.errors.login = "";
            self.validate = null;

            if (self.params.email === '') {
                self.errors.email = "El campo email no puede estar vacio!";
            }
            if (self.params.password === '') {
                self.errors.password = "El campo password no puede estar vacio!";
            }
            doValidation(self);
        },
        doLogout({commit},{self}){
            AUTH.authenticate = false;
            doAuth(self);
        }
    }
});
function doAuth(self){
    console.log(AUTH);
    if(AUTH.authenticate){
        self.$router.replace('/project');
    }else{
        self.$router.replace('/login');
    }
}
function doValidation(self){
    if (self.params.email !== '' && self.params.password !== '') {
        if (self.params.email === "aquisper@sapia.com.pe" && self.params.password === "72482060" && AUTH.authenticate === false) {
            AUTH.authenticate = true;
            self.validate = null;
            doAuth(self);
        } else {
            AUTH.authenticate = false;
            self.validate = true;
            self.errors.login = "El campo email o contraseña no es correcto!";
            doAuth(self);

        }
    }
}


export default ADSERVICE;