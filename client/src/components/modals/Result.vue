<!-- Pug Template -->
<template lang="pug">
.result
  .result-window
    .close-button
      span(@click="close") &times;
    .result-box
      p {{ this.$store.state.requestResult }}
</template>

<!-- SCSS Styling-->
<style lang="scss">
.result {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  & .result-window {
    margin-top: -20vh;
    box-sizing: border-box;
    background-color: rgba(30, 32, 29, 0.9);
    width: 20vw;
    height: 15vh;
    border-radius: 8px;
    box-shadow: 0 0 0 1.5px rgba(235, 234, 229, 0.9);
    & .close-button {
      margin: -4vh -2vw;
      float: right;
      font-size: 2.5vw;
      cursor: pointer;
    }
    & .result-box {
      box-sizing: inherit;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
</style>

<!-- Javascript-->
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
