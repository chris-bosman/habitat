<!-- Pug Template -->
<template lang="pug">
.config
  .config-head
    include:markdown-it ../data/text/config.md
  .form
    .settings(v-if="this.$store.state.orgExists")
      h3 Organization Name
      p Organization: {{ this.$store.state.orgName }}
      button(@click="deleteOrg()") Delete Organization
    .setup(v-else)
      h3 Organization Name
      form-create(ref="fc" v-model="fApi" :rule="rule" :option="option")
</template>

<!-- SCSS Styling-->
<style lang="scss">
.form {
  margin-top: 7vh;
  & .setup {
    & .ivu-form-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    & .ivu-btn {
      margin-top: 4vh;
    }
  }
}
</style>

<!-- Javascript-->
<script>
import store from "../store";
import { maker } from "form-create";

export default {
  name: "Admin",
  data() {
    return {
      orgExists: null,
      orgName: null,
      fApi: {},
      model: {},
      rule: [maker.input("Organization:", "orgName", "e.g. 'Contoso, Inc.'")],
      option: {
        onSubmit: function(formData) {
          this.orgName = formData.orgName;
          var orgExists = true;
          var orgName = this.orgName;
          console.log(this.orgName);
          store.dispatch("registerOrg", { orgExists, orgName });
        },
        submitBtn: {
          innerText: "Submit"
        },
        form: {
          labelWidth: 50
        }
      }
    };
  },
  methods: {
    deleteOrg() {
      var orgExists = false;
      this.orgName = null;
      var orgName = this.orgName;
      console.log(orgExists);
      store.dispatch("registerOrg", { orgExists, orgName });
    }
  },
  mounted() {
    this.model = this.fApi.model();
    console.log(this.$store.state.orgExists);
  }
};
</script>
