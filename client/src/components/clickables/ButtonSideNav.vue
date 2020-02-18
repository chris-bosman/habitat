<!-- Pug Template -->
<template lang="pug">
.buttonContainer
  router-link(:to="this.link")
    ul(
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    )
      li(:class="{ collapsed: this.$store.state.menuCollapsed }")
        i(:class="this.icon")
        span(v-show="!$store.state.menuCollapsed || hovering") {{ this.text }}
</template>

<!-- SCSS Styling -->
<style lang="scss">
.buttonContainer {
  & a {
    // appearance attributes
    border-radius: 4px;
    text-decoration: none;

    // container attributes
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;

    // content attributes
    align-content: center;

    // size attributes
    height: 5vh;
    & ul {
      // appearance attributes
      list-style-type: none;
      padding: 0;

      // container attributes
      align-self: center;
      box-sizing: inherit;
      flex-grow: 1;
      flex-shrink: 0;
      & li {
        // appearance attributes
        border-radius: 4px;

        // container attributes
        box-sizing: inherit;
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;

        // content attributes
        align-items: center;

        // size attributes
        height: 5vh;
        & i {
          // appearance attributes
          margin: 0 0.5vw;
        }
        &.collapsed {
          // content attributes
          justify-content: center;
        }
        &:hover {
          // appearance attributes
          background-color: rgba(190, 189, 184, 0.7);
          color: black;
          padding-left: 4vw;

          // container attributes
          flex-grow: 0;

          // content attributes
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "ButtonSideNav",
  props: {
    link: String,
    icon: String,
    text: String
  },
  data() {
    return {
      hovering: false
    };
  }
};
</script>
