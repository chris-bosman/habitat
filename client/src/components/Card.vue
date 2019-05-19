<!-- Pug Template -->
<template lang="pug">
.cardContainer
  h3 {{ this.cardtitle }}
  p {{ this.cardtext }}
  i(:class="this.cardicon")
</template>

<!-- SCSS Styling-->
<style lang="scss">
.cardContainer {
  color: rgb(190, 189, 184);
  box-sizing: inherit;
  box-shadow: 1px 1px 1px 1px rgba(190, 189, 184, 0.3);
  padding: 2vh 2vw;
  background-color: rgba(30, 32, 29, 0.8);
  min-height: 30vh;
  max-height: 30vh;
  border-radius: 16px;
  text-align: left;
  border-style: solid;
  border-width: 0.5px;
  border-color: rgb(190, 189, 184);
  transition: transform 0.1s;
  min-width: 125px;
  max-width: 14vw;
  display: flex;
  flex-direction: column;
  &:hover {
    color: rgb(190, 189, 184);
    transform: scale(1.02);
  }
  & h3 {
    text-align: center;
    margin: 0;
  }
  & i {
    box-sizing: inherit;
    text-align: center;
    font-size: 3vw;
    position: absolute;
    bottom: 8vh;
    margin: 0 3vw;
  }
}
</style>

<!-- Javascript-->
<script>
export default {
  name: "Card",
  props: {
    cardtitle: String,
    cardtext: String,
    cardicon: String
  }
};
</script>
