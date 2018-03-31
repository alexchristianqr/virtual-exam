<template>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-white" id="mainNav">
            <span class="navbar-brand">
                <h5 class="m-auto">Virtual Survey</h5>
            </span>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle mr-lg-2" id="" href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-fw fa-user"></i>
                        <span class="h6 m-auto">{{storage.get("data_auth").name}} <small>(aquispe.developer@gmail.com)</small></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right w-100 mt-3" aria-labelledby="alertsDropdown">
                        <a href class="dropdown-item text-danger" @click.prevent="logout()">
                            <i class="fa fa-fw fa-sign-out"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
            <sidebar/>
        </div>
    </nav>
</template>
<script>
    import Sidebar from '../components/Sidebar';
    import SERVICE from '../api/ApiService';
    import Storage from 'vue-local-storage';

    export default {
        name: "nav-header",
        components:{Sidebar},
        data: () => ({
            storage: Storage,
        }),
        methods: {
            logout() {
                SERVICE.dispatch("doLogout", {self: this});
            }
        }
    }
</script>