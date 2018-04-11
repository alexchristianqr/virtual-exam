<template>
    <div>
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion" style="overflow-y: auto;overflow-x: hidden">
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#xa" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-dashboard"></i>
                    <span class="nav-link-text">Dashboard</span>
                </a>
                <ul class="sidenav-second-level collapse" id="xa">
                    <li>
                        <router-link :to="'about'" class="nav-link">
                            <i class="fa fa-fw fa-info-circle"></i>
                            <span class="nav-link-text">About</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'contact'" class="nav-link">
                            <i class="fa fa-fw fa-phone"></i>
                            <span class="nav-link-text">Contact-me</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Gestion">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#xb"
                   data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-file-text"></i>
                    <span class="nav-link-text">Gestión de Examenes</span>
                </a>
                <ul class="sidenav-second-level collapse" id="xb">
                    <li>
                        <router-link :to="'report'" class="nav-link">
                            <i class="fa fa-fw fa-id-badge"></i>
                            <span class="nav-link-text">Modulo Temas</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'report'" class="nav-link">
                            <i class="fa fa-fw fa-id-badge"></i>
                            <span class="nav-link-text">Modulo Preguntas</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'report'" class="nav-link">
                            <i class="fa fa-fw fa-id-badge"></i>
                            <span class="nav-link-text">Modulo Opciones</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>

        <ul class="navbar-nav sidenav-toggler">
            <li class="nav-item">
                <a class="nav-link text-center" id="sidenavToggler">
                    <i class="fa fa-fw fa-bars"></i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'NavLeft'
  }
</script>

<style scoped>

</style>