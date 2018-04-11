<template>
    <div>
        <div class="card mb-5">
            <div class="card-header pb-0 mb-0 bg-light text-dark">
                <div class="row">
                    <div v-if="!loadingTable && data.length <= 0" class="col-1">
                        <router-link class="btn btn-light btn-lg" :to="'/themes'"><i class="fa fa-arrow-left fa-fw"></i>
                        </router-link>
                    </div>
                    <div :class=" (!loadingTable && data.length <= 0) ? 'col-5' : 'col-4'">
                        <div class="alert alert-light" role="alert">
                            <b class="text-muted">Time:</b>&nbsp;<span>{{remaining}}</span>
                        </div>
                    </div>
                    <div :class=" (!loadingTable && data.length <= 0) ? 'col-6' : 'col-8'">
                        <div id="showAlertFinally"
                             v-if="isMinute<=0 && (isMinute==0 ? isSecond<=31 : isSecond!=undefined) && remaining != p_duration"
                             class="alert alert-danger" role="alert">
                            <span><b>Advertencia:&nbsp;&nbsp;</b>Su examen terminará en <b>{{remaining}}</b></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="alert alert-info alert-dismissible fade show" role="alert">
                            <span><b>Nota:&nbsp;&nbsp;</b>Usted esta realizando el examen en estos momentos, favor no refresque el navegador el controlador de refresh se encuentra inabilitado caso contrario los datos seran enviados y no podra nuevamente tomar su examen.</span>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
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
                <table v-if="!loadingTable && data.length > 0" class="table table-vue">
                    <thead>
                    <tr>
                        <th scope="row" colspan="5"><span>{{parseInt(Object.keys(data)[next])+1}}.-</span><span
                                class="pl-2">{{data[next].question_name}}</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in data[next].options_answers">
                        <td width="110%" class="pl-5">
                            <b>{{returnLetter(k)}})&nbsp;</b>
                            <div class="form-check form-check-inline">
                                <input title="" :data-id="data[next].id"
                                       class="form-check-input"
                                       type="radio"
                                       :name="'opt'+data[next].id" :id="returnLetter(k)+data[next].id" :value="v.id"
                                       @click="doChecked()"/>
                                <label class="form-check-label" :for="returnLetter(k)+data[next].id">{{v.name}}</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td width="100%" class="text-center">
                            <div class="row">
                                <div class="col-6 text-right">
                                    <button :hidden="parseInt(Object.keys(data)[next]) === 0 "
                                            class="btn btn-secondary"
                                            @click="change('-')">
                                        <i class="fa fa-arrow-left fa-fw"></i>
                                        <span>Anterior</span>
                                    </button>
                                </div>
                                <div class="col-6 text-left">
                                    <button v-if="data.length != next+1" class="btn btn-secondary" @click="change('+')">
                                        <i class="fa fa-arrow-right fa-fw"></i>
                                        <span>Siguiente</span>
                                    </button>
                                    <button v-else="" class="btn btn-secondary">Saved Exam</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table v-else-if="!loadingTable && data.length <= 0" class="table">
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
        <!-- Modal -->
        <div class="modal fade in" id="exampleModalCenter" data-backdrop="static" data-keyboard="false" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-danger text-white">
                    <div class="modal-body">
                        <div class="mt-auto mb-auto">
                            <b>Dear user, </b><br>
                            <span>the duration of the exam has ended, then click on accept to return to the exam list, locate the exam and see the score obtained.</span>
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
  import SERVICE from '../../api/ApiService'
  import $       from 'jquery'
  import moment  from 'moment'
  import Util    from '../../util'

  export default {
    name: 'Exam',
    data: () => ({
      loadingTable: true,
      data: [{}],
      theme_id: 1,
      next: 0,
      back: 0,
      p_duration: '00:10:00',
      p_duration2: 600,
      remaining: this.p_duration,
      isMinute: 0,
      isSecond: 0,
      selectedValue: '1',
      params: {
        rptas: [],
      },
      timerUpdate: null,
      tempRptas: [],
      tempTime: {},
      tempChecked: [],
      tempRptaChecked: [],
    }),
    beforeCreate() {
      window.clearInterval(this.timerUpdate)
      console.log('event before-create: cleaned interval!')
    }
    ,
    created() {
      this.data = [{}]
      this.p_duration = Util.toHHMMSS(this.$route.params.dataTheme.theme_duration)
      this.p_duration2 = this.$route.params.dataTheme.theme_duration
      this.theme_id = this.$route.params.dataTheme.theme_id
      this.loadExam()
    }
    ,
    watch: {
      $route() {
        console.log('escucheeeeeeeeeeeeeeeeee')
        console.log(this.$route)
      },
    }
    ,
    methods: {
      loadExam() {
        SERVICE.dispatch('loadExam', {self: this})
        this.timer()
      }
      ,
      returnLetter(key, toUpper = false) {
        let letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
        if (toUpper) {
          return (letter[key]).toString().toUpperCase()
        } else {
          return letter[key]
        }
      }
      ,
      change(signo) {
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
                  if (this.data.length == this.next) {
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
          if (this.next + 1 < this.data.length) {
            this.next = this.next + 1
          } else {
            return false
          }

        } else {

          $(document).ready(() => {
            let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]')
            $.each(inputToArray, (kkkk, vvvv) => {
              //aplicar checked al volver atras
              //si el contenedor esta definido y solo tiene valores validos
              if (this.tempChecked[this.next] != undefined && this.tempChecked[this.next] != {}) {
                //encontrar la posicion del input checked
                if (kkkk == this.tempChecked[this.next].checked_id) {
                  $(vvvv).prop('checked', true)
                } else {
                  $(vvvv).prop('checked', false)
                }
              } else {
                return false
              }
            })
          })

          //algoritmo logico para retroceder
          if (this.next >= 1) {
            this.next = this.next - 1
          } else {
            this.next = 0
          }

        }

        return this.data[this.next]

      }
      ,
      timer() {
        this.remaining = this.p_duration
        const getRemainTime = deadline => {
          let m = moment(this.remaining, 'HH:mm:ss').minute()
          let s = moment(this.remaining, 'HH:mm:ss').second()
          this.isMinute = m
          this.isSecond = s
          let now = moment(new Date()),
            remainTime = (((moment(deadline).add(this.p_duration2, 'second') - now) + 1000) / 1000),
            remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
            remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
            remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
            remainDays = Math.floor(remainTime / (3600 * 24))
          return {remainTime, remainSeconds, remainMinutes, remainHours, remainDays}
        }
        const countDown = (deadline) => {
          this.timerUpdate = setInterval(() => {
            let t = getRemainTime(deadline)
            this.remaining = t.remainHours + ':' + t.remainMinutes + ':' + t.remainSeconds
            let $alert = $('#showAlertFinally')
            if ($alert.hasClass('alert-danger')) {
              $alert.removeClass('alert-danger')
              $alert.addClass('alert-warning')
            } else if ($alert.hasClass('alert-warning')) {
              $alert.removeClass('alert-warning')
              $alert.addClass('alert-danger')
            }
            if (t.remainTime <= 1) {
              clearInterval(this.timerUpdate)
              $('#exampleModalCenter').modal('show')
              // this.$router.replace("/themes");
            }
          }, 1000)
        }
        countDown(new Date())
      }
      ,
      doChecked() {
        $(document).ready(() => {
          let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]')
          $.each(inputToArray, (kkkk, vvvv) => {
            if ($(vvvv).is(':checked')) {
              //Si la longitud del array es igual al next
              if (this.tempChecked.length == this.next) {
                //cargar con valores validos
                this.tempChecked.push({question_id: this.data[this.next].id, checked_id: kkkk})
              } else {
                //cargar con valores invalidos(vacio)
                this.tempChecked[this.next] = {question_id: this.data[this.next].id, checked_id: kkkk}
                //recorrer lo cargado, y setear las posiciones con valores invalidos para controlar el arreglo
                $.each(this.tempChecked, (k, v) => {
                  if (v == undefined) this.tempChecked[k] = {}
                })
              }
            }
          })
        })
      }
      ,
    }
    ,
  }
</script>

<style scoped>

</style>