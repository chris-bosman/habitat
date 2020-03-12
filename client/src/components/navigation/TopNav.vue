<!-- Pug Template -->
<template lang="pug">
.topnav
  .buttonbox
    HabitatButton(v-if="!authenticated")
      router-link(to="/SignUp") Sign Up

    HabitatButton(v-if="authenticated")
      router-link(
        @click="logout()"
        class="authbutton"
        to=""
      ) Logout

    HabitatButton(v-if="!authenticated")
      router-link(
        @click="login()"
        class="authbutton"
        to=""
      ) Login

    HabitatButton(v-if="authenticated")
      router-link(to="/Home") Home

    HabitatButton
      router-link(to="/Docs") Documentation

    HabitatButton
      a(
        @click.prevent="openNewWindow($event)"
        href="https://github.com/chris-bosman/habitat.git"
      ) GitHub

    HabitatButton(v-if="authenticated")
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
  height: 8vh;
  width: 100vw;

  & .buttonbox {
    // container attributes
    box-sizing: inherit;
    display: flex;

    //content attributes
    flex-direction: row-reverse;

    // size attributes
    height: 100%;
    width: 40%;

    & .habitatbutton {
      // appearance attributes
      margin: 1.5vh 1vw 0 1vw;

      // size attributes
      height: 70%;

      & a {
        justify-content: center;
      }

      & .authbutton.router-link-active {
        // appearance attributes
        background: transparent;

        &:hover {
          // appearance attributes
          background-color: rgb(190, 189, 184);
          color: black;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>

<!-- Javascript -->
<script>
import HabitatButton from "@/components/clickables/HabitatButton";
import store from "@/store";

export default {
  name: "TopNav",
  components: {
    HabitatButton: HabitatButton
  },
  data() {
    return {
      authenticated: false,
      signup: [
        {
          isLink: true,
          isInternal: true,
          link: "/SignUp",
          text: "Sign Up"
        }
      ],
      logoutCard: [
        {
          isLink: false,
          isInternal: true,
          link: "",
          text: "Logout"
        }
      ],
      loginCard: [
        {
          isLink: false,
          isInternal: true,
          link: "",
          text: "Login"
        }
      ],
      home: [
        {
          isLink: true,
          isInternal: true,
          link: "/Home",
          text: "Home"
        }
      ],
      docs: [
        {
          isLink: true,
          isInternal: true,
          link: "/Docs",
          text: "Documentation"
        }
      ],
      test: [
        {
          isLink: true,
          isInternal: true,
          link: "/Test",
          text: "Test"
        }
      ],
      github: [
        {
          isLink: true,
          isInternal: false,
          link: "https://github.com/chris-bosman/habitat.git",
          text: "GitHub"
        }
      ]
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
