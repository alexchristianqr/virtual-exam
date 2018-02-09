<template>
    <section>
        <div class="modal-header">
            <h5 class="modal-title">Exam</h5>
        </div>
        <div class="modal-body">
            <div class="card mt-0 mb-0">
                <div class="card-header">
                    <!--<router-link class="btn pl-0" :to="'/list-exams'"><i class="fa fa-angle-left fa-2x"></i>&nbsp;&nbsp;&nbsp;<b class="h5">Exam #1</b></router-link>-->
                    <!--<hr>-->
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
                            <div v-if="isMinute<=9 && (isMinute==9 ? isSecond<=51 : isSecond!=undefined) && remaining != '00:10:00' "
                                 class="alert alert-danger" role="alert">
                                <span><b>Advertencia:&nbsp;&nbsp;</b>Su examen acabara en {{remaining}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div v-for="n in 10">
                            <table class="table table-striped table-vue">
                                <thead>
                                <tr>
                                    <th scope="row" colspan="5"><b>{{n}}.-</b>&nbsp;&nbsp;¿Cómo se dice uno en ingles?
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td width="25%">
                                        <b>a)</b>
                                        <div class="form-check form-check-inline">
                                            <input :data-id="n" class="form-check-input" type="radio" :name="'opt'+n"
                                                   :id="'a'+n" value="a" @click="doChecked()"/>
                                            <label class="form-check-label" :for="'a'+n">One</label>
                                        </div>
                                    </td>
                                    <td width="25%">
                                        <b>b)</b>
                                        <div class="form-check form-check-inline">
                                            <input :data-id="n" class="form-check-input" type="radio" :name="'opt'+n"
                                                   :id="'b'+n" value="b" @click="doChecked()"/>
                                            <label class="form-check-label" :for="'b'+n">Two</label>
                                        </div>
                                    </td>
                                    <td width="25%">
                                        <b>c)</b>
                                        <div class="form-check form-check-inline">
                                            <input :data-id="n" class="form-check-input" type="radio" :name="'opt'+n"
                                                   :id="'c'+n" value="c" @click="doChecked()"/>
                                            <label class="form-check-label" :for="'c'+n">Three</label>
                                        </div>
                                    </td>
                                    <td width="25%">
                                        <b>d)</b>
                                        <div class="form-check form-check-inline">
                                            <input :data-id="n" class="form-check-input" type="radio" :name="'opt'+n"
                                                   :id="'d'+n" value="d" @click="doChecked()"/>
                                            <label class="form-check-label" :for="'d'+n">Four</label>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br>
                        </div>
                    </div>
                    <div v-if="params.rpta.length > 0">
                        {{params.rpta}}
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
        <!--<component :is="'nav-exam'"/>-->

    </section>
</template>

<script>
    // import Vue from 'vue';
    // import Nav from '../components/Nav';
    import moment from 'moment';
    import $ from 'jquery';
    import ListExams from '../components/ListExams'

    // Vue.component("nav-exam", Nav);

    export default {
        name: "exam",
        data: () => ({
            data: [],
            remaining: "00:10:00",
            mitiempo: 20,
            tsecond: 60,
            tminute: 10,
            thour: 1,
            isMinute: 0,
            isSecond: 0,
            selectedValue: "1",
            params: {
                rpta: []
            },
            // showModal: false,
            loadComponentExam: false,
            timerUpdate:null,
            newExams:ListExams
        }),
        beforeCreate() {
            this.remaining = "00:10:00";
        },
        created() {
            this.timer();

            // let unloadEvent = function (e) {
            //     let confirmationMessage = "Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?";
            //     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            //     return confirmationMessage; //Webkit, Safari, Chrome etc.
            // };
            // window.addEventListener("beforeunload", unloadEvent);
        },
        mounted(){

        },
        destroyed(){
            console.log("destruido");
            this.timer();
        },
        methods: {
            timer() {
                const getRemainTime = deadline => {
                    let m = moment(this.remaining, "HH:mm:ss").minute();
                    let s = moment(this.remaining, "HH:mm:ss").second();
                    this.isMinute = m;
                    this.isSecond = s;
                    let now = moment(new Date()),
                        remainTime = (((moment(deadline).add(10, 'minute') - now) + 1000) / 1000),
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
                        }
                    }, 1000);
                };
                countDown(new Date());
            },
            doChecked() {
                this.params.rpta = [];
                $(document).ready(() => {
                    let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]');
                    $.each(inputToArray, (kkkk, vvvv) => {
                        if ($(vvvv).is(":checked")) {
                            this.params.rpta.push({id: $(vvvv).data('id'), value: $(vvvv).val()})
                        }
                    });
                    this.params.rpta = JSON.stringify(this.params.rpta);
                    // console.log(this.params.rpta);
                });
            },
            openModal() {
                // this.loadComponentExam = true;
                $('#modal-dialog-dinamic').modal({backdrop: 'static', keyboard: false, show: true});
            },
            closeModal() {
                // this.newExams.methods.closeModal();
                this.newExams.data().loadComponentExam = false;
                $('#infoModal').modal('hide');
                $('#modal-dialog-dinamic').modal('hide');
                // this.remaining = "00:10:00";
                // this.loadComponentExam = false;
            },
            saved() {
                console.log(this.params.rpta);
                alert(this.params.rpta);
            },
        }
    }

</script>

<style scoped>

</style>