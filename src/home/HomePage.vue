<template>
  <div>
    <h1>Hi {{ account.user.name }}!</h1>
    <p>You're logged in !</p>

    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";


export default {
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
  created() {
    this.getAllUsers();
    this.$store.state.notLoggedIn = false;
    if (this.account.user.type === 'manager') {
      this.$store.state.isManager = true;
    }
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    })
  }
};
</script>
