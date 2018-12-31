<!-- Pug Template -->
<template lang="pug">
.sidenav
    button(class='menubttn', id='menubttn', onclick='toggleNav()') &#9776;
    .menu(id='menu')
        ul
            mixin link(href, name)
                a(class!=attributes.class href=href id=href)= name
            li: +link('Start', 'S T A R T')
            li: +link('View', 'V I E W')
            li: +link('Analyze', 'A N A L Y Z E')
            li: +link('/content/admin', 'C O N F I G U R E')
        .logo
            center
                img(src='@/assets/logo.svg' height="150px" style="opacity:0.6;")
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
  padding-top: 30px;
  transition: 0.5s;
  box-shadow: 0px 0px 3px 0px rgb(30, 32, 29) inset;
  white-space: nowrap;
  margin: 0;
  padding-left: 0;
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

.menu a {
  border-radius: 4px;
  padding: 10px 0px 10px 7px;
}

.menu a:hover {
  background-color: rgb(190, 189, 184);
  color: black;
}

.menu ul li a.active {
  background-color: rgb(98, 112, 179);
}

.logo {
  position: absolute;
  bottom: 18%;
  width: 100%;
}
</style>

<!-- Javascript-->
<script>
</script>
