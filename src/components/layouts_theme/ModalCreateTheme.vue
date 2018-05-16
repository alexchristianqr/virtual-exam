<template>
    <div class="modal fade in" id="modalCreateTheme" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form @submit.prevent="createTheme()">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title">
                            <span class="text-secondary">Crear Tema</span>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>
                                        <span>Nombre o Titulo del Examen</span>
                                    </label>
                                    <input title="tema" v-model="params.name" type="text" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Límite de Preguntas</label>
                                    <input v-model="params.limit_questions" type="text" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Tiempo Duración<span class="small"> (HH:mm)</span></label>
                                    <input v-model="params.duration" type="time" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>
                                        <span>Seleccionar Categoria</span>
                                    </label>
                                    <select class="form-control" v-model="params.survey_id" required>
                                        <option value="" disabled selected>Seleccionar Categoria</option>
                                        <option v-for="(v) in dataProps.dataSurvey" :value="v.id">{{v.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-light">
                        <button type="reset" class="btn btn-outline-secondary w-20" @click="closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-outline-primary w-20">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import ThemeService from '../../services/ThemeService'
  import Util             from '../../util'

  export default {
    name: 'ModalCreateTheme',
    props: {
      dataProps: {}
    },
    data: () => ({
      isPost: true,
      modalId:'#modalCreateTheme',
      params: {
        name: 'Examen de ',
        survey_id: '',
        limit_questions: '10',
        duration: '00:10:00',
      },
    }),
    created () {
    },
    methods: {
      load () {},
      restart() {
        this.params.name = 'Examen de '
        this.params.survey_id = ''
        this.params.limit_questions = '10'
        this.params.duration = '00:10:00'
      },
      createTheme () {
        this.params.duration = this.getSecondsOfTime(this.params.duration)
        ThemeService.dispatch('createTheme', {self: this})
      },
      closeModal () {
        this.dataProps.loadModal.createTheme = false
        Util.closeModal(this.modalId)
      },
      getSecondsOfTime (time) {
        let array_time = time.split(':')
        if (array_time.length == 2) {
          let hh = Math.floor(array_time[0] * 60),
            mm = Math.floor(array_time[1] * 60)
          return hh + mm
        }
      },
    }
  }
</script>

<style scoped>

</style>