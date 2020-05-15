<!-- Pug Template -->
<template lang="pug">
.content
  .header
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
<style lang="scss"></style>

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
