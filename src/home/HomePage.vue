<template>
  <div>

    <div class="sss" style="position: absolute;top: 20%;left: 10%; ">
      <h1>Hi {{ account.user.name }}!</h1>
      <p>You're logged in !</p>
    </div>


  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from 'axios';

export default {
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    }),
    initialize: function() {
      console.log("Initial Loading");
      this.getAllUsers();
    this.$store.state.notLoggedIn = false;
    if (this.account.user.type === 'manager') {
      this.$store.state.isManager = true;
    }
    let self = this;
    axios.defaults.headers.common['x-requested-with'] = 'local';
    }
  }
};
</script>
