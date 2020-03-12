<!-- Pug Template -->
<template lang="pug">
.habitatbutton
  button(class="HabitatButton")
    slot
</template>

<!-- SCSS Styling -->
<style lang="scss">
.habitatbutton {
  // container attributes
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;

  & button {
    // appearance attributes
    background: transparent;
    border: none;
    color: rgb(190, 189, 184);
    cursor: pointer;
    padding: 0;

    // container attributes
    box-sizing: inherit;

    // size attributes
    height: 100%;
    width: 100%;

    & a {
      // appearance attributes
      border-radius: 4px;
      text-decoration: none;

      // container attributes
      box-sizing: inherit;
      display: flex;

      // content attributes
      align-items: center;

      // size attributes
      height: 80%;
      width: 100%;

      &:hover {
        // appearance attributes
        background-color: rgb(190, 189, 184);
        color: black;
        opacity: 0.8;
      }
    }
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "HabitatButton"
};
</script>
