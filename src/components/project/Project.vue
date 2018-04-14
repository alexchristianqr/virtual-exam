<template>
    <div>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">
                <span class="card-title">Proyecto</span>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label>Seleccionar Proyecto</label>
                        <select title="" v-model="params.project_id" class="form-control mb-1">
                            <option v-for="(v) in dataProject" :value="v.id">{{v.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <span v-if="params.project_id == '1' ">
                            <a href class="btn btn-secondary btn-block disabled"><span>Siguiente</span></a>
                        </span>
                        <span v-else>
                            <button type="button"
                                    :class=" params.project_id != '1' ? 'btn btn-secondary btn-block' : 'btn btn-secondary btn-block disabled' "
                                    @click="updateProject()">Siguiente</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import ProjectService from '../../services/ProjectService'

  export default {
    name: 'Project',
    data: () => ({
      dataProject: [],
      params: {
        project_id: '1'
      },
      newProject:{}
    }),
    created () {
      this.getProjects()
    },
    methods: {
      getProjects () {
        ProjectService.dispatch('getProjects', {self: this})
      },
      updateProject () {
        this.newProject = this.dataProject[this.params.project_id - 1]
        ProjectService.dispatch('updateProject', {self: this})
      }
    }
  }
</script>

<style scoped>

</style>