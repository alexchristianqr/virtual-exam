import Vue from 'vue';
import Router from 'vue-router';
import Storage from 'vue-local-storage';
import Login from './components/Login';
import Themes from './components/Themes';
import CreateUpdateTheme from './components/CreateUpdateTheme';
import Exam from './components/Exam';
import Questions from './components/Questions';
import CreateUpdateQuestion from './components/CreateUpdateQuestion';
import OptionsAnswers from './components/OptionsAnswers';
import CreateUpdateOptionAnswer from './components/CreateUpdateOptionAnswer';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: '*', redirect: '/login'},
        {path: '/login', name: 'login', component: Login},

        {path: '/themes', name: 'themes', component: Themes, meta: {requiresAuth: true}},
        {path: '/exam', name: 'exam', component: Exam, meta: {requiresAuth: true}},
        {path: '/create-theme', name: 'create-theme', component: CreateUpdateTheme, meta: {requiresAuth: true}},
        {path: '/questions', name: 'questions', component: Questions, meta: {requiresAuth: true}},
        {path: '/create-question', name: 'create-question', component: CreateUpdateQuestion, meta: {requiresAuth: true}},
        {path: '/edit-question', name: 'edit-question', component: CreateUpdateQuestion, meta: {requiresAuth: true}},
        {path: '/options-answers', name: 'options-answers', component: OptionsAnswers, meta: {requiresAuth: true}},
        {path: '/create-option-answer', name: 'create-option-answer', component: CreateUpdateOptionAnswer, meta: {requiresAuth: true}},
        {path: '/edit-option-answer', name: 'edit-option-answer', component: CreateUpdateOptionAnswer, meta: {requiresAuth: true}},

        // {path: '/themes', name: 'themes', component: Themes},
        // {path: '/exam', name: 'exam', component: Exam},
        // {path: '/create-theme', name: 'create-theme', component: CreateUpdateTheme},
        // {path: '/questions', name: 'questions', component: Questions},
        // {path: '/create-question', name: 'create-question', component: CreateUpdateQuestion},
        // {path: '/edit-question', name: 'edit-question', component: CreateUpdateQuestion},
        // {path: '/options-answers', name: 'options-answers', component: OptionsAnswers},
        // {path: '/create-option-answer', name: 'create-option-answer', component: CreateUpdateOptionAnswer},
        // {path: '/edit-option-answer', name: 'edit-option-answer', component: CreateUpdateOptionAnswer},
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