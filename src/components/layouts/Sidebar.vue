<template>
    <div>
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" title="Modulo Temas">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#a" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-sitemap"></i>
                    <span class="nav-link-text">Tema</span>
                </a>
                <ul class="sidenav-second-level collapse" id="a">
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="'/themes'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                        <router-link :to="'/create-theme'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" title="Modulo Preguntas">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#b" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-file-text-o"></i>
                    <span class="nav-link-text">Pregunta</span>
                </a>
                <ul class="sidenav-second-level collapse" id="b">
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="'/questions'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                        <router-link :to="'/create-question'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" title="Modulo Respuestas">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#c" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-check-square"></i>
                    <span class="nav-link-text">Opcion Respuesta</span>
                </a>
                <ul class="sidenav-second-level collapse" id="c">
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="'/options-answers'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                        <router-link :to="'/create-option-answer'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <template v-if="util.validateRole([role.SUPER,role.ADMINISTRADOR])">
                <li class="nav-item" title="Modulo Usuarios">
                    <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#d"
                       data-parent="#exampleAccordion">
                        <i class="fa fa-fw fa-users"></i>
                        <span class="nav-link-text">Usuarios</span>
                    </a>
                    <ul class="sidenav-second-level collapse" id="d">
                        <li>
                            <router-link :to="'/users'" class="nav-link">
                                <i class="fa fa-fw fa-list-alt"></i>
                                <span class="nav-link-text">Listar</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </template>
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
  import Util from '../../util'
  import Role from '../../role'

  export default {
    name: 'Sidebar',
    data: () => ({
      role: Role,
      util: Util,
    })
  }
</script>

<style scoped>
    #exampleAccordion {
        overflow: overlay;
    }

    #mainNav .navbar-collapse .navbar-sidenav .nav-link-collapse:after {
        padding-right: 8px;
    }
</style>