import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import SelectProject from '../components/SelectProject';
import ListExams from '../components/ListExams';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/project',
            name: 'project',
            component: SelectProject
        },
        {
            path: '/list-exams',
            name: 'list-exams',
            component: ListExams
        }
    ]
});