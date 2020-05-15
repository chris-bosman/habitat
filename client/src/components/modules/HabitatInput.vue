<!-- Pug Template -->
<template lang="pug">
.input
  input(
    :value="this.formField"
    :placeholder="this.displayText"
    @input="$emit('input', $event.target.value)"
  )
</template>

<!-- SCSS Styling -->
<style lang="scss">
input {
  // appearance settings
  background-color: rgba(190, 189, 184, 0.2);
  color: rgb(190, 189, 184);
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "HabitatInput",
  props: {
    formField: String,
    displayText: String
  }
};
</script>
