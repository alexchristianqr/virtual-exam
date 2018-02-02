/**
 * Created by aquispe on 01/02/2018.
 **/

import Vue from 'vue';
import * as Vuex from "vuex";
import AUTH from "./Auth";
import VueLocalStorage from 'vue-local-storage';

Vue.use(Vuex, VueLocalStorage);

const ADSERVICE = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        doLogin({commit}, {self}) {
            self.errors.email = "";
            self.errors.password = "";
            self.errors.login = "";
            self.validate = null;
            VueLocalStorage.set("auth", {authenticate: false});
            if (self.params.email === '') {
                self.errors.email = "El campo email no puede estar vacio!";
            }
            if (self.params.password === '') {
                self.errors.password = "El campo password no puede estar vacio!";
            }
            doValidation(self);
        },
        doLogout({commit}, {self}) {
            VueLocalStorage.set("auth", {authenticate: false});
            doAuth(self);
        }
    }
});

function doValidation(self) {
    if (self.params.email !== '' && self.params.password !== '') {
        if (self.params.email === "aquisper@sapia.com.pe" && self.params.password === "72482060" && VueLocalStorage.get("auth").authenticate === false) {
            VueLocalStorage.set("auth", {authenticate: true});
            self.validate = null;
            doAuth(self);
        } else {
            VueLocalStorage.set("auth", {authenticate: false});
            self.validate = true;
            self.errors.login = "El campo email o contraseña no es correcto!";
            self.params.password = "";
            doAuth(self);
        }
    }
}

function doAuth(self) {
    console.log(VueLocalStorage.get("auth").authenticate);
    if (VueLocalStorage.get("auth").authenticate) {
        self.$router.replace('/project');
    } else {
        self.$router.replace('/login');
    }
}

export default ADSERVICE;