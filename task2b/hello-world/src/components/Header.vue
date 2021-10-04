<template>
  <h1 class="header">Component {{type}} reusable</h1>
</template>

<script>
export default {
    name: 'Header',
    props: {
        type: String
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    text-align: center;
    background-color: black;
    color: white;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
