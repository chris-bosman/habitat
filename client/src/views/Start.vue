<!-- Pug Template -->
<template lang="pug">
.gs
  Modal(v-show="isModalVisible" @close="closeModal" id="Modal")
  .gs-head
    include:markdown-it ../text/gs.md
  .cards
    .column
      .card(@click="showModal" id="uploadCard")
        h3 Import
        p Start your Habitat journey by importing your first Terraform state (.tfstate) file.
        .ico
          img(src='@/assets/upload.svg' width="65%" style="opacity:0.7;")
    .column
      a(href='View')
        .card
          h3 Visualize
          p Dig into Habitat's functionality by checking out our visualization tools.
          .ico
            img(src='@/assets/visualize.svg' width="75%" style="opacity:0.75;")
    .column
      a(href='Analyze')
        .card
          h3 Analyze
          p Compare the real-world state of your infrastructure against your Terraform code.
          .ico
            img(src='@/assets/analyze.svg' width="90%" style="opacity:0.8;")
</template>

<!-- SCSS Styling-->
<style lang="scss">
#Modal {
  z-index: 5;
}

.gs {
  & a {
    text-decoration: none;
    color: rgb(235, 234, 229);
    box-sizing: inherit;
  }
  & .cards {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    height: 60vh;
    width: 100%;
    margin-top: 7vh;
    &:after {
      display: table;
      clear: both;
      content: "";
    }
    & .column {
      box-sizing: inherit;
      float: left;
      padding: 0 10px;
      height: 40vh;
      max-height: 400px;
      width: 25%;
      margin-right: 1vw;
      & .card {
        color: rgb(190, 189, 184);
        box-sizing: inherit;
        box-shadow: 1px 1px 1px 1px rgba(190, 189, 184, 0.3);
        padding: 16px;
        background-color: rgba(30, 32, 29, 0.8);
        height: 100%;
        border-radius: 16px;
        text-align: left;
        border-style: solid;
        border-width: 0.5px;
        border-color: rgb(190, 189, 184);
        transition: transform 0.1s;
        min-width: 125px;
        max-width: 16vw;
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
        & #uploadCard {
          cursor: pointer;
        }
        & .ico {
          box-sizing: inherit;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          flex-grow: 1;
        }
      }
    }
  }
}
</style>

<!-- Javascript-->
<script>
import Modal from "@/components/Upload";
export default {
  name: "Start",
  components: {
    Modal: Modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
