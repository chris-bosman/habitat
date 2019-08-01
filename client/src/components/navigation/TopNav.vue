<!-- Pug Template -->
<template lang="pug">
.topnav
  .topnav-container
    ButtonTopNav(v-if="!authenticated" v-for="(item, index) in signup" :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
    ButtonTopNav(v-if="authenticated" @click="logout()" v-for="(item, index) in logoutCard" :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
    ButtonTopNav(v-if="!authenticated" @click="login()" v-for="(item, index) in loginCard" :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
    ButtonTopNav(v-for="(item, index) in home"  :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
    ButtonTopNav(v-for="(item, index) in docs"  :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
    ButtonTopNav(@click.prevent="openNewWindow($event)" v-for="(item, index) in github"  :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
    ButtonTopNav(v-for="(item, index) in test"  :key="item.text" :isLink="item.isLink" :isInternal="item.isInternal" :link="item.link" :text="item.text")
</template>

<!-- SCSS Styling -->
<style lang="scss">
.topnav {
  // appearance attributes
  background: transparent;

  // container attributes
  box-sizing: border-box;

  //content attributes
  justify-content: right;

  // location attributes
  top: 0;

  // size attributes
  height: 8vh;
  width: 100vw;
  & .topnav-container {
    // appearance attributes
    margin: 0vh 1vw;

    // container attributes
    box-sizing: inherit;
    display: flex;
    flex-direction: row-reverse;

    // content attributes
    vertical-align: middle;

    // size attributes
    height: 100%;
    width: 98%;
  }
}
</style>

<!-- Javascript -->
<script>
import ButtonTopNav from "@/components/clickables/ButtonTopNav";
import store from "@/store";

export default {
  name: "TopNav",
  components: {
    ButtonTopNav: ButtonTopNav
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
