<!-- Pug Template -->
<template lang="pug">
.sidenav(:class="{ collapsed: this.$store.state.menuCollapsed }")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu
      .spacer
        transition(name="slide" mode="out-in")
          Header(v-show="!this.$store.state.menuCollapsed")
      .items
        ButtonSideNav(
          v-for="(item, index) in start"
          :key="item.text"
          :link="item.link"
          :icon="item.icon"
          :text="item.text"
        )

        ButtonSideNav(
          v-for="(item, index) in view"
          :key="item.text"
          :link="item.link"
          :icon="item.icon"
          :text="item.text"
        )

        ButtonSideNav(
          v-for="(item, index) in analyze"
          :key="item.text"
          :link="item.link"
          :icon="item.icon"
          :text="item.text"
        )

        ButtonSideNav(
          v-for="(item, index) in admin"
          :key="item.text"
          :link="item.link"
          :icon="item.icon"
          :text="item.text"
        )
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
  width: 10vw;
  & button {
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
    width: 4vw;
    & .menu .items {
      // appearance attributes
      transition: 0.5s all;
      & a {
        & ul {
          &:hover {
            // appearance attributes
            animation: slideout 0.2s linear 0s 1 normal forwards running;
          }
        }
      }
    }
    & button {
      // position attributes
      right: 1vw;
    }
  }
}

@keyframes slideout {
  from {
    // size attributes
    width: 5vw;
  }
  to {
    // size attributes
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
import ButtonSideNav from "@/components/clickables/ButtonSideNav";
import Header from "@/components/Header";
import store from "@/store";

let menuCollapsed = false;

export default {
  name: "SideNav",
  components: {
    Header: Header,
    ButtonSideNav: ButtonSideNav
  },
  methods: {
    menuToggle() {
      menuCollapsed = !menuCollapsed;
      store.dispatch("registerMenuChange", menuCollapsed);
    }
  },
  data() {
    return {
      hovering: null,
      start: [
        {
          link: "/Start",
          icon: "fas fa-power-off",
          text: "S T A R T"
        }
      ],
      view: [
        {
          link: "/View",
          icon: "fas fa-tv",
          text: "V I E W"
        }
      ],
      analyze: [
        {
          link: "/Analyze",
          icon: "fas fa-flask",
          text: "A N A L Y Z E"
        }
      ],
      admin: [
        {
          link: "/Admin",
          icon: "fas fa-cogs",
          text: "A D M I N"
        }
      ]
    };
  }
};
</script>
