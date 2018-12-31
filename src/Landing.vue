<!-- Pug Template -->
<template lang="pug">
.content
    .background
    .home
        include:markdown-it ./text/home.md
</template>

<!-- SCSS Styling -->
<style lang="scss">
@charset "utf-8";
@import url("https://fonts.googleapis.com/css?family=Raleway");

html {
  background-image: linear-gradient(black, rgb(30, 32, 29));
  color: rgb(235, 234, 229);
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  height: 100%;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  transition: margin-left 0.5s;
}

@import "styles/background";
@import "styles/header";
@import "styles/content";

.home {
  margin: 50px 100px 0px 100px;
}

.home p {
  padding: 10px 0;
}

.home a {
  color: rgb(122, 122, 119);
  text-decoration: none;
}

.home a:hover {
  color: rgb(30, 32, 29);
  background-color: rgb(235, 234, 229);
  border-radius: 2px;
  opacity: 0.4;
}
</style>

<!-- Javascript -->
<script>
</script>
