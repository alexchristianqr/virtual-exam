/**
 * Created by aquispe on 01/02/2018.
 **/

import Vue from 'vue';
import * as Vuex from "vuex";
import VueLocalStorage from 'vue-local-storage';
import Axios from 'axios';
import ENV from "../Env";
import Util from "../Util";

Vue.use(Vuex, VueLocalStorage);

const AUTH_SERVICE = new Vuex.Store({
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
        },
        loadProjects({commit}, {self}) {
            Axios.get(ENV.API + "/proyects")
                .then((r) => {
                    console.log(r.data);
                    if (r.status === 200){
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    console.error(e);
                    Util.fnError(e);
                });
        },
    }
});

function doValidation(self) {
    if (self.params.email !== '' && self.params.password !== '') {
        if (self.params.email === "aquisper@sapia.com.pe" && self.params.password === "72482060" && VueLocalStorage.get("auth").authenticate === false) {
            VueLocalStorage.set("auth", {authenticate: true, id: 2});
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
    if (VueLocalStorage.get("auth").authenticate) {
        self.$router.replace('/project');
    } else {
        self.$router.replace('/login');
    }
}

export default AUTH_SERVICE;