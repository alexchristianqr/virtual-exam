<template>
    <section>
        <component :is="'nav-exam'"/>
        <div class="card mt-5 mb-5">
            <div class="card-header">
                <b class="h5">Your Themes</b>
                <div hidden class="form-inline">
                    <label>
                        <select class="form-control">
                            <option value="" selected disabled>Type Exam</option>
                            <option value="user">Pending</option>
                            <option value="backoffice">Finished</option>
                        </select>
                    </label>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(v,k) in data">
                            <th scope="row" width="5%">{{k+1}}</th>
                            <td width="50%">{{v.name}}</td>
                            <td width="30%">{{v.status}}</td>
                            <td width="15%">

                                <router-link hidden class="btn btn-warning" :to="{name:'your-exam',params:{theme_id:v.id}}">
                                    <i class="fa fa-file-text-o fa-fw"></i>
                                    <span>Pending</span>
                                </router-link>

                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <a class="btn btn-warning" href data-toggle="modal" data-target="#infoModal" @click.prevent="params.theme_id = v.id">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>Pending</span>
                                    </a>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted" data-toggle="modal" data-target="#infoModal">
                                                    <small>Start Examen</small>
                                                </a>
                                                <a href class="dropdown-item text-muted">
                                                    <small>Show Base Knowledge</small>
                                                </a>
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
                        <router-link data-dismiss="modal" class="btn btn-primary" :to="{name:'your-exam',params:{theme_id:params.theme_id}}">Ready</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';
    import $ from 'jquery';
    import moment from 'moment';
    import SERVICE from '../services/ExamService';

    Vue.component("nav-exam", Nav);

    export default {
        name: "your-themes",
        data: () => ({
            data: [],
            params:{
                theme_id:null
            }
        }),
        created() {
            this.loadYourThemes();
        },
        methods: {
            loadYourThemes() {
                return SERVICE.dispatch("loadYourThemes", {self: this});
            }
        },
    }
</script>

<style scoped>

</style>