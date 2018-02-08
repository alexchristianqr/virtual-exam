<template>
    <section>
        <component :is="'nav-exam'"/>
        <div class="card mt-5 mb-5">
            <div class="card-header">
                <b class="h5">Your Exam</b>
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
                <!--<div class="table-responsive">-->

                    <table class="table table-vue">
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
                                        <button class="btn btn-light" @click="change('-')"><i class="fa fa-arrow-left fa-fw"></i>Anterior</button>
                                    </div>
                                    <div class="col-6 text-left">
                                        <button class="btn btn-light" @click="change('+')"><i class="fa fa-arrow-right fa-fw"></i>Siguiente</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <!--<tbody>-->
                        <!--<tr>-->
                            <!--<td width="50%" class="text-center">-->
                                <!--<button class="btn btn-light" @click="next">Back</button>-->
                            <!--</td>-->
                            <!--<td width="50%" class="text-center">-->
                                <!--<button class="btn btn-light" @click="next">Next</button>-->
                            <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                        <!--<tfoot>-->
                        <!--<tr>-->
                            <!--<td class="text-center">-->
                                <!--<button class="btn btn-light" @click="next-1">Back</button>-->
                            <!--</td>-->
                            <!--<td class="text-center">-->
                                <!--<button class="btn btn-light" @click="next+1">Next</button>-->
                            <!--</td>-->
                        <!--</tr>-->
                        <!--</tfoot>-->
                    </table>
                <!--</div>-->
            </div>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Nav from '../components/Nav';
    import $ from 'jquery';
    import moment from 'moment';
    import SERVICE from '../services/ExamService';

    Vue.component("nav-exam", Nav);

    export default {
        name: "your-exam",
        data: () => ({
            data: [{}],
            theme_id: 1,
            next:0,
            back:0,
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
            this.theme_id = this.$route.params.theme_id;
            this.loadExam();
        },
        methods: {
            loadExam() {
                return SERVICE.dispatch("loadExam", {self: this});
            },
            returnLetter(key, toUpper = false) {
                let letter = ["a", "b", "c", "d", "e", "f", "g", "h"];
                if (toUpper) {
                    return (letter[key]).toString().toUpperCase();
                } else {
                    return letter[key];
                }
            },
            change(signo){
                    if (signo === "+") {
                        if(this.next+1 < this.data.length) {
                            // console.log(this.next);
                            this.next = this.next + 1;
                        }else{
                            return false;
                        }
                    } else {
                        // console.log(this.next);
                        if (this.next >= 1) {
                            this.next = this.next - 1;
                        } else {
                            this.next = 0;
                        }
                    }
                    return this.data[this.next];
                    // this.loadExam();

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
                            console.log(vvvv);
                            this.tempRptas.push({exam_id:'1',question_id: $(vvvv).data('id'),answer_id:$(vvvv).val(),user_id:'2'})
                        }
                    });
                });
                console.log(this.tempRptas);
            },
        },
    }
</script>

<style scoped>

</style>