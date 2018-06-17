<template>
    <div class="modal fade" id="modalErrorLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Atención</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-html="dataProps.dataError"></div><br>
                    <small class="mt-5 text-muted">
                        <span>Para más consultas comuníquese a Centro de Servicios</span><br>
                        <span><i class="fa fa-phone fa-fw"></i> 01 215-4530 / opcion 2</span><br>
                        <span class="text-primary"><i class="fa fa-envelope-o fa-fw"></i> cds@sapia.com.pe / lechevarria@sapia.com.pe / aquispe@sapia.com.pe</span>
                    </small>
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
    name: 'ModalErrorLogin',
    props: {
      dataProps: {},
    },
    methods: {
      close () {
        this.dataProps.params.password = ''
        this.dataProps.loading.btn = false
      },
    },
  }
</script>

<style scoped>

</style>