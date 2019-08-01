<!-- Pug Template -->
<template lang="pug">
.buttonContainer
  .topLink(v-if="this.isLink")
    router-link(v-if="this.isInternal" :to="this.link")
      div {{ this.text }}
    a(v-if="!this.isInternal" :href="this.link")
      div {{ this.text }}
  .topButton(v-else)
    button
      div {{ this.text }}
</template>

<!-- SCSS Styling -->
<style lang="scss">
.buttonContainer {
  // container attributes
  align-items: center;
  box-sizing: inherit;
  display: flex;
  justify-content: center;

  // size attributes
  height: 80%;
  & .topLink,
  .topButton {
    // container attributes
    box-sizing: inherit;
    display: flex;
    align-items: center;

    // size attributes
    height: 100%;
    width: 100%;
  }
  & .topLink a,
  .topButton button {
    // appearance attributes
    background: transparent;
    border: none;
    border-radius: 4px;
    color: rgb(190, 189, 184);
    cursor: pointer;
    font-size: calc(5px + 0.5vw);
    font-family: "Raleway", sans-serif;
    font-weight: lighter;
    padding: 0;
    text-decoration: none;

    // container attributes
    align-items: center;
    box-sizing: inherit;
    display: flex;
    justify-content: center;

    // size attributes
    height: 3vh;
    width: 100%;
    &:hover {
      // appearance attributes
      background-color: rgb(190, 189, 184);
      color: black;
      opacity: 0.8;
    }
    & div {
      padding: 0 0.75vw;
    }
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "ButtonTopNav",
  props: {
    isLink: Boolean,
    isInternal: Boolean,
    link: String,
    text: String
  }
};
</script>
