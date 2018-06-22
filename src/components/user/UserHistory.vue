<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Usuarios Historial de Examenes</span>
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