<!-- Pug Template -->
<template lang="pug">
.menubutton(
  @mouseover="hovering = true"
  @mouseleave="hovering = false"
  :class="{ active: hovering, inactive: !hovering }"
)
  button(class="MenuButton")
    slot
</template>

<!-- SCSS Styling -->
<style lang="scss">
.menubutton {
  // container attributes
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;

  & .MenuButton {
    // appearance attributes
    background: transparent;
    border: none;
    border-radius: 4px;
    color: rgb(190, 189, 184);
    cursor: pointer;
    font-size: calc(11px + 0.2vw);
    padding: 0;

    // container attributes
    box-sizing: inherit;

    // content attributes
    align-items: center;

    // size attributes
    height: 100%;
    width: 100%;

    &:hover {
      // appearance attributes
      background-color: rgba(235, 234, 229, 0.6);
      border-radius: 4px;
      color: rgb(30, 32, 29);
      cursor: pointer;
    }

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
      height: 100%;
      width: 100%;
    }
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "MenuButton",
  data() {
    return {
      hovering: false
    };
  }
};
</script>
