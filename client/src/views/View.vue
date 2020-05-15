<!-- Pug Template -->
<template lang="pug">
.content
  Modal(v-show="isModalVisible" @close="closeModal" id="Modal")
  .header
    include:markdown-it ../data/text/view.md
  .tabs
    ul
      a(href="javascript:void(0)" @click="selectView($event)") #[li(:class="isMapping ? 'selected':''")  Map]
      a(href="javascript:void(0)" @click="selectView($event)") #[li(:class="isTree ? 'selected':''") Tree]
      a(href="javascript:void(0)" @click="selectView($event)") #[li(:class="isList ? 'selected':''")  List]
  .viz(v-if="isMapping || isTree || isList")
    MapViz(v-if="isMapping")
    TreeViz(v-if="isTree")
    ListViz(v-if="isList")
</template>

<!-- SCSS Styling -->
<style lang="scss">
#Modal {
  z-index: 5;
}

.tabs {
  // appearance attributes
  list-style: none;
  margin: 4vh 0 0 0;
  padding: 0;
  text-align: left;
  & ul {
    // appearance attributes
    margin: 0 0 -0.1vh 0;
  }
  & li {
    // appearance attributes
    border: 0.5px solid rgba(190, 189, 184, 0.6);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    cursor: pointer;
    display: inline-block;
    margin: 0 0.1vw;
    padding: 0.5vh 2vw;

    // position attributes
    position: relative;
  }
  & a {
    // appearance attributes
    color: rgb(190, 189, 184);
    text-decoration: none;
    & .selected {
      // appearance attributes
      background-color: rgba(95, 95, 92, 0.4);
    }
  }
}

.viz {
  // appearance attributes
  background-color: rgba(80, 80, 80, 0.4);
  border-color: rgba(190, 189, 184, 0.8);
  border-radius: 24px;
  border-style: solid;
  border-width: 0.5px;
  box-shadow: inset 0 0 10vw 0 rgb(0, 0, 0);
  box-sizing: border-box;
  padding: 16px;

  // container attributes
  display: flex;

  // size attributes
  height: 70vh;
  width: 100%;
}
</style>

<!-- Javascript -->
<script>
import Upload from "@/components/modals/Upload";

import List from "@/components/visualizations/List";
import Mapping from "@/components/visualizations/Mapping";
import Tree from "@/components/visualizations/Tree";

//import { fetchResources } from "@/scripts/webRequests/fetchResources";

var view;

export default {
  name: "Map",
  computed: {
    isMap() {
      return (
        this.currentStatus === "Mapping" || this.initialStatus === "Mapping"
      );
    },
    isTree() {
      return this.currentStatus === "Tree";
    },
    isList() {
      return this.currentStatus === "List";
    }
  },
  components: {
    Upload: Upload,
    Mapping: Mapping,
    List: List,
    Tree: Tree
  },
  data() {
    return {
      isModalVisible: false,
      currentStatus: null,
      initialStatus: null
    };
  },
  mounted() {
    //this.getResources();
    if (localStorage.getItem("vizView") != null) {
      this.currentStatus = localStorage.getItem("vizView");
    } else {
      this.currentStatus = "Mapping";
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    selectView(event) {
      view = event.srcElement.innerText;
      localStorage.setItem("vizView", view);
      this.currentStatus = view;
    } /*,
    getResources() {
      fetchResources()
        .then(resourceData => resourceData.json())
        .then(json => {
          var returnedResource = (json[0]);
        });
    }*/
  }
};
</script>
