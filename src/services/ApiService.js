/**
 * Created by aquispe on 10/02/2018.
 **/
import Vue from 'vue';
import * as Vuex from "vuex";
import VueLocalStorage from 'vue-local-storage';
import Axios from 'axios';
import ENV from "../Env";

Vue.use(Vuex, VueLocalStorage);
// let intent = null;
const API_SERVICE = new Vuex.Store({
    state: {
        intent:null
    },
    mutations: {},
    actions: {
        //Login
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
            ENV.doValidation(self);
        },
        doLogout({commit}, {self}) {
            VueLocalStorage.set("auth", {authenticate: false});
            ENV.doAuth(self);
        },
        //Projects
        loadProjects({commit}, {self}) {
            Axios.get(ENV.API + "/proyects")
                .then((r) => {
                    console.log(r.data);
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
        //Themes
        loadThemes({commit}, {self}) {
            if(this.state.intent != null){
                window.clearInterval(this.state.intent);
            }
            Axios.get(ENV.API + "/themes", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "loadThemes";
                    ENV.fnError(e,self,this);
                });
        },
        loadExam({commit}, {self}) {
            if(this.state.intent != null){
                window.clearInterval(this.state.intent);
            }
            Axios.get(ENV.API + "/exam/" + self.theme_id)
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "loadExam";
                    ENV.fnError(e,self,this);
                });
        },
        loadExamSolution({commit}, {self}) {
            Axios.get(ENV.API + "/exam-solution")
                .then((r) => {
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
        createTheme({commit}, {self}) {
            Axios.post(ENV.API + "/create-theme", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.$router.replace("/themes");
                    }
                })
                .catch((e) => {
                    ENV.fnError(e, self);
                });
        },
        updateTheme({commit}, {self}) {
            Axios.put(ENV.API + "/update-theme", {params: {name: "Java desde Cero"}})
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
        updateUserSurveyTheme({commit}, {self}) {
            Axios.put(ENV.API + "/update-user-survey-theme", {status: 'D', id: 1})
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                        self.$router.replace("/themes");
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
        getSurvey({commit}, {self}) {
            Axios.get(ENV.API + "/get-survey")
                .then((r) => {
                    if (r.status === 200) {
                        self.dataSurvey = r.data;
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        }
    }
});
export default API_SERVICE;
