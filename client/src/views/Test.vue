<!-- Pug Template -->
<template lang="pug">
.content
  Loading(v-show="this.$store.state.useLoadingModal")
  Result(v-show="this.$store.state.useResultModal")
  button(@click="testServer") Test Server
</template>

<!-- SCSS Styling -->
<style lang="scss"></style>

<!-- Javascript -->
<script>
import { axiosInstance } from "@/scripts/webRequests/axiosInstance";
import Loading from "@/components/modals/Loading";
import Result from "@/components/modals/Result";
import store from "../store";

export default {
  name: "Test",
  components: {
    Loading: Loading,
    Result: Result
  },
  methods: {
    async testServer() {
      await axiosInstance({
        url: `${process.env.VUE_APP_SERVER}/`,
        method: "GET"
      });

      var useResultModal = true;
      store.dispatch("triggerResults", useResultModal);
    }
  }
};
</script>
