<!-- Pug Template -->
<template lang="pug">
.gs
  Upload(v-show="isModalVisible" @close="closeModal" id="Modal")
  .gs-head
    include:markdown-it ../data/text/gs.md
  .cards
      HabitatCard
        router-link(to="/Admin")
          h3 Configure
          p {{ orgCardText }}
          i(class="fas fa-cogs")
      HabitatCard(id="uploadCard")
        div(@click="showModal")
          h3 Import
          p {{ importCardText }}
          i(class="fas fa-file-upload")
      HabitatCard
        router-link(to="/View")
          h3 Visualize
          p {{ vizCardText }}
          i(class="fas fa-tv")
      HabitatCard
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

.gs {
  & a {
    // appearance attributes
    box-sizing: inherit;
    text-decoration: none;
  }

  & .gs-head {
    padding-bottom: 6vh;
  }

  & .cards {
    // container attributes
    display: grid;

    // content attributes
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: 100%;

    // size attributes
    height: 15vh;

    & .HabitatCard {
      // appearance attributes
      margin: 0 7.5%;
      padding: 5% 10%;

      // container attributes
      box-sizing: inherit;
      display: flex;

      & h3 {
        // appearance attributes
        margin: 0;
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
}
</style>

<!-- Javascript -->
<script>
import Upload from "@/components/modals/Upload";
import HabitatCard from "@/components/clickables/HabitatCard";

import orgCardText from "raw-loader!@/data/text/orgCard.txt";
import importCardText from "raw-loader!@/data/text/importCard.txt";
import vizCardText from "raw-loader!@/data/text/vizCard.txt";
import analyzeCardText from "raw-loader!@/data/text/analyzeCard.txt";

export default {
  name: "Start",
  components: {
    Upload: Upload,
    HabitatCard: HabitatCard
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
