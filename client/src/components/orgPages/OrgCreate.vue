<!-- Pug Template -->
<template lang="pug">
.orgSettings
  h3 Organization Settings
  .orgName
    h4 Organization Name:
    HabitatInput(v-model="orgName" placeholder="e.g. Contoso, Inc.")
  .submit
    PageButton
      div Submit
</template>

<!-- SCSS Styling -->
<style lang="scss">
.orgSettings {
  // container attributes
  box-sizing: inherit;

  // size attributes
  height: 100%;
  width: 100%;

  & .orgName {
    // container attributes
    display: flex;

    // content attributes
    align-items: center;
    justify-content: space-between;

    // size settings
    max-width: 275px;
    width: 25vw;
  }
  & .submit {
    & .pagebutton {
      // size attributes
      height: 10vh;
    }
  }
}
</style>

<!-- Javascript -->
<script>
import HabitatInput from "@/components/modules/HabitatInput";
import PageButton from "@/components/modules/PageButton";
import store from "@/store";
import { createOrg } from "@/scripts/webRequests/serverInterface";

export default {
  name: "OrgCreate",
  components: {
    HabitatInput: HabitatInput,
    PageButton: PageButton
  },
  data() {
    return {
      color: "#ebeae5",
      orgExists: null,
      orgName: null,
      option: {
        onSubmit: async function(formData) {
          this.orgName = formData.orgName;

          var orgExists = true;
          var orgName = this.orgName;

          await createOrg(orgName).then(() => {
            if (store.state.requestSuccess) {
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
  }
};
</script>
