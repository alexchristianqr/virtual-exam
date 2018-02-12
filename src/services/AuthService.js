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



export default AUTH_SERVICE;