<!-- Pug Template -->
<template lang="pug">
.topnav
    mixin link(href, name)
      router-link(class!=attributes.class to=href id=href)= name
    each val, index in {"Home": "Home", "Docs": "Documentation"}
      +link(index, val)
    a(href="https://github.com/chris-bosman/habitat.git" @click.prevent="openNewWindow($event)") GitHub
</template>

<!-- SCSS Styling-->
<style lang="scss">
.topnav {
  top: 0;
  margin: 0 10px 0 0;
  padding: 0;
  background: transparent;
  min-width: 95%;
  height: 75px;
}

.topnav a {
  float: right;
  color: rgb(190, 189, 184);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 4px;
}

.topnav a:hover {
  background-color: rgb(190, 189, 184);
  opacity: 0.8;
  color: black;
}

.topnav a.router-link-active {
  background-color: rgb(98, 112, 179);
  opacity: 0.8;
}
</style>

<!-- Javascript-->
<script>
export default {
  name: "TopNav",
  methods: {
    openNewWindow: function(event) {
      const element = event.target;
      window.open(element.href, '_blank');
    }
  }
};
</script>
