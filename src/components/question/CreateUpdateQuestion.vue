<template>
    <div>
        <div class="card">
            <form @submit.prevent="createOrUpdateQuestion()">
                <div class="card-header bg-light text-dark">
                    <div class="row">
                        <div class="col-3 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">New Question</span>
                                <span v-else>Update Question</span>
                            </span>
                        </div>
                        <div class="col-9 text-right">
                            <router-link class="btn btn-link text-secondary" :to="'/questions'">
                                <i class="fa fa-angle-left fa-fw"></i>
                                <span>Volver</span>
                            </router-link>
                            <button type="submit" class="btn btn-outline-primary w-20">
                                <i class="fa fa-check fa-fw"></i>
                                <span v-if="isPost">Save</span>
                                <span v-else>Update</span>
                            </button>
                            <button type="reset" class="btn btn-outline-secondary w-20">
                                <i class="fa fa-close fa-fw"></i>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="Object.keys(dataError).length > 0" class="alert alert-danger alert-dismissible fade show pb-0" role="alert">
                        <h5>Errors Found!</h5>
                        <div v-for="(v) in dataError">
                            <p><i class="fa fa-close fa-fw"></i>{{v[0]}}</p>
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
                        <div :class="isPost ? 'col-6': 'col-3' ">
                            <div class="form-group">
                                <label>Level</label>
                                <select title v-model="params.level" class="form-control" required>
                                    <option value="" selected disabled>- Select Level -</option>
                                    <option value="F">Facil</option>
                                    <option value="R">Regular</option>
                                    <option value="D">Dificil</option>
                                </select>
                            </div>
                        </div>
                        <div v-if="!isPost" class="col-3">
                            <div class="form-group">
                                <label>Status</label>
                                <select title v-model="params.status" class="form-control" required>
                                    <option value="" selected disabled>- Select Status -</option>
                                    <option value="A">Activo</option>
                                    <option value="I">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Question Name</label>
                                <input title v-model="params.name" type="text" class="form-control" required>
                            </div>
                        </div>
                        <template v-if="params.theme_id != '' ">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Answer Correct</label>
                                    <select title v-model="params.option_answer_id" class="form-control">
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
    </div>
</template>

<script>
    import SERVICE from '../../api/ApiService';

    export default {
        name: "CreateUpdateQuestion",
        data:()=>({
            isPost: true,
            dataTheme: [],
            dataQuestion: [],
            dataOptionAnswer: [],
            dataError: {},
            showError: false,
            question_id:"",
            params: {
                theme_id: "",
                name: "",
                option_answer_id: "",
                level: "F",
                status:"A",
            },
        }),
        created() {
            this.allTheme();
            SERVICE.dispatch("allOptionAnswer", {self: this});
            if(this.$route.params.dataQuestion != undefined && Object.keys(this.$route.params.dataQuestion).length) this.editQuestion();
        },
        methods: {
            createOrUpdateQuestion() {
                if(this.isPost){
                    SERVICE.dispatch("createQuestion", {self: this})
                } else {//isPut
                    SERVICE.dispatch("updateQuestion", {self: this})
                }
            },
            editQuestion(){
                this.isPost = false;//isPut
                this.dataQuestion = this.$route.params.dataQuestion;
                this.question_id = this.dataQuestion.id;
                this.params.theme_id = this.dataQuestion.theme_id;
                this.params.name = this.dataQuestion.name;
                this.params.option_answer_id = this.dataQuestion.option_answer_id;
                this.params.level = this.dataQuestion.level;
                this.params.status = this.dataQuestion.status;
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