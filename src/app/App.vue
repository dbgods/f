<template>
    <div class="jumbotron">
      <ul v-show="!isNotLoggedIn" style="width: 100%;">
        <li style="display:inline-block;margin-right:10px;">
          <router-link to="/" class="router">Home</router-link>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <router-link to="/Packages" class="router">Packages</router-link>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <router-link to="/Complaints" class="router">Complaints</router-link>
        </li>
        <li style="display:inline-block;margin-right:10px;">
          <router-link to="/Vehicles" class="router">Vehicles</router-link>
        </li>
        <li v-show="isManager" style="display:inline-block;margin-right:10px;" >
          <router-link to="/Employees" class="router">Employees</router-link>
        </li>
        <li v-show="isManager" style="display:inline-block;margin-right:10px;" >
          <router-link to="/Customers" class="router">Customers</router-link>
        </li>
        <li style="display:inline-block;text-align:right;">
          <router-link to="/login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</router-link>
        </li>
      </ul>
        <div class="container">
            <div class="row">
                <div>
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        isManager() {
          return this.$store.state.isManager;
        },
        isNotLoggedIn() {
          return this.$store.state.notLoggedIn;
        },
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear'
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    }
};
</script>
