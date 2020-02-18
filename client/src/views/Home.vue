<!-- Pug Template -->
<template lang="pug">
.home
  .home-text
    .authHome(v-if="this.$store.state.authenticated")
      h2 Welcome to Your Habitat!
      p.
        Why waste any time? #[router-link(to="/Start") Get Started Now!]
    .unAuthHome(v-else)
      center
        Header
      p.
        Please #[a(to="javascript:void()" @click="login()") Login now]
</template>

<!-- SCSS Styling -->
<style lang="scss">
.home-text {
  & p {
    // appearance attributes
    padding: 2vh 0;
  }
  & a {
    // appearance attributes
    color: rgb(122, 122, 119);
    text-decoration: none;
    &:hover {
      // appearance attributes
      background-color: rgb(235, 234, 229);
      border-radius: 2px;
      color: rgb(30, 32, 29);
      cursor: pointer;
      opacity: 0.4;
    }
  }
}
</style>

<!-- Javascript -->
<script>
import Header from "@/components/Header";

export default {
  name: "Home",
  components: {
    Header: Header
  },
  methods: {
    login() {
      this.$auth.loginRedirect("/");
    }
  }
};
</script>
