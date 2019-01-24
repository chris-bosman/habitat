<!-- Pug Template -->
<template lang="pug">
.sidenav(id="sidenav")
    button(class="menubttn", id="menubttn", @click="menuToggle()") &#9776;
    .menu(id="menu")
        ul
            mixin link(href, name)
              router-link(class!=attributes.class to=href id=href)= name
            each val, index in {'Start': 'S T A R T', 'View': 'V I E W', 'Analyze': 'A N A L Y Z E', 'Admin': 'C O N F I G U R E'}
              li: +link(index, val)
        .logo
            center
                img(src="@/assets/logo.svg" height="150px" style="opacity:0.6;")
</template>

<!-- SCSS Styling-->
<style lang="scss">
.sidenav {
  height: 100%;
  width: 11vw;
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
  font-size: 30px;
  margin-left: 50px;
  border: none;
  background: transparent;
  color: rgb(235, 234, 229);
  cursor: pointer;
}

.sidenav a {
  padding: 4px 0px 4px 0px;
  text-decoration: none;
  font-size: 99%;
  display: block;
  color: rgb(190, 189, 184);
}

.sidenav ul {
  margin-left: 20px;
  padding-left: 0;
}

.menu {
  width: 92%;
  margin-left: 5px;
  padding-top: 30%;
}

.menu ul li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu li {
  box-sizing: inherit;
  width: 100%;
  font-size: 1vw;
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
let menuOpen = false;

function toggleMenu() {
  var sidenav = document.getElementById("sidenav");
  var menu = document.getElementById("menu");
  if (menuOpen == false) {
    menu.style.visibility = "hidden";
    sidenav.style.width = "3vw";
  } else if (menuOpen == true) {
    sidenav.style.width = "11vw";
    setTimeout(function() {
      menu.style.visibility = "visible";
    }, 300);
  }
  menuOpen = !menuOpen;
}

export default {
  methods: {
    menuToggle() {
      toggleMenu();
    }
  }
};
</script>
