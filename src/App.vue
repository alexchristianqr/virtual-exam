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
                    <small>Copyright © Grupo Intercorp</small>
                    <!--<small>Copyright © Sapia Corporation 2018</small>-->
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

    /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    /*}*/
</style>
