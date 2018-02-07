<template>
    <section>
        <component :is="'nav-exam'"/>

        <div class="card mt-5 mb-5">
            <div class="card-header">
                <b class="h5">Your Exams</b>
                <div hidden class="form-inline">
                    <label>
                        <select class="form-control">
                            <option value="" selected disabled>Type Exam</option>
                            <option value="user">Pending</option>
                            <option value="backoffice">Finished</option>
                        </select>
                    </label>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Fin</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Duración</th>
                            <th scope="col">Nota</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(v,k) in data">
                            <th scope="row">{{k+1}}</th>
                            <td>{{v.name}}</td>
                            <td>{{v.start_date}}</td>
                            <td>{{v.expiration_date}}</td>
                            <td>
                                <span v-if="v.exam_state_id == 1" class="text-primary"><b>{{v.exam_state}}</b></span>
                                <span v-if="v.exam_state_id == 2" class="text-warning"><b>{{v.exam_state}}</b></span>
                                <span v-if="v.exam_state_id == 3" class="text-success"><b>{{v.exam_state}}</b></span>
                                <span v-if="v.exam_state_id == 4" class="text-danger"><b>{{v.exam_state}}</b></span>
                                <span v-if="v.exam_state_id == 5" class="text-dark"><b>{{v.exam_state}}</b></span>
                            </td>
                            <td>{{v.duration}}</td>
                            <td>
                                <span v-if="v.exam_state_id == 1">{{v.note}}</span>
                                <span v-if="v.exam_state_id == 2">{{v.note}}</span>
                                <span v-if="v.exam_state_id == 3">{{v.note}}</span>
                                <span v-if="v.exam_state_id == 4">{{v.note}}</span>
                                <span v-if="v.exam_state_id == 5">{{v.note}}</span>
                            </td>
                            <td>
                                <button v-if="v.exam_state_id == 3" class="btn btn-primary">
                                    <i class="fa fa-file-text-o fa-fw"></i>
                                    <span>Ver Solución</span>
                                </button>
                                <a  v-if="v.exam_state_id == 2" class="btn btn-warning" href data-toggle="modal" data-target="#infoModal">
                                    <i class="fa fa-file-text-o fa-fw"></i>
                                    <span>Iniciar Examen</span>
                                </a>
                            </td>
                        </tr>
                        <tr hidden>
                            <th scope="row">2</th>
                            <td>Github Pro</td>
                            <td>2018-01-31</td>
                            <td>2018-01-31</td>
                            <td>
                                <!--<span class="text-warning"><b>PENDING</b></span>-->
                                <!--<span class="text-danger">EXPIRED</span>-->
                                <span class="text-success"><b>DONE</b></span>
                            </td>
                            <td>00:10:00</td>
                            <td>14</td>
                            <td>
                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <a href class="btn btn-success">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>Done</span>
                                    </a>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted">
                                                    <small>Show Solution</small>
                                                </a>
                                                <a href class="dropdown-item text-muted">
                                                    <small>Show Base Knowledge</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr hidden>
                            <th scope="row">3</th>
                            <td>Java Pro</td>
                            <td>2018-01-31</td>
                            <td>2018-01-31</td>
                            <td>
                                <span class="text-danger"><b>EXPIRED</b></span>
                            </td>
                            <td>00:10:00</td>
                            <td>-</td>
                            <td>
                                <div class="btn-group dropdown btn-group-xs" role="group">
                                    <a href class="btn btn-danger">
                                        <i class="fa fa-file-text-o fa-fw"></i>
                                        <span>Expired</span>
                                    </a>
                                    <div class="btn-group open" role="group">
                                        <button type="button" class="btn btn-light btn-xs dropdown-toggle"
                                                data-toggle="dropdown" aria-expanded="true">
                                            <span class="caret"></span>
                                        </button>
                                        <ul :hidden="true" class="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="alertsDropdown">
                                            <li title="Exportar">
                                                <a href class="dropdown-item text-muted">
                                                    <small>Show Solution</small>
                                                </a>
                                                <a href class="dropdown-item text-muted">
                                                    <small>Show Base Knowledge</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Info Modal-->
        <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span class="text-danger">Are you ready to start the exam?</span>
                        </h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">The exam lasts 10 minutes with no option to cancel.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" type="button" @click="openModal()">Ready</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Exam Modal-->
        <component :is="'modal-lg'">
            <div :slot="'modal-component'" v-if="loadComponentExam">
                <div class="modal-header">
                    <h5 class="modal-title">Exam</h5>
                </div>
                <div class="modal-body">
                    <div class="card mt-0 mb-0">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-4 mt-3 mb-3">
                                    <div class="input-group input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info text-white">Time Remaining</span>
                                        </div>
                                        <span class="form-control">{{remaining}}</span>
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
                                <div class="col-12">
                                    <div v-if="isMinute<=0 && (isMinute==0 ? isSecond<=31 : isSecond!=undefined) && remaining != vtime "
                                         class="alert alert-danger" role="alert">
                                        <span><b>Advertencia:&nbsp;&nbsp;</b>Su examen acabara en {{remaining}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <div v-for="(v,k) in data_exam">
                                    <table class="table table-striped table-vue">
                                        <thead>
                                        <tr>
                                            <th scope="row" colspan="5"><b>{{k+1}}.-</b>&nbsp;&nbsp;{{v.name}}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(vv,kk) in v.options">
                                            <td width="25%">
                                                <b>{{kk+1}}</b>
                                                <div class="form-check form-check-inline">
                                                    <input :data-id="v.id" class="form-check-input" type="radio" :name="'opt'+v.id" :id="'a'+v.id" :value="vv.id" @click="doChecked()"/>
                                                    <label class="form-check-label" :for="'a'+vv.name">{{vv.name}}</label>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br>
                                </div>
                            </div>
                            <div v-if="params.rptas.length > 0">
                                {{params.rptas}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal()"><i class="fa fa-close fa-fw"></i>Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="saved()"><i class="fa fa-check fa-fw"></i>Send
                    </button>
                </div>
            </div>
        </component>

    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';
    import Modal from '../components/Modal';
    import $ from 'jquery';
    import moment from 'moment';
    import SERVICE from '../services/ExamService';

    Vue.component("nav-exam", Nav);
    Vue.component('modal-lg', Modal);

    export default {
        name: "list-exams",
        data: () => ({
            data: [],
            data_exam: [],
            showModal: false,
            loadComponentExam: false,
            vtime:"00:01:00",
            vvtime:1,
            remaining: this.vtime,
            mitiempo: 20,
            tsecond: 60,
            tminute: 10,
            thour: 1,
            isMinute: 0,
            isSecond: 0,
            selectedValue: "1",
            params: {
                rptas: []
            },
            timerUpdate: null,
            tempRptas: [],
            tempTime: {},
        }),
        created() {
            this.loadExams();
        },
        methods: {
            loadExams(){
                SERVICE.dispatch("loadExams", {self: this});
            },
            timer() {
                this.remaining = this.vtime;
                const getRemainTime = deadline => {
                    let m = moment(this.remaining, "HH:mm:ss").minute();
                    let s = moment(this.remaining, "HH:mm:ss").second();
                    this.isMinute = m;
                    this.isSecond = s;
                    let now = moment(new Date()),
                        remainTime = (((moment(deadline).add(this.vvtime, 'minute') - now) + 1000) / 1000),
                        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
                        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
                        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
                        remainDays = Math.floor(remainTime / (3600 * 24));
                    return {remainTime, remainSeconds, remainMinutes, remainHours, remainDays}
                };
                const countDown = (deadline) => {
                    this.timerUpdate = setInterval(() => {
                        let t = getRemainTime(deadline);
                        this.remaining = t.remainHours + ':' + t.remainMinutes + ':' + t.remainSeconds;
                        if (t.remainTime <= 1) {
                            clearInterval(this.timerUpdate);
                            this.saveRedirect();
                        }
                    }, 1000);
                };
                countDown(new Date());
            },
            doChecked() {
                this.tempRptas = [];
                $(document).ready(() => {
                    let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]');
                    $.each(inputToArray, (kkkk, vvvv) => {
                        if ($(vvvv).is(":checked")) {
                            this.tempRptas.push({exam_id:'1',question_id: $(vvvv).data('id'),answer_id:$(vvvv).val(),user_id:'2'})
                        }
                    });
                });
            },
            openModal() {
                this.timer();
                this.loadComponentExam = true;
                $('#modal-dialog-dinamic').modal({backdrop: 'static', keyboard: false, show: true});
                this.load2();
            },
            closeModal() {
                this.deadInterval();
                $('#infoModal').modal('hide');
                this.loadComponentExam = false;
                $('#modal-dialog-dinamic').modal('hide');
            },
            deadInterval() {
                window.clearInterval(this.timerUpdate);
            },
            saved() {
                this.params.rptas = [];
                this.tempTime = this.tempRptas;
                // this.params.rptas.push(this.tempTime);
                this.params.rptas=this.tempRptas;
                this.saveRedirect();
            },
            saveRedirect() {
                this.saveExam();
                // window.location.reload(true);
            },
            saveExam(){
                console.log(this.params.rptas);
              // console.log("Haciendo Post a la DB");
                SERVICE.dispatch("saveExam", {self: this});
            },
            load2(){
                SERVICE.dispatch("loadExam", {self: this});
            }
        }
    }
</script>

<style scoped>
    .table td, .table th {
        vertical-align: middle !important;
    }
</style>