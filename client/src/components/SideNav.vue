<!-- Pug Template -->
<template lang="pug">
.sidenav(:class="this.$store.state.menuCollapsed ? 'collapsed' : ''")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu
      .spacer
        transition(name="slide" mode="out-in")
          Header(v-show="!this.$store.state.menuCollapsed" style="width: 10vw; margin-left: 2vw")
      ul
        router-link(to="/Start" id="Start") #[li] #[i(class="fas fa-power-off")] #[span(v-show="!this.$store.state.menuCollapsed")  S T A R T]
        router-link(to="/View" id="View") #[li] #[i(class="fas fa-tv")] #[span(v-show="!this.$store.state.menuCollapsed") V I E W]
        router-link(to="/Analyze" id="Analyze") #[li] #[i(class="fas fa-flask")] #[span(v-show="!this.$store.state.menuCollapsed") A N A L Y Z E]
        router-link(to="/Admin" id="Admin") #[li] #[i(class="fas fa-cogs")] #[span(v-show="!this.$store.state.menuCollapsed") C O N F I G U R E]
</template>

<!-- SCSS Styling-->
<style lang="scss">
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 1;
  width: 15vw;
  top: 0;
  left: 0;
  background: transparent;
  padding: 30px 0 0 0;
  transition: 0.5s;
  box-shadow: 0px 0px 3px 0px rgb(30, 32, 29) inset;
  margin: 0;
  box-sizing: border-box;
  &.collapsed {
    width: 5vw;
    & .menu ul a {
      margin-right: 18%;
    }
  }
  & button {
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
  & a {
    padding: 4px 0px 4px 0px;
    text-decoration: none;
    font-size: 1.2vw;
    display: block;
    border-radius: 4px;
    padding: 10px 0px 10px 7px;
  }
  & ul li {
    list-style-type: none;
    padding: 0;
  }
  & ul {
    margin-left: 0.8vw;
    margin-top: 10vh;
    padding-left: 0;
  }
  & li {
    box-sizing: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 1.25vw;
  }
  & span {
    margin-left: 1vw;
  }
  & .menu {
    width: 92%;
    margin-left: 5px;
    padding-top: 8vh;
    & .spacer {
      height: 4vh;
    }
  }
}

.slide-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>

<!-- Javascript-->
<script>
import Header from "@/components/Header";
import store from "../store";

let menuCollapsed = false;

export default {
  components: {
    Header: Header
  },
  methods: {
    menuToggle() {
      menuCollapsed = !menuCollapsed;
      store.dispatch("registerCollapse", menuCollapsed);
    }
  }
};
</script>
