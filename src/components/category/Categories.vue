<template>
    <div>

        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Lista de Categorias</span>
                    </div>
                    <div class="col-6 text-right">
                        <template v-if="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                            <button @click.prevent="openModal('#modalCreateCategory',1)" type="button" class="btn btn-outline-secondary">
                                <i class="fa fa-plus fa-fw"></i>
                                <span>Crear Categoria</span>
                            </button>
                        </template>
                        <template v-if="util.validateRole([role.SUPER])">
                            <button @click.prevent="openModal('#modalAssignCategory',2)" type="button" class="btn btn-outline-primary">
                                <i class="fa fa-plus fa-fw"></i>
                                <span>Asignar Categoria / Usuario</span>
                            </button>
                        </template>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group w-35">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input v-model="inputSearchSurvey" ref="ref_inputSearchSurvey" type="search" placeholder="Buscar" class="form-control">
                        <div v-if="inputSearchSurvey != ''" class="input-group-append">
                            <button title="Limpiar Busqueda" @click="cleanSearch()" type="button"
                                    class="btn btn-danger">
                                <i class="fa fa-close"></i>
                            </button>
                        </div>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title="" class="form-control" v-model="params.status" @change="change()">
                            <option value="" selected>Seleccionar Estado</option>
                            <option value="A">Activo</option>
                            <option value="I">Inactivo</option>
                        </select>
                    </div>
                    <button title="actualizar datos" class="btn btn-outline-secondary" @click="change()"><i
                            class="fa fa-refresh"></i></button>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Nombre o Titulo</th>
                        <th>Actualizado</th>
                        <th width="5%" class="text-center">Estado</th>
                        <th hidden width="10%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody v-if="loadingTable" class="table">
                    <tr>
                        <td colspan="6" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-if="!loadingTable && dataSurvey.length">
                    <tr v-for="(v,k) in filteredDataSurvey">
                        <th>{{k+1}}</th>
                        <td>{{v.name}}</td>
                        <td>{{v.updated_at}}</td>
                        <td class="text-center">
                            <i v-if="v.status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-else="" class="fa fa-circle text-danger"></i>
                        </td>
                        <td hidden class="text-right">
                            <div class="btn-group dropdown" role="group">
                                <router-link class="btn btn-warning btn-sm" :to="{name:'edit-question',params:{dataSurvey:v}}">
                                    <i class="fa fa-edit fa-fw"></i>
                                </router-link>
                                <div class="btn-group open" role="group">
                                    <button type="button" class="btn btn-light btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-expanded="true">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                        <li title="Exportar">
                                            <a href class="dropdown-item text-muted">
                                                <small>Change Status</small>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && dataSurvey.length < 1">
                    <tr>
                        <td colspan="6" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                <p>No hay información disponible!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal Crear Categoria -->
        <modal-create-category v-if="loadModal.createCategory" :dataProps="{dataSurvey,loadModal}" @eventClose="load()"/>

        <!-- Modal Asignar Categoria -->
        <modal-assign-category v-if="loadModal.assignCategory" :dataProps="{dataSurvey,loadModal}" @eventClose="load()"/>

    </div>
</template>

<script>
  import SurveyService       from '../../services/SurveyService'
  import ModalCreateCategory from '../layouts_category/ModalCreateCategory'
  import Util                from '../../util'
  import Role                from '../../role'
  import Moment              from 'moment'
  import ModalAssignCategory from '../layouts_category/ModalAssignCategory'

  export default {
    name: 'Categories',
    components: {ModalAssignCategory, ModalCreateCategory},
    data: () => ({
      role: Role,
      util: Util,
      moment: Moment,
      loadingTable: true,
      loadModal: {
        createCategory: false,
        assignCategory: false,
      },
      dataSurvey: [],
      inputSearchSurvey: '',
      params: {
        status: 'A',
      },
    }),
    created () {
      this.load()
    },
    computed: {
      filteredDataSurvey () {
        return this.dataSurvey.filter((item) => {return item.name.toLowerCase().indexOf(this.inputSearchSurvey.toLowerCase()) > -1})
      }
    },
    methods: {
      change () {
        this.loadingTable = true
        this.load()
      },
      load () {
        SurveyService.dispatch('getSurveysByUserSurvey', {self: this})
        SurveyService.dispatch('getSurveys', {self: this})
      },
      openModal (modalId, self) {
        if (self == 1) {
          this.loadModal.createCategory = true
        } else {
          this.loadModal.assignCategory = true
        }
        Util.openModal(document, modalId)
      },
      cleanSearch () {
        this.inputSearchSurvey = ''
        this.$refs.ref_inputSearchSurvey.focus()
      },
    }
  }
</script>

<style scoped>

</style>