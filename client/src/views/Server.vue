<!-- Pug Template -->
<template lang="pug">
.server
  span Server Dummy Data
  button(@click="testServer") Test Server
</template>

<!-- SCSS Styling-->
<style lang="scss"></style>

<!-- Javascript-->
<script>
export default {
  name: "Server",
  methods: {
      testServer() {
          console.log("here");
      }
  }
};
</script>