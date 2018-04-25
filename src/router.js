import Vue                      from 'vue'
import Router                   from 'vue-router'
import Storage                  from 'vue-local-storage'
import Login                    from './components/login/Login'
import Project                  from './components/project/Project'
import Themes                   from './components/theme/Themes'
import CreateUpdateTheme        from './components/theme/CreateUpdateTheme'
import Exam                     from './components/exam/Exam'
import Questions                from './components/question/Questions'
import CreateUpdateQuestion     from './components/question/CreateUpdateQuestion'
import OptionsAnswers           from './components/option_answer/OptionsAnswers'
import CreateUpdateOptionAnswer from './components/option_answer/CreateUpdateOptionAnswer'
import Users                    from './components/user/Users'
import UserHistory              from './components/user/UserHistory'
import ExamSolution             from './components/exam/ExamSolution'
import PageKnow                 from './components/errors/Nnow'
import Util                     from './util'
import Role                     from './role'
import AuthService              from './services/AuthService'
import JsonDataAuth             from './api/file_data_auth.json'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    /**Views Unhautorized**/
    {path: '*', redirect: '/login'},
    {path: '/login', name: 'login', component: Login, meta: {title: 'Login'}},
    /**Views Authorized**/
    {
      path: '/project',
      name: 'project',
      component: Project,
      meta: {title: 'Proyecto', roleId: Role.TODOS},
    },
    {
      path: '/themes',
      name: 'themes',
      component: Themes,
      meta: {requiresAuth: true, title: 'Tema', roleId: Role.TODOS},
    },
    {
      path: '/exam',
      name: 'exam',
      component: Exam,
      meta: {requiresAuth: true, title: 'Examen', roleId: Role.TODOS},
    },
    {
      path: '/exam-solution/:exam_id',
      name: 'exam-solution',
      component: ExamSolution,
      meta: {requiresAuth: true, title: 'Usuario', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.INVITADO]},
    },
    {
      path: '/create-theme',
      name: 'create-theme',
      component: CreateUpdateTheme,
      meta: {requiresAuth: true, title: 'Crear Tema', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR]},
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions,
      meta: {
        requiresAuth: true,
        title: 'Pregunta',
        roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR, Role.LECTOR]
      },
    },
    {
      path: '/create-question',
      name: 'create-question',
      component: CreateUpdateQuestion,
      meta: {requiresAuth: true, title: 'Crear Pregunta', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR]},
    },
    {
      path: '/edit-question',
      name: 'edit-question',
      component: CreateUpdateQuestion,
      meta: {requiresAuth: true, title: 'Editar Pregunta', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR]},
    },
    {
      path: '/options-answers',
      name: 'options-answers',
      component: OptionsAnswers,
      meta: {requiresAuth: true, title: 'Opcion', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR, Role.LECTOR]},
    },
    {
      path: '/create-option-answer',
      name: 'create-option-answer',
      component: CreateUpdateOptionAnswer,
      meta: {requiresAuth: true, title: 'Crear Opcion', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR]},
    },
    {
      path: '/edit-option-answer',
      name: 'edit-option-answer',
      component: CreateUpdateOptionAnswer,
      meta: {requiresAuth: true, title: 'Editar opcion', roleId: [Role.SUPER, Role.ADMINISTRADOR, Role.ESCRITOR]},
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {requiresAuth: true, title: 'Usuario', roleId: [Role.SUPER, Role.ADMINISTRADOR]},
    },
    {
      path: '/user-history/:user_id',
      name: 'user-history',
      component: UserHistory,
      meta: {requiresAuth: true, title: 'Usuario', roleId: [Role.SUPER, Role.ADMINISTRADOR]},
    },
    /**View Errors**/
    {path: '/know', name: 'know', component: PageKnow, meta: {title: 'Unhautorized'}},
  ],
})

const setTtitle = (to) => {
  document.title = 'Examen Virtual | ' + to.meta.title
}
const validateAccessByRole = (to, roleId, next) => {
  //recargamos la configuracion de el perfil del usuario en session como seguridad
  reloadUsrCfg(to)
  //validamos si es una arreglo
  if (typeof roleId == 'object') {
    if (roleId.indexOf(Storage.get('s-u-$4p14').role.id) > -1) {
      next()
    } else {
      next('/know')
    }
  } else {
    if (Storage.get('s-u-$4p14').role.id == roleId) {
      next()
    } else {
      next('/know')
    }
  }
}
const allRemoveCookies = (to) => {
  Util.removeCookie('co-stg-a-u-au', '/')
  Util.removeCookie('co-stg-a-u-au', '/login')
  if (to.path == '/login' || to.path == '/project') {
    Util.removeCookie('co-f-stg-a-u-au', '/')
    Util.removeCookie('co-f-stg-a-u-au', '/login')
  }
}
const reloadUsrCfg = (to) => {
  if (to.path !== '/login') {
    AuthService.dispatch('getConfig', {self: {}})
    if (Object.keys(JsonDataAuth.json).length !== 0) {//si el objeto esta cargado
      Storage.set('s-u-$4p14', JsonDataAuth.json)
      console.log('load U-Cfg! -> by Route of ' + window.location.origin + '/google.domains/security/app/' + Util.generateId())
    } else {//sino
      Storage.set('s-u-$4p14', Util.getCookie('co-f-stg-a-u-au'))
      console.log('load U-Cfg! -> by Route of ' + window.location.origin + '/google.domains/security/app/' + Util.generateId())
    }
  }
}

router.beforeEach((to, from, next) => {

  //modificamos el valor del titulo del documento web
  setTtitle(to)

  //valida el meta de authenticacion
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const roleId = to.meta.roleId

  //validamos si la ruta en la que estamos es Project y necesita antes haber pasado la authenticacion
  if (to.path === '/project') {
    if (Util.getCookie('co-stg-a-u-au') == '') {
      allRemoveCookies(to)
      next('/login')
    } else {
      next()
    }
  }
  //validamos si la ruta en la que estamos es Login y debe obligatoriamente hacer authenticacion
  if (to.path === '/login') {
    allRemoveCookies(to)
    Storage.remove('s-u-$4p14')
  }
  //validamos en todas las rutas
  if (requiresAuth) {
    allRemoveCookies(to)
    if (Storage.get('s-u-$4p14') == undefined) {
      next('/login')
    } else {
      validateAccessByRole(to, roleId, next)
    }
  } else {
    next()
  }

})

export default router