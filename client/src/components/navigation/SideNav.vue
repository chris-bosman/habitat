<!-- Pug Template -->
<template lang="pug">
.sidenav(:class="{ collapsed: this.$store.state.menuCollapsed }")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu
      .spacer
        transition(name="slide" mode="out-in")
          Header(v-show="!this.$store.state.menuCollapsed")
      .items
        router-link(v-for="(item,index) in menu" :to="item.href" :key="item.href")
          ul(@mouseenter="item.hovering = true" @mouseleave="item.hovering = false")
            li
              i(:class="item.icon")
              span(v-show="!$store.state.menuCollapsed || item.hovering") {{ item.text }}
</template>

<!-- SCSS Styling -->
<style lang="scss">
.sidenav {
  z-index: 1;
  box-sizing: border-box;
  height: 100%;
  width: 10vw;
  background: transparent;
  position: fixed;
  top: 0;
  transition: 0.5s all;
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
      margin-bottom: 8vh;
      display: flex;
      justify-content: center;
      & img {
        width: 8vw;
      }
    }
    & .items {
      & a {
        text-decoration: none;
        &.router-link-active ul {
          align-content: center;
          background-color: rgb(98, 112, 179);
          opacity: 0.8;
          border-radius: 4px;
          height: 5vh;
        }
        & ul {
          box-sizing: inherit;
          list-style-type: none;
          padding: 0;
          align-self: center;
          & li {
            box-sizing: inherit;
            display: flex;
            margin: 1vh 0;
            height: 5vh;
            border-radius: 4px;
            & i {
              align-self: center;
              margin-left: 0.5vw;
            }
            & span {
              margin-left: 1vw;
              align-self: center;
            }
            &:hover {
              background-color: rgba(190, 189, 184, 0.7);
              color: black;
            }
          }
        }
      }
    }
  }
  &.collapsed {
    width: 4vw;
    & .menu .items {
      transition: 0.5s all;
      margin-left: 0.5vw;
      & a {
        width: 100%;
        & ul {
          width: 80%;
          & i {
            margin-left: 0.8vw;
          }
          &:hover {
            animation: slideout 0.2s linear 0s 1 normal forwards running;
          }
        }
      }
    }
    & button {
      right: 1vw;
    }
  }
}

@keyframes slideout {
  from {
    width: 5vw;
  }
  to {
    width: 11vw;
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

<!-- Javascript -->
<script>
import Header from "@/components/Header";
import store from "@/store";

let menuCollapsed = false;

export default {
  name: "SideNav",
  components: {
    Header: Header
  },
  methods: {
    menuToggle() {
      menuCollapsed = !menuCollapsed;
      store.dispatch("registerMenuChange", menuCollapsed);
    }
  },
  data() {
    return {
      menu: [
        {
          href: "/Start",
          icon: "fas fa-power-off",
          text: "S T A R T",
          hovering: null
        },
        {
          href: "/View",
          icon: "fas fa-tv",
          text: "V I E W",
          hovering: null
        },
        {
          href: "/Analyze",
          icon: "fas fa-flask",
          text: "A N A L Y Z E",
          hovering: null
        },
        {
          href: "/Admin",
          icon: "fas fa-cogs",
          text: "C O N F I G U R E",
          hovering: null
        }
      ]
    };
  }
};
</script>
