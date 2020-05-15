<!-- Pug Template -->
<template lang="pug">
.content
  Loading(v-show="this.$store.state.useLoadingModal")
  Result(v-show="this.$store.state.useResultModal")
  .header
    include:markdown-it ../data/text/config.md
  .form
    .settings(v-if="this.$store.state.orgExists")
      OrgSettings
    .setup(v-else)
      OrgCreate
</template>

<!-- SCSS Styling -->
<style lang="scss"></style>

<!-- Javascript -->
<script>
import Loading from "@/components/modals/Loading";
import Result from "@/components/modals/Result";

import OrgCreate from "@/components/orgPages/OrgCreate";
import OrgSettings from "@/components/orgPages/OrgSettings";

export default {
  name: "Admin",
  components: {
    Result: Result,
    Loading: Loading,
    OrgCreate: OrgCreate,
    OrgSettings: OrgSettings
  },
  data() {
    return {
      useLoadingModal: null,
      useResultModal: null
    };
  }
};
</script>
