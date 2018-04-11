<template>
    <div>
        <div class="card">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Questions</span>
                    </div>
                    <div class="col-6 text-right">
                        <router-link :to="'/create-question'" class="btn btn-link text-secondary"><i class="fa fa-plus fa-fw"></i><span>Add Question</span></router-link>
                    </div>
                </div>
                <hr>
                <div class="form-inline">
                    <div class="input-group">
                        <select title="" class="form-control" v-model="params.theme_id" @change="change()">
                            <option value="" selected>- Select Theme -</option>
                            <option v-for="(v) in dataTheme" :value="v.id">{{v.name}}</option>
                        </select>
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                    </div>
                    <div class="input-group">
                        <select title="" class="form-control" v-model="params.status" @change="change()">
                            <option value="" selected>- Select Status -</option>
                            <option value="A">Activo</option>
                            <option value="I">Inactivo</option>
                        </select>
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                    </div>
                    <div class="input-group">
                        <select title="" class="form-control" v-model="params.level" @change="change()">
                            <option value="" selected>- Select Level -</option>
                            <option value="F">Facil</option>
                            <option value="R">Regular</option>
                            <option value="D">Dificil</option>
                        </select>
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="fa fa-filter"></i></span>
                        </div>
                    </div>
                    <button class="btn btn-success" @click="change()"><i class="fa fa-refresh"></i></button>
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
                            <td>
                                <i v-if="v.status === 'A' " class="fa fa-circle text-success"></i>
                                <i v-else="" class="fa fa-circle text-danger"></i>
                            </td>
                            <td>{{dataLevels(v.level)}}</td>
                            <td width="15%">
                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <router-link class="btn btn-warning" :to="{name:'edit-question',params:{dataQuestion:v}}"><i class="fa fa-edit fa-fw"></i></router-link>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted">
                                                    <small>Change Status</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tbody v-else-if="!loadingTable && dataQuestion.length <= 0">
                        <tr>
                            <td colspan="6" class="text-dark text-center">
                                <div style="padding: 3em 2em 0 2em">
                                    <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                    <p>No hay información disponible!</p>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SERVICE from '../../api/ApiService';

    export default {
        name: "Questions",
        data: () => ({
            loadingTable: true,
            dataTheme: [],
            dataQuestion: [],
            params: {
                theme_id:"",
                status:"",
                level:"",
            },
        }),
        created() {
            this.load();
        },
        methods: {
            load() {
                SERVICE.dispatch("allTheme", {self: this});
                SERVICE.dispatch("allQuestion", {self: this});
            },
            dataLevels(key) {
                let array = [];
                array["F"] = "Facil";
                array["R"] = "Regular";
                array["D"] = "Dificil";
                return array[key];
            },
            change(){
                this.loadingTable = true;
                SERVICE.dispatch("allQuestion", {self: this});
            }
        }
    }
</script>

<style scoped>

</style>