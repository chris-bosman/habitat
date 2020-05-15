<!-- Pug Template -->
<template lang="pug">
.pagebutton
  button(class="PageButton")
    slot
</template>

<!-- SCSS Styling -->
<style lang="scss">
.pagebutton {
  // container attributes
  box-sizing: inherit;

  & button {
    // appearance attributes
    background: transparent;
    border-color: rgb(190, 189, 184);
    border-radius: 4px;
    border-style: solid;
    border-width: 0.5px;
    color: rgb(190, 189, 184);
    cursor: pointer;
    transition: transform 0.1s;

    // container attributes
    box-sizing: inherit;
    display: flex;

    // content attributes
    align-items: center;
    justify-content: center;

    &:hover {
      // appearance attributes
      transform: scale(1.05);
    }
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "PageButton"
};
</script>
