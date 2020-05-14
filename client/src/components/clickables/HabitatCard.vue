<!-- Pug Template -->
<template lang="pug">
.HabitatCard
  slot
</template>

<!-- SCSS Styling -->
<style lang="scss">
.HabitatCard {
  // appearance attributes
  background-color: rgba(30, 32, 29, 0.8);
  border-color: rgb(190, 189, 184);
  border-radius: 16px;
  border-style: solid;
  border-width: 0.5px;
  box-shadow: 1px 1px 1px 1px rgba(190, 189, 184, 0.3);
  color: rgb(190, 189, 184);
  text-align: left;
  transition: transform 0.1s;

  //container attributes
  box-sizing: border-box;

  &:hover {
    // appearance attributes
    color: rgb(190, 189, 184);
    transform: scale(1.02);
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "HabitatCard"
};
</script>
