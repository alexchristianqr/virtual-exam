<template>
    <div>
        <template v-if="$route.path !== '/login' && $route.path !== '/project'"><!-- Si mo es Login -->
            <nav-header v-if="$route.path !== '/know'" :role="role"/>
            <template v-if="role.id != role_auth.INVITADO">
                <div class="content-wrapper bg-light"
                     :style="$route.path == '/know' ? 'margin-left:inherit !important;padding-top:inherit' : ''">
                    <div :class="$route.path == '/know' ? 'container-fluid' : 'container-fluid mb-5'">
                        <router-view/>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="container">
                    <div :class="$route.path !== '/know' ? 'col-12 mx-auto mt-4 mb-5' : 'col-10 mx-auto'">
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
    </div>
</template>

<script>
  import NavHeader    from './components/layouts/NavHeader'
  import Storage      from 'vue-local-storage'
  import Sbadmin      from './assets/js/sb-admin'
  import Util         from './util'
  import Roles        from './role'
  import JsonDataAuth from './api/file_data_auth.json'
  import $            from 'jquery'

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
        if (this.$route.path !== '/login' && this.$route.path !== '/project') {
          this.loadFileDataAuthJson()
        }
        this.loadSbadmin()
        this.validateRoleAuthorized()
        this.validateShowPageKnow()
      }
    },
    methods: {
      removeCookies () {
        Util.removeCookie('co-stg-a-u-au', '/')
        Util.removeCookie('co-stg-a-u-au', '/login')
      },
      getClass () {
        return (this.$route.path == '/login') ? 'sticky-footer w-100' : 'sticky-footer'
      },
      loadSbadmin () {
        Sbadmin.init()
        console.log('Sbadmin reload!')
      },
      loadFileDataAuthJson () {
        if (Object.keys(JsonDataAuth.json).length !== 0) {//si el objeto esta cargado
          Storage.set('s-u-$4p14', JsonDataAuth.json)
          console.log('load U-Cfg! -> by App of ' + window.location.origin + '/google.domains/security/app/' + Util.generateId())
        }
      },
      validateRoleAuthorized () {
        this.role = (Storage.get('s-u-$4p14') != null) ? Storage.get('s-u-$4p14').role : {}
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
    @import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
    @import "../node_modules/font-awesome/css/font-awesome.min.css";

    .multiselect__option--highlight {
        background: #ddd;
        outline: none;
        color: #777;
    }

    .multiselect__option--highlight::after {
        background: #777;
        outline: none;
        color: #ddd;
    }

    .multiselect__option--selected.multiselect__option--highlight {
        background: #ff6a6a;
        color: #fff;
    }
    .multiselect__tags{
        min-height: 38px !important;
        border:1px solid #ced4da !important;
    }
</style>
