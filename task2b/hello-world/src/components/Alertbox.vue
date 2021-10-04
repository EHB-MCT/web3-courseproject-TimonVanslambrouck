<template>
  <div class="alert-box">
      <strong>ALERT!</strong> <br>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'AlertBox'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert-box {
    background-color: red;
    margin: 15px;
}
</style>
