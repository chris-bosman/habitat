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
    display: flex;
    justify-content: flex-start;
    margin-top: 5vh;
    & i {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 0 1vw;
      margin: 0 3vw;
      width: 10vw;
      height: 6vh;
      border: 0.5px solid rgba(190, 189, 184, 0.6);
      border-radius: 6px;
      cursor: pointer;
      & span {
        font-family: "Raleway", sans-serif;
        font-weight: lighter;
      }
      &:hover {
        color: rgb(190, 189, 184);
        background-color: rgba(30, 32, 29, 0.6);
      }
    }
  }
}
</style>

<!-- Javascript -->
<script>
import Header from "@/components/Header";
import Card from "@/components/clickables/Card";

export default {
  name: "SignUp",
  components: {
    Header: Header,
    Card: Card
  },
  data() {
    return {
      orgCard: [
        {
          title: "Create your Organization",
          text: "What organization are you creating a Habitat for?",
          icon: "far fa-building"
        }
      ],
      userCard: [
        {
          title: "Create yourself",
          text: "Who are you?",
          icon: "far fa-user"
        }
      ]
    };
  }
};
</script>
