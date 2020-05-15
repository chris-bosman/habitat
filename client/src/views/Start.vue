<!-- Pug Template -->
<template lang="pug">
.content
  Upload(v-show="isModalVisible" @close="closeModal" id="Modal")
  .header
    include:markdown-it ../data/text/gs.md
  .cards
      Card
        router-link(to="/Admin")
          h3 Configure
          p {{ orgCardText }}
          i(class="fas fa-cogs")
      Card(id="uploadCard")
        div(@click="showModal")
          h3 Import
          p {{ importCardText }}
          i(class="fas fa-file-upload")
      Card
        router-link(to="/View")
          h3 Visualize
          p {{ vizCardText }}
          i(class="fas fa-tv")
      Card
        router-link(to="/Analyze")
          h3 Analyze
          p {{ analyzeCardText }}
          i(class="fas fa-flask")
</template>

<!-- SCSS Styling -->
<style lang="scss">
#Modal {
  z-index: 5;
}

#uploadCard {
  cursor: pointer;
}

.cards {
  // container attributes
  box-sizing: inherit;
  display: grid;

  // response attributes - landscape
  @media only screen and (min-width: 1001px) {
    grid-template:
      [row1-start] "row1 row1 row1 row1" 25% [row1-end]
      / auto;
    gap: 7.5%;
    height: 50%;
  }

  // responsive attributes - portrait
  @media only screen and (max-width: 1000px) {
    // grid attributes
    grid-template:
      [row1-start] "row1 row1" 50% [row1-end]
      [row2-start] "row2 row2" 50% [row2-end]
      / auto;
    gap: 7.5%;

    // size attributes
    height: 50vh;
    width: 50vw;
  }

  & .Card {
    // appearance attributes
    padding: 5% 10%;

    // container attributes
    box-sizing: inherit;
    display: flex;

    & h3 {
      // appearance attributes
      margin: 0;
    }

    & i {
      // appearance attributes
      font-size: 2em;
    }

    & a,
    div {
      // container attributes
      box-sizing: inherit;
      display: flex;
      flex-direction: column;

      // content attributes
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
</style>

<!-- Javascript -->
<script>
import Upload from "@/components/modals/Upload";
import Card from "@/components/modules/Card";

import orgCardText from "raw-loader!@/data/text/orgCard.txt";
import importCardText from "raw-loader!@/data/text/importCard.txt";
import vizCardText from "raw-loader!@/data/text/vizCard.txt";
import analyzeCardText from "raw-loader!@/data/text/analyzeCard.txt";

export default {
  name: "Start",
  components: {
    Upload: Upload,
    Card: Card
  },
  data() {
    return {
      isModalVisible: false,
      orgCardText: orgCardText,
      importCardText: importCardText,
      vizCardText: vizCardText,
      analyzeCardText: analyzeCardText
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
