<template>
    <div class="card">
        <form @submit.prevent="createExam()" enctype="multipart/form-data">
            <div class="card-header bg-light text-dark">
                <div class="row">
                    <div class="col-6 mt-auto mb-auto">
                        <span class="card-title">Asignar Pregunta y Respuesta</span>
                    </div>
                    <div class="col-6 text-right">
                        <button type="submit" class="btn btn-outline-primary w-30">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Crear</span>
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
                    <div class="col-12">
                        <div v-show="showImageLoaded" id="imgLoaded" class="text-center">
                            <img class="img-thumbnail w-20" src="" alt="">
                        </div>
                        <div class="form-group">
                            <label>Cargar Imagen</label>
                            <input type="file" id="file" ref="file" class="form-control" @change="handleFileUpload()"/>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label>Seleccionar Tema o Examen</label>
                            <vue-multiselect v-model="selectedTheme"
                                             selectedLabel="Seleccionado"
                                             deselectLabel="Remover"
                                             selectLabel="Seleccionar"
                                             placeholder="Buscar"
                                             :options="dataTheme"
                                             :required="true"
                                             label="name"
                                             track-by="id"
                                             class="w-100"/>
                        </div>
                    </div>
                    <div class="col-6" hidden>
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
                    <div class="col-6" hidden>
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
                    <div id="arrayRptas" class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <label>Opciones de Respuesta</label>
                            </div>
                            <div class="col-6 text-right">
                                <a href="#" @click.prevent="addInputRadio(1)">Agregar Item</a>
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
                                            <button type="button" class="btn btn-danger" @click="removeInputRadio(1)">
                                                <i class="fa fa-close"></i>
                                            </button>
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
  import ThemeService   from '../../services/ThemeService'
  import ExamService    from '../../services/ExamService'
  import Util           from '../../util'
  import VueMultiselect from 'vue-multiselect/src/Multiselect'
  import Editor         from '@tinymce/tinymce-vue'
  import $              from 'jquery'

  export default {
    name: 'CreateUpdateExam',
    components: {VueMultiselect, Editor},
    data: () => ({
      util: Util,
      isPost: true,
      showImageLoaded: false,
      showError: false,
      dataTheme: [],
      dataQuestion: [],
      dataOptionAnswer: [],
      dataUsers: [],
      dataError: {},
      dataInputs: 4,
      question_id: '',
      selectedTheme: '',
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
      selectedUserId: {id: 0, value: 'Todos'},
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
      this.load()
    },
    methods: {
      load () {
        ThemeService.dispatch('allTheme', {self: this})
      },
      createExam () {
        if (this.selectedUserId != null && this.selectedTheme != null) {
          this.checkedOptionAnswer()
          this.params.theme_id = this.selectedTheme.id
          ExamService.dispatch('createExam', {self: this})
        } else {
          alert('complete todos los campos!')
        }
      },
      handleFileUpload () {
        this.params.image = this.$refs.file.files[0]
        let preview = document.querySelector('img'), file = this.$refs.file.files[0], reader = new FileReader()
        reader.onloadend = () => {
          preview.src = reader.result
        }
        if (file) {
          this.showImageLoaded = true
          reader.readAsDataURL(file)
        } else {
          this.showImageLoaded = false
          preview.src = ''
        }
      },
      addInputRadio (item) {
        this.dataInputs = this.dataInputs + item
      },
      removeInputRadio (item) {
        this.dataInputs = (this.dataInputs - item)
      },
      checkedOptionAnswer () {
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
      },
    },
  }
</script>

<style scoped>
</style>