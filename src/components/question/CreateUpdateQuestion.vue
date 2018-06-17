<template>
    <div class="card">
        <form @submit.prevent="createOrUpdateQuestion()">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">Crear Pregunta</span>
                                <span v-else>Actualizar Pregunta</span>
                            </span>
                    </div>
                    <div class="col-6 text-right">
                        <router-link class="btn btn-link text-secondary" :to="{name:'questions'}">
                            <i class="fa fa-angle-left fa-fw"></i>
                            <span>Volver</span>
                        </router-link>
                        <button type="submit" class="btn btn-outline-primary w-30">
                            <i class="fa fa-check fa-fw"></i>
                            <span v-if="isPost">Crear</span>
                            <span v-else>Actualizar</span>
                        </button>
                        <button type="reset" class="btn btn-outline-secondary w-30">
                            <i class="fa fa-close fa-fw"></i>
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label>Tema</label>
                            <select title="ancuesta" class="form-control" v-model="params.theme_id" required
                                    @change="changeLoadOptionAnswers()">
                                <option value="" disabled selected>Seleccionar Tema</option>
                                <option v-for="(v) in dataTheme" :value="v.id">{{v.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div :class="isPost ? 'col-6': 'col-3' ">
                        <div class="form-group">
                            <label>Nivel de Dificultad</label>
                            <select title v-model="params.level" class="form-control" required>
                                <option value="" selected disabled>Seleccionar Nivel</option>
                                <option value="F">Facil</option>
                                <option value="R">Regular</option>
                                <option value="D">Dificil</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="!isPost" class="col-3">
                        <div class="form-group">
                            <label>Estado</label>
                            <select title v-model="params.status" class="form-control" required>
                                <option value="" selected disabled>- Seleccionar Estado -</option>
                                <option value="A">Activo</option>
                                <option value="I">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label>Pregunta</label>
                            <editor v-model="params.name" :init="configEditor"></editor>
                        </div>
                    </div>
                    <template v-if="params.theme_id != '' ">
                        <div class="col-12">
                            <div class="form-group">
                                <label>Respuesta Correcta</label>
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
</template>

<script>
  import OptionAnswerService from '../../services/OptionAnswerService'
  import QuestionService     from '../../services/QuestionService'
  import ThemeService        from '../../services/ThemeService'
  import Editor         from '@tinymce/tinymce-vue'

  export default {
    name: 'CreateUpdateQuestion',
    components: {Editor},
    data: () => ({
      isPost: true,
      dataTheme: [],
      dataQuestion: [],
      dataOptionAnswer: [],
      dataError: {},
      showError: false,
      question_id: '',
      params: {
        theme_id: '',
        name: '',
        option_answer_id: '',
        level: 'F',
        status: 'A',
      },
      configEditor: {
        /* replace textarea having class .tinymce with tinymce editor */
        // selector: 'textarea#editor',
        /* theme of the editor */
        theme: 'modern',
        skin: 'lightgray',
        /* width and height of the editor */
        // width: '100%',
        // height: 150,
        /* display statusbar */
        statubar: true,
        /* plugin */
        plugins: [
          'visualblocks paste',
        ],
        /* toolbar */
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor',
        /* style */
        style_formats: [
          {
            title: 'Headers', items: [
              {title: 'Header 1', format: 'h1'},
              {title: 'Header 2', format: 'h2'},
              {title: 'Header 3', format: 'h3'},
              {title: 'Header 4', format: 'h4'},
              {title: 'Header 5', format: 'h5'},
              {title: 'Header 6', format: 'h6'},
            ],
          },
          {
            title: 'Inline', items: [
              {title: 'Bold', icon: 'bold', format: 'bold'},
              {title: 'Italic', icon: 'italic', format: 'italic'},
              {title: 'Underline', icon: 'underline', format: 'underline'},
              {title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
              {title: 'Superscript', icon: 'superscript', format: 'superscript'},
              {title: 'Subscript', icon: 'subscript', format: 'subscript'},
              {title: 'Code', icon: 'code', format: 'code'},
            ],
          },
          {
            title: 'Blocks', items: [
              {title: 'Paragraph', format: 'p'},
              {title: 'Blockquote', format: 'blockquote'},
              {title: 'Div', format: 'div'},
              {title: 'Pre', format: 'pre'},
            ],
          },
          {
            title: 'Alignment', items: [
              {title: 'Left', icon: 'alignleft', format: 'alignleft'},
              {title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
              {title: 'Right', icon: 'alignright', format: 'alignright'},
              {title: 'Justify', icon: 'alignjustify', format: 'alignjustify'},
            ],
          },
        ],
      },
    }),
    created () {
      this.getThemesByUserSurveyTheme()
      OptionAnswerService.dispatch('allOptionAnswer', {self: this})
      if (this.$route.params.dataQuestion != undefined && Object.keys(this.$route.params.dataQuestion).length) this.editQuestion()
    },
    methods: {
      createOrUpdateQuestion () {
        if (this.isPost) {
          QuestionService.dispatch('createQuestion', {self: this})
        } else {//isPut
          QuestionService.dispatch('updateQuestion', {self: this})
        }
      },
      editQuestion () {
        this.isPost = false//isPut
        this.dataQuestion = this.$route.params.dataQuestion
        this.question_id = this.dataQuestion.id
        this.params.theme_id = this.dataQuestion.theme_id
        this.params.name = this.dataQuestion.name
        this.params.option_answer_id = this.dataQuestion.option_answer_id
        this.params.level = this.dataQuestion.level
        this.params.status = this.dataQuestion.status
      },
      getThemesByUserSurveyTheme () {
        ThemeService.dispatch('getThemesByUserSurveyTheme', {self: this})
      },
      changeLoadOptionAnswers () {
        OptionAnswerService.dispatch('allOptionAnswer', {self: this})
      },
    }
  }
</script>

<style scoped>

</style>