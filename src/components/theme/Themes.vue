<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Lista de Temas</span>
                    </div>
                    <div class="col-6 text-right">
                        <div v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                            <button @click.prevent="openModal('#modalCreateTheme',1)" type="button"
                                    class="btn btn-outline-secondary">
                                <i class="fa fa-plus fa-fw"></i>
                                <span>Crear Tema / Categoria</span>
                            </button>
                            <button @click.prevent="openModal('#modalAssignTheme',2)" type="button"
                                    class="btn btn-outline-secondary">
                                <i class="fa fa-plus fa-fw"></i>
                                <span>Asignar Tema / Usuario</span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title v-model="params.user_survey_id" class="form-control" @change="change()">
                            <option value="" selected disabled>Seleccionar Categoria</option>
                            <option v-for="(v) in dataSurvey" :value="v.user_survey_id">{{v.name}}</option>
                        </select>
                    </div>
                    <div v-show="params.user_survey_id != ''" class="input-group w-35">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input v-model="inputSearchTheme" ref="ref_inputSearchTheme" type="search" placeholder="Buscar"
                               class="form-control">
                        <div v-if="inputSearchTheme != ''" class="input-group-append">
                            <button title="Limpiar Busqueda" @click="cleanSearch()" type="button"
                                    class="btn btn-danger">
                                <i class="fa fa-close"></i>
                            </button>
                        </div>
                    </div>
                    <button title="actualizar datos" class="btn btn-outline-secondary" type="button" @click="change()">
                        <i class="fa fa-refresh fa-fw"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Nombre o Titulo</th>
                        <th width="35%">Fecha Inicial - Fecha Final</th>
                        <th>Duración</th>
                        <th>Nota</th>
                        <th width="5%" class="text-center" v-show="util.validateRole(role.SUPER)">Estado</th>
                        <th width="10%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody v-if="loadingTable" class="table table-sm">
                    <tr>
                        <td colspan="8" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-if="!loadingTable && dataTheme.length">
                    <tr v-for="(v,k) in filteredDataTheme">
                        <th>{{k+1}}</th>
                        <td>{{v.theme_name}}</td>
                        <td>{{moment(v.user_survey_theme_date_start).format('DD/MM/YYYY')}} {{v.user_survey_theme_time_start}}&nbsp;-&nbsp;{{moment(v.user_survey_theme_date_expired).format('DD/MM/YYYY')}} {{v.user_survey_theme_time_expired}}</td>
                        <td>{{util.toHHMMSS(v.theme_duration)}}</td>
                        <td>{{v.user_survey_theme_score}}</td>
                        <td class="text-center" v-show="util.validateRole(role.SUPER)">
                            <i v-if="v.theme_status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.theme_status === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
                            <a v-if="v.user_survey_theme_status == 'PE' "
                               class="btn btn-warning btn-sm btn-block"
                               href
                               data-toggle="modal"
                               data-target="#modalStartExam"
                               @click.prevent="subParams.dataTheme = v">
                                <i class="fa fa-file-text-o fa-fw"></i>
                                <span>PENDIENTE</span>
                            </a>
                            <template v-if="v.user_survey_theme_status == 'RE' || v.user_survey_theme_status == 'PR'">
                                <template v-if="v.user_survey_theme_status == 'RE'">
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
                                        <button type="button" class="btn btn-info btn-sm" @click="verifyExamSolution(v.user_survey_theme_id)">
                                            <i class="fa fa-eye fa-fw"></i>
                                            <span>SOLUCION</span>
                                        </button>
                                    </div>
                                </template>
                            </template>
                            <button v-if="v.user_survey_theme_status == 'VE'" type="button" class="btn btn-danger">
                                <i class="fa fa-file-text-o fa-fw"></i>
                                <span>VENCIDO</span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && dataTheme.length < 1">
                    <tr>
                        <td colspan="8" class="text-dark text-center">
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
        <div class="modal fade in" id="modalStartExam" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <br>
                        <span>El exámen tiene una duración de <b>{{util.toHHMMSS(subParams.dataTheme.theme_duration)}}</b> minutos</span>
                        <br>
                        <br>
                        <span class="small text-danger">Atención: Una vez iniciado no hay opciones de reinicio del exámen, éste puede ser reprogramado solo por el administrador</span>
                        <br>
                        <br>
                    </div>
                    <div class="modal-footer w-100">
                        <button class="btn btn-outline-secondary w-30" type="button" data-dismiss="modal">
                            <span>Cancelar</span>
                        </button>
                        <router-link data-dismiss="modal" class="btn btn-outline-primary w-30"
                                     :to="{name:'exam',params:{dataTheme:subParams.dataTheme}}">
                            <span>Aceptar</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Mensaje Error de Examen Solucion -->
        <div class="modal fade in" id="modalQueryExamSolution" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <span class="text-secondary">Atención</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span>{{dataExamSolution}}</span>
                    </div>
                    <div class="modal-footer w-100">
                        <button class="btn btn-outline-secondary w-30" type="button" data-dismiss="modal">
                            <span>Cerrar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Crear Tema -->
        <modal-create-theme v-if="loadModal.createTheme" :dataProps="{dataSurvey,loadModal}"/>

        <!-- Modal Asignar Tema -->
        <modal-assign-theme v-if="loadModal.assignTheme" :dataProps="{dataSurvey,loadModal}"/>

    </div>
