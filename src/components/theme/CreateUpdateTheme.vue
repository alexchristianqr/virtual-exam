<template>
    <div>
        <div class="card">
            <form @submit.prevent="createTheme()">
                <div class="card-header bg-light text-dark">
                    <div class="row">
                        <div class="col-6 mt-auto mb-auto">
                            <span class="card-title">
                                <span v-if="isPost">New Theme</span>
                                <span v-else>Update Theme</span>
                            </span>
                        </div>
                        <div class="col-6 text-right">
                            <router-link class="btn btn-light" :to="'/themes'"><i
                                    class="fa fa-arrow-left fa-fw"></i><span>Volver</span></router-link>
                            <button type="submit" class="btn btn-info"><i
                                    class="fa fa-check fa-fw"></i><span>Save</span></button>
                            <button type="reset" class="btn btn-danger"><i
                                    class="fa fa-close fa-fw"></i><span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="Object.keys(dataError).length > 0"
                         class="alert alert-danger alert-dismissible fade show pb-0" role="alert">
                        <h5>Errors Found!</h5>
                        <div v-for="(v) in dataError">
                            <p><i class="fa fa-close fa-fw"></i>{{v[0]}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-7">
                            <div class="form-group">
                                <label>Title</label>
                                <input title="tema" v-model="params.name" type="text" class="form-control" required>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="form-group">
                                <label>Survey</label>
                                <select title="ancuesta" class="form-control" v-model="params.user_survey_id" required>
                                    <option value="" disabled selected>- select survey -</option>
                                    <option v-for="(v) in dataSurvey" :value="v.user_survey_id">{{v.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import SERVICE from '../../api/ApiService'

  export default {
    name: 'CreateUpdateTheme',
    data: () => ({
      isPost: true,
      dataSurvey: [],
      dataError: {},
      showError: false,
      params: {
        name: '',
        user_survey_id: '',
        user_id: '1',
      },
    }),
    created() {
      this.allSurvey()
    },
    methods: {
      createTheme() {
        SERVICE.dispatch('createTheme', {self: this})
      },
      allSurvey() {
        SERVICE.dispatch('allByUserSurvey', {self: this})
      },
    },
  }
</script>

<style scoped>

</style>