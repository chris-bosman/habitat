<!-- Pug Template -->
<template lang="pug">
.view
    Modal(v-show="isModalVisible" @close="closeModal" id="Modal")
    .band
      center
        include:markdown-it ../text/view.md
    .tabs
      ul
        a(href="javascript:void(0)" @click="selectView($event)") #[li(:class="isMap ? 'selected':''")  Map]
        a(href="javascript:void(0)" @click="selectView($event)") #[li(:class="isTree ? 'selected':''") Tree]
        a(href="javascript:void(0)" @click="selectView($event)") #[li(:class="isList ? 'selected':''")  List]
    .viz(v-if="isMap || isTree || isList")
      template(v-if="isMap")
        p isMap
      template(v-if="isTree")
        p isTree
      template(v-if="isList")
        p isList
</template>

<!-- SCSS Styling-->
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
  }
}

.selected {
  background-color: rgba(95, 95, 92, 0.4);
}

.viz {
  box-sizing: border-box;
  display: flex;
  height: 60vh;
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-color: rgba(190, 189, 184, 0.8);
  border-radius: 24px;
  box-shadow: inset 0 0 3vw rgba(110, 110, 110, 0.4);
  padding: 16px;
  background-color: rgba(80, 80, 80, 0.4);
}
</style>

<!-- Javascript-->
<script>
import Modal from "@/components/Upload";

var view;

export default {
  name: "Map",
  computed: {
    isMap() {
      return this.currentStatus === "Map" || this.initialStatus === "Map";
    },
    isTree() {
      return this.currentStatus === "Tree";
    },
    isList() {
      return this.currentStatus === "List";
    }
  },
  components: {
    Modal: Modal
  },
  data() {
    return {
      isModalVisible: false,
      currentStatus: null,
      initialStatus: null
    };
  },
  mounted() {
    if (localStorage.getItem("vizView")) {
      this.currentStatus = localStorage.getItem("vizView");
    } else {
      this.currentStatus = "Map";
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
    }
  }
};
</script>
