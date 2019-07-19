<!-- Pug Template -->
<template lang="pug">
.signup
  .su-head
    center
      Header
    h2 Create your Habitat
  .su-cards
      .column(@click="orgModal")
        Card(v-for="(item, index) in orgCard" :key="item.title" :cardtitle="item.title" :cardtext="item.text" :cardicon="item.icon")
      .column(@click="userModal")
        Card(v-for="(item, index) in userCard" :key="item.title" :cardtitle="item.title" :cardtext="item.text" :cardicon="item.icon")
</template>

<!-- SCSS Styling-->
<style lang="scss">
.signup {
  & .su-cards {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    & .column {
      box-sizing: inherit;
      margin: 0 10vw;
      & Card {
        width: 20vw;
      }
    }
  }
}
</style>

<!-- Javascript-->
<script>
import Header from "@/components/Header";
import Card from "@/components/Card";

export default {
    name: "SignUp",
    components: {
      Header: Header,
      Card: Card
    },
    data() {
      return {
        orgCard: [
            {
            title: "Create your Organization",
            text: "What organization are you creating a Habitat for?",
            icon: "far fa-building"
            }
        ],
        userCard: [
            {
                title: "Create yourself",
                text: "Who are you?",
                icon: "far fa-user"
            }
        ]
      }
    }
}
</script>
