import Vue from 'vue';
import * as Vuex from "vuex";
import VueLocalStorage from 'vue-local-storage';
import Axios from 'axios';
import ENV from "./ENV";

Vue.use(Vuex, VueLocalStorage);

const EXAM_SERVICE = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        fetchExams({commit}, {self}) {
            Axios.get(ENV.API + "/exams/listExamsUsers/" + VueLocalStorage.get("auth").id)
                .then((r) => {
                    console.log(r);
                    if (r.status === 200) {
                        self.data = r.data;
                    }
                })
                .catch((e) => {
                    console.error(e);
                    // switch (e.response.status) {
                    //     case 412:// Exception Laravel
                    //         console.error(e.response.data);
                    //         break;
                    //     default:// Request Laravel 401,422
                    //         console.error(e.response.data);
                    //         break;
                    // }
                });
        },
    }
});
export default EXAM_SERVICE;