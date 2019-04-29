<!-- Pug Template -->
<template lang="pug">
.sidenav(:class="this.$store.state.menuCollapsed ? 'collapsed' : ''")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu
      .spacer
        transition(name="slide" mode="out-in")
          Header(v-show="!this.$store.state.menuCollapsed" style="width: 10vw")
      ul
        router-link(to="/Start")
          li
            i(class="fas fa-power-off")
            span(v-if="!this.$store.state.menuCollapsed")  S T A R T
        router-link(to="/View")
          li
            i(class="fas fa-tv")
            span(v-if="!this.$store.state.menuCollapsed") V I E W
        router-link(to="/Analyze")
          li
            i(class="fas fa-flask")
            span(v-if="!this.$store.state.menuCollapsed") A N A L Y Z E
        router-link(to="/Admin")
          li
            i(class="fas fa-cogs")
            span(v-if="!this.$store.state.menuCollapsed") C O N F I G U R E
</template>

<!-- SCSS Styling-->
<style lang="scss">
.sidenav {
  z-index: 1;
  box-sizing: border-box;
  height: 100%;
  width: 15vw;
  background: transparent;
  position: fixed;
  top: 0;
  transition: 0.5s;
  box-shadow: 0px 0px 3px 0px rgb(30, 32, 29) inset;
  & button {
    position: absolute;
    top: 0;
    right: 0.5vw;
    background: transparent;
    border: none;
    color: rgb(235, 234, 229);
    font-size: 1.5vw;
    cursor: pointer;
  }
  & .menu {
    box-sizing: inherit;
    padding: 12vh 0;
    height: 100%;
    & .spacer {
      box-sizing: inherit;
      height: 4vh;
      display: flex;
      justify-content: center;
    }
    & ul {
      box-sizing: inherit;
      width: 100%;
      list-style-type: none;
      padding: 0;
      margin-top: 8vh;
      & a {
        text-decoration: none;
        & li {
          box-sizing: inherit;
          display: flex;
          margin: 1vh 0;
          width: 90%;
          margin-left: 1vw;
          border-radius: 4px;
          height: 4vh;
          & i {
            align-self: center;
            margin-left: 0.5vw;
          }
          & span {
            font-size: 1.2vw;
            margin-left: 1vw;
            align-self: center;
          }
          &:hover {
            background-color: rgb(190, 189, 184);
            opacity: 0.8;
            color: black;
          }
        }
      }
    }
  }
  &.collapsed {
    width: 5vw;
    & .menu ul a li:hover {
      width: 13vw;
    }
    & button {
      right: 1.5vw;
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
  },
  data() {
    return {
      hover: false
    };
  }
};
</script>
