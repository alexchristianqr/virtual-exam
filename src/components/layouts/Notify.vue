<template>
    <div :class="(dataNotify.classAlert != undefined) ? dataNotify.classAlert : (dataNotify.color != undefined) ? 'alert alert-dismissible fade show alert-'+dataNotify.color : 'alert alert-dismissible fade show alert-danger'"
         :style="(dataNotify.style != undefined) ? dataNotify.style : ''">
        <span v-html="dataNotify.data"></span>
        <button type="button" class="close" aria-label="Close" @click="eventClose">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
  export default {
    name: 'Notify',
    props: {
      dataNotify: {},
    },
    methods: {
      eventClose () {
        this.$emit('eventClose', this)
      },
    },
  }
</script>

<style scoped></style>