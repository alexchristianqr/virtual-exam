<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Temas</span>
                    </div>
                    <div class="col-6 text-right">
                        <div v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                            <router-link :to="'/create-theme'" class="btn btn-outline-secondary"><i class="fa fa-plus fa-fw"></i><span>Crear Nuevo</span></router-link>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title v-model="params.user_survey_theme_id" class="form-control" @change="change()">
                            <option value="" selected>Seleccionar Categoria</option>
                            <option v-for="(v) in dataSurvey" :value="v.user_survey_id">{{v.name}}</option>
                        </select>
                    </div>
                    <div v-show="params.user_survey_theme_id != ''" class="input-group w-35">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input v-model="input_search_theme" ref="inputSearchTheme" type="search" placeholder="Buscar" class="form-control">
                        <div v-if="input_search_theme != ''" class="input-group-append">
                            <button title="Limpiar Busqueda" @click.prevent="input_search_theme = '' ; $refs.inputSearchTheme.focus()" type="button" class="btn btn-danger"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                    <button title="actualizar datos" class="btn btn-outline-secondary" type="button" @click="change()"><i class="fa fa-refresh fa-fw"></i></button>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Nombre Tema</th>
                        <th>Actualizado</th>
                        <th>Duración</th>
                        <th>Nota</th>
                        <th width="5%" class="text-center">Estado</th>
                        <th width="10%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody v-if="loadingTable" class="table">
                    <tr>
                        <td colspan="7" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-if="!loadingTable && dataTheme.length > 0">
                    <tr v-for="(v,k) in filteredDataTheme">
                        <th>{{k+1}}</th>
                        <td>{{v.theme_name}}</td>
                        <td>{{v.theme_updated_at}}</td>
                        <td>{{util.toHHMMSS(v.theme_duration)}}</td>
                        <td>{{v.theme_score}}</td>
                        <td class="text-center">
                            <i v-if="v.theme_status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.theme_status === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
                            <a v-if="v.user_survey_theme_status == 'P' "
                               class="btn btn-warning btn-sm btn-block"
                               href
                               data-toggle="modal"
                               data-target="#modalStartExam"
                               @click.prevent="subparams.dataTheme = v">
                                <i class="fa fa-file-text-o fa-fw"></i>
                                <span>PENDIENTE</span>
                            </a>
                            <template v-if="v.user_survey_theme_status == 'D' || v.user_survey_theme_status == 'DD'">
                                <template v-if="v.user_survey_theme_status == 'D'">
                                    <button type="button" class="btn btn-success btn-sm btn-block">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>REALIZADO</span>
                                    </button>
                                </template>
                                <template v-else>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success btn-sm">
                                            <i class="fa fa-file-text-o fa-fw"></i>
                                            <span>REALIZADO</span>
                                        </button>
                                        <button type="button" class="btn btn-info btn-sm">
                                            <i class="fa fa-eye fa-fw"></i>
                                            <span>SOLUCION</span>
                                        </button>
                                    </div>
                                </template>
                            </template>
                            <button v-if="v.user_survey_theme_status == 'E'" type="button" class="btn btn-danger">
                                <i class="fa fa-file-text-o fa-fw"></i>
                                <span>EXPIRADO</span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && dataTheme.length <= 0">
                    <tr>
                        <td colspan="7" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                <p>Usted no cuenta con información disponible!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal Iniciar Examen -->
        <div class="modal fade in" id="modalStartExam" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span class="text-secondary">¿Estás listo para iniciar el examen?</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span>El examen tine una duración de <b>{{util.toHHMMSS(subparams.dataTheme.theme_duration)}}</b> minutos, sin opcion de cancelar.</span>
                        <br>
                        <br>
                        <small class="text-secondary"><b>Nota:</b> El tiempo del examen es exacto asi que no hay
                            opciones de retroceso.
                        </small>
                    </div>
                    <div class="modal-footer w-100">
                        <button class="btn btn-outline-secondary w-30" type="button" data-dismiss="modal">
                            <i class="fa fa-close fa-fw"></i>
                            <span>Cancelar</span>
                        </button>
                        <router-link data-dismiss="modal" class="btn btn-outline-primary w-30"
                                     :to="{name:'exam',params:{dataTheme:subparams.dataTheme}}">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Listo</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import SurveyService from '../../services/SurveyService'
  import ThemeService  from '../../services/ThemeService'
  import Util          from '../../util'
  import Storage       from 'vue-local-storage'
  import Role           from '../../role'

  export default {
    name: 'Themes',
    data: () => ({
      role:Role,
      util: Util,
      loadingTable: true,
      dataTheme: [],
      dataSurvey: [],
      params: {
        user_id: '',
        user_survey_theme_id: '',
      },
      subparams: {
        dataTheme: {}
      },

      input_search_theme: '',
    }),
    created () {
      this.load()
    },
    computed: {
      filteredDataTheme () {
        return this.dataTheme.filter((item) => {return item.theme_name.toLowerCase().indexOf(this.input_search_theme.toLowerCase()) > -1})
      }
    },
    methods: {
      load () {
        this.params.user_id = Storage.get('data_auth').id
        ThemeService.dispatch('allTheme', {self: this})
        SurveyService.dispatch('allByUserSurvey', {self: this})
      },
      change () {
        this.loadingTable = true
        this.dataTheme = []
        ThemeService.dispatch('allTheme', {self: this})
      }
    },
  }
</script>

<style scoped>

</style>