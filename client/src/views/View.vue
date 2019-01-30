<!-- Pug Template -->
<template lang="pug">
.view
    Modal(v-show="isModalVisible" @close="closeModal" id="Modal")
    .band
      center
        include:markdown-it ../text/view.md
    .tabs
      ul
        li #[a(href="javascript:void(0)" @click="selectView($event)") Map]
        li #[a(href="javascript:void(0)" @click="selectView($event)") Tree]
        li #[a(href="javascript:void(0)" @click="selectView($event)") List]
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
    & a {
      text-decoration: none;
      color: rgb(190, 189, 184);
    }
    & .selected {
      background-color: rgba(95, 95, 92, 0.4);
    }
  }
}

.viz {
  box-sizing: border-box;
  display: flex;
  height: 60vh;
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-color: rgba(190, 189, 184, 0.6);
  border-radius: 24px;
  box-shadow: inset 0 0 3vw rgba(190, 189, 184, 0.9);
  padding: 16px;
  background-color: rgba(95, 95, 92, 0.4);
}
</style>

<!-- Javascript-->
<script>
import Modal from "@/components/Upload";

const STATUS_MAP = 0,
  STATUS_TREE = 1,
  STATUS_LIST = 2;

export default {
  name: "Map",
  computed: {
    isMap() {
      return this.currentStatus === STATUS_MAP;
    },
    isTree() {
      return this.currentStatus === STATUS_TREE;
    },
    isList() {
      return this.currentStatus === STATUS_LIST;
    }
  },
  components: {
    Modal: Modal
  },
  data() {
    return {
      isModalVisible: false,
      currentStatus: null
    };
  },
  mounted() {
    this.currentStatus = STATUS_MAP;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    selectView(event) {
      console.log(event);
      const view = event.target.innerText
    }
  }
};
</script>