</template>

<script>
  import SurveyService    from '../../services/SurveyService'
  import ThemeService     from '../../services/ThemeService'
  import Util             from '../../util'
  import Storage          from 'vue-local-storage'
  import Role             from '../../role'
  import Moment           from 'moment'
  import ExamService      from '../../services/ExamService'
  import ModalCreateTheme from '../layouts_theme/ModalCreateTheme'
  import ModalAssignTheme from '../layouts_theme/ModalAssignTheme'

  export default {
    name: 'Themes',
    components: {ModalAssignTheme, ModalCreateTheme},
    data: () => ({
      role: Role,
      util: Util,
      moment: Moment,
      loadingTable: true,
      dataTheme: [],
      dataSurvey: [],
      inputSearchTheme: '',
      dataExamSolution: {},
      isViewTheme: true,
      loadModal: {
        createTheme: false,
        assignTheme: false,
      },
      subParams: {
        dataTheme: {},
      },
      params: {
        user_id: '',
        user_survey_id: '',
        user_survey_theme_id: '',
      },
    }),
    created () {
      this.load()
    },
    computed: {
      filteredDataTheme () {
        return this.dataTheme.filter((item) => {return item.theme_name.toLowerCase().indexOf(this.inputSearchTheme.toLowerCase()) > -1})
      },
    },
    methods: {
      load () {
        this.params.user_id = Storage.get('s-u-$4p14').id
        // if (Storage.get('s-u-$4p14').role.id == 1 || Storage.get('s-u-$4p14').role.id == 2) {
        //   SurveyService.dispatch('getSurveys', {self: this})
        // } else {
          SurveyService.dispatch('getSurveysByUserSurvey', {self: this})
        // }
      },
      change () {
        this.loadingTable = true
        this.dataTheme = []
        ThemeService.dispatch('getThemesByUserSurveyTheme', {self: this})
      },
      cleanSearch () {
        this.inputSearchTheme = ''
        this.$refs.ref_inputSearchTheme.focus()
      },
      verifyExamSolution (param_user_survey_theme_id) {
        this.params.user_survey_theme_id = param_user_survey_theme_id
        ExamService.dispatch('verifyExamSolution', {self: this})
      },
      openModal (modalId, self) {
        if (self == 1) {
          this.loadModal.createTheme = true
        } else {
          this.loadModal.assignTheme = true
        }
        Util.openModal(document, modalId)
      },
    },
  }
</script>

<style scoped>
</style>