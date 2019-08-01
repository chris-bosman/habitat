<!-- Pug Template -->
<template lang="pug">
.view
  Modal(v-show="isModalVisible" @close="closeModal" id="Modal")
  .head
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
  margin: 4vh 0 0 0;
  text-align: left;
  list-style: none;
  padding: 0;
  & ul {
    margin: 0 0 -0.1vh 0;
  }
  & li {
    display: inline-block;
    position: relative;
    margin: 0 0.1vw;
    padding: 0.5vh 2vw;
    border: 0.5px solid rgba(190, 189, 184, 0.6);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    cursor: pointer;
  }
  & a {
    text-decoration: none;
    color: rgb(190, 189, 184);
    & .selected {
      background-color: rgba(95, 95, 92, 0.4);
    }
  }
}

.viz {
  box-sizing: border-box;
  display: flex;
  height: 70vh;
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-color: rgba(190, 189, 184, 0.8);
  border-radius: 24px;
  box-shadow: inset 0 0 10vw 0 rgb(0, 0, 0);
  padding: 16px;
  background-color: rgba(80, 80, 80, 0.4);
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
