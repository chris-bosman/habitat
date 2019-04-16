<!-- Pug Template -->
<template lang="pug">
.sidenav(:style="{ width: this.$store.state.menuOpen ? '4vw' : '15vw' }")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu
      transition(name="slide" mode="out-in")
        Header(v-show="!this.$store.state.menuOpen" style="width: 10vw; margin-left: 2vw")
      ul
        router-link(to="/Start" id="Start") #[li] #[i(v-show="this.$store.state.menuOpen" class="fas fa-power-off")] #[span(v-show="!this.$store.state.menuOpen")  S T A R T]
        router-link(to="/View" id="View") #[li] #[i(v-show="this.$store.state.menuOpen" class="fas fa-tv")] #[span(v-show="!this.$store.state.menuOpen") V I E W]
        router-link(to="/Analyze" id="Analyze") #[li] #[i(v-show="this.$store.state.menuOpen" class="fas fa-flask")] #[span(v-show="!this.$store.state.menuOpen") A N A L Y Z E]
        router-link(to="/Admin" id="Admin") #[li] #[i(v-show="this.$store.state.menuOpen" class="fas fa-cogs")] #[span(v-show="!this.$store.state.menuOpen") C O N F I G U R E]
</template>

<!-- SCSS Styling-->
<style lang="scss">
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: transparent;
  padding: 30px 0 0 0;
  transition: 0.5s;
  box-shadow: 0px 0px 3px 0px rgb(30, 32, 29) inset;
  margin: 0;
  box-sizing: border-box;
}

.sidenav button {
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 20px;
  margin-left: 50px;
  border: none;
  background: transparent;
  color: rgb(235, 234, 229);
  cursor: pointer;
}

.slide-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.sidenav a {
  padding: 4px 0px 4px 0px;
  text-decoration: none;
  font-size: 1.2vw;
  display: block;
  color: rgb(190, 189, 184);
}

.sidenav ul {
  margin-left: 0.8vw;
  margin-top: 10vh;
  padding-left: 0;
}

.menu {
  width: 92%;
  margin-left: 5px;
  padding-top: 8vh;
}

.menu ul li {
  list-style-type: none;
  padding: 0;
}

.menu li {
  box-sizing: inherit;
  width: 100%;
  font-size: 1.25vw;
}

.menu a {
  border-radius: 4px;
  padding: 10px 0px 10px 7px;
}

.menu a:hover {
  background-color: rgb(190, 189, 184);
  color: black;
}

.menu ul li a.router-link-active {
  background-color: rgb(98, 112, 179);
}

.logo {
  position: absolute;
  bottom: 18%;
  width: 100%;
  z-index: -1;
}
</style>

<!-- Javascript-->
<script>
import Header from "@/components/Header";
import store from "../store";

let menuOpen = false;

export default {
  components: {
    Header: Header
  },
  methods: {
    menuToggle() {
      menuOpen = !menuOpen;
      store.dispatch("registerCollapse", menuOpen);
    }
  }
};
</script>
