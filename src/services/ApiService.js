/**
 * Created by aquispe on 10/02/2018.
 **/
import Vue from 'vue';
import * as Vuex from "vuex";
import VueLocalStorage from 'vue-local-storage';
import Axios from 'axios';
import ENV from "./ENV";

Vue.use(Vuex, VueLocalStorage);

const API_SERVICE = new Vuex.Store({
    state: {
        intent: null
    },
    actions: {
        //Auth
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
            this.doAuth(self);
        },
        doValidation(self) {
            if (self.params.email !== '' && self.params.password !== '') {
                if (self.params.email === "aquisper@sapia.com.pe" && self.params.password === "72482060" && VueLocalStorage.get("auth").authenticate === false) {
                    VueLocalStorage.set("auth", {authenticate: true, id: 2});
                    self.validate = null;
                    this.doAuth(self);
                } else {
                    VueLocalStorage.set("auth", {authenticate: false});
                    self.validate = true;
                    self.errors.login = "El campo email o contraseña no es correcto!";
                    self.params.password = "";
                    this.doAuth(self);
                }
            }
        },
        doAuth(self) {
            if (VueLocalStorage.get("auth").authenticate) {
                self.$router.replace('/project');
            } else {
                self.$router.replace('/login');
            }
        },
        //Project
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
        //Theme
        allThemes({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/all-themes", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "loadThemes";
                    ENV.fnError(e, self, this);
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
            Axios.put(ENV.API + "/update-theme", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
        //Exam
        exam({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/exam/" + self.theme_id)
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "loadExam";
                    ENV.fnError(e, self, this);
                });
        },
        createExam({commit}, {self}) {
            Axios.post(ENV.API + "/create-theme", self.params)
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
            Axios.put(ENV.API + "/update-user-survey-theme", self.params)
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
        //Survey
        allSurvey({commit}, {self}) {
            Axios.get(ENV.API + "/all-survey")
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
