<template>
    <div class="card">
        <form @submit.prevent="createTheme()">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">Crear Tema</span>
                                <span v-else>Actualizar Tema</span>
                            </span>
                    </div>
                    <div class="col-6 text-right">
                        <router-link class="btn btn-link text-secondary" :to="{name:'themes'}">
                            <i class="fa fa-angle-left fa-fw"></i>
                            <span>Volver</span>
                        </router-link>
                        <button type="submit" class="btn btn-outline-primary w-30">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Crear</span>
                        </button>
                        <button type="reset" class="btn btn-outline-secondary w-30">
                            <i class="fa fa-close fa-fw"></i>
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label>
                                <popover-info :data_popover="{content:'a) Examen es el conjunto de preguntas y opciones de respuesta, ejemplo: Certificación de Microsoft, Capacitación de Sapia 2018.1, Capacitación de Sapia 2018.2.'}"/>
                                <span>Nombre o Titulo del Examen</span>
                            </label>
                            <input title="tema" v-model="params.name" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label>
                                <popover-info :data_popover="{content:'a) Categorias cargadas '}"/>
                                <span>Categoria</span>
                            </label>
                            <select class="form-control" v-model="params.survey_id" required>
                                <option value="" disabled selected>Seleccionar Categoria</option>
                                <option v-for="(v) in dataSurvey" :value="v.id">{{v.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Límite de Preguntas</label>
                            <input v-model="params.limite" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Tiempo Duración<span class="small"> (HH:mm)</span></label>
                            <input v-model="params.duration" type="time" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Fecha Inicial</label>
                            <input v-model="params.date_start" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Fecha Final</label>
                            <input v-model="params.date_expired" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Tiempo Inicial<span class="small"> (HH:mm)</span></label>
                            <input v-model="params.time_start" type="time" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Tiempo Final<span class="small"> (HH:mm)</span></label>
                            <input v-model="params.time_expired" type="time" class="form-control" required>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import ThemeService   from '../../services/ThemeService'
  import SurveyService  from '../../services/SurveyService'
  import PopoverInfo    from '../layouts/PopoverInfo'
  import Moment         from 'moment'
  import VueMultiselect from 'vue-multiselect/src/Multiselect'
  import AuthService    from '../../services/AuthService'

  export default {
    name: 'CreateUpdateTheme',
    components: {VueMultiselect, PopoverInfo},
    data: () => ({
      moment: Moment,
      isPost: true,
      dataSurvey: [],
      dataUsers: [],
      dataError: {},
      showError: false,
      params: {
        limite: '10',
        name: 'Examen de ',
        survey_id: '',
        user_id: '1',
        date_start: Moment().format('YYYY-MM-DD'),
        date_expired: Moment().format('YYYY-MM-DD'),
        duration: '00:10',
        time_start: '00:00',
        time_expired: '00:00',
      },
    }),
    created () {
      this.load()
    },
    methods: {
      load () {
        AuthService.dispatch('getUsers', {self: this})
        SurveyService.dispatch('allSurvey', {self: this})
      },
      createTheme () {
        this.params.duration = this.getSecondsOfTime(this.params.duration)
        ThemeService.dispatch('createTheme', {self: this})
      },
      getSecondsOfTime (time) {
        let array_time = time.split(':')
        if (array_time.length == 2) {
          let hh = Math.floor(array_time[0] * 60),
            mm = Math.floor(array_time[1] * 60)
          return hh + mm
        }
      },
    },
  }
</script>

<style scoped>

</style>