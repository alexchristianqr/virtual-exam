<template>
    <transition name="modal">

                    <div id="modal-dialog-dinamic" class="modal fade in" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <slot name="modal-component"/><!-- Body dinamic -->
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div>

    </transition>
</template>


<style scoped>

</style>