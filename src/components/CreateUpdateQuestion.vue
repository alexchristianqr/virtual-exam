<template>
    <section>
        <div class="card">
            <form @submit.prevent="createQuestion()">
                <div class="card-header bg-light text-dark">
                    <div class="row">
                        <div class="col-6 mt-auto mb-auto">
                            <b class="h4">New Question</b>
                        </div>
                        <div class="col-6 text-right">
                            <router-link class="btn btn-light" :to="'/questions'"><i class="fa fa-arrow-left fa-fw"></i><span>Volver</span></router-link>
                            <button type="submit" class="btn btn-info"><i class="fa fa-check fa-fw"></i><span>Save</span></button>
                            <button type="reset" class="btn btn-danger"><i class="fa fa-close fa-fw"></i><span>Cancel</span></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="Object.keys(dataError).length > 0"
                         class="alert alert-danger alert-dismissible fade show pb-0" role="alert">
                        <h5>Errors Found!</h5>
                        <div v-for="(v) in dataError">
                            <p><b><i class="fa fa-close fa-fw"></i></b>{{v[0]}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Theme</label>
                                <select title="ancuesta" class="form-control" v-model="params.theme_id" required @change="changeLoadOptionAnswers()">
                                    <option value="" disabled selected>- Select Theme -</option>
                                    <option v-for="(v) in dataTheme" :value="v.id">{{v.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Level</label>
                                <select title v-model="params.level" class="form-control">
                                    <option value="" selected disabled>- Select Level -</option>
                                    <option value="F">Facil</option>
                                    <option value="R">Regular</option>
                                    <option value="D">Dificil</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Question Name</label>
                                <input title="question" v-model="params.name" type="text" class="form-control" required>
                            </div>
                        </div>
                        <template v-if="params.theme_id != '' ">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Answer Correct</label>
                                    <select title class="form-control">
                                        <option value="">- Select Answer -</option>
                                        <option v-for="(v) in dataOptionAnswer" :value="v.id">{{v.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import SERVICE from '../services/ApiService';

    export default {
        name: "create-update-question",
        data:()=>({
            dataTheme: [],
            dataOptionAnswer: [],
            dataError: {},
            showError: false,
            params: {
                name: "¿Cual es la diferencia mas puntual de windows 7 con windows 8?",
                theme_id: "",
                level: "F",
                user_id: "1"
            },
        }),
        created() {
            this.allTheme();
        },
        methods: {
            createQuestion() {
                SERVICE.dispatch("createQuestion", {self: {}})
            },
            allTheme() {
                SERVICE.dispatch("allTheme", {self: this})
            },
            changeLoadOptionAnswers(){
                SERVICE.dispatch("allOptionAnswer", {self: this})
            },
        }
    }
</script>

<style scoped>

</style>