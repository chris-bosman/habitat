<!-- Pug Template -->
<template lang="pug">
.gs
  Upload(v-show="isModalVisible" @close="closeModal" id="Modal")
  .gs-head
    include:markdown-it ../data/text/gs.md
  .cards
    .column
      a(href='Admin')
        Card(v-for="(item, index) in orgCard" :key="item.title" :cardtitle="item.title" :cardtext="item.text" :cardicon="item.icon")
    .column(@click="showModal")
      Card(id="uploadCard" v-for="(item,index) in importCard" :key="item.title" :cardtitle="item.title" :cardtext="item.text" :cardicon="item.icon")
    .column
      a(href='View')
        Card(v-for="(item, index) in vizCard" :key="item.title" :cardtitle="item.title" :cardtext="item.text" :cardicon="item.icon")
    .column
      a(href='Analyze')
        Card(id="analyzeCard" v-for="(item, index) in analyzeCard" :key="item.title" :cardtitle="item.title" :cardtext="item.text" :cardicon="item.icon")
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
    color: rgb(235, 234, 229);
    text-decoration: none;
  }
  & .cards {
    // appearance attributes
    box-sizing: border-box;
    margin: 7vh 0 0 7vw;

    // container attributes
    display: flex;

    // content attributes
    justify-content: center;
    &:after {
      // appearance attributes
      content: "";
      clear: both;
      display: table;
    }
    & .column {
      // container attributes
      box-sizing: inherit;

      // size attributes
      height: 30vh;
      max-height: 400px;
      width: 25vw;
    }
  }
}
</style>

<!-- Javascript -->
<script>
import Upload from "@/components/modals/Upload";
import Card from "@/components/clickables/Card";

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
      orgCard: [
        {
          title: "Configure",
          text: orgCardText,
          icon: "fas fa-cogs"
        }
      ],
      importCard: [
        {
          title: "Import",
          text: importCardText,
          icon: "fas fa-file-upload"
        }
      ],
      vizCard: [
        {
          title: "Visualize",
          text: vizCardText,
          icon: "fas fa-tv"
        }
      ],
      analyzeCard: [
        {
          title: "Analyze",
          text: analyzeCardText,
          icon: "fas fa-flask"
        }
      ]
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
