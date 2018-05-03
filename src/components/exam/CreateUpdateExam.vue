<template>
    <div class="card">
        <form @submit.prevent="createOrUpdateExam()">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-3 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">Crear Examen</span>
                                <span v-else>Actualizar Examen</span>
                            </span>
                    </div>
                    <div class="col-9 text-right">
                        <router-link class="btn btn-link text-secondary" :to="{name:'questions'}">
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
                <div class="row">
                    <div class="col-12">
                        <div class="form-group text-center">
                            <img class="img-thumbnail w-20" src="./../../assets/img/logo.svg" alt="">
                        </div>
                        <div class="form-group">
                            <label>Cargar Imagen</label>
                            <input type="file" class="form-control" @click="getImage()"/>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label>Tema</label>
                            <!--<select title="ancuesta" class="form-control" v-model="params.theme_id" required-->
                            <!--@change="changeLoadOptionAnswers()">-->
                            <!--<option value="" disabled selected>Seleccionar Tema</option>-->
                            <!--<option v-for="(v) in dataTheme" :value="v.id">{{v.name}}</option>-->
                            <!--</select>-->
                            <vue-multiselect v-model="selectedTheme"
                                             selectedLabel="Seleccionado"
                                             deselectLabel="Remover"
                                             selectLabel="Seleccionar"
                                             placeholder="Buscar"
                                             :options="dataTheme"
                                             label="name"
                                             track-by="id"
                                             class="w-100" @change="changeLoadOptionAnswers()"/>
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
                            <label>Nombre Pregunta</label>
                            <input title v-model="params.name" type="text" class="form-control" required>
                        </div>
                    </div>
                    <!--<template v-if="params.theme_id != '' ">-->
                    <!--<div class="col-12">-->
                    <!--<div class="form-group">-->
                    <!--<label>Respuesta Correcta</label>-->
                    <!--<select title v-model="params.option_answer_id" class="form-control">-->
                    <!--<option value="">- Select Answer -</option>-->
                    <!--<option v-for="(v) in dataOptionAnswer" :value="v.id">{{v.name}}</option>-->
                    <!--</select>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</template>-->
                    <div id="arrayRptas" class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <label>Opciones de Respuesta</label>
                            </div>
                            <div class="col-6 text-right"><a href="#" @click.prevent="addInputRadio(1)">Agregar Item</a>
                            </div>
                        </div>
                        <template v-for="n in dataInputs">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">
                                            <input type="radio" name="opt_rpta" :value="n" required/>
                                        </div>
                                    </div>
                                    <input type="text" class="form-control" :placeholder="'respuesta '+n" required/>
                                    <template v-if="n > 4">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-danger" @click="removeInputRadio(1)"><i
                                                    class="fa fa-close"></i></button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import OptionAnswerService from '../../services/OptionAnswerService'
  import QuestionService     from '../../services/QuestionService'
  import ThemeService        from '../../services/ThemeService'
  import $                   from 'jquery'
  import VueMultiselect      from 'vue-multiselect/src/Multiselect'
  import ExamService         from '../../services/ExamService'

  export default {
    name: 'CreateUpdateExam',
    components: {VueMultiselect},
    data: () => ({
      isPost: true,
      dataTheme: [],
      dataQuestion: [],
      dataOptionAnswer: [],
      dataError: {},
      dataInputs: 4,
      showError: false,
      question_id: '',
      selectedTheme:'',
      params: {
        image: '',
        theme_id: '',
        name: '',
        option_answer_ids: [],
        level: 'F',
        status: 'A',
      },
    }),
    created () {
      this.allTheme()
      OptionAnswerService.dispatch('allOptionAnswer', {self: this})
      if (this.$route.params.dataQuestion != undefined && Object.keys(this.$route.params.dataQuestion).length) this.editQuestion()
    },
    methods: {
      createOrUpdateExam () {
        // if (this.isPost) {
        //   QuestionService.dispatch('createQuestion', {self: this})
        // } else {//isPut
        //   QuestionService.dispatch('updateQuestion', {self: this})
        // }
        // this.params.option_answer_id = ''
        this.params.option_answer_ids = []
        let arrayRadios = $('#arrayRptas').find('input[type=radio]')
        let arrayInputs = $('#arrayRptas').find('input[type=text]')
        $.each(arrayRadios, (k, v) => {
          if ($(v).is(':checked')) {
            this.params.option_answer_ids.push({id: $(v).val(), value: $(arrayInputs[k]).val(), checked: true})
          } else {
            this.params.option_answer_ids.push({id: $(v).val(), value: $(arrayInputs[k]).val(), checked: false})
          }
        })
        this.params.theme_id= this.selectedTheme.id;
        ExamService.dispatch('createExam', {self: this})
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
      allTheme () {
        ThemeService.dispatch('allTheme', {self: this})
      },
      changeLoadOptionAnswers () {
        OptionAnswerService.dispatch('allOptionAnswer', {self: this})
      },
      addInputRadio (item) {
        this.dataInputs = this.dataInputs + item
      },
      removeInputRadio (item) {
        this.dataInputs = (this.dataInputs - item)
      },
      getImage () {
        this.params.image = 'logo.svg'
      }
    }
  }
</script>

<style scoped>

</style>