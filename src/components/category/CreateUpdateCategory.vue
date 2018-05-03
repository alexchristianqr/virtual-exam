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
                                <popover-info
                                        :data_popover="{content:'a) Categoria es el conjunto de Temas o Examenes, ejemplo: Itil, Medicina, Computación, Derecho.'}"/>
                                <span>Nombre Categoria</span>
                            </label>
                            <input title="tema" v-model="params.name" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-6">
                        <label>
                            <popover-info
                                    :data_popover="{content:'a) Selecciona a un USUARIO, para que la categoría pueda cargar en la sesion del usuario seleccionado. b) Selecciona TODOS, para que la categoría cargue en la sesion de todos los usuarios.'}"/>
                            <span>Usuario</span>
                        </label>
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
        </form>
    </div>
</template>

<script>
  import VueMultiselect from 'vue-multiselect'
  import PopoverInfo    from '../layouts/PopoverInfo'
  import AuthService    from '../../services/AuthService'
  import SurveyService  from '../../services/SurveyService'

  export default {
    name: 'CreateUpdateCategory',
    components: {PopoverInfo, VueMultiselect},
    data: () => ({
      isPost: true,
      dataSurvey: [],
      dataUsers: [],
      dataError: {},
      showError: false,
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
      }
    }
  }
</script>

<style scoped>

</style>