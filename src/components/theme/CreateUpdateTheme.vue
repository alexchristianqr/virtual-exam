<template>
    <div class="card">
        <form @submit.prevent="createTheme()">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-3 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">Crear Tema</span>
                                <span v-else>Actualizar Tema</span>
                            </span>
                    </div>
                    <div class="col-9 text-right">
                        <router-link class="btn btn-link text-secondary" :to="{name:'themes'}">
                            <i class="fa fa-angle-left fa-fw"></i>
                            <span>Volver</span>
                        </router-link>
                        <button type="submit" class="btn btn-outline-primary w-20">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Crear</span>
                        </button>
                        <button type="reset" class="btn btn-outline-secondary w-20">
                            <i class="fa fa-close fa-fw"></i>
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-7">
                        <div class="form-group">
                            <label>
                                <popover-info :data_popover="{content:'a) Tema o Examen es el conjunto de preguntas y opciones de respuesta, ejemplo: Certificación de Microsoft, Capacitación de Sapia 2018.1, Capacitación de Sapia 2018.2.'}"/>
                                <span>Nombre Tema</span>
                            </label>
                            <input title="tema" v-model="params.name" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="form-group">
                            <label>
                                <popover-info :data_popover="{content:'a) Categorias cargadas '}"/>
                                <span>Categoria</span>
                            </label>
                            <select title="ancuesta" class="form-control" v-model="params.user_survey_id" required>
                                <option value="" disabled selected>Seleccionar Categoria</option>
                                <option v-for="(v) in dataSurvey" :value="v.user_survey_id">{{v.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Fecha Inicial</label>
                            <input title="tema" v-model="params.date_start" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Fecha Final</label>
                            <input title="tema" v-model="params.date_expired" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Tiempo Inicial</label>
                            <input title="tema" v-model="params.date_start" type="time" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label>Tiempo Final</label>
                            <input title="tema" v-model="params.date_expired" type="time" class="form-control" required>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import ThemeService  from '../../services/ThemeService'
  import SurveyService from '../../services/SurveyService'
  import PopoverInfo   from '../layouts/PopoverInfo'

  export default {
    name: 'CreateUpdateTheme',
    components: {PopoverInfo},
    data: () => ({
      isPost: true,
      dataSurvey: [],
      dataError: {},
      showError: false,
      params: {
        name: '',
        user_survey_id: '',
        user_id: '1',
      },
    }),
    created () {
      this.allSurvey()
    },
    methods: {
      createTheme () {
        ThemeService.dispatch('createTheme', {self: this})
      },
      allSurvey () {
        SurveyService.dispatch('allSurvey', {self: this})
      },
    },
  }
</script>

<style scoped>

</style>