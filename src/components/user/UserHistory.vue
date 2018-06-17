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
                        <th>Examen</th>
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
                        <td>{{v.theme_name}}</td>
                        <td>{{v.date_start}}</td>
                        <td>{{v.date_expired}}</td>
                        <!--<td>{{v.project.name}}</td>-->
                        <td>
                            <template v-if="v.user_survey_theme_status.toUpperCase() == 'P'">
                                <span>{{util.addCero(v.score)}}</span>
                            </template>
                            <template v-else>
                                <b title="Nota Desaprobada" v-if="parseInt(v.score) >= 0 && parseInt(v.score) <= 10" class="text-danger">{{util.addCero(v.score)}}</b>
                                <b title="Nota Media" v-if="parseInt(v.score) > 10 && parseInt(v.score) <= 12" class="text-secondary">{{v.score}}</b>
                                <b title="Nota Aprobada" v-if="parseInt(v.score) > 12" class="text-success">{{v.score}}</b>
                            </template>
                        </td>
                        <td hidden class="text-center">
                            <i v-if="v.status_table === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.status_table === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td hidden class="text-right">
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
                        <td class="text-right">
                            <template v-if="v.user_survey_theme_status.toUpperCase() == 'P' ">
                                <button type="button" class="btn btn-warning btn-sm btn-block" style="cursor: default">
                                    <i class="fa fa-file-text-o fa-fw"></i>
                                    <span>PENDIENTE</span>
                                </button>
                            </template>
                            <template v-else-if="v.user_survey_theme_status.toUpperCase() == 'RS'">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success btn-sm" style="cursor: default">
                                            <i class="fa fa-check fa-fw"></i>
                                            <span>REALIZADO</span>
                                        </button>
                                        <button type="button" class="btn btn-info btn-sm" @click="loadExamSolution(v.user_survey_theme_id)">
                                            <i class="fa fa-eye fa-fw"></i>
                                            <span>SOLUCION</span>
                                        </button>
                                    </div>
                            </template>
                            <template v-else-if="v.user_survey_theme_status.toUpperCase() == 'V'">
                                <button type="button" class="btn btn-danger btn-sm btn-block" style="cursor: default">
                                    <i class="fa fa-file-text-o fa-fw"></i>
                                    <span>VENCIDO</span>
                                </button>
                            </template>
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
  import Util            from '../../util'

  export default {
    name: 'UserHistory',
    data:()=>({
      util:Util,
      dataUserHistory:[],
      params:{
        user_id:'A',
        user_survey_theme_id:''
      }
    }),
    created(){
      this.load()
    },
    methods:{
      load(){
        this.params.user_id = this.$route.params.user_id;
        ThemeService.dispatch('getUserHistory',{self:this});
      },
      change(){
        this.load();
      },
      loadExamSolution (param_user_survey_theme_id) {
        this.$router.replace({
          name: 'admin-exam-solution',
          params: {user_survey_theme_id:param_user_survey_theme_id,before_path:this.$route.fullPath},
        })
      },
    }
  }
</script>

<style scoped>

</style>