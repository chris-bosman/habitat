<!-- Pug Template -->
<template lang="pug">
.modal-wrapper
  .label
    h1 Loading...
  RingLoader(class="loader" :color="color" :loading="loading")
</template>

<!-- SCSS Styling-->
<style lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .label {
    margin: -20vh 0 4vh 2vw;
  }
}
</style>

<!-- Javascript-->
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
