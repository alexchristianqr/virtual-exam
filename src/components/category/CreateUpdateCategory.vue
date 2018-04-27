<template>
    <div class="card">
        <form @submit.prevent="createCategory()">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-3 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">Crear Categoria</span>
                                <span v-else>Actualizar Categoria</span>
                            </span>
                    </div>
                    <div class="col-9 text-right">
                        <router-link class="btn btn-link text-secondary" :to="{name:'categories'}">
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
                    <div class="col-6">
                        <div class="form-group">
                            <label>
                                <popover-info :data_popover="{content:'a) Categoria es el conjunto de Temas o Examenes, ejemplo: Itil, Medicina, Computación, Derecho.'}"/>
                                <span>Nombre Categoria</span>
                            </label>
                            <input title="tema" v-model="params.name" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-6">
                        <label>
                            <popover-info :data_popover="{content:'a) Selecciona a un USUARIO, para que la categoría pueda cargar en la sesion del usuario seleccionado. b) Selecciona TODOS, para que la categoría cargue en la sesion de todos los usuarios.'}"/>
                            <span>Usuario</span>
                        </label>
                        <vue-multiselect v-model="params.user_survey_id"
                                         selectedLabel="Seleccionado"
                                         deselectLabel="Remover"
                                         selectLabel="Seleccionar"
                                         placeholder="Buscar"
                                         :options="[{value:'Todos',id:''},{value:'Alex Quispe',id:'1'},{value:'Deysi Quispe',id:'2'}]"
                                         label="value"
                                         track-by="id"
                                         class="w-100"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import VueMultiselect from 'vue-multiselect'
  import PopoverInfo    from '../layouts/PopoverInfo'

  export default {
    name: 'CreateUpdateCategory',
    components: {PopoverInfo, VueMultiselect},
    data: () => ({
      isPost: true,
      dataSurvey: [],
      dataError: {},
      showError: false,
      params: {
        name: '',
        user_survey_id: '1',
        user_id: '1',
      },
    }),
    methods: {}
  }
</script>

<style scoped>

</style>