<template>
    <section>
        <div class="card">
            <form @submit.prevent="createOrUpdateOptionAnswer()">
                <div class="card-header bg-light text-dark">
                    <div class="row">
                        <div class="col-6 mt-auto mb-auto">
                            <b class="h4">
                                <span v-if="isPost">New Option Answer</span>
                                <span v-else>Update Option Answer</span>
                            </b>
                        </div>
                        <div class="col-6 text-right">
                            <router-link class="btn btn-light" :to="'/options-answers'"><i class="fa fa-arrow-left fa-fw"></i><span>Volver</span></router-link>
                            <button type="submit" class="btn btn-info"><i class="fa fa-check fa-fw"></i>
                                <span v-if="isPost">Save</span>
                                <span v-else>Update</span>
                            </button>
                            <button type="reset" class="btn btn-danger"><i class="fa fa-close fa-fw"></i><span>Cancel</span></button>
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

                        <!--<div class="input-group">-->
                            <!--<select title="" class="form-control" v-model="params.question_id" @change="change()">-->
                                <!--<option value="" selected>- Select Question -</option>-->
                                <!--<option v-for="(v) in dataQuestion" :value="v.id">{{v.name}}</option>-->
                            <!--</select>-->
                            <!--<div class="input-group-append">-->
                                <!--<span class="input-group-text"><i class="fa fa-filter"></i></span>-->
                            <!--</div>-->
                        <!--</div>-->

                        <div class="col-6">
                            <div class="form-group">
                                <label>Question</label>
                                <div class="input-group">
                                    <select title="" class="form-control" v-model="params.question_id" @change="change()">
                                        <option value="" selected>- Select Question -</option>
                                        <option v-for="(v) in dataQuestion" :value="v.id">{{v.name}}</option>
                                    </select>
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fa fa-filter"></i></span>
                                    </div>
                                </div>
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
                                <input title="question" v-model="params.name" type="text" class="form-control" required>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import SERVICE from '../services/ApiService';

    export default {
        name: "create-update-option-answer",
        data:()=>({
            isPost: true,
            dataTheme: [],
            dataQuestion: [],
            dataOptionAnswer: [],
            dataError: {},
            showError: false,
            params: {
                theme_id: "",
                question_id: "",
                name: "",
                option_answer_id: "",
                level: "F",
                status:"A",
            },
        }),
        created() {
            // this.allTheme();
            // SERVICE.dispatch("allOptionAnswer", {self: this});
            SERVICE.dispatch("allQuestion", {self: this});
            if(this.$route.params.dataOptionAnswer != undefined && Object.keys(this.$route.params.dataOptionAnswer).length) this.editOptionAnswer();
        },
        methods: {
            createOrUpdateOptionAnswer() {
                if(this.isPost){
                    SERVICE.dispatch("createQuestion", {self: this})
                } else {//isPut
                    SERVICE.dispatch("updateQuestion", {self: this})
                }
            },
            editOptionAnswer(){
                this.isPost = false;//isPut
                this.dataOptionAnswer = this.$route.params.dataOptionAnswer;
                this.params.question_id = this.dataOptionAnswer.question_id;
                // this.params.theme_id = this.dataOptionAnswer.theme_id;
                this.params.name = this.dataOptionAnswer.name;
                this.params.status = this.dataOptionAnswer.status;
            },
        }
    }
</script>

<style scoped>

</style>