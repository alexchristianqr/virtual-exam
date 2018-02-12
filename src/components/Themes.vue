<template>
    <section>
        <component :is="'nav-exam'"/>
        <div class="card mt-5">
            <div class="card-header bg-light text-dark">
                <b class="h4">Your Themes</b>
                <hr>
                <div class="form-inline">
                    <select v-model="params.user_id" class="form-control" @change="change()">
                        <option value="1">User 1</option>
                        <option value="2">User 2</option>
                        <option value="3">User 3</option>
                    </select>
                    <input type="search" class="form-control">
                    <router-link :to="'/create-theme'" class="btn btn-light" ><i class="fa fa-plus fa-fw"></i><span>Add</span></router-link>
                    <button class="btn btn-light"><i class="fa fa-search fa-fw"></i><span>Search</span></button>
                </div>
            </div>
            <div class="card-body">
                <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody v-if="loadingTable" class="table">
                            <tr>
                                <td colspan="5" class="text-dark text-center">
                                    <div style="padding: 3em 2em 0 2em">
                                        <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                        <p>Obteniendo Informacion!</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="!loadingTable && data.length > 1">
                        <tr v-for="(v,k) in data">
                            <th scope="row" width="5%">{{k+1}}</th>
                            <td width="50%">{{v.theme_name}}</td>
                            <td width="30%">{{v.theme_updated_at}}</td>
                            <td width="30%">{{v.theme_status}}</td>
                            <td width="15%">
                                <div v-if="v.user_survey_theme_status == 'P' " class="btn-group dropdown btn-group-xs" role="group">
                                    <a class="btn btn-warning" href data-toggle="modal" data-target="#infoModal" @click.prevent="p_theme_id = v.theme_id">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>PENDING</span>
                                    </a>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted" data-toggle="modal" data-target="#infoModal" @click.prevent="p_theme_id = v.theme_id">
                                                    <small>Start Examen</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="v.user_survey_theme_status == 'D' " class="btn-group dropdown btn-group-xs" role="group">
                                    <button type="button" class="btn btn-success">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>DONE</span>
                                    </button>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted">
                                                    <small>Solution</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="v.user_survey_theme_status == 'E' ">
                                    <button type="button" class="btn btn-danger">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>EXPIRED</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tbody v-else-if="!loadingTable && data.length <= 0" >
                        <tr>
                            <td colspan="5" class="text-dark text-center">
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
        <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span class="text-danger">Are you ready to start the exam?</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">The exam lasts 10 minutes with no option to cancel.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <router-link data-dismiss="modal" class="btn btn-primary" :to="{name:'exam',params:{theme_id:p_theme_id}}">Ready</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';
    import moment from 'moment';
    import SERVICE from '../services/ApiService';

    Vue.component("nav-exam", Nav);

    export default {
        data: () => ({
            loadingTable:true,
            data: [],
            moment:moment,
            id_theme:null,
            p_theme_id:null,
            params:{
                user_id:"1"
            }
        }),
        created() {
            this.loadThemes();
        },
        methods: {
            loadThemes() {
                SERVICE.dispatch("loadThemes", {self: this});
            },
            change(){
                this.loadingTable = true;
                this.data = [];
                this.loadThemes();
            }
        },
    }
</script>

<style scoped>

</style>