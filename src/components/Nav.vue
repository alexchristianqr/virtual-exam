<template>
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-white" id="mainNav">
            <span class="navbar-brand">
                <b>Virtual SURVEY</b>
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
                            <b>Alex Christian</b>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                            <a href class="dropdown-item text-danger" @click="logout()">
                                <i class="fa fa-fw fa-sign-out"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
</template>
<script>
    import SERVICE from '../services/ApiService';
    export default {
        methods:{
            logout(){
                SERVICE.dispatch("doLogout", {self: this});
            }
        }
    }
</script>