<template>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-white" id="mainNav">
            <span class="navbar-brand">
                <span class="h5 m-auto">Virtual Survey</span>
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
                        <span class="h6 m-auto">{{storage.get('data_auth').name}} <small>( {{storage.get('data_auth').email}} )</small></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-left w-100 mt-3" aria-labelledby="alertsDropdown">
                            <a href class="dropdown-item text-muted text-right">
                                Cambiar Tema
                                <i class="fa fa-circle fa-fw"></i>
                            </a>
                        <template v-if="role.name !== 'guest' ">
                            <a href class="dropdown-item text-muted text-right">
                                Intereses
                                <i class="fa fa-filter fa-fw"></i>
                            </a>
                            <a href class="dropdown-item text-muted text-right">
                                Configuración
                                <i class="fa fa-tasks fa-fw"></i>
                            </a>
                            <a href class="dropdown-item text-muted text-right">
                                General
                                <i class="fa fa-cogs fa-fw"></i>
                            </a>
                            <a href class="dropdown-item text-muted text-right">
                                Security by RSA
                                <i class="fa fa-lock fa-fw"></i>
                            </a>
                        </template>
                        <div class="dropdown-divider"></div>
                        <a href class="dropdown-item text-danger" @click.prevent="logout()">
                            <i class="fa fa-fw fa-sign-out"></i>
                            <span>Logout and Exit</span>
                        </a>
                    </div>
                </li>
            </ul>
            <sidebar v-if="role.name !== 'guest' "/>
        </div>
    </nav>
</template>
<script>
  import SERVICE from '../../api/ApiService'
  import Storage from 'vue-local-storage'
  import Sidebar from '../Sidebar'

  export default {
    name: 'NavHeader',
    components: {Sidebar},
    props: {
      role: {},
    },
    data: () => ({
      storage: Storage,
    }),
    methods: {
      logout() {
        SERVICE.dispatch('doLogout', {self: this})
      },
    },
  }
</script>