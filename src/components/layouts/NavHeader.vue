<template>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-white" id="mainNav">
            <span class="navbar-brand">
                <span class="h5 m-auto">Examen Virtual ( {{storage.get('data_auth').project.name.toUpperCase()}} )</span>
            </span>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle mr-lg-2" id="" href data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        <span class="h6 m-auto">{{storage.get('data_auth').name}} <small>( {{storage.get('data_auth').email}} | <span
                                class="text-capitalize">{{storage.get('data_auth').role.name}}</span> )</small></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right w-75 mt-3" aria-labelledby="alertsDropdown">
                        <a href class="dropdown-item text-secondary" v-show="util.validateRole(role_auth.TODOS)">
                            <i class="fa fa-comment fa-fw"></i>
                            Sugerencia
                        </a>
                        <a href class="dropdown-item text-secondary" v-show="util.validateRole(role_auth.SUPER)">
                            <i class="fa fa-cogs fa-fw"></i>
                            Configuración General
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href class="dropdown-item text-dark" @click.prevent="logout()">
                            <i class="fa fa-fw fa-sign-out"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
            <sidebar v-if="role.id != role_auth.INVITADO"/>
        </div>
    </nav>
</template>
<script>
  import AuthService from '../../services/AuthService'
  import Storage     from 'vue-local-storage'
  import Sidebar     from '../layouts/Sidebar'
  import Util        from '../../util'
  import Role        from '../../role'

  export default {
    name: 'NavHeader',
    components: {Sidebar},
    props: {
      role: {},
    },
    data: () => ({
      util: Util,
      role_auth: Role,
      storage: Storage,
    }),
    methods: {
      logout () {
        AuthService.dispatch('doLogout', {self: this})
      },
    },
  }
</script>