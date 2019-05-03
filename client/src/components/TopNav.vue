<!-- Pug Template -->
<template lang="pug">
.topnav
    button(v-if="authenticated" v-on:click="logout()" id="logout-button") Logout
    button(v-else v-on:click="login()" id="login-button") Login
    router-link(to="/") Home
    router-link(to="/Docs") Documentation
    a(href="https://github.com/chris-bosman/habitat.git" @click.prevent="openNewWindow($event)") GitHub
</template>

<!-- SCSS Styling-->
<style lang="scss">
.topnav {
  top: 0;
  margin: 0 1vw 0 0;
  padding: 0;
  background: transparent;
  min-width: 95%;
  height: 8vh;
  & button {
    color: rgb(190, 189, 184);
    background: transparent;
    border: none;
    font-family: "Raleway", sans-serif;
    font-weight: lighter;
    font-size: 0.8vw;
    cursor: pointer;
  }
  & a,
  button {
    float: right;
    text-align: center;
    padding: 2vh 1vw;
    text-decoration: none;
    border-radius: 4px;
    &:hover {
      background-color: rgb(190, 189, 184);
      opacity: 0.8;
      color: black;
    }
  }
}
</style>

<!-- Javascript-->
<script>
import store from "../store";

export default {
  name: "TopNav",
  data: function() {
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

      this.$router.go({ path: "/" });
    }
  }
};
</script>
