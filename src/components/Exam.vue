<template>
    <section>
        <component :is="'nav-exam'"/>
        <div class="col-10 offset-1">
            <div class="card mt-5 mb-5">
                <div class="card-header pb-0 mb-0 bg-dark text-light">
                    <div class="row">
                        <div v-if="!loadingTable && data.length <= 0" class="col-1">
                                <router-link class="btn btn-light btn-lg" :to="'/themes'"><i class="fa fa-arrow-left fa-fw"></i></router-link>
                        </div>
                        <div :class=" (!loadingTable && data.length <= 0) ? 'col-5' : 'col-4'">
                            <div class="alert alert-light" role="alert"><b class="text-muted">Time Remaining:</b>&nbsp;<span>{{remaining}}</span></div>
                        </div>
                        <div :class=" (!loadingTable && data.length <= 0) ? 'col-6' : 'col-8'">
                            <div id="showAlertFinally" v-if="isMinute<=0 && (isMinute==0 ? isSecond<=31 : isSecond!=undefined) && remaining != vtime" class="alert alert-danger" role="alert">
                                <span><b>Advertencia:&nbsp;&nbsp;</b>Su examen terminará en <b>{{remaining}}</b></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="alert alert-light alert-dismissible fade show" role="alert">
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
                    <table v-if="!loadingTable && data.length > 1" class="table table-vue">
                        <thead>
                        <tr>
                            <th scope="row" colspan="5"><span>{{data[next].id}}.-</span><span class="pl-2">{{data[next].question_name}}</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(v,k) in data[next].options_answers">
                            <td width="110%" class="pl-5">
                                <b>{{returnLetter(k)}})&nbsp;</b>
                                <div class="form-check form-check-inline">
                                    <input title="" :data-id="data[next].id" class="form-check-input" type="radio" :name="'opt'+data[next].id" :id="returnLetter(k)+data[next].id" :value="v.id" @click="doChecked()"/>
                                    <label class="form-check-label" :for="returnLetter(k)+data[next].id">{{v.name}}</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="100%" class="text-center">
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <button :hidden="data[next].id == 1"  class="btn btn-light" @click="change('-')">
                                            <i class="fa fa-arrow-left fa-fw"></i>
                                        </button>
                                    </div>
                                    <div class="col-6 text-left">
                                        <button v-if="data.length != next+1" class="btn btn-light" @click="change('+')">
                                            <i class="fa fa-arrow-right fa-fw"></i>
                                        </button>
                                        <button v-else="" class="btn btn-dark">Saved Exam</button>
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
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';
    import $ from 'jquery';
    import moment from 'moment';
    import SERVICE from '../services/ApiService';

    Vue.component("nav-exam", Nav);

    export default {
        data: () => ({
            loadingTable:true,
            data: [{}],
            theme_id: 1,
            next: 0,
            back: 0,
            vtime: "00:10:00",
            vvtime: 600,
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
            tempChecked:[],
            tempRptaChecked:[]
        }),
        created() {
            this.data = [{}];
            this.theme_id = this.$route.params.theme_id;
            this.loadExam();
        },
        methods: {
            loadExam() {
                SERVICE.dispatch("loadExam", {self: this});
                this.timer();
            },
            returnLetter(key, toUpper = false) {
                let letter = ["a", "b", "c", "d", "e", "f", "g", "h"];
                if (toUpper) {
                    return (letter[key]).toString().toUpperCase();
                } else {
                    return letter[key];
                }
            },
            change(signo) {
                if (signo === "+") {
                    //condicional para el temporal checked
                    if(this.tempChecked.length > this.next) {
                        if(this.next+1 < this.tempChecked.length){
                            $(document).ready(() => {
                                let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]');
                                $.each(inputToArray, (kkkk, vvvv) => {
                                    //aplicar checked al volver atras
                                    if(this.tempChecked[this.next] != undefined){
                                        if(kkkk == this.tempChecked[this.next].checked_id){
                                            $(vvvv).prop("checked",true);
                                        }
                                    }else{
                                        return false;
                                    }
                                });
                            });
                        }else{
                            $(document).ready(() => {
                                let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]');
                                $.each(inputToArray, (kkkk, vvvv) => {
                                    //aplicar checked al iniciar y al dar siguiente
                                    if(this.data.length == this.next){
                                        if ($(vvvv).is(":checked")) {
                                            $(vvvv).prop("checked", true);
                                        }
                                    }else{
                                        if ($(vvvv).is(":checked")) {
                                            $(vvvv).prop("checked", false);
                                        }
                                    }
                                });
                            });
                        }
                    }


                    if (this.next + 1 < this.data.length) {
                        this.next = this.next + 1;
                    } else {
                        return false;
                    }

                } else {

                    $(document).ready(() => {
                        let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]');
                        $.each(inputToArray, (kkkk, vvvv) => {
                            //aplicar checked al volver atras
                            if(this.tempChecked[this.next] != undefined){
                                if(kkkk == this.tempChecked[this.next].checked_id){
                                    $(vvvv).prop("checked",true);
                                }
                            }else{
                                return false;
                            }
                        });
                    });

                    if (this.next >= 1) {
                        this.next = this.next - 1;
                    } else {
                        this.next = 0;
                    }

                }

                return this.data[this.next];

            },
            timer() {
                this.remaining = this.vtime;
                const getRemainTime = deadline => {
                    let m = moment(this.remaining, "HH:mm:ss").minute();
                    let s = moment(this.remaining, "HH:mm:ss").second();
                    this.isMinute = m;
                    this.isSecond = s;
                    let now = moment(new Date()),
                        remainTime = (((moment(deadline).add(this.vvtime, 'second') - now) + 1000) / 1000),
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
                        let $alert = $('#showAlertFinally');
                            if($alert.hasClass("alert-danger")){
                                $alert.removeClass("alert-danger");
                                $alert.addClass("alert-warning");
                            }else if($alert.hasClass("alert-warning")){
                                $alert.removeClass("alert-warning");
                                $alert.addClass("alert-danger");
                            }
                        if (t.remainTime <= 1) {
                            clearInterval(this.timerUpdate);
                            this.$router.replace("/themes");
                        }
                    }, 1000);
                };
                countDown(new Date());
            },
            doChecked() {
                $(document).ready(() => {
                    let inputToArray = $('.table-vue').find('tbody').find('input[type=radio]');
                    $.each(inputToArray, (kkkk, vvvv) => {
                        if ($(vvvv).is(":checked")) {
                            //aplicar checked normal
                            if(this.tempChecked.length == this.next){
                                this.tempChecked.push({question_id:this.data[this.next].id,checked_id:kkkk});
                            }else{
                                //aplicar checked para cambiar
                                this.tempChecked[this.next] = {question_id:this.data[this.next].id,checked_id:kkkk};
                            }
                        }
                    });
                });
                // console.log(this.tempChecked);
                // this.tempRptaChecked.push(this.tempChecked);
            },
        },
    }
</script>

<style scoped>

</style>