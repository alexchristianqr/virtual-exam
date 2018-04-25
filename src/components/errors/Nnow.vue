<template>
    <div class="flex-center position-ref full-height">
        <div class="content">
            <div class="title text-dark">
                <p>Sorry, the page you are looking for could not be found.</p>
                <p><a href @click.prevent="$router.replace('/login')" class="btn btn-link text-secondary"><h6>back to <strong>Page Login</strong></h6></a></p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Know',
  }
</script>

<style scoped>
    html, body {
        background-color: #fff !important;
        color: #636b6f !important;
        font-family: 'Raleway', sans-serif !important;
        font-weight: 100 !important;
        height: 100vh!important;
        margin: 0!important;
    }
    .full-height {
        height: 100vh !important;
    }
    .flex-center {
        align-items: center !important;
        display: flex !important;
        justify-content: center !important;
    }
    .position-ref {
        position: relative !important;
    }
    .content {
        text-align: center !important;
    }
    .title {
        font-size: 36px !important;
        padding: 20px !important;
    }
</style>