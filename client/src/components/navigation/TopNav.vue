<!-- Pug Template -->
<template lang="pug">
.topnav
  .buttonbox
    MenuButton(v-if="!authenticated")
      router-link(to="/SignUp") Sign Up

    MenuButton(
      v-if="authenticated"
      class="authbutton"
      @click="logout()"
    ) Logout

    MenuButton(v-if="!authenticated")
      router-link(
        @click="login()"
        class="authbutton"
        to=""
      ) Login

    MenuButton(v-if="authenticated")
      router-link(to="/Home") Home

    MenuButton
      router-link(to="/Docs") Documentation

    MenuButton
      a(
        @click.prevent="openNewWindow($event)"
        href="https://github.com/chris-bosman/habitat.git"
      ) GitHub

    MenuButton(v-if="authenticated")
      router-link(to="/Test") Test
</template>

<!-- SCSS Styling -->
<style lang="scss">
.topnav {
  // appearance attributes
  background: transparent;

  // container attributes
  box-sizing: border-box;
  display: flex;

  // content attributes
  justify-content: flex-end;

  // location attributes
  top: 0;

  // size attributes
  height: 6vh;
  width: 100vw;

  & .buttonbox {
    // container attributes
    box-sizing: inherit;
    display: flex;

    //content attributes
    align-items: center;
    flex-direction: row-reverse;

    // size attributes
    height: 100%;
    width: 40%;

    & .menubutton {
      // appearance attributes
      margin: 1.5vh 1vw;

      // size attributes
      height: 60%;

      & a {
        // content attributes
        align-items: center;
        justify-content: center;
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
}
</style>

<!-- Javascript -->
<script>
import MenuButton from "@/components/modules/MenuButton";
import store from "@/store";

export default {
  name: "TopNav",
  components: {
    MenuButton: MenuButton
  },
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
