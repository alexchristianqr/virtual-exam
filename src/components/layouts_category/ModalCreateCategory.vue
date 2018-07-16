<template>
    <div class="modal fade in" id="modalCreateCategory" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form @submit.prevent="createCategory()">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title">
                            <span class="text-secondary">Crear Categoria</span>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group-sm">
                                    <label>Nombre Categoria</label>
                                    <input title="tema" v-model="params.name" type="text" class="form-control" required>
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
    name: 'ModalCreateCategory',
    components: {VueMultiselect},
    props: {
      dataProps: {},
    },
    data: () => ({
      modalId: '#modalCreateCategory',
      isPost: true,
      loadingTable: true,
      dataSurvey: [],
      dataUsers: [],
      checkedAll: false,
      selectedUserId: null,
      params: {
        name: '',
      },
    }),
    created() {
      this.load()
    },
    methods: {
      load() {
        AuthService.dispatch('getUsers', {self: this})
      },
      createCategory() {
          SurveyService.dispatch('createSurvey', {self: this})
      },
      closeModal() {
        this.dataProps.loadModal.createCategory = false
        Util.closeModal(this.modalId)
      },
    },
  }
</script>

<style scoped>

</style>