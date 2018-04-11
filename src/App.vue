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
        <footer :class="getClass()"
                style="background-color: transparent !important;">
            <div class="container">
                <div class="text-center">
                    <small>Copyright © Corporación Sapia {{new Date().getFullYear()}}</small>
                </div>
            </div>
        </footer>

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded">
            <i class="fa fa-angle-up"></i>
        </a>
    </div>
</template>

<script>
  import NavHeader from './components/layouts/NavHeader'
  import Storage   from 'vue-local-storage'
  import Sbadmin   from './assets/js/sb-admin'

  export default {
    name: 'App',
    components: {NavHeader},
    data: () => ({
      storage: Storage,
      role: {name: 'guest'},
    }),
    beforeMount () {
      this.role = (Storage.get('data_auth') != null) ? Storage.get('data_auth').role : {}
    },
    watch: {
      $route () {
        this.role = (Storage.get('data_auth') != null) ? Storage.get('data_auth').role : {}
        Sbadmin.init()
        this.getClass()
        console.log('execute listening route!')
      }
    },
    methods:{
      getClass(){
        return (this.$route.path == '/login') ? 'sticky-footer w-100' : 'sticky-footer'
      }
    }
  }
</script>

<style lang="scss">
    @import "assets/scss/app";
    @import "../node_modules/font-awesome/css/font-awesome.min.css";
</style>
