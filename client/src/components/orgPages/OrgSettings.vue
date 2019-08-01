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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 5.75vh 1.55vw 4vh 1.55vw;
  }
  & .delete-org-button {
    background-color: rgba(30, 32, 29, 0.8);
    box-shadow: 0.25px rgba(190, 189, 184, 0.3);
    color: rgb(190, 189, 184);
    border-radius: 4px;
    text-align: left;
    border-style: solid;
    border-width: 0.5px;
    border-color: rgb(190, 189, 184);
    height: 4vh;
    cursor: pointer;
    transition: transform 0.1s;
    &:hover {
      color: rgb(190, 189, 184);
      transform: scale(1.04);
    }
  }
}
</style>

<!-- Javascript -->
<script>
import store from "@/store";
import { deleteOrg } from "@/scripts/webRequests/serverInterface";

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
