<!-- Pug Template -->
<template lang="pug">
.topnav
    router-link(to="/Home") Home
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
  & a {
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
export default {
  name: "TopNav",
  methods: {
    openNewWindow: function(event) {
      const element = event.target;
      window.open(element.href, "_blank");
    }
  }
};
</script>
