/**
 * Created by aquispe on 10/02/2018.
 **/
import Vue from 'vue';
import * as Vuex from "vuex";
import Storage from 'vue-local-storage';
import Axios from 'axios';
import ENV from "./ENV";

Vue.use(Vuex);

const SERVICE = new Vuex.Store({
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
            Storage.set("auth", {authenticate: false});
            if (self.params.email === '') {
                self.errors.email = "El campo email no puede estar vacio!";
            }
            if (self.params.password === '') {
                self.errors.password = "El campo password no puede estar vacio!";
            }
            ENV.doValidation(self);
        },
        doLogout({commit}, {self}) {
            Storage.set("auth", {authenticate: false});
            this.doAuth(self);
        },
        doValidation(self) {
            if (self.params.email !== '' && self.params.password !== '') {
                if (self.params.email === "aquisper@sapia.com.pe" && self.params.password === "72482060" && Storage.get("auth").authenticate === false) {
                    Storage.set("auth", {authenticate: true, id: 2});
                    self.validate = null;
                    this.doAuth(self);
                } else {
                    Storage.set("auth", {authenticate: false});
                    self.validate = true;
                    self.errors.login = "El campo email o contraseña no es correcto!";
                    self.params.password = "";
                    this.doAuth(self);
                }
            }
        },
        doAuth(self) {
            if (Storage.get("auth").authenticate) {
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
        allTheme({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/all-theme", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.dataTheme = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "allTheme";
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
        loadExam({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/load-exam",{params:{theme_id:self.theme_id}})
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
            Axios.post(ENV.API + "/create-exam", self.params)
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
            Axios.put(ENV.API + "/update-exam", self.params)
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
        allByUserSurvey({commit}, {self}) {
            Axios.get(ENV.API + "/all-by-user-survey", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.dataSurvey = r.data;
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
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
        },
        //Question
        allQuestion({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/all-question", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.dataQuestion = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "allQuestion";
                    ENV.fnError(e, self, this);
                });
        },
        createQuestion({commit}, {self}) {
            Axios.post(ENV.API + "/create-question", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                    }
                })
                .catch((e) => {
                    ENV.fnError(e);
                });
        },
        //Answer
        allAnswer({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/all-answer", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.dataQuestion = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "allQuestion";
                    ENV.fnError(e, self, this);
                });
        },
        //Option Answer
        allOptionAnswer({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/all-option-answer", {params: self.params})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.dataOptionAnswer = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "allQuestion";
                    ENV.fnError(e, self, this);
                });
        },
    }
});

export default SERVICE;
