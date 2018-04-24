<template>
    <div>
        <template v-if="$route.path !== '/login' && $route.path !== '/project'"><!-- Si mo es Login -->
            <nav-header v-if="$route.path !== '/know'" :role="role"/>
            <template v-if="role.id != role_auth.INVITADO">
                <div class="content-wrapper bg-light">
                    <div class="container-fluid mb-5">
                        <router-view/>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="container">
                    <div :class="$route.path !== '/know' ? 'col-10 mx-auto mt-4 mb-5' : 'col-10 mx-auto'">
                        <router-view/>
                    </div>
                </div>
            </template>
        </template>
        <template v-else><!-- Si es Login -->
            <router-view/>
        </template>
        <footer :class="getClass()" style="background-color: transparent !important;">
            <div class="container">
                <div class="text-center">
                    <small>Copyright © Corporación Sapia {{new Date().getFullYear()}}</small>
                </div>
            </div>
        </footer>
        <!-- Scroll to Top Button-->
        <!--<a class="scroll-to-top rounded">-->
        <!--<i class="fa fa-angle-up"></i>-->
        <!--</a>-->
    </div>
</template>

<script>
  import NavHeader from './components/layouts/NavHeader'
  import Storage   from 'vue-local-storage'
  import Sbadmin   from './assets/js/sb-admin'
  import Util      from './util'
  import Roles      from './role'
  import JsonDataAuth  from './api/file_data_auth.json'

  export default {
    name: 'App',
    components: {NavHeader},
    data: () => ({
      role_auth: Roles,
      storage: Storage,
      role: {},
    }),
    beforeMount () {
      this.validateRoleAuthorized()
      this.validateShowPageKnow()
    },
    mounted () {
      this.removeCookies()
    },
    watch: {
      $route () {
        if(this.$route.path !== '/login' && this.$route.path !== '/project'){
            this.loadFileDataAuthJson()
        }
        this.loadSbadmin()
        this.validateRoleAuthorized()
        this.validateShowPageKnow()
      }
    },
    methods: {
      removeCookies () {
        Util.removeCookie('cookie_data_auth', '/')
        Util.removeCookie('cookie_data_auth', '/login')
      },
      getClass () {
        return (this.$route.path == '/login') ? 'sticky-footer w-100' : 'sticky-footer'
      },
      loadSbadmin () {
        Sbadmin.init()
        console.log('Sbadmin reload!')
      },
      loadFileDataAuthJson () {
        Storage.set('data_auth',JsonDataAuth.json)
        console.log('file data auth reload!')
      },
      validateRoleAuthorized () {
        this.role = (Storage.get('data_auth') != null) ? Storage.get('data_auth').role : {}
      },
      validateShowPageKnow () {
        if (this.$route.path == '/know') {
          document.body.classList.remove('fixed-nav')
          document.body.classList.remove('sticky-footer')
        } else {
          document.body.classList.add('fixed-nav')
          document.body.classList.add('sticky-footer')
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "assets/scss/app";
    @import "../node_modules/font-awesome/css/font-awesome.min.css";
</style>
