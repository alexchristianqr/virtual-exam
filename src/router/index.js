import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import SelectProject from '../components/SelectProject';
import ListExams from '../components/ListExams';

Vue.use(Router);

const router = new Router({
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

// router.beforeEach((to, from, next) => {
//     console.log(to);
//     if(to.path !== '/login') {
//         if(checkToken()) {
//             console.error('There is a token, resume. (' + to.path + ')');
//             next();
//         } else {
//             console.error('There is no token, redirect to login. (' + to.path + ')');
//             next('login');
//         }
//     } else {
//         console.log('You\'re on the login page');
//         next(); // This is where it should have been
//     }
//     // next(); - This is in the wrong place
// });


// function checkToken() {
//     return true;
// }

export default router;