<template>
    <div>
        <div class="card mt-5">
            <div class="card-body">
                <div class="text-center">
                    <span class="card-title">Pagina desconocida o no encontrada</span>
                    <br>
                    <br>
                    <router-link :to="'/login'" class="btn btn-block btn-secondary">Ir a Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Know'
  }
</script>

<style scoped>

</style>