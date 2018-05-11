<template>
    <div class="modal fade in" id="modalCreateTheme" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="createTheme()">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <span class="text-secondary">Crear Tema</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
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
                            <div class="col-12">
                                <div class="form-group">
                                    <label>
                                        <!--<popover-info :data_popover="{content:'a) Categorias cargadas '}"/>-->
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
  import ThemeService from '../../services/ThemeService'

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
        user_id: null,
      },
    }),
    created () {
    },
    methods: {
      load () {},
      createTheme () {
        ThemeService.dispatch('createTheme', {self: this})
      },
      closeModal () {
        this.$emit('closeModal')
      },
    }
  }
</script>

<style scoped>

</style>