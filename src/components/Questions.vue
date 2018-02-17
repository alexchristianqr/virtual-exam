<template>
    <section>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <b class="h4">Questions</b>
                    </div>
                    <div class="col-6 text-right">
                        <router-link :to="'/create-question'" class="btn btn-light"><i
                                class="fa fa-plus fa-fw"></i><span>Add Question</span></router-link>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col">Status</th>
                            <th scope="col">Level</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody v-if="loadingTable" class="table">
                        <tr>
                            <td colspan="6" class="text-dark text-center">
                                <div style="padding: 3em 2em 0 2em">
                                    <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                    <p>Obteniendo Informacion!</p>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tbody v-if="!loadingTable && dataQuestion.length > 0">
                        <tr v-for="(v,k) in dataQuestion">
                            <th scope="row" width="5%">{{k+1}}</th>
                            <td>{{v.name}}</td>
                            <td>{{v.updated_at}}</td>
                            <td>{{v.status}}</td>
                            <td>{{dataLevels(v.level)}}</td>
                            <td width="15%">
                                <div v-if="v.user_survey_theme_status == 'P' " class="btn-group dropdown btn-group-xs"
                                     role="group">
                                    <a class="btn btn-warning" href data-toggle="modal" data-target="#infoModal"
                                       @click.prevent="p_theme_id = v.theme_id">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>PENDING</span>
                                    </a>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown" aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted" data-toggle="modal"
                                                   data-target="#infoModal" @click.prevent="p_theme_id = v.theme_id">
                                                    <small>Start Examen</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="v.user_survey_theme_status == 'D' " class="btn-group dropdown btn-group-xs"
                                     role="group">
                                    <button type="button" class="btn btn-success">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>DONE</span>
                                    </button>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown" aria-expanded="true">
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
                        <tbody v-else-if="!loadingTable && dataQuestion.length <= 0">
                        <tr>
                            <td colspan="6" class="text-dark text-center">
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
        </div>
    </section>
</template>

<script>
    import SERVICE from '../services/ApiService';

    export default {
        name: "questions",
        data: () => ({
            loadingTable: true,
            dataQuestion: [],
            params: {},
        }),
        created() {
            this.load();
        },
        methods: {
            load() {
                SERVICE.dispatch("allQuestion", {self: this});
            },
            dataLevels(key) {
                let array = [];
                array["F"] = "Facil";
                array["R"] = "Regular";
                array["D"] = "Dificil";
                return array[key];
            }
        }
    }
</script>

<style scoped>

</style>