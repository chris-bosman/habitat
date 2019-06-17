<!-- Pug Template -->
<template lang="pug">
.config
  Loading(v-show="this.$store.state.useLoadingModal")
  .config-head
    include:markdown-it ../data/text/config.md
  .form
    .settings(v-if="this.$store.state.orgExists")
      OrgSettings
    .setup(v-else)
      OrgCreate
</template>

<!-- SCSS Styling-->
<style lang="scss">
.form {
  margin-top: 7vh;
}
</style>

<!-- Javascript-->
<script>
import Loading from "@/components/modals/Loading";
import OrgCreate from "@/components/orgPages/OrgCreate";
import OrgSettings from "@/components/orgPages/OrgSettings";

export default {
  name: "Admin",
  components: {
    Loading: Loading,
    OrgCreate: OrgCreate,
    OrgSettings: OrgSettings
  },
  data() {
    return {
      useLoadingModal: null,
    }
  }
};
</script>
