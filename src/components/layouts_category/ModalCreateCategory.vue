<template>
    <div class="modal fade in" id="modalCreateCategory" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="createCategory()">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <span class="text-secondary">Crear Categoria</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Nombre Categoria</label>
                                    <input title="tema" v-model="params.name" type="text" class="form-control" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <label>Usuario</label>
                                <vue-multiselect v-model="selectedUserId"
                                                 selectedLabel="Seleccionado"
                                                 deselectLabel="Remover"
                                                 selectLabel="Seleccionar"
                                                 placeholder="Buscar"
                                                 :options="dataUsers"
                                                 label="value"
                                                 track-by="id"
                                                 class="w-100"/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!--<button type="button" class="btn btn-secondary w-30" data-dismiss="modal">Cancelar</button>-->
                        <button type="reset" class="btn btn-secondary w-30"  @click="closeModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary w-30">Guardar</button>
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

  export default {
    name: 'ModalCreateCategory',
    components: {VueMultiselect},
    data: () => ({
      isPost: true,
      loadingTable: true,
      modalId:'#modalCreateCategory',
      dataSurvey: [],
      dataUsers: [],
      selectedUserId: {id: 0, value: 'Todos'},
      params: {
        name: '',
        user_id: [],
      },
    }),
    created () {
      this.load()
    },
    methods: {
      load () {
        AuthService.dispatch('getUsers', {self: this})
      },
      createCategory () {
        if (this.selectedUserId != null) {
          if (this.selectedUserId.id == 0) {
            this.dataUsers.forEach((v) => {
              if (v.id !== 0) this.params.user_id.push(v.id)
            })
          } else {
            this.params.user_id = this.selectedUserId.id
          }
          SurveyService.dispatch('createSurvey', {self: this})
        } else {
          alert('debe seleccionar usuario')
        }
      },
      closeModal () {
        this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>

</style>