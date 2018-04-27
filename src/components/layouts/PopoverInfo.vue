<template>
    <a href="#help-user" tabindex="0"
       role="button"
       data-toggle="popover"
       data-placement="bottom"
       data-container="body"
       data-trigger="focus"
       :title="(data_popover.title == undefined) ? 'Ayuda!' : data_popover.title"
       :data-content="data_popover.content">
        <i class="fa fa-question-circle-o text-secondary m-1"></i>
    </a>
</template>

<script>
  export default {
    name: 'PopoverInfo',
    props:{
      data_popover:{}
    }
  }
</script>

<style scoped>

</style>