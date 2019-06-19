<!-- Pug Template -->
<template lang="pug">
.orgSettings
  h3 Organization Name
  form-create(ref="fc" v-model="fApi" :rule="rule" :option="option")
</template>

<!-- SCSS Styling-->
<style lang="scss">
.orgSettings {
  & .ivu-form-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  & .ivu-btn {
    margin-top: 4vh;
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

<!-- Javascript-->
<script>
import store from "@/store";
import { maker } from "form-create";
import { createOrg } from "@/scripts/webRequests/serverInterface";

export default {
  name: "OrgCreate",
  data() {
    return {
      color: "#ebeae5",
      orgExists: null,
      orgName: null,
      fApi: {},
      model: {},
      rule: [maker.input("Organization:", "orgName", "e.g. 'Contoso, Inc.'")],
      option: {
        onSubmit: async function(formData) {
          this.orgName = formData.orgName;

          var orgExists = true;
          var orgName = this.orgName;

          await createOrg(orgName)
            .then(() => {
              if(store.state.requestSuccess) {
                store.dispatch("registerOrg", { orgExists, orgName });
              }
            });
          
        },
        submitBtn: {
          innerText: "Create Organization"
        },
        form: {
          labelWidth: 50
        }
      }
    };
  },
  mounted() {
    this.model = this.fApi.model();
  }
};
</script>
