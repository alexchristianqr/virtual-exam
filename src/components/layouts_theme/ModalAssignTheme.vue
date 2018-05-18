<template>
    <div class="modal fade in" id="modalAssignTheme" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form @submit.prevent="createUserSurveyTheme()">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title">
                            <span class="text-secondary">Asignar Tema / Usuario</span>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Seleccionar Categoria</label>
                                    <select class="form-control" v-model="params.survey_id" required @change="change">
                                        <option value="" disabled selected>Seleccionar Categoria</option>
                                        <option v-for="(v) in dataProps.dataSurvey" :value="v.id">{{v.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Seleccionar Tema o Examen</label>
                                    <vue-multiselect v-model="selectedThemeId"
                                                     :options="dataTheme"
                                                     :disabled="params.survey_id == ''"
                                                     label="name"
                                                     track-by="id"
                                                     selectedLabel="Seleccionado"
                                                     deselectLabel="Remover"
                                                     selectLabel="Seleccionar"
                                                     placeholder="Buscar"
                                                     class="w-100"
                                                     @input="selectedTheme">
                                        <span slot="noResult">No se han encontrado registros</span>
                                    </vue-multiselect>
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
                                                <input v-model="checkedAll" class="form-check-input" type="checkbox"
                                                       id="gridCheck1" @click="checkedAllUsers()">
                                                <label class="form-check-label" for="gridCheck1">Todos</label>
                                            </div>
                                        </div>
                                    </div>
                                    <vue-multiselect v-model="selectedUserId"
                                                     :options="dataUsers"
                                                     :disabled="checkedAll"
                                                     label="value"
                                                     track-by="id"
                                                     selectedLabel="Seleccionado"
                                                     deselectLabel="Remover"
                                                     selectLabel="Seleccionar"
                                                     placeholder="Buscar"
                                                     :multiple="true"
                                                     :close-on-select="false"
                                                     :clear-on-select="true"
                                                     :hide-selected="true"
                                                     :preserve-search="true"
                                                     :preselect-first="true"
                                                     @input="selectedUsers()">
                                        <span slot="noResult">No se han encontrado registros</span>
                                    </vue-multiselect>
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
  import PopoverInfo    from '../layouts/PopoverInfo'
  import ThemeService   from '../../services/ThemeService'
  import AuthService    from '../../services/AuthService'
  import Moment         from 'moment'
  import VueMultiselect from 'vue-multiselect/src/Multiselect'
  import Util           from '../../util'

  export default {
    name: 'ModalAssignTheme',
    components: {VueMultiselect, PopoverInfo},
    props: {
      dataProps: {},
    },
    data: () => ({
      dataTheme: [],
      dataUsers: [],
      isPost: true,
      modalId: '#modalAssignTheme',
      selectedThemeId: null,
      selectedUserId: null,
      checkedAll: false,
      params: {
        theme_id: null,
        survey_id: '',
        user_id: [],
        date_start: Moment().format('YYYY-MM-DD'),
        date_expired: Moment().format('YYYY-MM-DD'),
        time_start: '00:00:00',
        time_expired: '00:00:00',
      },
    }),
    created () {
      this.load()
    },
    methods: {
      load () {
        AuthService.dispatch('getUsers', {self: this})
      },
      restart () {
        this.selectedThemeId = null
        this.params.theme_id = null
        this.selectedUserId = null
        this.params.user_id = []
        this.params.survey_id = ''
        this.params.date_start = Moment().format('YYYY-MM-DD')
        this.params.date_expired = Moment().format('YYYY-MM-DD')
        this.params.time_start = '00:00:00'
        this.params.time_expired = '00:00:00'
        this.checkedAll = false
      },
      createUserSurveyTheme () {
        if (this.params.theme_id != null && this.params.user_id.length) {
          ThemeService.dispatch('createUserSurveyTheme', {self: this})
        } else {
          if (this.params.theme_id == null) alert('Debe seleccionar un tema.')
          if (this.params.user_id.length == []) alert('Debe seleccionar uno o mas usuarios.')
          return false
        }
      },
      change () {
        this.params.theme_id = null
        this.selectedThemeId = null
        ThemeService.dispatch('getThemesBySurvey', {self: this})
      },
      closeModal () {
        this.dataProps.loadModal.assignTheme = false
        Util.closeModal(this.modalId)
      },
      checkedAllUsers () {
        this.params.user_id = []
        if (!this.checkedAll) {
          this.selectedUserId = null
          this.dataUsers.forEach((v) => {
            this.params.user_id.push(v)
          })
        }
      },
      selectedUsers () {
        this.params.user_id = this.selectedUserId
      },
      selectedTheme () {
        if (this.selectedThemeId != null) {
          this.params.theme_id = this.selectedThemeId.id
        } else {
          this.params.theme_id = null
        }
      },
    },
  }
</script>

<style scoped>

</style>