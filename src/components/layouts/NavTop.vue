<template>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
               href="#"
               data-toggle="dropdown"
               aria-haspopup="false"
               aria-expanded="false">
            <span class="h6">
                <span>{{storage.get('data_auth').name}}</span>
                <span class="small" style="letter-spacing: 0.5pt">( {{storage.get('data_auth').email}} )</span>
            </span>
            </a>
            <div class="dropdown-menu mt-3 w-100" aria-labelledby="alertsDropdown">
                <a href class="dropdown-item text-muted" @click.prevent="logout()">
                    <i class="fa fa-filter fa-fw"></i>Intereses
                </a>
                <a href class="dropdown-item text-muted" @click.prevent="logout()">
                    <i class="fa fa-cog fa-fw"></i>Configuración
                </a>
                <div class="dropdown-divider"></div>
                <a href class="dropdown-item text-danger" @click.prevent="logout()">
                    <i class="fa fa-sign-out fa-fw"></i>Logout
                </a>
            </div>
        </li>
    </ul>
</template>

<script>
  import SERVICE from '../../services/AuthService'
  import Storage from 'vue-local-storage'

  export default {
    name: 'NavTop',
    data: () => ({
      storage: Storage,
    }),
    methods: {
      logout () {
        SERVICE.dispatch('doLogout', {self: this})
      },
    },
  }
</script>

<style scoped>

</style>