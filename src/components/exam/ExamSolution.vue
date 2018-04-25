<template>
    <div class="card mt-0 mb-0">
        <div class="card-header">
            <div class="row">
                <div class="col-2 mt-3 mb-3">
                    <div class="input-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Nota</span>
                        </div>
                        <span class="form-control">{{modal.note}}</span>
                    </div>
                </div>
                <div class="col-10 mt-3 mb-3">
                    <div class="row">
                        <div class="col-4">
                            <div class="input-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Rpta Correcta</span>
                                </div>
                                <span class="form-control text-center"><i
                                        class="fa fa-check text-success"></i></span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="input-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Rpta Incorrecta</span>
                                </div>
                                <span class="form-control text-center"><i
                                        class="fa fa-close text-danger"></i></span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="input-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Rpta vacia</span>
                                </div>
                                <span class="form-control text-center"><i
                                        class="fa fa-exclamation-triangle text-warning"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="msg != undefined " class="card-body">
            <div class="col-12 text-center">
                <span>{{msg}} aqui</span>
            </div>
        </div>
        <div v-if="msg == undefined" class="card-body">
            <div v-if="loadingTable" class="text-center">
                <table class="table">
                    <tr>
                        <td class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-circle-o-notch fa-spin fa-2x mb-2"></i>
                                <p>Obteniendo Informacion!</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="!loadingTable && data_exam_solution.length >= 1" v-for="(v,k) in data_exam_solution">
                <table class="table table-vue">
                    <thead>
                    <tr>
                        <th scope="row" colspan="5">
                            <div class="row">
                                <div class="col-1 mt-auto mb-auto">
                                    <span>{{k+1}}.-</span>
                                </div>
                                <div class="col-11 pl-0">
                                    <span class="pl-2" v-html="v.name"></span>
                                    <i v-if="v.answer_register == '0' " title="Pregunta sin Rpta!"
                                       class="fa fa-exclamation-triangle text-warning"></i>
                                </div>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(vv,kk) in v.options">
                        <td width="90%">
                            <b>{{util.returnLetter(kk)}})&nbsp;</b>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" :for="returnLetter(kk)+v.id">{{vv.name}}</label>
                            </div>
                        </td>
                        <td width="10%" class="text-right">
                            <template v-if="v.answer_correct == v.answer_register">
                                <i v-if="vv.id == v.answer_correct"
                                   class="fa fa-check text-success"
                                   title="Este es la rpta correcta."></i>
                            </template>
                            <template v-else>
                                <i v-if="vv.id == v.answer_correct"
                                   class="fa fa-check text-success"
                                   title="Este es la rpta correcta."></i>
                                <i v-if="vv.id == v.answer_register"
                                   class="fa fa-close text-danger"
                                   title="Este es la rpta que marcaste"></i>
                            </template>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br>
            </div>
            <div v-if="!loadingTable && data_exam_solution.length <= 0" class="text-center">
                <table class="table">
                    <tr>
                        <td class="text-dark text-center">
                            <div style="padding: 3em 2em 0 2em">
                                <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                                <p>Información no disponible!</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import Util        from '../../util'
  import Storage     from 'vue-local-storage'
  import ExamService from '../../services/ExamService'

  export default {
    name: 'ExamSolution',
    data: () => ({
      util: Util,
      storage: Storage,
      loadingTable: true,
      loadComponentExamSolution: false,
      dataExamSolution: [],
      params: {
        exam_id: 0,
        user_id: '',
        exam_state_id: 3,
      },
      subparams: {
        theme_id: null,
        duration: 0
      },
      created () {
        this.load()
      },
      methods: {
        load () {
          this.loadingTable = true
          return ExamService.dispatch('loadExams', {self: this})
        },
        openModal (object) {
          this.loadComponentExamSolution = true
          this.params.exam_id = object.exam_id
          this.modal.note = object.note
          $('#modal-id-exam-solucion').modal({keyboard: false, show: true})
          this.loadExamSolution()
        },
        closeModal (num) {
          if (num == 1) {
            this.deadInterval()
            $('#infoModal').modal('hide')
            this.loadComponentExam = false
            $('#modal-id-exam').modal('hide')
          } else {
            this.loadComponentExamSolution = false
            $('#modal-id-exam-solucion').modal('hide')
          }
        },
        loadExamSolution () {
          ExamService.dispatch('loadExamSolution', {self: this})
        },
        toFormatHours (seg) {
          const timeBox = {seg: seg, min: '', hrs: ''}
          let result = ''
          const extractQuotientResidue = (limit, valor) => {
            if (timeBox['seg'] >= limit) {
              timeBox[valor] = (timeBox['seg'] / limit).toString().split('.')[0]
              timeBox['seg'] = timeBox['seg'] - (timeBox[valor] * limit)
            }
          }
          extractQuotientResidue(3600, 'hrs')   // Extrayendo el cociente para las horas
          extractQuotientResidue(60, 'min')     // Extrayendo el cociente para las minutos
          result = (timeBox.hrs) ? result.concat(timeBox.hrs, 'hrs ') : result.concat('')
          result = (timeBox.min) ? result.concat(timeBox.min, 'min ') : result.concat('')
          result = (timeBox.seg) ? result.concat(timeBox.seg, 'seg ') : result.concat('')
          return result
        },
        updateStatusExam () {
          this.msg_validate = undefined
          this.params.exam_id = this.p_theme_id
          this.params.user_id = this.storage.get('s-u-$4p14').id
          this.params.exam_state_id = 3
          ExamService.dispatch('updateStatusExam', {self: this})
        },
        openedModal () {
          $('#infoModal').modal('hide')
          this.$router.push({name: 'exam', params: {theme_id: this.p_theme_id, exam_duration: this.p_exam_duration}})
        }
      }
    }),

  }
</script>

<style scoped>

</style>