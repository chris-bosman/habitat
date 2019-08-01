<!-- Pug Template -->
<template lang="pug">
.cardContainer
  h3 {{ this.cardtitle }}
  p {{ this.cardtext }}
  i(:class="this.cardicon")
</template>

<!-- SCSS Styling -->
<style lang="scss">
.cardContainer {
  // appearance attributes
  background-color: rgba(30, 32, 29, 0.8);
  border-color: rgb(190, 189, 184);
  border-radius: 16px;
  border-style: solid;
  border-width: 0.5px;
  box-shadow: 1px 1px 1px 1px rgba(190, 189, 184, 0.3);
  color: rgb(190, 189, 184);
  padding: 2vh 2vw;
  text-align: left;
  transition: transform 0.1s;

  //container attributes
  box-sizing: inherit;
  display: flex;
  flex-direction: column;

  // size attributes
  height: 30vh;
  max-width: 14vw;
  min-height: 250px;
  min-width: 125px;
  &:hover {
    // appearance attributes
    color: rgb(190, 189, 184);
    transform: scale(1.02);
  }
  & h3 {
    // appearance attributes
    margin: 0;
    text-align: center;
  }
  & p {
    // size attributes
    height: 10vh;
  }
  & i {
    // appearance attributes
    font-size: 3vw;
    padding-top: 2vh;
    text-align: center;

    // container attributes
    box-sizing: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

<!-- Javascript -->
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
