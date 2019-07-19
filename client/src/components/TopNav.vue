<!-- Pug Template -->
<template lang="pug">
.topnav
  .items
    router-link(to="/SignUp" id="signup-button") Sign Up
    button(v-if="authenticated" @click="logout()" id="logout-button") Logout
    button(v-else @click="login()" id="login-button") Login
    router-link(to="/Home") Home
    router-link(to="/Docs") Documentation
    a(href="https://github.com/chris-bosman/habitat.git" @click.prevent="openNewWindow($event)") GitHub
    router-link(to="/Test") Test
</template>

<!-- SCSS Styling-->
<style lang="scss">
.topnav {
  // appearance attributes
  background: transparent;

  //content attributes
  justify-content: right;

  // location attributes
  top: 0;

  // size attributes
  height: 8vh;
  width: 100vw;
  & .items {
    // appearance attributes
    margin: 0.25vh 1vw;

    // container attributes
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;

    // content attributes
    vertical-align: middle;
    & button {
      // appearance attributes
      background: transparent;
      border: none;
      color: rgb(190, 189, 184);
      cursor: pointer;
      font-size: calc(5px + 0.5vw);
      font-family: "Raleway", sans-serif;
      font-weight: lighter;

      // container attributes
      box-sizing: inherit;
    }
    & a,
    button {
      // appearance attributes
      border-radius: 4px;
      padding: 2vh 1vw;

      // container attributes
      box-sizing: inherit;

      // content attributes
      text-decoration: none;
      &:hover {
        // appearance attributes
        background-color: rgb(190, 189, 184);
        color: black;
        opacity: 0.8;
      }
    }
    & #signup-button {
      // appearance attributes
      background-color: rgb(190, 189, 184);
      color: black;
      opacity: 0.8;

      // container attributes
      box-sizing: inherit;
      &:hover {
        // appearance attributes
        background-color: rgb(98, 112, 179);
        opacity: 0.8;
      }
    }
  }
}
</style>

<!-- Javascript-->
<script>
import store from "../store";

export default {
  name: "TopNav",
  data() {
    return {
      authenticated: false
    };
  },
  created() {
    this.isAuthenticated();
  },
  watch: {
    //eslint-disable-next-line
    '$route': 'isAuthenticated'
  },
  methods: {
    openNewWindow: function(event) {
      const element = event.target;
      window.open(element.href, "_blank");
    },
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
      var authenticated = this.authenticated;
      store.dispatch("registerAuth", authenticated);
    },
    login() {
      this.$auth.loginRedirect("/");
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      this.$router.go({ path: "/Home" });
    }
  }
};
</script>
