import Vue                      from 'vue';
import Router                   from 'vue-router';
import Storage                  from 'vue-local-storage';
import Login                    from './components/login/Login';
import Themes                   from './components/theme/Themes';
import CreateUpdateTheme        from './components/theme/CreateUpdateTheme';
import Exam                     from './components/exam/Exam';
import Questions                from './components/question/Questions';
import CreateUpdateQuestion     from './components/question/CreateUpdateQuestion';
import OptionsAnswers           from './components/option_answer/OptionsAnswers';
import CreateUpdateOptionAnswer from './components/option_answer/CreateUpdateOptionAnswer';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
      //Views Unhautorized
        {path: '*', redirect: '/login'},
        {path: '/login', name: 'login', component: Login},
      //Views Authorized
        {path: '/themes', name: 'themes', component: Themes, meta: {requiresAuth: true}},
        {path: '/exam', name: 'exam', component: Exam, meta: {requiresAuth: true}},
        {path: '/create-theme', name: 'create-theme', component: CreateUpdateTheme, meta: {requiresAuth: true}},
        {path: '/questions', name: 'questions', component: Questions, meta: {requiresAuth: true}},
        {path: '/create-question', name: 'create-question', component: CreateUpdateQuestion, meta: {requiresAuth: true}},
        {path: '/edit-question', name: 'edit-question', component: CreateUpdateQuestion, meta: {requiresAuth: true}},
        {path: '/options-answers', name: 'options-answers', component: OptionsAnswers, meta: {requiresAuth: true}},
        {path: '/create-option-answer', name: 'create-option-answer', component: CreateUpdateOptionAnswer, meta: {requiresAuth: true}},
        {path: '/edit-option-answer', name: 'edit-option-answer', component: CreateUpdateOptionAnswer, meta: {requiresAuth: true}}
    ]
});

router.beforeEach((to, from, next) => {
    if(to.path === '/login'){
        Storage.remove("data_auth")
    }
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && Storage.get("data_auth") == null) {
        next('/login');
    } else {
        next();
    }
});

export default router;
