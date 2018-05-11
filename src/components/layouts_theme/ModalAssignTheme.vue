<template>
    <div class="modal fade in" id="modalAssignTheme" data-backdrop="static" data-keyboard="false" tabindex="-1"
         role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form @submit.prevent="createTheme()">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <span class="text-secondary">Asignar Tema</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Seleccionar Tema o Examen</label>
                                    <vue-multiselect v-model="selectedTheme"
                                                     selectedLabel="Seleccionado"
                                                     deselectLabel="Remover"
                                                     selectLabel="Seleccionar"
                                                     placeholder="Buscar"
                                                     :options="dataTheme"
                                                     :required="true"
                                                     label="name"
                                                     track-by="id"
                                                     class="w-100"/>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Límite de Preguntas</label>
                                    <input v-model="params.limite" type="text" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Tiempo Duración<span class="small"> (HH:mm)</span></label>
                                    <input v-model="params.duration" type="time" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Fecha Inicial</label>
                                    <input v-model="params.date_start" type="date" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Fecha Final</label>
                                    <input v-model="params.date_expired" type="date" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Tiempo Inicial<span class="small"> (HH:mm)</span></label>
                                    <input v-model="params.time_start" type="time" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Tiempo Final<span class="small"> (HH:mm)</span></label>
                                    <input v-model="params.time_expired" type="time" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <div class="form-group row">
                                        <div class="col-sm-3">Seleccionar Usuarios</div>
                                        <div class="col-sm-9">
                                            <div class="form-check">
                                                <input v-model="checkedAll" class="form-check-input" type="checkbox" id="gridCheck1" @click="checkedAllUsers()">
                                                <label class="form-check-label" for="gridCheck1">Todos</label>
                                            </div>
                                        </div>
                                    </div>
                                    <vue-multiselect v-model="selectedUserId"
                                                     selectedLabel="Seleccionado"
                                                     deselectLabel="Remover"
                                                     selectLabel="Seleccionar"
                                                     placeholder="Buscar"
                                                     :multiple="true"
                                                     :options="dataUsers"
                                                     :disabled="checkedAll"
                                                     :required="true"
                                                     label="value"
                                                     track-by="id"
                                                     class="w-100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-secondary w-30" @click="closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary w-30">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import PopoverInfo  from '../layouts/PopoverInfo'
  import ThemeService from '../../services/ThemeService'

  import Moment         from 'moment'
  import VueMultiselect from 'vue-multiselect/src/Multiselect'
  import AuthService    from '../../services/AuthService'

  export default {
    name: 'ModalAssignTheme',
    components: {VueMultiselect, PopoverInfo},
    props: {
      dataProps: {}
    },
    data: () => ({
      dataTheme: [],
      dataUsers: [],
      isPost: true,
      selectedTheme: '',
      selectedUserId: null,
      checkedAll: false,
      params: {
        limite: '10',
        name: 'Examen de ',
        survey_id: '',
        user_id: [],
        date_start: Moment().format('YYYY-MM-DD'),
        date_expired: Moment().format('YYYY-MM-DD'),
        duration: '00:10:00',
        time_start: '00:00:00',
        time_expired: '00:00:00',
      },
    }),
    created () {
      this.load()
    },
    methods: {
      load () {
        ThemeService.dispatch('allTheme', {self: this})
        AuthService.dispatch('getUsers', {self: this})
      },
      createTheme () {
        // if (this.selectedUserId != null) {
        //   if (this.selectedUserId.id == 0) {
        //     this.dataUsers.forEach((v) => {
        //       if (v.id !== 0) this.params.user_id.push(v.id)
        //     })
        //   } else {
        //     this.params.user_id = this.selectedUserId.id
        //   }
        this.params.duration = this.getSecondsOfTime(this.params.duration)
        ThemeService.dispatch('createTheme', {self: this})
      },
      closeModal () {
        this.$emit('closeModal')
      },
      getSecondsOfTime (time) {
        let array_time = time.split(':')
        if (array_time.length == 2) {
          let hh = Math.floor(array_time[0] * 60),
            mm = Math.floor(array_time[1] * 60)
          return hh + mm
        }
      },
      checkedAllUsers () {
        this.params.user_id = []
        if (!this.checkedAll) {
          this.selectedUserId = null
          this.dataUsers.forEach((v) => {
            this.params.user_id.push(v.id)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>