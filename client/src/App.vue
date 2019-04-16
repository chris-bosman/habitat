<!-- Pug Template -->
<template lang="pug">
.app
  link(rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous")
  Background
  TopNav
  SideNav
  .body(:style="{ margin: this.$store.state.menuOpen ? '0 7vw' : '0 5vw 0 20vw' }")
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
  font-size: 1.1vw;
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
  transition: 0.5s;
}

.content {
  position: relative;
}

a {
  color: rgb(190, 189, 184);
}

a:hover {
  background-color: rgb(190, 189, 184);
  opacity: 0.8;
  color: black;
}

a.router-link-active {
  background-color: rgb(98, 112, 179);
  opacity: 0.8;
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
  }
};
</script>
