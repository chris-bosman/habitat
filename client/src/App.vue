<!-- Pug Template -->
<template lang="pug">
.app
  link(rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous")
  Background
  TopNav
  SideNav(v-show="this.$store.state.authenticated")
  .body(:class="[{ collapsed: this.$store.state.collapsed}, { noAuth: !this.$store.state.authenticated }]")
    .content
      router-view
</template>

<!-- SCSS Styling -->
<style lang="scss">
@charset "utf-8";
@import url("https://fonts.googleapis.com/css?family=Raleway|IBM+Plex+Mono");

html {
  // appearance attributes
  background-image: linear-gradient(black, rgb(30, 32, 29));
  color: rgb(235, 234, 229);
  font-family: "Raleway", sans-serif;
  font-size: calc(5px + 0.5vw);
  font-weight: lighter;
  overflow-x: hidden;

  // position attributes
  z-index: -3;

  // size attributes
  height: 100%;
  width: 100%;
}

body {
  // appearance attributes
  margin: 0;
  transition: margin-left 0.5s;

  // size attributes
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  width: 100%;
}

.app {
  // size attributes
  height: 100%;
  & .body {
    // appearance attributes
    margin: 0 5vw 0 14vw;
    transition: 0.5s;
    &.noAuth {
      // appearance attributes
      margin: 0 7vw;
    }
    &.collapsed {
      // appearance attributes
      margin: 0 7vw;
    }
    & .content {
      // position attributes
      position: relative;
    }
  }
  & a {
    // appearance attributes
    color: rgb(190, 189, 184);
    &.router-link-active {
      // appearance attributes
      background-color: rgb(98, 112, 179);
      opacity: 0.8;
    }
  }
}
</style>

<!-- Javascript -->
<script>
import Background from "@/components/Background";
import SideNav from "@/components/navigation/SideNav";
import TopNav from "@/components/navigation/TopNav";
import store from "./store";

var viewWidth = window.matchMedia("(max-width:700px)");

function hideText(width) {
  if (width.matches) {
    var smallWindow = true;
    store.dispatch("registerWindowWidth", smallWindow);
  }
}

export default {
  name: "Home",
  components: {
    Background: Background,
    SideNav: SideNav,
    TopNav: TopNav
  },
  created() {
    hideText(viewWidth);
  }
};
</script>
