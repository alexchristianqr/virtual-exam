<template>
    <div>
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" title="Modulo Categoria" data-toggle="tooltip" data-placement="right">
                <router-link :to="{name:'categories'}" class="nav-link">
                    <i class="fa fa-fw fa-pencil-square-o"></i>
                    <span class="nav-link-text">Categoria</span>
                </router-link>
            </li>
            <li class="nav-item" title="Modulo Tema" data-toggle="tooltip" data-placement="right">
                <router-link :to="{name:'themes'}" class="nav-link">
                    <i class="fa fa-fw fa-sitemap"></i>
                    <span class="nav-link-text">Tema</span>
                </router-link>
            </li>
            <li class="nav-item" title="Modulo Pregunta y Respuesta" data-toggle="tooltip" data-placement="right">
                <router-link :to="{name:'create-exam'}" class="nav-link">
                    <i class="fa fa-fw fa-check-square-o"></i>
                    <span class="nav-link-text">Pregunta y Respuesta</span>
                </router-link>
            </li>
            <li class="nav-item" title="Modulo Mantenimiento" data-toggle="tooltip" data-placement="right">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#b" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-file-text-o"></i>
                    <span class="nav-link-text">Mantenimiento</span>
                </a>
                <ul class="sidenav-second-level collapse" id="b">
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="{name:'questions'}" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Preguntas</span>
                        </router-link>
                    </li>
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="{name:'options-answers'}" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Respuestas</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <template v-if="util.validateRole([role.SUPER,role.ADMINISTRADOR])">
                <li class="nav-item" title="Modulo Usuario" data-toggle="tooltip" data-placement="right">
                    <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#d"
                       data-parent="#exampleAccordion">
                        <i class="fa fa-fw fa-users"></i>
                        <span class="nav-link-text">Usuario</span>
                    </a>
                    <ul class="sidenav-second-level collapse" id="d">
                        <li>
                            <router-link :to="{name:'users'}" class="nav-link">
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