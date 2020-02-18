<!-- Pug Template -->
<template lang="pug">
.result
  .result-window
    .close-button
      span(@click="close") &times;
    .result-box
      p {{ this.$store.state.requestResult }}
</template>

<!-- SCSS Styling -->
<style lang="scss">
.result {
  // appearance attributes
  background: transparent;

  // container attributes
  display: flex;

  // content attributes
  align-items: center;
  justify-content: center;

  // position attributes
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;

  // size attributes
  height: 100%;
  width: 100%;
  & .result-window {
    // appearance attributes
    background-color: rgba(30, 32, 29, 0.9);
    border-radius: 8px;
    box-shadow: 0 0 0 1.5px rgba(235, 234, 229, 0.9);
    box-sizing: border-box;
    margin-top: -20vh;

    // size attributes
    height: 15vh;
    width: 20vw;
    & .close-button {
      // appearance attributes
      cursor: pointer;
      font-size: 2.5vw;
      margin: -4vh -2vw;

      // position attributes
      float: right;
    }
    & .result-box {
      // container attributes
      align-items: center;
      box-sizing: inherit;
      display: flex;
      flex-direction: column;
      justify-content: center;

      // size attributes
      height: 90%;
    }
  }
}
</style>

<!-- Javascript -->
<script>
import { clearResponseState } from "@/scripts/stateManagement/clearResponseState";

export default {
  name: "Result",
  methods: {
    close() {
      clearResponseState();
    }
  }
};
</script>
