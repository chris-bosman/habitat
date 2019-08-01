<!-- Pug Template -->
<template lang="pug">
.selector-container
  i(:class="this.icon")
    span {{ this.text }}
</template>

<!-- SCSS Styling -->
<style lang="scss">
.selector-container {
  // appearance attributes
  padding: 0 1vw;

  // container attributes
  align-items: center;
  display: flex;
  justify-content: space-evenly;
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "Selector",
  props: {
    icon: String,
    text: String
  }
}
</script>
