import Vue from 'vue';
import Router from 'vue-router';
// import Login from '../components/Login';
// import SelectProject from '../components/SelectProject';
// import ListExams from '../components/ListExams';
// import Exam from '../components/Exam';
import Themes from '../components/Themes';
import Exam from '../components/Exam';
import VueLocalStorage from 'vue-local-storage';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '*',
        //     redirect: '/login'
        // },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: Login
        // },
        // {
        //     path: '/project',
        //     name: 'project',
        //     component: SelectProject,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        //
        // {
        //     path: '/list-exams',
        //     name: 'list-exams',
        //     component: ListExams,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        // {
        //     path: '/exam',
        //     name: 'exam',
        //     component: Exam,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },





        {
            path: '/themes',
            name: 'themes',
            component: Themes,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: '/exam/:theme_id',
            name: 'exam',
            component: Exam,
            // meta: {
            //     requiresAuth: true
            // }
        },
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         VueLocalStorage.set("auth", {authenticate: false});
//     }
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (requiresAuth && !VueLocalStorage.get("auth").authenticate) {
//         next('/login');
//     } else {
//         next();
//     }
// });

export default router;