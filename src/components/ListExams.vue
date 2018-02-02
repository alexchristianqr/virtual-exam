<template>
    <section>
        <component :is="'nav-exam'"/>
        <div class="card mt-5 mb-5">
            <div class="card-header">
                <b class="h5">Your Exams</b>
                <hr>
                <div class="form-inline">
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
                            <th scope="col">Name</th>
                            <th scope="col">Updated</th>
                            <th scope="col">Person</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="num in 2">
                            <th scope="row">{{num}}</th>
                            <td>Examen de Control de Cambios en GIT</td>
                            <td>2018-01-31 11:20:01</td>
                            <td>Alex Christian</td>
                            <td>
                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <button type="button" class="btn btn-warning" title="Exportar por defecto">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>Pending</span>
                                    </button>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li>
                                                <a href class="dropdown-item text-muted">
                                                    <!--<i class="fa fa-file-excel-o fa-fw"></i>-->
                                                    <small>Show Base Knowledge</small>
                                                </a>
                                            </li>
                                            <li>
                                                <a href class="dropdown-item text-muted" data-toggle="modal" data-target="#exampleModal">
                                                    <!--<i class="fa fa-file-excel-o fa-fw"></i>-->
                                                    <small>Start Exam</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="num in 2">
                            <th scope="row">{{num}}</th>
                            <td>Examen de Control de Cambios en GIT</td>
                            <td>2018-01-31 11:20:01</td>
                            <td>Alex Christian</td>
                            <td>
                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <button type="button" class="btn btn-success" disabled title="Exportar por defecto">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>Done</span>
                                    </button>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted">
                                                    <!--<i class="fa fa-file-excel-o fa-fw"></i>-->
                                                    <small>Show Solution</small>
                                                </a>
                                                <a href class="dropdown-item text-muted">
                                                    <!--<i class="fa fa-file-excel-o fa-fw"></i>-->
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

        <!-- Logout Modal-->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <router-link class="btn btn-primary"  data-dismiss="modal" aria-label="Close" :to="'/exam'">Ready</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';

    Vue.component("nav-exam",Nav);

    export default {
        name: "list-exams",
        methods:{}
    }
</script>

<style scoped>

</style>