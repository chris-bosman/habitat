<!-- Pug Template -->
<template lang="pug">
.signup
  .su-head
    center
      Header
    h2 Form Your Habitat
    h4 Get started by creating your Organization, your administrators, and inviting additional users.
  .su-steps
    .org-step
      i(class="fas fa-building")
        span Create Organization
    .admin-step
      i(class="fas fa-user-cog")
        span Create Administrators
    .user-step
      i(class="fas fa-users")
        span Invite Users
</template>

<!-- SCSS Styling -->
<style lang="scss">
.signup {
  & .su-steps {
    // appearance attributes
    margin-top: 5vh;

    // container attributes
    display: flex;

    // content attributes
    justify-content: flex-start;
    & i {
      // appearance attributes
      border: 0.5px solid rgba(190, 189, 184, 0.6);
      border-radius: 6px;
      cursor: pointer;
      margin: 0 3vw;
      padding: 0 1vw;

      // container attributes
      display: flex;

      // content attributes
      align-items: center;
      justify-content: space-evenly;

      // size attributes
      height: 6vh;
      width: 10vw;
      & span {
        // appearance attributes
        font-family: "Raleway", sans-serif;
        font-weight: lighter;
      }
      &:hover {
        // appearance attributes
        background-color: rgba(30, 32, 29, 0.6);
        color: rgb(190, 189, 184);
      }
    }
  }
}
</style>

<!-- Javascript -->
<script>
import Header from "@/components/Header";

export default {
  name: "SignUp",
  components: {
    Header: Header
  }
};
</script>
