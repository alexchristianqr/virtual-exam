<template>
    <div>
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" title="Modulo Categoria" data-toggle="tooltip" data-placement="right">

                <router-link :to="{name:'categories'}" class="nav-link">
                    <i class="fa fa-fw fa-pencil-square-o"></i>
                    <!--<span class="badge badge-secondary">1</span>-->
                    <span class="nav-link-text">Categoria</span>
                </router-link>

                <!--<a class="nav-link nav-link-collapse" data-toggle="collapse" href="#az" data-parent="#exampleAccordion">-->
                    <!--<i class="fa fa-fw fa-pencil-square-o"></i>-->
                    <!--<span class="nav-link-text">Categoria</span>-->
                <!--</a>-->
                <!--<ul class="sidenav-second-level collapse" id="az">-->
                    <!--<li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">-->
                        <!--<router-link :to="{name:'categories'}" class="nav-link">-->
                            <!--<i class="fa fa-fw fa-list-alt"></i>-->
                            <!--<span class="nav-link-text">Listar</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                    <!--<li hidden v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">-->
                        <!--<router-link :to="{name:'create-category'}" class="nav-link">-->
                            <!--<i class="fa fa-fw fa-plus"></i>-->
                            <!--<span class="nav-link-text">Crear</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                <!--</ul>-->
            </li>
            <li class="nav-item" title="Modulo Examen" data-toggle="tooltip" data-placement="right">
                <router-link :to="{name:'themes'}" class="nav-link">
                    <i class="fa fa-fw fa-sitemap"></i>
                    <!--<span class="badge badge-secondary">2</span>-->
                    <span class="nav-link-text">Tema</span>
                </router-link>

                <!--<a class="nav-link nav-link-collapse" data-toggle="collapse" href="#a" data-parent="#exampleAccordion">-->
                    <!--<i class="fa fa-fw fa-sitemap"></i>-->
                    <!--<span class="nav-link-text">Tema</span>-->
                <!--</a>-->
                <!--<ul class="sidenav-second-level collapse" id="a">-->
                    <!--<li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">-->
                        <!--<router-link :to="{name:'themes'}" class="nav-link">-->
                            <!--<i class="fa fa-fw fa-list-alt"></i>-->
                            <!--<span class="nav-link-text">Listar</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                    <!--<li hidden v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">-->
                        <!--<router-link :to="{name:'create-theme'}" class="nav-link">-->
                            <!--<i class="fa fa-fw fa-plus"></i>-->
                            <!--<span class="nav-link-text">Crear</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                <!--</ul>-->
            </li>
            <li class="nav-item" title="Modulo Pregunta y Respuesta" data-toggle="tooltip" data-placement="right">
                <router-link :to="{name:'create-exam'}" class="nav-link">
                    <i class="fa fa-fw fa-check-square-o"></i>
                    <!--<span class="badge badge-secondary">3</span>-->
                    <span class="nav-link-text">Pregunta y Respuesta</span>
                </router-link>

                <!--<a class="nav-link nav-link-collapse" data-toggle="collapse" href="#e"-->
                   <!--data-parent="#exampleAccordion">-->
                    <!--<i class="fa fa-fw fa-check-square-o"></i>-->
                    <!--<span class="nav-link-text">Examen</span>-->
                <!--</a>-->
                <!--<ul class="sidenav-second-level collapse" id="e">-->
                    <!--<li>-->
                        <!--<router-link :to="{name:'create-exam'}" class="nav-link">-->
                            <!--<i class="fa fa-fw fa-file"></i>-->
                            <!--<span class="nav-link-text">Crear Examen</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<router-link :to="{name:'assign-exam'}" class="nav-link">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-fw fa-pencil"></i>&ndash;&gt;-->
                            <!--&lt;!&ndash;<span class="nav-link-text">Asignar Examen</span>&ndash;&gt;-->
                        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                <!--</ul>-->
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
            <li hidden class="nav-item" title="Modulo Mantenimiento" data-toggle="tooltip" data-placement="right">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#bx" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-file-text-o"></i>
                    <span class="nav-link-text">Pregunta</span>
                </a>
                <ul class="sidenav-second-level collapse" id="bx">
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="{name:'questions'}" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                    <router-link :to="{name:'create-question'}" class="nav-link">
                    <i class="fa fa-fw fa-plus"></i>
                    <span class="nav-link-text">Crear</span>
                    </router-link>
                    </li>
                </ul>
            </li>
            <li hidden class="nav-item" title="Modulo Respuesta" data-toggle="tooltip" data-placement="right">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#c" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-check-square"></i>
                    <span class="nav-link-text">Opcion Respuesta</span>
                </a>
                <ul class="sidenav-second-level collapse" id="c">
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR,role.LECTOR])">
                        <router-link :to="{name:'options-answers'}" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                        <router-link :to="{name:'create-option-answer'}" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
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
            <!--<li class="nav-item" title="Modulo Categoria">-->
                <!--<router-link :to="{name:'about'}" class="nav-link">-->
                    <!--<i class="fa fa-fw fa-exclamation-circle"></i>-->
                    <!--<span class="nav-link-text">Información</span>-->
                <!--</router-link>-->
            <!--</li>-->
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