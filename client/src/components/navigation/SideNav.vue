<!-- Pug Template -->
<template lang="pug">
.sidenav(:class="{ collapsed: this.$store.state.menuCollapsed }")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu
      .spacer
        transition(name="slide" mode="out-in")
          Header(v-show="!this.$store.state.menuCollapsed")
      .items
        MenuButton
          router-link(to="/Start")
            i(class="fas fa-power-off")
            div S T A R T

        MenuButton
          router-link(to="/View")
            i(class="fas fa-tv")
            div V I E W

        MenuButton
          router-link(to="/Analyze")
            i(class="fas fa-flask")
            div A N A L Y Z E

        MenuButton
          router-link(to="/Admin")
            i(class="fas fa-cogs")
            div A D M I N
</template>

<!-- SCSS Styling -->
<style lang="scss">
.sidenav {
  // appearance attributes
  background: transparent;
  box-sizing: border-box;
  box-shadow: 0px 0px 3px 0px rgb(30, 32, 29) inset;
  transition: 0.5s all;

  // position attributes
  position: fixed;
  top: 0;
  z-index: 1;

  // size attributes
  height: 100%;
  min-width: 125px;
  width: 10vw;

  & .menubttn {
    // appearance attribuges
    background: transparent;
    border: none;
    color: rgb(235, 234, 229);
    cursor: pointer;
    font-size: 1.5vw;

    // position attributes
    position: absolute;
    right: 0.5vw;
    top: 0;
  }
  & .menu {
    // appearance attributes
    padding: 12vh 0;

    // container attributes
    box-sizing: inherit;

    // size attributes
    height: 100%;

    & .items {
      // container attributes
      box-sizing: inherit;

      & .menubutton {
        // size attributes
        min-height: 50px;
        height: 3vh;

        & a {
          // appearance attributes
          font-size: calc(12px + 0.2vw);

          // content attributes
          float: left;

          // size attributes
          max-height: 40px;

          & i {
            // appearance attributes
            padding: 0 0.5vw;
          }
        }
      }
    }

    & .spacer {
      // appearance attributes
      margin-bottom: 8vh;

      // container attributes
      box-sizing: inherit;
      display: flex;

      // content attributes
      justify-content: center;

      // size attributes
      height: 4vh;
      & img {
        // size attributes
        width: 8vw;
      }
    }
  }
  &.collapsed {
    // size attributes
    min-width: 0;
    width: 4vw;
    & .menu .items {
      // appearance attributes
      transition: 0.5s all;

      // container attributes
      display: flex;
      flex-direction: column;

      // content attributes
      align-items: center;
      & .menubutton {
        // container attributes
        box-sizing: inherit;
        display: flex;

        // size attributes
        min-width: 2.5vw;
        & a {
          // container attributes
          display: flex;

          // content attributes
          align-items: center;
          justify-content: center;
        }

        &.inactive {
          & div {
            // appearance attributes
            display: none;
          }
        }

        &:hover {
          // appearance attributes
          animation: slideout 0.15s linear 0s 1 normal forwards running;
        }
      }
    }
    & .menubttn {
      // position attributes
      right: 1vw;
    }
  }
}

@keyframes slideout {
  from {
    // position attributes
    left: 0;

    // size attributes
    width: 5vw;
  }
  to {
    // position attributes
    position: relative;
    left: 3vw;

    // size attributes
    min-width: 125px;
    width: 11vw;
  }
}

.slide-enter-active {
  // appearance attributes
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  // appearance attributes
  opacity: 0;
}
</style>

<!-- Javascript -->
<script>
import Header from "@/components/Header";

import MenuButton from "@/components/modules/MenuButton";

import store from "@/store";

let menuCollapsed = false;

export default {
  name: "SideNav",
  components: {
    MenuButton: MenuButton,
    Header: Header
  },
  methods: {
    menuToggle() {
      menuCollapsed = !menuCollapsed;
      store.dispatch("registerMenuChange", menuCollapsed);
    }
  }
};
</script>
