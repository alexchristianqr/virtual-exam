import Vue               from 'vue'
import Router            from 'vue-router'
import Storage           from 'vue-local-storage'
import Login             from './components/login/Login'
import Themes            from './components/theme/Themes'
import CreateUpdateTheme from './components/theme/CreateUpdateTheme'
import Exam              from './components/exam/Exam'
import Questions         from './components/question/Questions'
import CreateUpdateQuestion
                         from './components/question/CreateUpdateQuestion'
import OptionsAnswers    from './components/option_answer/OptionsAnswers'
import CreateUpdateOptionAnswer
                         from './components/option_answer/CreateUpdateOptionAnswer'
import Users             from './components/user/Users'
import UserHistory       from './components/user/UserHistory'
import ExamSolution      from './components/exam/ExamSolution'
import PageKnow          from './components/errors/Nnow'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    //Views Unhautorized
    {path: '*', redirect: '/login'},
    {path: '/login', name: 'login', component: Login, meta: {title: 'Login'}},
    //Views Authorized
    {
      path: '/themes',
      name: 'themes',
      component: Themes,
      meta: {requiresAuth: true, title: 'Tema', roleId: [1, 2, 3, 4, 5]},
    },
    {
      path: '/exam',
      name: 'exam',
      component: Exam,
      meta: {requiresAuth: true, title: 'Examen', roleId: [1, 2, 3]},
    },
    {
      path: '/create-theme',
      name: 'create-theme',
      component: CreateUpdateTheme,
      meta: {requiresAuth: true, title: 'Crear Tema', roleId: [1, 2, 3]},
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions,
      meta: {requiresAuth: true, title: 'Pregunta', roleId: [1, 2, 3]},
    },
    {
      path: '/create-question',
      name: 'create-question',
      component: CreateUpdateQuestion,
      meta: {requiresAuth: true, title: 'Crear Pregunta', roleId: [1, 2, 3]},
    },
    {
      path: '/edit-question',
      name: 'edit-question',
      component: CreateUpdateQuestion,
      meta: {requiresAuth: true, title: 'Editar Pregunta', roleId: [1, 2, 3]},
    },
    {
      path: '/options-answers',
      name: 'options-answers',
      component: OptionsAnswers,
      meta: {requiresAuth: true, title: 'Opcion', roleId: [1, 2, 3]},
    },
    {
      path: '/create-option-answer',
      name: 'create-option-answer',
      component: CreateUpdateOptionAnswer,
      meta: {requiresAuth: true, title: 'Crear Opcion', roleId: [1, 2, 3]},
    },
    {
      path: '/edit-option-answer',
      name: 'edit-option-answer',
      component: CreateUpdateOptionAnswer,
      meta: {requiresAuth: true, title: 'Editar opcion', roleId: [1, 2, 3]},
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {requiresAuth: true, title: 'Usuario', roleId: [1, 2, 3]},
    },
    {
      path: '/user-history/:user_id',
      name: 'user-history',
      component: UserHistory,
      meta: {requiresAuth: true, title: 'Usuario', roleId: [1, 2, 3]},
    },
    {
      path: '/exam-solution/:exam_id',
      name: 'exam-solution',
      component: ExamSolution,
      meta: {requiresAuth: true, title: 'Usuario', roleId: [1, 2, 3]},
    },
    //View Errors
    {path: '/know', name: 'know', component: PageKnow,meta:{back:'Login'}},
  ],
})

router.beforeEach((to, from, next) => {
  //modificamos el valor del titulo del documento web
  setTtitle(to)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const roleId = to.meta.roleId
  //validamos si la ruta en la que estamos es Login
  if (to.path === '/login') {
    Storage.remove('data_auth')
  }
  //validamos en todas las rutas
  if (requiresAuth) {
    if (Storage.get('data_auth') == undefined) {
      next('/login')
    } else {
      if (typeof roleId == 'object') {
        let accessRole = roleId.indexOf(Storage.get('data_auth').role.id) > -1
        if (accessRole) {
          next()
        } else {
          next('/know')
        }
      } else {
        if (Storage.get('data_auth').role.id == roleId) {
          next()
        } else {
          next('/know')
        }
      }
    }
  } else {
    next()
  }
})

const setTtitle = (to) => {
  document.title = 'Examen | ' + to.meta.title
}

export default router
