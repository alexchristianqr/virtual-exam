<template>
    <div>
        <div class="card mb-5">
            <div v-if="showCardHeader" class="card-header bg-white pt-1 pb-1">
                <div class="row mb-0">
                    <div class="alert bg-primary text-white fade show mb-0" role="alert">
                        <span><b>Nota:&nbsp;&nbsp;</b>Usted esta realizando el examen en estos momentos, favor no refresque el navegador el controlador de refresh se encuentra inabilitado caso contrario los datos seran enviados y no podra nuevamente tomar su examen.</span>
                        <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close" @click.prevent="showCardHeader=false">-->
                        <!--<span aria-hidden="true">&times;</span>-->
                        <!--</button>-->
                    </div>
                </div>
                <div class="row mt-1 mb-0 pb-0">
                    <template
                            v-if="isMinute<=0 && (isMinute==0 ? isSecond<=31 : isSecond!=undefined) && remaining != duration_1">
                        <div class="col-12 ml-0 pl-0 pb-0 mr-0 pr-0 mb-0">
                            <div id="showAlertFinally"
                                 v-if="isMinute<=0 && (isMinute==0 ? isSecond<=31 : isSecond!=undefined) && remaining != duration_1"
                                 class="alert alert-danger text-center mb-0" role="alert">
                                <div>
                                    <span>El exámen va a terminar en</span>
                                    <br>
                                    <b class="h5">{{remaining}}</b>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="col-12 ml-0 pl-0 pb-0 mr-0 pr-0 mb-0">
                            <div class="alert alert-dark text-center mb-0" role="alert">
                                <b class="h5">{{remaining}}</b>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="card-body mb-0 pb-0">
                <table v-if="loadingTable" class="table">
                    <tr>
                        <td colspan="auto" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                </table>
                <table v-if="!loadingTable && dataExam.length > 0" class="table table-sm table-vue">
                    <thead>
                    <tr>
                        <th colspan="5" class="border-top-0 border-bottom-0 pt-0">
                            <div v-html="dataExam[next].question_name"></div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="dataExam[next].question_image !== '' ">
                        <td class="m-0 p-0">
                            <div class="col-4 offset-4">
                                <div class="img-thumbnail text-center mt-1 mb-1">
                                    <img :src="util.getImgUrl(dataExam[next].question_image)" alt="" width="200px"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(v,k) in dataExam[next].options_answers">
                        <td width="110%" :class="parseInt(k) == 0 ? 'pl-1' : 'pl-1'">
                            <b>{{util.returnLetter(k)}})&nbsp;</b>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" :for="util.returnLetter(k)+dataExam[next].id">
                                    <input :data-id="dataExam[next].id"
                                           class="form-check-input"
                                           type="radio"
                                           :name="'opt'+dataExam[next].id" :id="util.returnLetter(k)+dataExam[next].id"
                                           :value="v.id"
                                           @click="doChecked()"/>
                                    <span>{{v.name}}</span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td width="100%" class="text-center pt-3">
                            <div class="row">
                                <div class="col-6 text-right">
                                    <button :hidden="parseInt(Object.keys(dataExam)[next]) === 0 "
                                            class="btn btn-outline-secondary"
                                            @click="change('-')">
                                        <i class="fa fa-arrow-left fa-fw"></i>
                                        <span></span>
                                    </button>
                                </div>
                                <div class="col-6 text-left">
                                    <button v-if="dataExam.length != next+1" class="btn btn-outline-secondary"
                                            @click="change('+')">
                                        <i class="fa fa-arrow-right fa-fw"></i>
                                        <span></span>
                                    </button>
                                    <!--<a v-else class="btn btn-outline-secondary" href data-toggle="modal"-->
                                       <!--data-target="#modalQueryExam" @click.prevent="pauseTimer = true">-->
                                        <!--<span>Terminar Examen</span>-->
                                    <!--</a>-->
                                    <button v-else class="btn btn-outline-secondary" @click="validateEndExam()">
                                        <span>Terminar Examen</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table v-else-if="!loadingTable && dataExam.length <= 0" class="table">
                    <tr>
                        <td colspan="auto" class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                <p>Usted no cuenta con preguntas disponibles!</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- Modal Preguntar Terminar Examen -->
        <div class="modal fade in" id="modalQueryExam" data-backdrop="static" data-keyboard="false" tabindex="-1"
             role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span class="text-secondary">¿Está seguro de terminar su examen?</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-footer w-100">
                        <button v-if="!showLoading && message === '' " class="btn btn-outline-secondary w-30"
                                type="button"
                                data-dismiss="modal" @click.prevent="pauseTimer=false;showLoading=false">
                            <i class="fa fa-close fa-fw"></i><span>Cancelar</span>
                        </button>
                        <button v-if="!showLoading && message !== '' " class="btn btn-outline-secondary w-30"
                                type="button" @click="closeModal()">
                            <i class="fa fa-close fa-fw"></i><span>Cancelar</span>
                        </button>
                        <template v-if="!showLoading">
                            <button :disabled="!showLoading && message !== '' " class="btn btn-outline-primary w-30"
                                    type="button" @click.prevent="saveQueryExam()">
                                <span v-if="showLoading"><i
                                        class="fa fa-circle-o-notch fa-spin fa-fw"></i>Enviando</span>
                                <span v-else><i class="fa fa-check fa-fw"></i>Aceptar</span>
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Finalizar Examen -->
        <div class="modal fade in" id="modalEndExam" data-backdrop="static" data-keyboard="false" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-danger text-white">
                    <div class="modal-body">
                        <div class="mt-auto mb-auto">
                            <h4>Estimdo usuario,</h4><br>
                            <span>El tiempo del examen ah caducado!</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <router-link class="btn btn-danger" style="border:solid 1px #ffffff" data-dismiss="modal"
                                     :to="'/themes'"><i class="fa fa-check fa-fw"></i>Aceptar
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ExamService from '../../services/ExamService'
  import $           from 'jquery'
  import Moment      from 'moment'
  import Util        from '../../util'
  import Storage     from 'vue-local-storage'

  export default {
    name: 'Exam',
    data: () => ({
      util: Util,
      moment: Moment,
      loadingTable: true,
      showLoading: false,
      showCardHeader: true,
      dataExam: [],
      pauseTimer: false,
      message: '',
      theme_id: 1,
      next: 0,
      back: 0,
      isMinute: 0,
      isSecond: 0,
      duration_1: '00:10:00',
      duration_2: 600,
      remaining: this.duration_1,
      timerUpdate: null,
      tempChecked: [],
      params: {
        user_id: '',
        theme_id: '',
        answer_by_question: [],
        user_survey_theme_id: null,
      },
    }),
    beforeCreate () {
      window.clearInterval(this.timerUpdate)
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.dataExam = [{}]
        this.duration_1 = Util.toHHMMSS(this.$route.params.dataTheme.theme_duration)
        this.duration_2 = this.$route.params.dataTheme.theme_duration
        this.theme_id = this.$route.params.dataTheme.theme_id
        this.params.user_survey_theme_id = this.$route.params.dataTheme.user_survey_theme_id
        ExamService.dispatch('loadExam', {self: this})
        this.timer()
      },
      change (signo) {
        if (signo === '+') {
          //condicional para el temporal checked
          if (this.tempChecked.length > this.next) {
            if (this.next + 1 < this.tempChecked.length) {
              $(document).ready(() => {
                let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]')
                $.each(inputToArray, (k, v) => {
                  //aplicar checked al volver atras
                  if (this.tempChecked[this.next] != undefined && this.tempChecked[this.next] != {}) {
                    if (k == this.tempChecked[this.next].checked_id) {
                      $(v).prop('checked', true)
                    } else {
                      $(v).prop('checked', false)
                    }
                  } else {
                    return false
                  }
                })
              })
            } else {
              $(document).ready(() => {
                let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]')
                $.each(inputToArray, (k, v) => {
                  //aplicar checked al iniciar y al dar siguiente
                  if (this.dataExam.length == this.next) {
                    if ($(v).is(':checked')) {
                      $(v).prop('checked', true)
                    }
                  } else {
                    if ($(v).is(':checked')) {
                      $(v).prop('checked', false)
                    }
                  }
                })
              })
            }
          }
          //algoritmo logico para avanzar
          if (this.next + 1 < this.dataExam.length) {
            this.next = (this.next + 1)
          } else {
            return false
          }
        } else {
          $(document).ready(() => {
            let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]')
            $.each(inputToArray, (k, v) => {
              //aplicar checked al volver atras
              //si el contenedor esta definido y solo tiene valores validos
              if (this.tempChecked[this.next] != undefined && this.tempChecked[this.next] != {}) {
                //encontrar la posicion del input checked
                if (k == this.tempChecked[this.next].checked_id) {
                  $(v).prop('checked', true)
                } else {
                  $(v).prop('checked', false)
                }
              } else {
                return false
              }
            })
          })
          //algoritmo logico para retroceder
          if (this.next >= 1) {
            this.next = (this.next - 1)
          } else {
            this.next = 0
          }
        }
        return this.dataExam[this.next]
      },
      timer () {
        this.remaining = this.duration_1
        const getRemainTime = (newDate) => {
          this.isMinute = Moment(this.remaining, 'HH:mm:ss').minute()
          this.isSecond = Moment(this.remaining, 'HH:mm:ss').second()
          let now = Moment(new Date()),
            remainTime = (((Moment(newDate).add(this.duration_2, 'second') - now) + 1000) / 1000),
            remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
            remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
            remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
            remainDays = Math.floor(remainTime / (3600 * 24))
          return {remainTime, remainSeconds, remainMinutes, remainHours, remainDays}
        }
        const countDown = (newDate) => {
          this.timerUpdate = setInterval(() => {
            let t = getRemainTime(newDate)
            if (!this.pauseTimer) {
              this.remaining = t.remainHours + ':' + t.remainMinutes + ':' + t.remainSeconds
            }
            let $alert = $('#showAlertFinally')
            if ($alert.hasClass('alert-danger')) {
              $alert.removeClass('alert-danger')
              $alert.addClass('alert-warning')
            } else if ($alert.hasClass('alert-warning')) {
              $alert.removeClass('alert-warning')
              $alert.addClass('alert-danger')
            }
            if (t.remainTime <= 1) {
              this.saveEndExamAutomatic()
            }
          }, 1000)
        }
        countDown(new Date())
      },
      doChecked () {
        $(document).ready(() => {
          let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]')
          $.each(inputToArray, (k, v) => {
            if ($(v).is(':checked')) {
              //Si la longitud del array es igual al next
              if (this.tempChecked.length == this.next) {
                //cargar con valores validos
                this.tempChecked.push({
                  question_id: this.dataExam[this.next].id,
                  option_answer_id: $(v).val(),
                  checked_id: k,
                })
                $.each(this.tempChecked, (kk, vv) => {
                  if (vv == undefined) this.tempChecked[kk] = {
                    question_id: this.dataExam[this.next].id,
                    option_answer_id: null,
                  }
                })
              } else {
                //cargar con valores que se volveran a tratar en el siguiente ciclo
                this.tempChecked[this.next] = {
                  question_id: this.dataExam[this.next].id,
                  option_answer_id: $(v).val(),
                  checked_id: k,
                }
                //recorrer lo cargado, y setear las posiciones con valores invalidos para controlar el arreglo
                $.each(this.tempChecked, (kk, vv) => {
                  if (vv == undefined) this.tempChecked[kk] = {
                    question_id: this.dataExam[kk].id,
                    option_answer_id: null,
                  }
                })
              }
            } else {
              if (this.tempChecked.length >= 1) {
                $.each(this.dataExam, (kk, vv) => {
                  if (this.tempChecked[kk] == undefined) {
                    this.tempChecked[kk] = {question_id: vv.id, option_answer_id: null}
                  }
                })
              }
            }
          })
        })
      },
      saveEndExam () {
        this.params.user_id = Storage.get('s-u-$4p14').id
        this.params.theme_id = this.theme_id
        ExamService.dispatch('updateExam', {self: this})
      },
      saveEndExamAutomatic () {
        window.clearInterval(this.timerUpdate)
        this.params.user_id = Storage.get('s-u-$4p14').id
        this.params.theme_id = this.theme_id
        this.params.answer_by_question = this.tempChecked
        ExamService.dispatch('updateExamAutomatic', {self: this})
        Util.openModal(document, '#modalEndExam')
      },
      saveQueryExam () {
        window.clearInterval(this.timerUpdate)
        this.showLoading = true
        this.saveEndExam()
      },
      closeModal () {
        Util.closeModal('#modalQueryExam')
        this.$router.replace('/themes')
      },
      validateEndExam(num = 1) {
        this.pauseTimer = true
        this.params.answer_by_question = this.tempChecked
        if (this.params.answer_by_question.length == 0) {
          alert('No se ha seleccionado ninguna respuesta!')
          return false
        } else {
          this.saveEndExam()
        }
      }
    },
  }
</script>

<style scoped>
    .alert-primary {
        background-color: #007bff;
        color: #fff;
    }
</style>