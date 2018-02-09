import Vue from 'vue';
import * as Vuex from "vuex";
import VueLocalStorage from 'vue-local-storage';
import Axios from 'axios';
import ENV from "../Env";
import Util from "../Util";

Vue.use(Vuex, VueLocalStorage);

const EXAM_SERVICE = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        loadExams2({commit}, {self}) {
            Axios.get(ENV.API + "/exams/listExamsUsers/" + VueLocalStorage.get("auth").id)
                .then((r) => {
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
                });
        },
        loadExam2({commit}, {self}) {
            Axios.get(ENV.API + "/exams/takeExam/1")
                .then((r) => {
                    if (r.status === 200) {
                        self.data_exam = r.data;
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
                });
        },
        saveExam2({commit}, {self}) {
            Axios.post(ENV.API + "/exams/recordResponseExam", {params: self.params.rptas})
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r)
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
                });
        },
        checkedRequest2({commit}, {self}) {
            Axios.put(ENV.API + "/exams/listExamsUsers/" + VueLocalStorage.get("auth").id, {
                params: {
                    user_id: u_id,
                    exam_id: e_id,
                    question_id: q_id,
                    answer_id: a_id
                }
            })
                .then((r) => {
                    if (r.status === 200) {
                        self.data_exam = r.data;
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
                });
        },
        //Survey CRUD
        loadThemes({commit}, {self}) {
            Axios.get(ENV.API + "/themes")
                .then((r) => {
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
                });
        },
        loadExam({commit}, {self}) {
            Axios.get(ENV.API + "/exam/" + self.theme_id)
                .then((r) => {
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
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
                    Util.fnError(e);
                });
        },
        createTheme({commit}, {self}) {
            let params={name:"Taller de Scrum Pro",status:"I"};
            Axios.post(ENV.API + "/create-theme",params)
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                    }
                })
                .catch((e) => {
                    Util.fnError(e);
                });

        },
        updateTheme({commit}, {self}) {
            alert("slex llego");
            Axios.put(ENV.API + "/store-theme",{params:{name:"Java desde Cero"}})
                .then((r) => {
                    console.log(r);
                    if (r.status === 200) {
                    }
                })
                .catch((e) => {
                    console.log(e);
                    // Util.fnError(e);
                });
        },
    }
});
export default EXAM_SERVICE;