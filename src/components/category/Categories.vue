<template>
    <div class="card">
        <div class="card-header bg-light text-dark">
            <div class="row">
                <div class="col-6 mt-auto mb-auto">
                    <span class="card-title">Categories</span>
                </div>
                <div class="col-6 text-right">
                    <router-link :to="{name:'create-category'}" class="btn btn-outline-secondary">
                        <i class="fa fa-plus fa-fw"></i><span>Crear Nuevo</span>
                    </router-link>
                </div>
            </div>
            <hr>
            <div class="form-inline">
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
                <button title="actualizar datos" class="btn btn-outline-secondary" @click="change()"><i class="fa fa-refresh"></i></button>
            </div>
        </div>
        <div class="card-body">
            <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Nombre Pregunta</th>
                        <th>Actualizado</th>
                        <th width="5%" class="text-center">Estado</th>
                        <th width="10%" class="text-right">Acción</th>
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
                    <tr v-for="(v,k) in dataSurvey">
                        <th>{{k+1}}</th>
                        <td>{{v.name}}</td>
                        <td>{{v.updated_at}}</td>
                        <td class="text-center">
                            <i v-if="v.status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-else="" class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
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
</template>

<script>
  import SurveyService from '../../services/SurveyService'
  import Moment        from 'moment'

  export default {
    name: 'Categories',
    data: () => ({
      moment:Moment,
      loadingTable: true,
      dataSurvey: [],
      params: {
        status: '',
      },
    }),
    created(){
      this.load()
    },
    methods:{
      change () {
        this.loadingTable = true
        this.load()
      },
      load(){
        SurveyService.dispatch('allSurvey', {self: this})
      }
    }
  }
</script>

<style scoped>

</style>