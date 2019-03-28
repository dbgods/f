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
import axios from 'axios';

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
    let self = this;
    axios.defaults.headers.common['x-requested-with'] = 'local';
    axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/packages")
    .then(function (response) {
      console.log(">>>packages");
      console.log(response.data);
      self.$store.state.packages = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/drivers")
    .then(function (response) {
      console.log(">>>drivers");
      console.log(response.data);
      self.$store.state.drivers = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    axios.get("https://cors-anywhere.herokuapp.com/ec2-54-86-52-215.compute-1.amazonaws.com:3000/complaints")
    .then(function (response) {
      console.log(">>>complaints");
      console.log(response.data);
      self.$store.state.complaints = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    })
  }
};
</script>
