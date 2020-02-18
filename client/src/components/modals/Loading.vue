<!-- Pug Template -->
<template lang="pug">
.modal-wrapper
  .label
    h1 Loading...
  RingLoader(class="loader" :color="color" :loading="loading")
</template>

<!-- SCSS Styling -->
<style lang="scss">
.modal-wrapper {
  // appearance attributes
  background-color: rgba(0, 0, 0, 0.5);

  // container attributes
  display: flex;
  flex-direction: column;

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
  & .label {
    // appearance attributes
    margin: -20vh 0 4vh 2vw;
  }
}
</style>

<!-- Javascript -->
<script>
import { RingLoader } from "@saeris/vue-spinners";

export default {
  name: "Loading",
  components: {
    RingLoader: RingLoader
  },
  data() {
    return {
      color: "#ebeae5",
      loading: true
    };
  }
};
</script>
