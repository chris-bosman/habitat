<!-- Pug Template -->
<template lang="pug">
.app
  meta(
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  )
  link(
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossorigin="anonymous"
  )
  Background
  TopNav
  SideNav(v-show="this.$store.state.authenticated")
  .body(:class="[{ collapsed: this.$store.state.menuCollapsed}, { noAuth: !this.$store.state.authenticated }]")
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
  font-size: calc(11px + 0.2vw);
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

    // container attributes
    box-sizing: inherit;

    // size attributes
    height: 100%;

    &.noAuth {
      // appearance attributes
      margin: 0 7vw;
    }
    &.collapsed {
      // appearance attributes
      margin: 0 7vw;
    }
    & .content {
      // container attributes
      box-sizing: inherit;

      // position attributes
      position: relative;

      // size attributes
      height: 100%;
      width: 100%;
    }
    & .header p {
      // appearance attributes
      padding: 2vh 0;
    }
  }
  & a {
    // appearance attributes
    color: rgb(190, 189, 184);
    text-decoration: none;

    &.router-link-active {
      // appearance attributes
      background-color: rgb(98, 112, 179);
      opacity: 0.8;
    }

    &:hover {
      // appearance attributes
      background-color: rgba(235, 234, 229, 0.6);
      border-radius: 4px;
      color: rgb(30, 32, 29);
      cursor: pointer;
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
