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
                        <input v-model="input_search_user" ref="inputSearchUser" type="search" placeholder="Buscar tema"
                               class="form-control">
                        <div v-if="input_search_user != ''" class="input-group-append">
                            <button title="limpiar busqueda" @click.prevent="(input_search_user='') ($refs.inputSearchUser.focus())" type="button" class="btn btn-danger"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                    <div class="input-group">
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
                </div>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Usuario</th>
                        <th>Proyecto</th>
                        <th width="5%" class="text-center">Estado</th>
                        <th width="20%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in dataUsers">
                        <th>{{k+1}}</th>
                        <td>{{v.name}}</td>
                        <td>{{v.project.name}}</td>
                        <td class="text-center">
                            <i v-if="v.status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.status === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
                            <router-link class="btn btn-info btn-sm" :to="{name:'user-history',params:{user_id:v.id}}">Historial de Examenes</router-link>
                            <!--<button class="btn btn-info btn-sm" @click="$router.push('/user-history')" type="button">Historial de Examenes</button>-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Users',
    data: () => ({
      input_search_user: '',
      dataUsers:[
        {id:1, name:'Alex Christian',project:{id:2,name:'interbank'},status:'A'},
        {id:2, name:'Dennis Davalos',project:{id:3,name:'corporativo'},status:'A'},
      ],
    })
  }
</script>

<style scoped>

</style>