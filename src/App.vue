<template>
    <div>
        <div id="app">
            <br>
            <router-view/>
            <br>
        </div>
        <footer class="sticky-footer w-100 mt-5" style="background-color: transparent !important;">
            <div class="container">
                <div class="text-center">
                    <small>Copyright © Corporación Sapia</small>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'App'
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
</style>
