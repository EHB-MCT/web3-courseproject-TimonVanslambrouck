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
    color: white;
    margin: 15px;
    width: 30%;
    margin-left: 35%;
}
</style>
