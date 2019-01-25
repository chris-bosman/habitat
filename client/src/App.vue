<!-- Pug Template -->
<template lang="pug">
.app
  Background
  TopNav
  SideNav
  .header
    center
      img(src="@/assets/header.svg")
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

.content {
  position: relative;
  margin: 0 5vw 0 13vw;
}

.header {
  height: 60px;
  margin: 0 4vw;
  width: 100%;
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
