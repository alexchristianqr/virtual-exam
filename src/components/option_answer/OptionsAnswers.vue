<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Lista de Opciones de Respuesta</span>
                    </div>
                    <div class="col-6 text-right">
                        <div v-show="util.validateRole([role.SUPER,role.ADMINISTRADOR,role.ESCRITOR])">
                            <router-link :to="{name:'create-option-answer'}" class="btn btn-outline-secondary">
                                <i class="fa fa-plus fa-fw"></i>
                                <span>Crear Nuevo</span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group w-35">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input type="search" placeholder="Search" class="form-control">
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title="" class="form-control" v-model="params.theme_id" @change="changeTheme()">
                            <option value="" selected>Seleccionar Tema</option>
                            <option v-for="(v) in dataTheme" :value="v.id">{{v.name}}</option>
                        </select>
                    </div>
                    <div v-if="params.theme_id !== '' " class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title="" class="form-control" v-model="params.question_id" @change="change()">
                            <option value="" selected>Seleccionar Pregunta</option>
                            <option v-for="(v) in dataQuestion" :value="v.id">{{v.name}}</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title="" class="form-control" v-model="params.status" @change="changeTheme()">
                            <option value="" selected>Seleccionar Estado</option>
                            <option value="A">Activo</option>
                            <option value="I">Inactivo</option>
                        </select>
                    </div>
                    <button title="actualizar datos" class="btn btn-outline-secondary" @click="refresh()"><i class="fa fa-refresh"></i></button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-sm table-hover">
                        <thead>
                        <tr>
                            <th><b>#</b></th>
                            <th width="60%">Nombre Respuesta</th>
                            <th width="20%">Actualizado</th>
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
                        <tbody v-if="!loadingTable && dataOptionAnswer.length">
                        <tr v-for="(v,k) in dataOptionAnswer">
                            <th>{{k+1}}</th>
                            <td>{{v.name}}</td>
                            <td>{{v.updated_at}}</td>
                            <td class="text-center">
                                <i title="Activo" v-if="v.status === 'A' " class="fa fa-circle text-success"></i>
                                <i title="Inactivo" v-else="" class="fa fa-circle text-danger"></i>
                            </td>
                            <td class="text-right">
                                <div class="btn-group dropdown btn-group-sm" role="group">
                                    <router-link class="btn btn-warning btn-sm"
                                                 :to="{name:'edit-option-answer',params:{dataOptionAnswer:v}}"><i
                                            class="fa fa-edit fa-fw"></i></router-link>
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
                        <tbody v-else-if="!loadingTable && dataOptionAnswer.length < 1">
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
        </div>
    </div>
</template>

<script>
  import ThemeService        from '../../services/ThemeService'
  import OptionAnswerService from '../../services/OptionAnswerService'
  import QuestionService     from '../../services/QuestionService'
  import Util             from '../../util'
  import Role             from '../../role'

  export default {
    name: 'OptionsAnswers',
    data: () => ({
      util:Util,
      role:Role,
      loadingTable: true,
      dataTheme: [],
      dataQuestion: [],
      dataOptionAnswer: [],
      params: {
        theme_id: '',
        question_id: '',
        status: '',
      },
    }),
    created () {
      this.load()
    },
    methods: {
      load () {
        ThemeService.dispatch('getThemesByUserSurveyTheme', {self: this})
        OptionAnswerService.dispatch('allOptionAnswer', {self: this})
      },
      dataLevels (key) {
        let array = []
        array['F'] = 'Facil'
        array['R'] = 'Regular'
        array['D'] = 'Dificil'
        return array[key]
      },
      change () {
        this.loadingTable = true
        OptionAnswerService.dispatch('allOptionAnswer', {self: this})
      },
      changeTheme () {
        this.params.question_id = ''
        this.loadingTable = true
        OptionAnswerService.dispatch('allOptionAnswer', {self: this})
        QuestionService.dispatch('allQuestion', {self: this})
      },
      refresh () {
        this.loadingTable = true
        OptionAnswerService.dispatch('allOptionAnswer', {self: this})
        QuestionService.dispatch('allQuestion', {self: this})
      }
    }
  }
</script>

<style scoped>

</style>