<!-- Pug Template -->
<template lang="pug">
.home
  .home-text
    h2 Welcome to your Habitat!
    p.
      Why waste any time? #[router-link(to="/Start") Get Started Now!]
</template>

<!-- SCSS Styling -->
<style lang="scss">
.home-text {
  margin: 5vh 3vw;
}

.home-text p {
  padding: 2vh 0;
}

.home-text a {
  color: rgb(122, 122, 119);
  text-decoration: none;
}

.home-text a:hover {
  color: rgb(30, 32, 29);
  background-color: rgb(235, 234, 229);
  border-radius: 2px;
  opacity: 0.4;
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "Home"
};
</script>
