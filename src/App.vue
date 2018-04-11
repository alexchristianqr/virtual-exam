<template>
    <div>
        <template v-if="$route.path !== '/login'">
            <nav-header :role="role"/>
            <template v-if="role.name !== 'guest'">
                <div class="content-wrapper bg-light">
                    <div class="container-fluid mb-5">
                        <router-view/>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="container">
                    <div class="col-10 mx-auto mt-4 mb-5">
                        <router-view/>
                    </div>
                </div>
            </template>
        </template>
        <template v-else>
            <router-view/>
        </template>
        <footer :class="$route.path == '/login' ? 'sticky-footer w-100' : 'sticky-footer' "
                style="background-color: transparent !important;">
            <div class="container">
                <div class="text-center">
                    <small>Copyright © Corporación Sapia {{new Date().getFullYear()}}</small>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>

  import NavHeader from './components/layouts/NavHeader'
  import Storage   from 'vue-local-storage'

  export default {
    name: 'App',
    components: {NavHeader},
    data: () => ({
      storage: Storage,
      role: {name: 'guest'},
    }),
    beforeMount() {
      this.role = Storage.get('data_auth').role
    },
  }
</script>

<style>
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import "../node_modules/font-awesome/css/font-awesome.min.css";
    @import "assets/vendor/css/sb-admin.css";

    @media (min-width: 992px) {
        .modal-lg {
            max-width: 1200px !important;
        }
    }

    .table td, .table th {
        vertical-align: middle !important;
    }
</style>
