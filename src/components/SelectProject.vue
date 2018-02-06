<template>
    <section>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">
                <b class="h5">Select</b>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label>Project</label>
                        <select name="proyecto" class="form-control mb-1">
                            <option value="0">Administrativo</option>
                            <option value="1">Interbank</option>
                            <option value="2">Claro Corporativo</option>
                            <option value="3">Entel</option>
                            <option value="4">Empresas</option>
                            <option value="5">Calidda</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <router-link class="btn btn-primary btn-block" :to="{name:'list-exams'}"><span>Next</span></router-link>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import AUTH_SERVICE from '../services/AuthService';
    export default {
        name: "select-project",
        data:()=>({
            data:[]
        }),
        created() {
            this.load();
            console.log("load project");
        },
        methods: {
            load(){
                AUTH_SERVICE.dispatch("fetchProjects", {self: this});
            }
        }
    }
</script>

<style scoped>

</style>