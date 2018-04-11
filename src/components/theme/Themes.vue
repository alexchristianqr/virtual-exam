<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Themes List</span>
                    </div>
                    <div class="col-6 text-right">
                        <router-link :to="'/create-theme'" class="btn btn-link text-secondary"><i class="fa fa-plus fa-fw"></i><span>Add Theme</span></router-link>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <select title v-model="params.user_survey_theme_id" class="form-control" @change="change()">
                        <option value="" disabled selected>- Select Survey -</option>
                        <option v-for="(v) in dataSurvey" :value="v.user_survey_id">{{v.name}}</option>
                    </select>
                    <input type="search" placeholder="Search" class="form-control w-45">
                </div>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Last Updated</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Score</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
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
                    <tr v-for="(v,k) in dataTheme">
                        <th scope="row" width="5%">{{k+1}}</th>
                        <td>{{v.theme_name}}</td>
                        <td>{{v.theme_updated_at}}</td>
                        <td>{{util.toHHMMSS(v.theme_duration)}}</td>
                        <td>{{v.theme_score}}</td>
                        <td>
                            <i v-if="v.theme_status === 'A' " class="fa fa-circle text-success"></i>
                            <i v-if="v.theme_status === 'I' " class="fa fa-circle text-danger"></i>
                        </td>
                        <td>
                            <a v-if="v.user_survey_theme_status == 'P' " class="btn btn-warning" href
                               data-toggle="modal" data-target="#infoModal" @click.prevent="p_dataTheme = v">
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
                            <span class="text-secondary">Are you ready to start the exam?</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">The exam lasts <b>{{util.toHHMMSS(p_dataTheme.theme_duration)}}</b> minutes
                        with no option to cancel.
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <router-link data-dismiss="modal" class="btn btn-outline-primary" :to="{name:'exam',params:{dataTheme:p_dataTheme}}">
                            Ready
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
            dataTheme: [],
            dataSurvey: [],
            moment: moment,
            id_theme: null,
            p_dataTheme: {},
            params: {
                user_id: "1",
                user_survey_theme_id: "1",
            }
        }),
        created() {
            this.load();
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