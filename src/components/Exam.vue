<template>
    <section>
        <component :is="'nav-exam'"/>
        <div class="card mt-5 mb-5">
            <div class="card-header">
                <router-link class="btn pl-0" :to="'/list-exams'"><i class="fa fa-angle-left fa-2x"></i>&nbsp;&nbsp;&nbsp;<b class="h5">Exam #1</b></router-link>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <div class="form-inline">
                            <label>
                                <select class="form-control">
                                    <option value="" selected disabled>Type Exam</option>
                                    <option value="user">Pending</option>
                                    <option value="backoffice">Finished</option>
                                </select>
                            </label>
                            <label>
                                <select class="form-control">
                                    <option value="" selected disabled>Type Exam</option>
                                    <option value="user">Pending</option>
                                    <option value="backoffice">Finished</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="pull-right">
                            <div class="input-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Time Remaining</span>
                                </div>
                                <span class="form-control">00:10:00</span>
                            </div>
                        </div>
                    </div>
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
                        <tr v-for="num in 30">
                            <th scope="row">{{num}}</th>
                            <td>Examen de Control de Cambios en GIT</td>
                            <td>2018-01-31 11:20:01</td>
                            <td>Alex Christian</td>
                            <td>
                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <button type="button" class="btn btn-warning" title="Exportar por defecto">
                                        <i class="fa fa-file-excel-o fa-fw"></i>
                                        <span>Examen Pendiente</span>
                                    </button>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <button class="dropdown-item text-muted"><i
                                                        class="fa fa-file-excel-o fa-fw"></i>
                                                    <small>Show Solution</small>
                                                </button>
                                                <button class="dropdown-item text-muted"><i
                                                        class="fa fa-file-excel-o fa-fw"></i>
                                                    <small>Show Base Knoledge</small>
                                                </button>
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
    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';

    Vue.component("nav-exam", Nav);

    export default {
        name: "exam",
        data: () => ({
            data: [],
        }),
        created() {

        },
        methods: {
            load(id) {

            }
        }
    }
</script>

<style scoped>

</style>