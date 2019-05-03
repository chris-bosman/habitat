<!-- Pug Template -->
<template lang="pug">
.home
  .home-text
    h2 Welcome to your Habitat!
    p(v-if="this.$store.state.authenticated").
      Why waste any time? #[router-link(to="/Start") Get Started Now!]
    p(v-else).
      Please #[a(to="javascript:void()" @click="login()") Login now]
</template>

<!-- SCSS Styling -->
<style lang="scss">
.home-text {
  & p {
    padding: 2vh 0;
  }
  & a {
    color: rgb(122, 122, 119);
    text-decoration: none;
    &:hover {
      color: rgb(30, 32, 29);
      background-color: rgb(235, 234, 229);
      border-radius: 2px;
      opacity: 0.4;
      cursor: pointer;
    }
  }
}
</style>

<!-- Javascript -->
<script>
export default {
  name: "Home",
  methods: {
    login() {
      this.$auth.loginRedirect("/");
    }
  }
};
</script>
