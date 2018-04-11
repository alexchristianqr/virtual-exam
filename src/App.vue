<template>
    <div>
        <template v-if="$route.path !== '/login'">
            <div>
                <div class="content-wrapper">
                    <div class="container-fluid">
                        <nav-header/>
                        <router-view/>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div>
                <router-view/>
            </div>
        </template>
        <footer :class="$route.path == '/login' ? 'sticky-footer w-100' : 'sticky-footer' " style="background-color: transparent !important;">
            <div class="container">
                <div class="text-center">
                    <small>Copyright © Corporación Sapia {{new Date().getFullYear()}}</small>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import NavHeader from './components/NavHeader';

    export default {
        name: 'App',
        components:{NavHeader}
    }
</script>

<style>
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import "../node_modules/font-awesome/css/font-awesome.min.css";
    @import "assets/vendor/css/sb-admin.css";
    @media (min-width: 992px){
        .modal-lg {
            max-width: 1200px !important;
        }
    }
    .table td, .table th {
        vertical-align: middle !important;
    }
</style>
