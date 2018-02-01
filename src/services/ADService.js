/**
 * Created by aquispe on 01/02/2018.
 **/

import Vue from 'vue';
import Axios from 'axios';
import * as Vuex from "vuex";

Vue.use(Vuex);

const ADSERVICE = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        validate({commit},{self}){
            console.log("validate login");
            self.$router.replace('/project');
        }
    }
});

export default ADSERVICE;