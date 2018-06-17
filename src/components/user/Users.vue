<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Usuarios</span>
                    </div>
                    <div class="col-6 text-right">
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group w-35">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input v-model="input_search_user" ref="inputSearchUser" type="search" placeholder="Buscar"
                               class="form-control">
                        <div v-if="input_search_user != ''" class="input-group-append">
                            <button title="Limpiar Busqueda"
                                    @click.prevent="input_search_user='' ; $refs.inputSearchUser.focus()" type="button"
                                    class="btn btn-danger"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                    <div hidden class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <select class="form-control">
                            <option value="">Seleccionar Proyecto</option>
                            <option value="1">Entel</option>
                            <option value="2">Interbank</option>
                            <option value="3">Corporativo</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title="" class="form-control" v-model="params.status" @change="change">
                            <option value="" selected>Seleccionar Estado</option>
                            <option value="A">Activo</option>
                            <option value="I">Inactivo</option>
                        </select>
                    </div>
                    <button title="actualizar datos" class="btn btn-outline-secondary" @click="change"><i class="fa fa-refresh"></i></button>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Usuario</th>
                        <th>Tipo</th>
                        <th width="5%" class="text-center">Estado</th>
                        <th width="20%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody v-if="loadingTable" class="table">
                    <tr>
                        <td colspan="4" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-if="!loadingTable && dataUsers.length" class="table">
                    <tr v-for="(v,k) in filteredDataUsers">
                        <th>{{k+1}}</th>
                        <td>{{v.name}}</td>
                        <td><span class="text-capitalize">{{v.role_name}}</span></td>
                        <td class="text-center">
                            <i v-if="v.status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.status === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
                            <router-link class="btn btn-info btn-sm" :to="{name:'user-history',params:{user_id:v.id}}">Historial de Examenes</router-link>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && dataUsers.length < 1">
                    <tr>
                        <td colspan="4" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                <p>No hay información disponible!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import AuthService from '../../services/AuthService'
  import Storage from 'vue-local-storage'

  export default {
    name: 'Users',
    data: () => ({
      input_search_user: '',
      loadingTable: true,
      dataUsers: [],
      params: {
        status: 'A',
        role_id:Storage.get('s-u-$4p14').role.id
      },
    }),
    computed: {
      filteredDataUsers () {
        return this.dataUsers.filter(
          (item) => {return item.name.toLowerCase().indexOf(this.input_search_user.toLowerCase()) > -1})
      },
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        AuthService.dispatch('allUser', {self: this})
      },
      change () {
        this.loadingTable = true
        this.load()
      },
    },
  }
</script>

<style scoped>

</style>