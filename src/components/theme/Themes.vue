<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Temas</span>
                    </div>
                    <div class="col-6 text-right">
                        <router-link :to="'/create-theme'" class="btn btn-outline-secondary"><i class="fa fa-plus fa-fw"></i><span>Crear Nuevo</span></router-link>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                        <select title v-model="params.user_survey_theme_id" class="form-control" @change="change()">
                            <option value="" selected>Seleccionar Categoria</option>
                            <option v-for="(v) in dataSurvey" :value="v.user_survey_id">{{v.name}}</option>
                        </select>
                    </div>
                    <div v-show="params.user_survey_theme_id != ''" class="input-group w-35">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-search"></i></span>
                        </div>
                        <input v-model="input_search_theme" ref="inputSearchTheme" type="search" placeholder="Buscar tema" class="form-control">
                        <div v-if="input_search_theme != ''" class="input-group-append">
                            <button title="limpiar busqueda" @click.prevent="input_search_theme = '' ; $refs.inputSearchTheme.focus()" type="button" class="btn btn-danger"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th>Nombre Tema</th>
                        <th>Actualizado</th>
                        <th>Duración</th>
                        <th>Nota</th>
                        <th width="5%" class="text-center">Estado</th>
                        <th width="10%" class="text-right">Acción</th>
                    </tr>
                    </thead>
                    <tbody v-if="loadingTable" class="table">
                    <tr>
                        <td colspan="7" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-if="!loadingTable && dataTheme.length > 0">
                    <tr v-for="(v,k) in filteredDataTheme">
                        <th>{{k+1}}</th>
                        <td>{{v.theme_name}}</td>
                        <td>{{v.theme_updated_at}}</td>
                        <td>{{util.toHHMMSS(v.theme_duration)}}</td>
                        <td>{{v.theme_score}}</td>
                        <td class="text-center">
                            <i v-if="v.theme_status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.theme_status === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td class="text-right">
                            <a v-if="v.user_survey_theme_status == 'P' "
                               class="btn btn-warning btn-sm"
                               href
                               data-toggle="modal"
                               data-target="#infoModal"
                               @click.prevent="p_dataTheme = v">
                                <i class="fa fa-file-text-o fa-fw"></i>
                                <span>PENDING</span>
                            </a>
                            <button v-if="v.user_survey_theme_status == 'D' " type="button" class="btn btn-success">
                                <i class="fa fa-file-text-o fa-fw"></i>
                                <span>DONE</span>
                            </button>
                            <div v-if="v.user_survey_theme_status == 'E' ">
                                <button type="button" class="btn btn-danger">
                                    <i class="fa fa-file-text-o fa-fw"></i>
                                    <span>EXPIRED</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && dataTheme.length <= 0">
                    <tr>
                        <td colspan="7" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                <p>Usted no cuenta con información disponible!</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Info Modal-->
        <div class="modal fade in" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span class="text-secondary">¿Estás listo para iniciar el examen?</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span>El examen tine una duración de <b>{{util.toHHMMSS(p_dataTheme.theme_duration)}}</b> minutos, sin opcion de cancelar.</span>
                        <br>
                        <br>
                        <small class="text-secondary"><b>Nota:</b> El tiempo del examen es exacto asi que no hay opciones de retroceso.</small>
                    </div>
                    <div class="modal-footer w-100">
                        <button class="btn btn-outline-secondary w-30" type="button" data-dismiss="modal">
                            <i class="fa fa-close fa-fw"></i>
                            <span>Cancelar</span>
                        </button>
                        <router-link data-dismiss="modal" class="btn btn-outline-primary w-30" :to="{name:'exam',params:{dataTheme:p_dataTheme}}">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Listo</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment  from 'moment';
    import SERVICE from '../../api/ApiService';
    import Util    from '../../util';

    export default {
        name: "Themes",
        data: () => ({
            util: Util,
            loadingTable: true,
            computedThemes:[],
            dataTheme: [],
            dataSurvey: [],
            moment: moment,
            id_theme: null,
            p_dataTheme: {},
            params: {
                user_id: "1",
                user_survey_theme_id: "",
            },
          input_search_theme:''
        }),
        created() {
            this.load();
        },
      computed:{
        filteredDataTheme(){
          return this.dataTheme.filter((item)=>{return item.theme_name.toLowerCase().indexOf(this.input_search_theme.toLowerCase()) > -1})
        }
      },
        methods: {
            load() {
                SERVICE.dispatch("allTheme", {self: this});
                SERVICE.dispatch("allByUserSurvey", {self: this});
            },
            change() {
                this.loadingTable = true;
                this.dataTheme = [];
                this.load();
            }
        },
    }
</script>

<style scoped>

</style>