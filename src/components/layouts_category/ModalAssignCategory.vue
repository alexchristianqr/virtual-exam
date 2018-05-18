<template>
    <div class="modal fade in" id="modalAssignCategory" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form @submit.prevent="assignCategory()">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title">
                            <span class="text-secondary">Asignar Categoria / Usuario</span>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Seleccionar Categoria</label>
                                    <select class="form-control" v-model="params.survey_id" required>
                                        <option value="" disabled selected>Seleccionar Categoria</option>
                                        <option v-for="(v) in dataProps.dataSurvey" :value="v.id">{{v.name}}</option>
                                    </select>
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
                                                     :options="dataUsers"
                                                     :disabled="checkedAll"
                                                     required
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
  import AuthService    from '../../services/AuthService'
  import SurveyService  from '../../services/SurveyService'
  import VueMultiselect from 'vue-multiselect'
  import Util             from '../../util'

  export default {
    name: 'ModalAssignCategory',
    components: {VueMultiselect},
    props: {
      dataProps: {},
    },
    data: () => ({
      modalId: '#modalAssignCategory',
      isPost: true,
      loadingTable: true,
      dataSurvey: [],
      dataUsers: [],
      checkedAll: false,
      selectedUserId: null,
      params: {
        name: '',
        user_id: [],
        survey_id : ''
      },
    }),
    created() {
      this.load()
    },
    methods: {
      load() {
        AuthService.dispatch('getUsers', {self: this})
      },
      restart() {
        this.checkedAll = false
        this.params.name = ''
        this.selectedUserId = null
        this.params.survey_id = ''
        this.params.user_id = []
      },
      assignCategory() {
        if (this.params.user_id.length == 0) {
          alert('Debe seleccionar uno o mas usuarios.')
          return false
        } else {
          SurveyService.dispatch('assignSurvey', {self: this})
        }
      },
      checkedAllUsers() {
        this.params.user_id = []
        if (!this.checkedAll) {
          this.selectedUserId = null
          this.dataUsers.forEach((v) => {
            this.params.user_id.push(v)
          })
        }
      },
      selectedUsers() {
        this.params.user_id = this.selectedUserId
      },
      closeModal() {
        this.dataProps.loadModal.assignCategory = false
        Util.closeModal(this.modalId)
      },
    },
  }
</script>

<style scoped>

</style>