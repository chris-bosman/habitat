<!-- Pug Template -->
<template lang="pug">
.orgSettings
  h3 Organization Name
  .org
    span Organization:
    span(style="margin-left:50px;") {{ this.$store.state.orgName }}
  button(@click="deleteOrgMethod()" class="delete-org-button") Delete Organization
</template>

<!-- SCSS Styling -->
<style lang="scss">
.orgSettings {
  & .org {
    // appearance attributes
    margin: 5.75vh 1.55vw 4vh 1.55vw;

    // container attributes
    display: flex;

    // content attributes
    align-items: center;
    justify-content: flex-start;
  }
  & .delete-org-button {
    // appearance attributes
    background-color: rgba(30, 32, 29, 0.8);
    border-color: rgb(190, 189, 184);
    border-radius: 4px;
    border-style: solid;
    border-width: 0.5px;
    box-shadow: 0.25px rgba(190, 189, 184, 0.3);
    color: rgb(190, 189, 184);
    cursor: pointer;
    text-align: left;
    transition: transform 0.1s;

    // size attributes
    height: 4vh;
    &:hover {
      // appearance attributes
      color: rgb(190, 189, 184);
      transform: scale(1.04);
    }
  }
}
</style>

<!-- Javascript -->
<script>
import { deleteOrg } from "@/scripts/webRequests/serverInterface";

import store from "@/store";

export default {
  name: "OrgSettings",
  methods: {
    async deleteOrgMethod() {
      this.orgName = null;

      var orgExists = false;
      var orgName = this.orgName;

      await deleteOrg().then(() => {
        if (store.state.requestSuccess) {
          store.dispatch("registerOrg", { orgExists, orgName });
        }
      });
    }
  }
};
</script>
