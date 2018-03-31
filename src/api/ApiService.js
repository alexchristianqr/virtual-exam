/**
 * Created by aquispe on 10/02/2018.
 **/
import Vue from 'vue';
import * as Vuex from 'vuex';
import Storage from 'vue-local-storage';
import Axios from 'axios';
import ENV from '../env';
import Util from '../util';

Vue.use(Vuex,Storage);
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const SERVICE = new Vuex.Store({
    state: {
        intent: null
    },
    actions: {
        //Auth
        doLogin({commit}, {self}) {
            Axios.post(ENV.API + "/login", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        Storage.set("data_auth",r.data[0]);
                        window.location = "/themes";
                        // self.$router.replace("/themes");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    // ENV.fnErrorAuth(e, self);
                });
        },
        doLogout({commit}, {self}) {
            Storage.remove("data_auth");
            self.$router.replace("/login")
            // this.doAuth(self);
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
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
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
                    Util.fnError(e, self, this);
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
                    Util.fnError(e, self);
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
                    Util.fnError(e, self);
                });
        },
        //Exam
        loadExam({commit}, {self}) {
            if (this.state.intent != null) window.clearInterval(this.state.intent);
            Axios.get(ENV.API + "/load-exam", {params: {theme_id: self.theme_id}})
                .then((r) => {
                    if (r.status === 200) {
                        self.loadingTable = false;
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    self.method = "loadExam";
                    Util.fnError(e, self, this);
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
                    Util.fnError(e, self);
                });
        },
        updateUserSurveyTheme({commit}, {self}) {
            Axios.put(ENV.API + "/update-exam", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.$router.replace("/themes");
                    }
                })
                .catch((e) => {
                    Util.fnError(e, self);
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
                    Util.fnError(e, self, this);
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
                    Util.fnError(e, self, this);
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
                    Util.fnError(e, self, this);
                });
        },
        createQuestion({commit}, {self}) {
            Axios.post(ENV.API + "/create-question", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.$router.replace("/questions");
                    }
                })
                .catch((e) => {
                    Util.fnError(e, self);
                });
        },
        updateQuestion({commit}, {self}) {
            Axios.put(ENV.API + "/update-question/" + self.question_id, self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.$router.replace("/questions");
                    }
                })
                .catch((e) => {
                    Util.fnError(e, self);
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
                    self.method = "allAnswer";
                    Util.fnError(e, self, this);
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
                    self.method = "allOptionAnswer";
                    Util.fnError(e, self, this);
                });
        },
        createOptionAnswer({commit}, {self}) {
            Axios.post(ENV.API + "/create-option-answer", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.$router.replace("/options-answers");
                    }
                })
                .catch((e) => {
                    Util.fnError(e, self);
                });
        },
        updateOptionAnswer({commit}, {self}) {
            Axios.put(ENV.API + "/update-option-answer", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.$router.replace("/options-answers");
                    }
                })
                .catch((e) => {
                    Util.fnError(e, self);
                });
        },
    }
});

export default SERVICE;
