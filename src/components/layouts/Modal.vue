<template>
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Atención</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <span>Estimado <b>Usuario</b>, estamos presentando problemas en nuestros servicios; porfavor vuelva intentarlo de nuevo o mas tarde.</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="close">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Modal',
      props:{
        dataProps:{}
      },
      methods:{
          close(){
            this.dataProps.params.password = ''
            this.dataProps.loading.btn = false
          }
      }
    }
</script>

<style scoped>

</style>