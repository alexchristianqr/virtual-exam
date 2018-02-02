import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import SelectProject from '../components/SelectProject';
import ListExams from '../components/ListExams';
import VueLocalStorage from 'vue-local-storage';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/project',
            name: 'project',
            component: SelectProject,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/list-exams',
            name: 'list-exams',
            component: ListExams,
            meta: {
                requiresAuth: true
            }
        },
    ],
});

router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !VueLocalStorage.get("auth").authenticate) {
        next('/login');
    } else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (to.path != '/login') {
//         if (requiresAuth && VueLocalStorage.get("auth").authenticate) {
//             console.log('There is a token, resume. (' + to.path + ')');
//             next();
//         } else {
//             console.log('There is no token, redirect to login. (' + to.path + ')');
//             next('/login');
//         }
//     } else {
//
//         // next(VueLocalStorage.get("auth") !== undefined ? !VueLocalStorage.get("auth").authenticate : {
//         //     path: '/login',
//         //     query: {
//         //         redirect: to.name
//         //     }
//         // });
//         console.log(VueLocalStorage.get("auth"));
//         if (VueLocalStorage.get("auth").authenticate) {
//             // next(to.path);
//             console.log('You\'re on the login page');
//             next({redirect: to.path}); // This is where it should have been
//         } else {
//             next('/login');
//         }
//     }
//     // next(); - This is in the wrong place
// });


export default router;