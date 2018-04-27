<template>
    <div>
        <div class="card">
            <form @submit.prevent="createOrUpdateOptionAnswer()">
                <div class="card-header bg-light text-dark">
                    <div class="row">
                        <div class="col-3 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">Crear Opcion Respuesta</span>
                                <span v-else>Actualizar Opcion Respuesta</span>
                            </span>
                        </div>
                        <div class="col-9 text-right">
                            <router-link class="btn btn-link text-secondary" :to="{name:'options-answers'}">
                                <i class="fa fa-angle-left fa-fw"></i>
                                <span>Volver</span>
                            </router-link>
                            <button type="submit" class="btn btn-outline-primary w-20">
                                <i class="fa fa-check fa-fw"></i>
                                <span v-if="isPost">Crear</span>
                                <span v-else>Actualizar</span>
                            </button>
                            <button type="reset" class="btn btn-outline-secondary w-20">
                                <i class="fa fa-close fa-fw"></i>
                                <span>Cancelar</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="Object.keys(dataError).length > 0"
                         class="alert alert-danger alert-dismissible fade show pb-0" role="alert">
                        <h5>Errors Found!</h5>
                        <div v-for="(v) in dataError">
                            <p><i class="fa fa-close fa-fw"></i>{{v[0]}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Tema</label>
                                <select title="ancuesta" class="form-control" v-model="params.theme_id" required @change="changeLoadOptionAnswers()">
                                    <option value="" disabled selected>Seleccionar Tema</option>
                                    <option v-for="(v) in dataTheme" :value="v.id">{{v.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div v-show="params.theme_id!=''" :class=" isPost ? 'col-6' : 'col-10' ">
                            <div class="form-group">
                                <label>Pregunta</label>
                                <select title="" class="form-control" v-model="params.question_id">
                                    <option value="" selected>- Select Question -</option>
                                    <option v-for="(v) in dataQuestion" :value="v.id">{{v.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div v-if="!isPost" class="col-2">
                            <div class="form-group">
                                <label>Estado</label>
                                <select title v-model="params.status" class="form-control" required>
                                    <option value="" selected disabled>- Select Status -</option>
                                    <option value="A">Activo</option>
                                    <option value="I">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Nombre Opcion Respuesta</label>
                                <input title="question" v-model="params.name" type="text" class="form-control" required>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import OptionAnswerService from '../../services/OptionAnswerService'
  import ThemeService from '../../services/ThemeService'
  import QuestionService from '../../services/QuestionService'

  export default {
    name: 'CreateUpdateOptionAnswer',
    data: () => ({
      isPost: true,
      dataTheme: [],
      dataQuestion: [],
      dataOptionAnswer: [],
      dataError: {},
      showError: false,
      params: {
        theme_id:'',
        option_answer_id: '',
        question_id: '',
        name: '',
        status: 'A',
      },
    }),
    created() {
      this.load()
    },
    methods: {
      load(){
        ThemeService.dispatch("allTheme", {self: this});
        QuestionService.dispatch('allQuestion', {self: this})
        if (this.$route.params.dataOptionAnswer != undefined && Object.keys(this.$route.params.dataOptionAnswer).length) this.editOptionAnswer()
      },
      createOrUpdateOptionAnswer() {
        if (this.isPost) {
          OptionAnswerService.dispatch('createOptionAnswer', {self: this})
        } else {//isPut
          OptionAnswerService.dispatch('updateOptionAnswer', {self: this})
        }
      },
      editOptionAnswer() {
        this.isPost = false//isPut
        this.dataOptionAnswer = this.$route.params.dataOptionAnswer
        this.params.option_answer_id = this.dataOptionAnswer.id
        this.params.question_id = this.dataOptionAnswer.question_id
        this.params.name = this.dataOptionAnswer.name
        this.params.status = this.dataOptionAnswer.status
      },
    },
  }
</script>

<style scoped>

</style>