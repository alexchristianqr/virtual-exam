<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Usuarios Historial</span>
                    </div>
                    <div class="col-6  mt-auto mb-auto text-right">
                        <router-link class="btn btn-link text-secondary" :to="'/users'">
                            <i class="fa fa-angle-left fa-fw"></i>
                            <span>Volver</span>
                        </router-link>
                    </div>
                </div>
                <hr>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Usuario</th>
                        <th>Fecha Inicial</th>
                        <th>Fecha Final</th>
                        <!--<th>Proyecto</th>-->
                        <th>Nota</th>
                        <th hidden width="5%" class="text-center">Estado</th>
                        <th width="20%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in dataUserHistory">
                        <th>{{k+1}}</th>
                        <td>{{v.name}}</td>
                        <td>{{v.date_start}}</td>
                        <td>{{v.date_expired}}</td>
                        <!--<td>{{v.project.name}}</td>-->
                        <td>{{v.score}}</td>
                        <td hidden class="text-center">
                            <i v-if="v.status_table === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.status_table === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
                            <div class="btn-group dropdown" role="group">
                                <button class="btn btn-warning btn-sm">Ver Solución</button>
                                <div class="btn-group open" role="group">
                                    <button type="button" class="btn btn-light btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                        <li title="Exportar">
                                            <a href="#" class="dropdown-item text-muted"><small><i class="fa fa-area-chart fa-fw"></i>Indicador</small></a>
                                            <a href="#" class="dropdown-item text-muted"><small><i class="fa fa-clock-o fa-fw"></i>Tiempo Promedio</small></a>
                                            <a href="#" class="dropdown-item text-muted"><small><i class="fa fa-file-photo-o fa-fw"></i>Grafico Progresivo</small></a>
                                        </li>
                                    </ul>
                                </div>
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
  import ThemeService    from '../../services/ThemeService'

  export default {
    name: 'UserHistory',
    data:()=>({
      dataUserHistory:[],
      params:{
        user_id:'A',
      }
    }),
    created(){
      // if(this.$route.params.user_id == 1){
      //   this.dataUserHistory = [
      //     {id:1, name:'Alex Christian',date_ini:'12/04/2018 18:00:01',date_fin:'12/04/2018 18:00:01',score:'13',project:{id:2,name:'interbank'},status:'A'},
      //     {id:2, name:'Alex Christian',date_ini:'10/04/2018 18:00:01',date_fin:'10/04/2018 18:00:01',score:'17',project:{id:2,name:'interbank'},status:'A'},
      //     {id:3, name:'Alex Christian',date_ini:'06/04/2018 18:00:01',date_fin:'06/04/2018 18:00:01',score:'19',project:{id:2,name:'interbank'},status:'A'},
      //   ]
      // }else{
      //   this.dataUserHistory = [
      //     {id:1, name:'Dennis Davalos',date_ini:'12/04/2018 18:00:01',date_fin:'12/04/2018 18:00:01',score:'15',project:{id:3,name:'corporativo'},status:'A'},
      //     {id:2, name:'Dennis Davalos',date_ini:'10/04/2018 18:00:01',date_fin:'10/04/2018 18:00:01',score:'19',project:{id:3,name:'corporativo'},status:'A'},
      //     {id:3, name:'Dennis Davalos',date_ini:'06/04/2018 18:00:01',date_fin:'06/04/2018 18:00:01',score:'12',project:{id:3,name:'corporativo'},status:'A'},
      //   ]
      // }
      this.load()
    },
    methods:{
      load(){
        this.params.user_id = this.$route.params.user_id;
        ThemeService.dispatch('getUserHistory',{self:this});
      },
      change(){
        this.load();
      }
    }
  }
</script>

<style scoped>

</style>