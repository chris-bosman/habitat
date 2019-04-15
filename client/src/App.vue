<!-- Pug Template -->
<template lang="pug">
.app
  link(rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous")
  Background
  TopNav
  SideNav
  .body
    .content
      router-view
</template>

<!-- SCSS Styling-->
<style lang="scss">
@charset "utf-8";
@import url("https://fonts.googleapis.com/css?family=Raleway|IBM+Plex+Mono");

html {
  background-image: linear-gradient(black, rgb(30, 32, 29));
  color: rgb(235, 234, 229);
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  z-index: -3;
}

body {
  margin: 0;
  height: 100%;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  transition: margin-left 0.5s;
}

.app {
  height: 100%;
}

.body {
  margin: 0 5vw;
}

.content {
  position: relative;
}

.head {
  margin-left: 5vw;
}
</style>

<!-- Javascript-->
<script>
import Background from "@/components/Background";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";

export default {
  name: "Home",
  components: {
    Background: Background,
    SideNav: SideNav,
    TopNav: TopNav
  },
  computed: {
    collapsedState() {
      return this.$store.state.collapsed;
    }
  }
};
</script>
