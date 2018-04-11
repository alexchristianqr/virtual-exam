<template>
    <div>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">
                <span class="card-title">Project</span>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label>Project</label>
                        <select v-model="selectedProject" class="form-control mb-1">
                            <option value="0" selected>- seleccionar -</option>
                            <option v-for="(v,k) in data" v-bind:value="v.id">{{v.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <span v-if="selectedProject == '0' ">
                            <a href class="btn btn-primary btn-block disabled"><span>Next</span></a>
                        </span>
                        <span v-else>
                            <router-link :class=" selectedProject != '0' ? 'btn btn-primary btn-block' : 'btn btn-primary btn-block disabled' " :to="'list-exams'"><span>Next</span></router-link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import SERVICE from '../api/ApiService';

    export default {
        name: "SelectProject",
        data: () => ({
            data: [],
            selectedProject:"0",
        }),
        created() {
            this.loadProjects();
        },
        methods: {
            loadProjects() {
                SERVICE.dispatch("loadProjects", {self: this});
            },
            change(){
                alert(this.selectedProject);
            }
        }
    }
</script>

<style scoped>

</style>